/**
 * Shareable local-build environment (see tools/package-academy-local.mjs):
 * hash routing lets the packaged app run behind the zero-dependency static
 * launchers without any SPA-fallback rewriting.
 */
export const environment = {
  useHashRouting: true,
};
