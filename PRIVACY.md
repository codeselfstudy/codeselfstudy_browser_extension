# Privacy Policy — Code Self Study Browser Extension

_Last updated: 2026-07-09_

Code Self Study ("the extension") is a one-click tool for sharing the page you are viewing to the Code Self Study community forum. **The extension does not collect, store, or transmit any personal data to the developer, and it contains no analytics, tracking, or advertising.**

## What the extension accesses, and when

The extension only reads information from your current tab **when you click "Share Current Page"** in its toolbar popup. At that moment, using the `activeTab` and `scripting` permissions, it reads the page title, the page URL, and any text you have selected on the page. It accesses only the tab you are actively sharing, only at the moment you click, and it does not read any page in the background or on tabs you have not chosen to share.

## What is shared, and with whom

When you click "Share Current Page," the title, URL, and selected text are placed into a pre-filled "new topic" link for the Code Self Study forum (`https://forum.codeselfstudy.com`) that opens in a new tab. This is the extension's core, user-initiated function: you land in the forum's composer, where you can review and edit the draft before choosing to publish it.

That information is sent only to the Code Self Study forum, only as part of a share you initiated, and only to create your forum post. It is **not** sent to the extension's developer or to any other third party. The Code Self Study forum runs on Discourse and is governed by its own terms and privacy policy.

## Settings stored on your device

Your preferences — the appearance setting (System / Light / Dark) and the two sharing toggles — are stored locally in your browser using `localStorage`. These values never leave your device, are not transmitted anywhere, and can be cleared at any time through your browser's "clear browsing data" tools.

## Permissions

- **`activeTab`** — lets the extension read the current tab's title, URL, and selection, but only after you click the toolbar button.
- **`scripting`** — lets the extension run a single, one-off function in the current tab (on that same click) to read those fields.

The extension requests no host permissions, has no continuous or background access to your browsing, and loads no remote code.

## What the extension does NOT do

- It does not collect, sell, rent, or transfer your data to anyone.
- It does not use analytics, telemetry, cookies, or third-party trackers.
- It does not display advertising.
- It does not run remote or externally hosted code; all of its code ships inside the package.

## Data retention

The developer stores none of your data, so there is nothing to retain or delete on the developer's side. Locally stored settings remain on your device until you clear them.

## Children's privacy

The extension does not collect personal information from anyone, including children.

## Third-party sites

The popup includes quick links to the group's resources — the forum, the SF Bay meetups page, and the chat. Opening any of these navigates you to an external website that is governed by that site's own privacy policy.

## Changes to this policy

If this policy changes, the updated version will be published in this file with a new "Last updated" date.

## Contact

Questions about this policy or the extension can be raised via:

- GitHub issues: https://github.com/codeselfstudy/codeselfstudy_browser_extension/issues
- The forum: https://forum.codeselfstudy.com
