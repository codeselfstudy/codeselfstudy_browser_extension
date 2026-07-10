# Store assets

Listing assets for the Chrome Web Store and Firefox Add-ons (AMO). Screenshots are generated from the current extension UI (the real `browserAction/` popup and `options/` page rendered on a branded canvas). Version shown: 0.11.0.

Every PNG is 24-bit RGB with no alpha channel, as the Chrome Web Store requires.

## Screenshots

| File                | Shows                                                |
| ------------------- | ---------------------------------------------------- |
| `01-share-page.png` | Popup (light), "Share Current Page" + resource links |
| `02-dark-mode.png`  | Popup (dark), highlighting automatic theming         |
| `03-options.png`    | Options page (light), appearance + sharing settings  |

Provided in three sets:

- `chrome-1280x800/` — 1280×800, the size the Chrome Web Store recommends.
- `chrome-640x400/` — 640×400, the alternate size the Chrome Web Store accepts.
- `firefox-1280x800/` — 1280×800 for AMO (AMO enforces no fixed size; this looks good there).

**Where they go:** Chrome Web Store → item edit page → _Store listing_ → _Screenshots_ (upload the `chrome-1280x800/` set; up to 5 allowed, 3 supplied; use `chrome-640x400/` only if you prefer the smaller size, and don't mix sizes in one listing). Firefox AMO → _Manage Listing_ → _Screenshots_ (upload `firefox-1280x800/`).

## Store icon

| File                 | Size    | Notes                                                                       |
| -------------------- | ------- | --------------------------------------------------------------------------- |
| `store-icon-128.png` | 128×128 | Chrome Web Store store icon (required); also usable as the AMO listing icon |
| `store-icon.svg`     | vector  | Source; re-render any size from this                                        |

Recreated from the existing 64×64 `icons/icon.png` (lime brackets on black, with its subtle neon glow), redrawn as vector so it stays crisp at 128 and any other size.

## Promotional tiles (Chrome, optional)

| File                                | Size     | Chrome field       |
| ----------------------------------- | -------- | ------------------ |
| `chrome-promo-small-440x280.png`    | 440×280  | Small promo tile   |
| `chrome-promo-marquee-1400x560.png` | 1400×560 | Marquee promo tile |

Optional — only needed if the item is submitted for featuring. AMO has no equivalent.

## Note: two visual identities

The **store icon is green terminal-style** (`[ ]`), while the **popup/options UI is the newer blue "Slate" theme**. The promo tiles bridge them (green mark + blue popup on a dark background), but the listing will still mix the two. If you want everything unified, either recolor the icon to the blue mark used in the popup, or leave it — the green icon is the extension's established identity. Say which and it can be regenerated.

## Regenerating

These are produced by a small headless-Chrome harness that frames the live extension pages; it currently lives outside the repo. It can be committed under `scripts/` so the assets rebuild after any UI change.
