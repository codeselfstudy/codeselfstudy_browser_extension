# Chrome Web Store — Privacy practices

Copy-paste source for the **Privacy practices** tab of the Chrome Web Store item edit page. Reflects the permission set after the activeTab + scripting refactor (#34): the extension declares only `activeTab` and `scripting` — no host permissions, no content scripts, no remote code.

Keep this file in sync with `manifest.json` whenever permissions change.

**Privacy policy URL** (paste into the Privacy practices tab, and the Firefox/AMO privacy-policy field): `https://github.com/codeselfstudy/codeselfstudy_browser_extension/blob/master/PRIVACY.md`

---

## Single purpose description

> Code Self Study is a one-click sharing tool for the Code Self Study community. Its single purpose is to let a member share the web page they are currently viewing to the group's Discourse forum (forum.codeselfstudy.com) as a pre-filled new topic, and to provide quick links to the group's public resources (forum, meetups, chat). It has no other function.

## Permission justifications

### `activeTab`

> activeTab is used only when the user clicks the toolbar button and selects "Share Current Page." At that moment the extension reads the current tab's title, URL, and any text the user has selected, in order to pre-fill a new post on the Code Self Study forum. It never accesses tabs the user has not explicitly chosen to share, and requests no standing access to browsing data.

### `scripting`

> The scripting permission is used together with activeTab to run a single, one-off function in the current tab at the moment the user clicks "Share Current Page." That function reads only the page title, URL, and selected text needed to build the forum topic link. Nothing is injected ahead of time, on other tabs, or without a direct user action.

## Remote code

Answer: **No, I am not using remote code.**

> The extension does not use remote code. All executable code ships inside the package, including the webextension-polyfill library (bundled unminified). No code is loaded from remote servers, and the extension uses no eval or equivalent.

## Data usage

Declare that the extension does **not** collect user data, and tick all three certification checkboxes.

> The extension does not collect or transmit user data to the developer or any third party. When the user clicks "Share Current Page," it reads the current page's title, URL, and selected text solely to construct a Discourse forum topic link, which opens in a new tab. That information is used only to build the link the user chose to open; it is not stored, logged, or sent anywhere else.

Certifications (all true for this extension):

- [x] I do not sell or transfer user data to third parties, outside of the approved use cases.
- [x] I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes.

---

## Notes

- Firefox / AMO: the manifest already declares `browser_specific_settings.gecko.data_collection_permissions.required = ["none"]`, which is the AMO equivalent of "no data collected."
- If a host permission is ever reintroduced (e.g. to call a codeselfstudy.com API), add a host-permission justification here and on the form: "Interacts only with the group's own codeselfstudy.com domains."
