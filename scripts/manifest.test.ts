import { describe, expect, test } from "bun:test";
import base from "../manifest.json" with { type: "json" };
import {
  type Manifest,
  toChromeManifest,
  toFirefoxManifest,
} from "./manifest.ts";

const HOST_PATTERN = "*://*.codeselfstudy.com/*";

describe("toChromeManifest", () => {
  test("produces a valid MV3 Chrome manifest", () => {
    const m = toChromeManifest(base as Manifest);
    expect(m.manifest_version).toBe(3);
    expect(m.action).toBeDefined();
    expect(m.browser_action).toBeUndefined();
    expect(m.background?.service_worker).toBe("background_script.js");
    expect(m.background?.scripts).toBeUndefined();
    expect(m.browser_specific_settings).toBeUndefined();
    expect(m.host_permissions).toContain(HOST_PATTERN);
    expect(m.permissions).toContain("activeTab");
    expect(m.permissions).not.toContain(HOST_PATTERN);
  });

  test("does not mutate the input", () => {
    const input = structuredClone(base) as Manifest;
    toChromeManifest(input);
    expect(input.background?.scripts).toBeDefined();
    expect(input.browser_specific_settings).toBeDefined();
  });
});

describe("toFirefoxManifest", () => {
  test("produces a valid MV3 Firefox manifest", () => {
    const m = toFirefoxManifest(base as Manifest);
    expect(m.manifest_version).toBe(3);
    expect(m.action).toBeDefined();
    expect(m.browser_action).toBeUndefined();
    expect(m.background?.scripts?.[0]).toContain("browser-polyfill");
    expect(m.background?.scripts).toContain("background_script.js");
    expect(m.background?.service_worker).toBeUndefined();
    const gecko = (
      m.browser_specific_settings as {
        gecko?: {
          id?: string;
          data_collection_permissions?: { required?: string[] };
        };
      }
    )?.gecko;
    expect(gecko?.id).toMatch(/^\{[0-9a-f-]+\}$/);
    expect(gecko?.data_collection_permissions?.required).toContain("none");
  });

  test("does not mutate the input", () => {
    const input = structuredClone(base) as Manifest;
    toFirefoxManifest(input);
    expect(input.background?.service_worker).toBeDefined();
  });
});

describe("canonical root manifest", () => {
  const m = base as Manifest;

  test("carries both background keys for dev", () => {
    expect(m.background?.service_worker).toBeDefined();
    expect(m.background?.scripts).toBeDefined();
  });

  test("splits host pattern into host_permissions", () => {
    expect(m.permissions).toEqual(["activeTab"]);
    expect(m.host_permissions).toEqual([HOST_PATTERN]);
  });

  test("uses the MV3 action key", () => {
    expect(m.action).toBeDefined();
    expect(m.browser_action).toBeUndefined();
  });
});
