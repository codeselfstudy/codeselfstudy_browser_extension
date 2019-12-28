// See https://meta.discourse.org/t/compose-a-new-pre-filled-topic-via-url/28074
// http://discourse.example.com/new-topic?title=topic%20title&body=topic%20body&category=category/subcategory&tags=email,planned

const DISCOURSE_BASE_URL = "https://forum.codeselfstudy.com";
const NEW_TOPIC_URL = `${DISCOURSE_BASE_URL}/new-topic`;

// An object that contains references to the elements in the browser action menu
const links = {
    shareLink: document.getElementById("shareLink"),
};

console.log(links);

links.shareLink.addEventListener("click", e => {
    console.log("clicked");
});

/**
 * Generate a URL that creates a post draft in Discourse with pre-filled information.
 */
function sharingUrl(
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

// copy selected text to use as the body

// extract page title
function extractPageTitle() {
    documen;
}
