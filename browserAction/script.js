// See https://meta.discourse.org/t/compose-a-new-pre-filled-topic-via-url/28074
// http://discourse.example.com/new-topic?title=topic%20title&body=topic%20body&category=category/subcategory&tags=email,planned

// An object that contains references to the elements in the browser action menu
const els = {
    shareLink: document.getElementById("shareLink"),
    // codesLink: document.getElementById("codesLink"),
    codesOutput: document.getElementById("codesOutput"),
};

// els.codesLink.addEventListener("click", (e) => {
//     fetchCodes().then(({ codes }) => {
//         showCodes(codes);
//     });
// });

els.shareLink.addEventListener("click", (e) => {
    browser.tabs
        .query({
            currentWindow: true,
            active: true,
        })
        .then(sendMessageToTabs)
        // I don't think this will log from a background script, but I'm
        // not sure what to do with it at the moment.
        .catch((err) => console.error(err));
});

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs
            .sendMessage(tab.id, {
                greeting: "a message from the background script",
            })
            .then((response) => {
                console.log("Destination URL", response.response);

                const creating = browser.tabs.create({
                    url: response.response,
                });

                // Close the popup or it will stay open on the new tab
                window.close();
            })
            .catch((err) => console.error(err));
    }
}

/**
 * Fetch the JSON and return it in a promise.
 */
function fetchCodes() {
    const url = "https://browser.codeselfstudy.com/api/codes.json";
    return fetch(url).then((res) => res.json());
}

function showCodes(codes) {
    const pairs = Object.entries(codes);
    const rows = pairs
        .map((pair) => {
            return `<tr><td>${pair[0]}</td><td>${pair[1]}</tr>`;
        })
        .join("\n");
    const codesHTML = `
        <table>
            <thead>
                <tr>
                    <th>resource</th>
                    <th>code</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`.trim();

    // This tries to avoid warnings from Mozilla's linter about unsafe
    // use of innerHTML.
    const codesEl = document.createElement("div");

    const parser = new DOMParser();
    const parsed = parser.parseFromString(codesHTML, `text/html`);
    const tags = parsed.getElementsByTagName(`table`);

    els.codesOutput.innerHTML = ``;
    for (const tag of tags) {
        els.codesOutput.appendChild(tag);
    }
}
