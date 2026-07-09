# Code Self Study Browser Extension

This browser extension lets people easily share links to the Code Self Study forum with a click. It also provides quick links to the group's resources.

More features coming soon.

## Install

- [Chrome version](https://chrome.google.com/webstore/detail/code-self-study/mejalgpjkfdfpemlljeomjdefolbikch?hl=en)
- [Firefox version](https://addons.mozilla.org/en-US/firefox/addon/codeselfstudy/)

## Contributing

Pull requests are welcome, but please check if a feature is needed before adding completely new functionality. We can discuss it in the Github issuess and/or forum.

### Development Server

Install the dependencies by running `bun install`. The command to start the development server is:

```text
$ bun start
```

To test the extension in Chromium, type this:

```text
$ bun run serve:chromium
```

### Building

The extension targets Manifest V3 and builds a separate package for each browser from the single root `manifest.json`. To build both, run:

```text
$ just build
```

This stages `dist/chrome/` and `dist/firefox/` and writes the packaged zips to `web-ext-artifacts/chrome/` and `web-ext-artifacts/firefox/`. Other useful recipes: `just dev_firefox` / `just dev_chrome` (live-reloading dev browser), `just lint` (Firefox add-on linter), and `just test` (test suite).

Here is more information:

- [`web-ext` documentation](https://github.com/mozilla/web-ext)
- [documentation for browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions).
- [build a cross-browser extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension) (the polyfill is in the `vendor` directory)

### Versions

At the moment, the version information is in `package.json` and `manifest.json`.
