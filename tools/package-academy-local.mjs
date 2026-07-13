#!/usr/bin/env node
/**
 * Packages Engineering Academy as a shareable, zero-install local bundle.
 *
 *   node tools/package-academy-local.mjs [--skip-build]
 *
 * Output: dist/EngineeringAcademy-local.zip containing
 *   Engineering Academy/
 *     Play - Windows.bat      double-click launchers (fixed port 8377 so
 *     Play - Mac.command      localStorage saves survive relaunches)
 *     Play - Linux.sh
 *     README.txt
 *     launcher/serve.ps1      zero-dependency static servers (PowerShell / Perl)
 *     launcher/serve.pl
 *     app/                    the app built with the `shareable` configuration
 *                             (hash routing + relative baseHref)
 *     app/assets/tts/model/   Kokoro-82M voice model + persona voices, so the
 *                             mentor narration works fully offline (the app
 *                             falls back to HuggingFace when these are absent,
 *                             e.g. on a dev server or web deploy)
 *
 * Model files are downloaded once into dist/tts-model-cache/ and reused on
 * later runs. Pass --skip-tts to build a small package without narration
 * support (the voice toggle would then need internet on first use).
 */
import { execFileSync } from 'node:child_process';
import { cpSync, chmodSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const browserDist = join(repoRoot, 'dist/apps/engineering-academy/browser');
const stagingRoot = join(repoRoot, 'dist/local-package');
const staging = join(stagingRoot, 'Engineering Academy');
const zipPath = join(repoRoot, 'dist/EngineeringAcademy-local.zip');
const launcherSrc = join(repoRoot, 'tools/local-package');
const ttsCache = join(repoRoot, 'dist/tts-model-cache');

const skipBuild = process.argv.includes('--skip-build');
const skipTts = process.argv.includes('--skip-tts');

/**
 * Kokoro-82M files the worker requests, mirrored at HuggingFace layout.
 * Voices must cover every voiceId in content-model/src/lib/personas.ts.
 */
const TTS_REPO = 'https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/main';
const TTS_FILES = [
  'config.json',
  'tokenizer.json',
  'tokenizer_config.json',
  'onnx/model_quantized.onnx',
  'voices/am_michael.bin',
  'voices/am_fenrir.bin',
  'voices/af_bella.bin',
  'voices/af_heart.bin',
  'voices/bm_george.bin',
  'voices/af_sarah.bin',
];

async function fetchTtsModel() {
  for (const file of TTS_FILES) {
    const target = join(ttsCache, file);
    if (existsSync(target)) {
      continue;
    }
    console.log(`  downloading ${file}...`);
    const response = await fetch(`${TTS_REPO}/${file}`);
    if (!response.ok) {
      throw new Error(`Failed to download ${file}: HTTP ${response.status}`);
    }
    mkdirSync(dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
  }
}

if (!skipBuild) {
  console.log('Building engineering-academy (shareable configuration)...');
  execFileSync('npx', ['nx', 'build', 'engineering-academy', '--configuration=shareable'], {
    cwd: repoRoot,
    stdio: 'inherit',
  });
}

if (!existsSync(browserDist)) {
  console.error(`Build output not found at ${browserDist}`);
  process.exit(1);
}

console.log('Assembling package...');
rmSync(stagingRoot, { recursive: true, force: true });
rmSync(zipPath, { force: true });
mkdirSync(staging, { recursive: true });

cpSync(browserDist, join(staging, 'app'), { recursive: true });
cpSync(launcherSrc, staging, { recursive: true });

if (!skipTts) {
  console.log('Bundling the on-device voice model (cached after first run)...');
  await fetchTtsModel();
  cpSync(ttsCache, join(staging, 'app/assets/tts/model'), { recursive: true });
}
chmodSync(join(staging, 'Play - Mac.command'), 0o755);
chmodSync(join(staging, 'Play - Linux.sh'), 0o755);
chmodSync(join(staging, 'launcher/serve.pl'), 0o755);

console.log('Zipping...');
execFileSync('zip', ['-rq', zipPath, 'Engineering Academy'], {
  cwd: stagingRoot,
  stdio: 'inherit',
});

console.log(`\nDone: ${zipPath}`);
console.log('Share the zip; recipients unzip it and double-click the Play file for their OS.');
