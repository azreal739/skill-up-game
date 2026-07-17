// Local and shareable builds stay accountless. The hosted Sites worker
// replaces this response at runtime with the Clerk publishable key.
window.__EA_RUNTIME_CONFIG__ = { clerkPublishableKey: null };
