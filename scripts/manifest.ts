// Pure Manifest V3 transforms shared by the per-browser build.
// Side-effect free so they can be unit tested without touching the filesystem.

export type Manifest = Record<string, unknown> & {
  background?: {
    service_worker?: string;
    scripts?: string[];
    [k: string]: unknown;
  };
  browser_specific_settings?: unknown;
};

/** Chrome: keep background.service_worker; drop Firefox-only keys. */
export function toChromeManifest(base: Manifest): Manifest {
  const m: Manifest = structuredClone(base);
  if (m.background) delete m.background.scripts;
  delete m.browser_specific_settings;
  return m;
}

/** Firefox: keep background.scripts + browser_specific_settings; drop the SW key. */
export function toFirefoxManifest(base: Manifest): Manifest {
  const m: Manifest = structuredClone(base);
  if (m.background) delete m.background.service_worker;
  return m;
}
