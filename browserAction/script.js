// See https://meta.discourse.org/t/compose-a-new-pre-filled-topic-via-url/28074
// http://discourse.example.com/new-topic?title=topic%20title&body=topic%20body&category=category/subcategory&tags=email,planned

// An object that contains references to the elements in the browser action menu
const links = {
    shareLink: document.getElementById("shareLink"),
};

links.shareLink.addEventListener("click", e => {
    browser.tabs
        .query({
            currentWindow: true,
            active: true,
        })
        .then(sendMessageToTabs)
        // I don't think this will log from a background script, but I'm
        // not sure what to do with it at the moment.
        .catch(err => console.error(err));
});

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs
            .sendMessage(tab.id, {
                greeting: "a message from the background script",
            })
            .then(response => {
                console.log("Destination URL", response.response);

                const creating = browser.tabs.create({
                    url: response.response,
                });

                // Close the popup or it will stay open on the new tab
                window.close();
            })
            .catch(err => console.error(err));
    }
}
