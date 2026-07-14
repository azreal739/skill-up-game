/**
 * Cross-origin-isolation service worker. Static hosts we don't control
 * (e.g. simple web deploys) can't send the COOP/COEP headers that unlock
 * multithreaded WebAssembly for the on-device voice engine — so this worker
 * stamps them onto every response instead. Hosts that DO send the headers
 * (the offline local package's launchers) never register this worker at all.
 *
 * Cross-origin subresources still work because our only cross-origin fetch
 * (the one-time HuggingFace model download) uses CORS, which require-corp
 * permits.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return;
  }
  event.respondWith(
    fetch(request).then((response) => {
      // Opaque responses can't be re-wrapped — pass them through untouched.
      if (response.status === 0) {
        return response;
      }
      const headers = new Headers(response.headers);
      headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    })
  );
});
