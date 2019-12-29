// See https://meta.discourse.org/t/compose-a-new-pre-filled-topic-via-url/28074
// http://discourse.example.com/new-topic?title=topic%20title&body=topic%20body&category=category/subcategory&tags=email,planned

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
});

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs
            .sendMessage(tab.id, { greeting: "Hi from background script" })
            .then(response => {
                console.log("X Message from the content script:");
                console.log("response XX:", response.response);

                const creating = browser.tabs.create({
                    url: response.response,
                });
                window.close();
            })
            .catch(err => console.error(err));
    }
}
