// See https://meta.discourse.org/t/compose-a-new-pre-filled-topic-via-url/28074
// http://discourse.example.com/new-topic?title=topic%20title&body=topic%20body&category=category/subcategory&tags=email,planned

const DISCOURSE_BASE_URL = "https://forum.codeselfstudy.com";
const NEW_TOPIC_URL = `${DISCOURSE_BASE_URL}/new-topic`;

// An object that contains references to the elements in the browser action menu
const els = {
  shareLink: document.getElementById("shareLink"),
};

els.shareLink.addEventListener("click", () => {
  shareCurrentTab().catch((err) => console.error(err));
});

/**
 * Read the active tab (via activeTab + scripting), build a pre-filled
 * Discourse "new topic" URL from its title/URL/selection, and open it.
 */
async function shareCurrentTab() {
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
  const body = `${toMarkdownQuote(page.selection)}\n\n${page.url}`;

  await browser.tabs.create({ url: generateSharingUrl(title, body) });

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
