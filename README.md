# Code Self Study Browser Extension

This browser extension lets people easily share links to the Code Self Study forum with a click. It also provides quick links to the group's resources.

More features coming soon.

## Contributing

Pull requests are welcome, but please check if a feature is needed before adding completely new functionality. We can discuss it in the Github issuess and/or forum.

### Coding Style

Please use prettier.js and follow the code style specified in the `.prettierrc` and `.editorconfig` files. There are editor plugins that with auto-format the code for you, or you can run this command to format the code manually:

```text
$ npm run prettier:fix
```

### Development Server

Install the dependencies by running `npm install`. The command to start the development server is:

```text
$ npm start
```

To test the extension in Chromium, type this:

```text
$ npm run serve:chromium
```

Here is more information:

- [`web-ext` documentation](https://github.com/mozilla/web-ext)
- [documentation for browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions).
- [build a cross-browser extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension) (the polyfill is in the `vendor` directory)
