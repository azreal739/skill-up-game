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
 */
import { execFileSync } from 'node:child_process';
import { cpSync, chmodSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const browserDist = join(repoRoot, 'dist/apps/engineering-academy/browser');
const stagingRoot = join(repoRoot, 'dist/local-package');
const staging = join(stagingRoot, 'Engineering Academy');
const zipPath = join(repoRoot, 'dist/EngineeringAcademy-local.zip');
const launcherSrc = join(repoRoot, 'tools/local-package');

const skipBuild = process.argv.includes('--skip-build');

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
