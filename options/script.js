// Options page: reads and writes the settings shared with the popup via
// localStorage (both are same-origin extension pages, so no "storage"
// permission is needed).

// Apply the saved appearance before paint.
applyStoredTheme();

const controls = {
  theme: document.getElementById("theme"),
  quote: document.getElementById("quote"),
  newTab: document.getElementById("newTab"),
  version: document.getElementById("version"),
};

// Reflect the saved settings in the form.
const settings = readSettings();
controls.theme.value = settings.theme;
controls.quote.checked = settings.quote;
controls.newTab.checked = settings.newTab;

try {
  controls.version.textContent =
    "Version " + browser.runtime.getManifest().version + " — MIT License";
} catch (err) {
  /* getManifest unavailable in a plain preview: leave it blank */
}

controls.theme.addEventListener("change", () => {
  saveSettings({ theme: controls.theme.value });
  applyStoredTheme();
});
controls.quote.addEventListener("change", () => {
  saveSettings({ quote: controls.quote.checked });
});
controls.newTab.addEventListener("change", () => {
  saveSettings({ newTab: controls.newTab.checked });
});

/**
 * Read the saved settings from localStorage. Missing/invalid values fall back
 * to defaults. (Kept in sync with the popup's copy.)
 */
function readSettings() {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem("css.settings") || "{}") || {};
  } catch (err) {
    stored = {};
  }
  return {
    theme:
      stored.theme === "light" || stored.theme === "dark"
        ? stored.theme
        : "system",
    quote: stored.quote !== false,
    newTab: stored.newTab !== false,
  };
}

/**
 * Merge a patch into the saved settings and persist it.
 */
function saveSettings(patch) {
  const next = Object.assign(readSettings(), patch);
  try {
    localStorage.setItem("css.settings", JSON.stringify(next));
  } catch (err) {
    /* storage unavailable: the live form still reflects the change */
  }
  return next;
}

/**
 * Apply the saved appearance to <html>. "system" removes the override so the
 * CSS prefers-color-scheme rules apply.
 */
function applyStoredTheme() {
  const theme = readSettings().theme;
  if (theme === "light" || theme === "dark") {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}
