/// <reference lib="webworker" />
/**
 * Kokoro TTS worker: loads the 82M-parameter model and synthesises briefing
 * audio off the main thread. Model, voice and ONNX-runtime files are served
 * from the app's own assets when present (the offline local package bundles
 * them there); any asset that is missing falls back to the original
 * HuggingFace URL, which is how dev servers and a web deploy get the
 * one-time download (cached by the browser afterwards).
 *
 * Device selection: when the app bundles the q8 model locally we stay on
 * WASM with it (the offline guarantee). Otherwise, machines with a real
 * WebGPU adapter get the fp32 model on the GPU — a much larger one-time
 * download, but roughly an order of magnitude faster generation — with
 * WASM/q8 as the fallback for everything else.
 *
 * Generation streams sentence by sentence, so playback can start after the
 * first sentence instead of after the whole block.
 *
 * Protocol (worker ⇄ SpeechService):
 *   in:  { type: 'init' }
 *   in:  { type: 'generate', id: number, voice: string, text: string }
 *   out: { type: 'progress', progress: number }        // 0..100 while loading
 *   out: { type: 'ready', device: string } | { type: 'init-error', message: string }
 *   out: { type: 'audio-chunk', id: number, wav: ArrayBuffer }  // one per sentence
 *   out: { type: 'audio-done', id: number }
 *   out: { type: 'audio-error', id: number, message: string }
 */

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const HF_BASE = `https://huggingface.co/${MODEL_ID}/resolve/main/`;
const LOCAL_BASE = '/assets/tts/model/';

/** A local response that is real content, not an SPA index.html fallback. */
function isRealAsset(response: Response): boolean {
  const contentType = response.headers.get('content-type') ?? '';
  return response.ok && !contentType.includes('text/html');
}

// Serve model + voice files from local assets first. kokoro-js hardcodes the
// HuggingFace URL for voices, so this interception is the only offline hook.
const nativeFetch = self.fetch.bind(self);
self.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url =
    typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  if (url.startsWith(HF_BASE)) {
    const local = LOCAL_BASE + url.slice(HF_BASE.length);
    try {
      const response = await nativeFetch(local, init);
      if (isRealAsset(response)) {
        return response;
      }
    } catch {
      // Local asset unavailable — fall through to the remote original.
    }
  }
  return nativeFetch(input as RequestInfo, init);
}) as typeof fetch;

interface GenerateRequest {
  type: 'generate';
  id: number;
  voice: string;
  text: string;
}

type InboundMessage = { type: 'init' } | GenerateRequest;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tts: any = null;
let queue: Promise<void> = Promise.resolve();

async function loadModel(): Promise<{ model: unknown; device: string }> {
  const { KokoroTTS, env } = await import('kokoro-js');
  // ONNX runtime wasm ships in our assets; never hit a CDN for it.
  // (kokoro's env.wasmPaths setter proxies into transformers.js.)
  env.wasmPaths = '/assets/tts/ort/';

  const attempt = (device: 'webgpu' | 'wasm', dtype: 'fp32' | 'q8') => {
    // Blend per-file download progress into one percentage.
    const progress = new Map<string, { loaded: number; total: number }>();
    postMessage({ type: 'progress', progress: 0 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onProgress = (info: any) => {
      if (info.status !== 'progress' || !info.total) {
        return;
      }
      progress.set(info.file, { loaded: info.loaded, total: info.total });
      let loaded = 0;
      let total = 0;
      for (const entry of progress.values()) {
        loaded += entry.loaded;
        total += entry.total;
      }
      postMessage({ type: 'progress', progress: Math.round((loaded / total) * 100) });
    };
    return KokoroTTS.from_pretrained(MODEL_ID, {
      dtype,
      device,
      progress_callback: onProgress,
    });
  };

  // A bundled local model means the offline package — stay on it (WASM/q8).
  let bundled = false;
  try {
    bundled = isRealAsset(await nativeFetch(`${LOCAL_BASE}onnx/model_quantized.onnx`, { method: 'HEAD' }));
  } catch {
    bundled = false;
  }

  if (!bundled) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gpu = (self.navigator as any)?.gpu;
      if (gpu && (await gpu.requestAdapter())) {
        return { model: await attempt('webgpu', 'fp32'), device: 'webgpu' };
      }
    } catch {
      // No usable GPU path — fall back to WASM below.
    }
  }
  return { model: await attempt('wasm', 'q8'), device: 'wasm' };
}

async function init(): Promise<void> {
  try {
    const { model, device } = await loadModel();
    tts = model;
    postMessage({ type: 'ready', device });
  } catch (error) {
    postMessage({ type: 'init-error', message: String(error) });
  }
}

async function generate(request: GenerateRequest): Promise<void> {
  try {
    const { TextSplitterStream } = await import('kokoro-js');
    // Feed the block through the splitter so audio streams per sentence.
    const splitter = new TextSplitterStream();
    splitter.push(request.text);
    splitter.close();
    for await (const { audio } of tts.stream(splitter, { voice: request.voice })) {
      const wav = audio.toWav() as ArrayBuffer;
      postMessage({ type: 'audio-chunk', id: request.id, wav }, { transfer: [wav] });
    }
    postMessage({ type: 'audio-done', id: request.id });
  } catch (error) {
    postMessage({ type: 'audio-error', id: request.id, message: String(error) });
  }
}

addEventListener('message', (event: MessageEvent<InboundMessage>) => {
  const message = event.data;
  if (message.type === 'init') {
    queue = queue.then(init);
  } else if (message.type === 'generate') {
    queue = queue.then(() => generate(message));
  }
});
