// Put all the javascript code here, that you want to execute after page load.

browser.runtime.onMessage.addListener(request => {
    const title = document.title.split("|")[0].trim();
    const body = getSelectionText();
    console.log("title:", title);
    console.log("body:", body);
    console.log("Message from the background script:");
    console.log(request.greeting);
    return Promise.resolve({ response: "Hi from content script" });
});

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
