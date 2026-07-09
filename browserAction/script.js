// See https://meta.discourse.org/t/compose-a-new-pre-filled-topic-via-url/28074
// http://discourse.example.com/new-topic?title=topic%20title&body=topic%20body&category=category/subcategory&tags=email,planned

const DISCOURSE_BASE_URL = "https://forum.codeselfstudy.com";
const NEW_TOPIC_URL = `${DISCOURSE_BASE_URL}/new-topic`;

// Apply the saved appearance before anything else so the popup opens in the
// right theme. "system" leaves data-theme unset and lets the CSS
// prefers-color-scheme rules decide.
applyStoredTheme();

const els = {
  shareLink: document.getElementById("shareLink"),
  openOptions: document.getElementById("openOptions"),
  version: document.getElementById("version"),
};

// Show the real extension version in the footer.
try {
  els.version.textContent = "v" + browser.runtime.getManifest().version;
} catch (err) {
  /* getManifest unavailable in a plain preview: leave the footer blank */
}

els.openOptions.addEventListener("click", () => {
  browser.runtime.openOptionsPage();
  window.close();
});

els.shareLink.addEventListener("click", () => {
  shareCurrentTab(readSettings()).catch((err) => console.error(err));
});

/**
 * Read the active tab (via activeTab + scripting), build a pre-filled
 * Discourse "new topic" URL from its title/URL/selection, and open it
 * according to the saved settings. The category is always the default
 * "general-discussion"; the user can change it in Discourse before posting.
 */
async function shareCurrentTab(settings) {
  const [tab] = await browser.tabs.query({
    currentWindow: true,
    active: true,
  });
  if (!tab) {
    return;
  }

  const [injection] = await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: readPageInfo,
  });
  const page = injection && injection.result;
  if (!page) {
    return;
  }

  const title = page.title.split("|")[0].trim();
  const selection = (page.selection || "").trim();
  const body =
    settings.quote && selection
      ? `${toMarkdownQuote(page.selection)}\n\n${page.url}`
      : page.url;
  const url = generateSharingUrl(title, body);

  if (settings.newTab) {
    await browser.tabs.create({ url });
  } else {
    await browser.tabs.update(tab.id, { url });
  }

  // Close the popup or it will stay open on the new tab.
  window.close();
}

/**
 * Runs in the context of the shared page (injected via scripting.executeScript),
 * so it can only use the DOM, not the extension's APIs. Returns the raw fields
 * needed to build the forum post.
 */
function readPageInfo() {
  return {
    title: document.title,
    url: window.location.href,
    selection: window.getSelection ? window.getSelection().toString() : "",
  };
}

/**
 * Generate a URL that creates a post draft in Discourse with pre-filled information.
 */
function generateSharingUrl(
  title,
  body,
  category = "general-discussion",
  tagsArr = []
) {
  const tags = tagsArr.join(",");
  const params = new URLSearchParams({
    title,
    body,
    category,
    tags,
  }).toString();

  // This URL will create a post draft
  return `${NEW_TOPIC_URL}/?${params}`;
}

/**
 * Take a string and format it as a markdown blockquote.
 */
function toMarkdownQuote(text) {
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

/**
 * Read the saved settings from localStorage. The popup and the options page are
 * same-origin extension pages, so they share localStorage without needing the
 * "storage" permission. Missing/invalid values fall back to defaults.
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
