// Put all the javascript code here, that you want to execute after page load.
const DISCOURSE_BASE_URL = "https://forum.codeselfstudy.com";
const NEW_TOPIC_URL = `${DISCOURSE_BASE_URL}/new-topic`;

browser.runtime.onMessage.addListener(request => {
    const title = document.title.split("|")[0].trim();
    const body = getSelectionText();
    console.log("title:", title);
    console.log("body:", body);
    return Promise.resolve({ response: generateSharingUrl(title, body) });
});

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
 * Capture the selected text or return an empty string.
 */
function getSelectionText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        return document.selection.createRange().text;
    }
    return "";
}
