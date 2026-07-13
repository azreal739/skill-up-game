/**
 * Default (hosted / dev) environment: path-based routing, served from a
 * server that rewrites unknown routes to index.html.
 */
export const environment = {
  /**
   * When true the router uses hash-based URLs (e.g. /#/campaigns) so the app
   * can be served by any dumb static file server with no SPA fallback —
   * this is what the shareable local build uses.
   */
  useHashRouting: false,
};
