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
    browser.tabs
        .query({
            currentWindow: true,
            active: true,
        })
        .then(sendMessageToTabs)
        .catch(onError);
    // const sending = browser.tabs.sendMessage(
    //     1, // tabId, // integer
    //     { msg: "saluton mondo" }, //message, // any
    //     {} //options // optional object
    // );
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

function onError(error) {
    console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs
            .sendMessage(tab.id, { greeting: "Hi from background script" })
            .then(response => {
                console.log("Message from the content script:");
                console.log(response.response);
            })
            .catch(onError);
    }
}

// browser.browserAction.onClicked.addListener(() => {
// });
