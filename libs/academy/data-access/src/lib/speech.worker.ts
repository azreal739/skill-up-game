/// <reference lib="webworker" />
/**
 * Kokoro TTS worker: loads the 82M-parameter model and synthesises briefing
 * audio off the main thread. Model, voice and ONNX-runtime files are served
 * from the app's own assets when present (the offline local package bundles
 * them there); any asset that is missing falls back to the original
 * HuggingFace URL, which is how dev servers and a future web deploy get the
 * one-time download (cached by the browser afterwards).
 *
 * Protocol (worker ⇄ SpeechService):
 *   in:  { type: 'init' }
 *   in:  { type: 'generate', id: number, voice: string, text: string }
 *   out: { type: 'progress', progress: number }        // 0..100 while loading
 *   out: { type: 'ready' } | { type: 'init-error', message: string }
 *   out: { type: 'audio', id: number, wav: ArrayBuffer }
 *   out: { type: 'audio-error', id: number, message: string }
 */

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const HF_BASE = `https://huggingface.co/${MODEL_ID}/resolve/main/`;
const LOCAL_BASE = '/assets/tts/model/';

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
      // SPA hosts rewrite unknown paths to index.html with a 200 — an HTML
      // content-type means "not actually bundled", not a model file.
      const contentType = response.headers.get('content-type') ?? '';
      if (response.ok && !contentType.includes('text/html')) {
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

async function init(): Promise<void> {
  try {
    const { KokoroTTS, env } = await import('kokoro-js');
    // ONNX runtime wasm ships in our assets; never hit a CDN for it.
    // (kokoro's env.wasmPaths setter proxies into transformers.js.)
    env.wasmPaths = '/assets/tts/ort/';

    // Track per-file download progress and report a blended percentage.
    const progress = new Map<string, { loaded: number; total: number }>();
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

    tts = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: 'q8',
      device: 'wasm',
      progress_callback: onProgress,
    });
    postMessage({ type: 'ready' });
  } catch (error) {
    postMessage({ type: 'init-error', message: String(error) });
  }
}

async function generate(request: GenerateRequest): Promise<void> {
  try {
    const audio = await tts.generate(request.text, { voice: request.voice });
    const wav = audio.toWav() as ArrayBuffer;
    postMessage({ type: 'audio', id: request.id, wav }, { transfer: [wav] });
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
