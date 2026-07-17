import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(projectRoot, '..', '..');
const angularOutput = resolve(workspaceRoot, 'dist', 'apps', 'engineering-academy', 'browser');
const sitesOutput = resolve(projectRoot, 'dist');

await rm(sitesOutput, { recursive: true, force: true });
await mkdir(resolve(sitesOutput, 'server'), { recursive: true });
await cp(angularOutput, resolve(sitesOutput, 'client'), { recursive: true });

const workerSource = `const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/runtime-config.js') {
      const publishableKey = env.CLERK_PUBLISHABLE_KEY ?? '';
      return new Response(
        'window.__EA_RUNTIME_CONFIG__ = ' + JSON.stringify({ clerkPublishableKey: publishableKey }) + ';',
        {
          headers: {
            'content-type': 'application/javascript; charset=utf-8',
            'cache-control': 'no-store',
          },
        }
      );
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== 'GET') return response;

    const acceptsHtml = request.headers.get('accept')?.includes('text/html');
    if (!acceptsHtml) return response;

    const indexUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

export default worker;
`;

await writeFile(resolve(sitesOutput, 'server', 'index.js'), workerSource);

const hostingConfig = await readFile(resolve(projectRoot, '.openai', 'hosting.json'));
await mkdir(resolve(sitesOutput, '.openai'), { recursive: true });
await writeFile(resolve(sitesOutput, '.openai', 'hosting.json'), hostingConfig);
