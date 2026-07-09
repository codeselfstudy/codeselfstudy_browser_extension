import { afterAll, describe, expect, test } from "bun:test";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseTarget, run } from "./build.ts";

const srcRoot = process.cwd();
const tmpDirs: string[] = [];

async function freshOut(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "css-build-"));
  tmpDirs.push(dir);
  return dir;
}

afterAll(async () => {
  for (const dir of tmpDirs) await rm(dir, { recursive: true, force: true });
});

describe("parseTarget", () => {
  test("defaults to both browsers", () => {
    expect(parseTarget(["bun", "build.ts"])).toEqual(["chrome", "firefox"]);
  });
  test("'all' -> both browsers", () => {
    expect(parseTarget(["bun", "build.ts", "all"])).toEqual([
      "chrome",
      "firefox",
    ]);
  });
  test("single target", () => {
    expect(parseTarget(["bun", "build.ts", "chrome"])).toEqual(["chrome"]);
  });
  test("unknown target throws", () => {
    expect(() => parseTarget(["bun", "build.ts", "safari"])).toThrow();
  });
});

describe("run / stage", () => {
  test("stages cleaned per-browser manifests + assets", async () => {
    const out = await freshOut();
    const dirs = await run(["bun", "build.ts", "all"], srcRoot, out);
    expect(dirs.length).toBe(2);

    const chrome = JSON.parse(
      await readFile(join(out, "chrome", "manifest.json"), "utf8")
    );
    expect(chrome.manifest_version).toBe(3);
    expect(chrome.background.service_worker).toBe("background_script.js");
    expect(chrome.background.scripts).toBeUndefined();
    expect(chrome.browser_specific_settings).toBeUndefined();

    const firefox = JSON.parse(
      await readFile(join(out, "firefox", "manifest.json"), "utf8")
    );
    expect(firefox.background.scripts[0]).toContain("browser-polyfill");
    expect(firefox.background.service_worker).toBeUndefined();
    expect(firefox.browser_specific_settings.gecko.id).toBeTruthy();

    for (const rel of [
      "content_script.js",
      "browserAction/index.html",
      "vendor/browser-polyfill.js",
      "icons/icon.png",
      "fonts/Inconsolata-Regular.ttf",
    ]) {
      expect((await stat(join(out, "chrome", rel))).isFile()).toBe(true);
    }
  });
});
