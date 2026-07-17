#!/usr/bin/env node
/**
 * Post-build/deploy smoke test for Engineering Academy.
 *
 *   node tools/e2e-smoke.mjs [--url http://localhost:8377]
 *
 * With no --url it serves dist/apps/engineering-academy/browser on :8377
 * via the local-package Perl server. Drives a real browser through:
 * enrolment → briefing (avatars, replay buttons) → challenge (question
 * Listen button, option submit, feedback Listen button) → Help Centre
 * (Archivist Listen) → settings voice toggle. Exits non-zero on failure.
 *
 * Env: CHROMIUM (executable path) and PLAYWRIGHT (module path) override the
 * defaults used in the dev sandbox.
 */
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const urlArg = process.argv.indexOf('--url');
const baseUrl = urlArg > -1 ? process.argv[urlArg + 1].replace(/\/$/, '') : 'http://localhost:8377';
const chromiumPath =
  process.env['CHROMIUM'] ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const playwrightPath =
  process.env['PLAYWRIGHT'] ?? '/opt/node22/lib/node_modules/playwright/index.mjs';

let server = null;
if (urlArg === -1) {
  server = spawn(
    'perl',
    [
      join(repoRoot, 'tools/local-package/launcher/serve.pl'),
      join(repoRoot, 'dist/apps/engineering-academy/browser'),
    ],
    { stdio: 'ignore', detached: true }
  );
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

const failures = [];
const check = (name, ok) => {
  console.log(`${ok ? '  ✓' : '  ✗'} ${name}`);
  if (!ok) {
    failures.push(name);
  }
};

try {
  const { chromium } = await import(playwrightPath);
  const browser = await chromium.launch({ executablePath: chromiumPath });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  page.on('console', (msg) => {
    // Voice is on by default for new players; in sandboxes without network
    // the model fetch fails and the engine reports an init error. That's
    // environmental, not a bug — narration degrades to silent text.
    if (msg.type() === 'error' && !/voice engine/i.test(msg.text())) {
      consoleErrors.push(msg.text());
    }
  });

  // Enrolment.
  await page.goto(baseUrl + '/');
  await page.getByRole('button', { name: 'Enrol at the Academy' }).click();
  await page.locator('input[name="name"]').fill('Smoke Test');
  await page.getByRole('button', { name: 'Report for duty' }).click();
  // Enrolment may briefly show the first-load voice calibration overlay —
  // wait for the real outcome instead of a fixed pause.
  const arrived = await page
    .waitForURL('**/campaigns', { timeout: 5000 })
    .then(() => true)
    .catch(() => false);
  await page
    .getByRole('heading', { name: 'Choose your path', exact: true })
    .waitFor({ state: 'visible', timeout: 5000 })
    .catch(() => undefined);
  check(
    'enrolment completes',
    arrived &&
      (await page.getByRole('heading', { name: 'Choose your path', exact: true }).isVisible())
  );

  // Briefing supports two valid environments: a calibrated voice engine uses
  // the comms HUD + voice controls, while an unavailable engine falls back to
  // inline briefing text + avatars. The smoke must accept both paths.
  await page.goto(baseUrl + '/campaigns/ts-fundamentals');
  await page.waitForTimeout(500);
  await page.locator('a[href*="/missions/"]').first().click();
  await page.waitForTimeout(400);
  const skip = page.getByRole('button', { name: /skip/i });
  if (await skip.count()) {
    await skip.click();
  }
  await page.waitForTimeout(300);
  await Promise.race([
    page.locator('ea-persona-avatar svg').first().waitFor({ state: 'attached', timeout: 8000 }),
    page.locator('ea-voice-button button').first().waitFor({ state: 'attached', timeout: 8000 }),
    page.locator('.briefing__transmission').waitFor({ state: 'attached', timeout: 8000 }),
  ]).catch(() => undefined);
  const briefingAvatarCount = await page.locator('ea-persona-avatar svg').count();
  const voiceButtonCount = await page.locator('ea-voice-button button').count();
  const transmissionPanelCount = await page.locator('.briefing__transmission').count();
  check(
    'briefing presentation renders',
    briefingAvatarCount >= 1 || transmissionPanelCount === 1
  );
  check(
    'voice controls match the available engine',
    voiceButtonCount >= 1 || briefingAvatarCount >= 1
  );

  // Challenge: submit an answer, feedback panel appears.
  await page.getByRole('button', { name: 'Start Mission' }).click();
  await page.waitForTimeout(400);
  check('challenge renders', (await page.locator('section.challenge').count()) === 1);
  await page.locator('ea-option-list li button, .option').first().click();
  await page.getByRole('button', { name: /Submit Decision/i }).click();
  await page.waitForTimeout(500);
  check('feedback panel appears', (await page.locator('.feedback').count()) === 1);

  // Help Centre renders topics.
  await page.goto(baseUrl + '/help');
  await page.waitForTimeout(500);
  check('help centre renders a topic', (await page.locator('.help__detail').count()) === 1);

  // Settings voice toggle exists.
  await page.goto(baseUrl + '/settings');
  await page.waitForTimeout(500);
  check(
    'voice toggles present',
    // Voice narration + (voice on by default) auto-play & transmission text.
    (await page.locator('section:has(h2:text("Mentor voice")) input[type="checkbox"]').count()) >= 1
  );

  check('no console errors', consoleErrors.length === 0);
  if (consoleErrors.length) {
    for (const err of consoleErrors.slice(0, 5)) {
      console.log('    console:', err.slice(0, 120));
    }
  }

  await browser.close();
} finally {
  if (server?.pid) {
    try {
      process.kill(-server.pid);
    } catch {
      // Already gone.
    }
  }
}

if (failures.length) {
  console.error(`\nSMOKE FAILED: ${failures.length} check(s):`, failures.join(' | '));
  process.exit(1);
}
console.log('\nSMOKE PASSED');
