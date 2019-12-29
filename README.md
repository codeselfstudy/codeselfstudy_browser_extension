# Code Self Study Browser Extension

This browser extension lets people easily share links to the Code Self Study forum with a click. It also provides quick links to the group's resources.

More features coming soon.

## Contributing

Pull requests are welcome, but please check if a feature is needed before adding completely new functionality. We can discuss it in the Github issuess and/or forum.

### Coding Style

Please use prettier.js and follow the code style specified in the `.prettierrc` and `.editorconfig` files. There are editor plugins that with auto-format the code for you, or you can also run this command to format the code manually:

```text
$ npm run prettier:fix
```

### Development Server

Install the dependencies by running `npm install`. The commands to start the development server is:

```text
$ npm start
```

To test the extension in Chromium, type this:

```text
$ npm run serve:chromium
```

Please note that it doesn't run in Chrome or Chromium yet. If someone wants to work on that, feel free to make a pull request.

Here is more information:

- [`web-ext` documentation](https://github.com/mozilla/web-ext)
- [documentation for browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions).
