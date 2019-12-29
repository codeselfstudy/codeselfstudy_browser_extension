# Code Self Study Browser Extension

This browser extension lets you easily share links to the Code Self Study forum with one click. More features coming soon.

## Contributing

Pull requests are welcome, but please check if a feature is needed before adding completely new functionality.

### Coding Style

Please use prettier.js and follow the code style specified in the `.prettierrc` and `.editorconfig` files. There are editor plugins that with auto-format the code for you.

### Development Server

You can install `web-ext`:

```text
$ npm i -g web-ext
```

To run the extension in development with live reload, type this:

```text
$ web-ext run
```

To test in Chromium, type this:

```text
$ web-ext run -t chromium
```

Please note that it doesn't run in Chrome or Chromium yet. If someone wants to work on that, feel free to make a pull request.

Here is more information:

- [`web-ext` documentation](https://github.com/mozilla/web-ext)
- [documentation for browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions).
