# List available recipes
default:
  @just --list

# Remove build artifacts
clean:
  ./scripts/clean.sh

# Stage per-browser build dirs (dist/chrome, dist/firefox)
stage:
  bun scripts/build.ts all

# Build both browser packages into web-ext-artifacts/
build: build_chrome build_firefox

# Build the Chrome (MV3) package -> web-ext-artifacts/chrome
build_chrome:
  bun scripts/build.ts chrome
  bun web-ext build --source-dir dist/chrome --artifacts-dir web-ext-artifacts/chrome --overwrite-dest -i "tags"

# Build the Firefox (MV3) package -> web-ext-artifacts/firefox
build_firefox:
  bun scripts/build.ts firefox
  bun web-ext build --source-dir dist/firefox --artifacts-dir web-ext-artifacts/firefox --overwrite-dest -i "tags"

# Run in Firefox against the canonical root manifest
dev_firefox:
  bun web-ext run -i "tags"

# Run in Chromium against the canonical root manifest
dev_chrome:
  bun web-ext run -t chromium -i "tags"

# Lint the Firefox build (addons-linter)
lint: stage
  bun web-ext lint --source-dir dist/firefox

# Run the test suite
test:
  bun test
