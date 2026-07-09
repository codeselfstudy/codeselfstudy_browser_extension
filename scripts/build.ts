#!/usr/bin/env bun
import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import {
  type Manifest,
  toChromeManifest,
  toFirefoxManifest,
} from "./manifest.ts";

// Runtime files that make up the shipped extension. Anything not listed here
// (screenshots/, scripts/, package.json, README, ...) is excluded from the package.
const ASSET_FILES = ["background_script.js", "favicon.ico"];
const ASSET_DIRS = ["icons", "fonts", "vendor", "browserAction", "options"];

export type Target = "chrome" | "firefox";

export function parseTarget(argv: string[]): Target[] {
  const arg = (argv[2] ?? "all").toLowerCase();
  if (arg === "all") return ["chrome", "firefox"];
  if (arg === "chrome" || arg === "firefox") return [arg];
  throw new Error(`Unknown target "${arg}" (expected chrome | firefox | all)`);
}

export function manifestFor(target: Target, base: Manifest): Manifest {
  return target === "chrome" ? toChromeManifest(base) : toFirefoxManifest(base);
}

/** Stage one browser's build into `${outRoot}/${target}`. */
export async function stage(opts: {
  srcRoot: string;
  outRoot: string;
  target: Target;
  base: Manifest;
}): Promise<string> {
  const destDir = join(opts.outRoot, opts.target);
  await rm(destDir, { recursive: true, force: true });
  await mkdir(destDir, { recursive: true });

  await Bun.write(
    join(destDir, "manifest.json"),
    JSON.stringify(manifestFor(opts.target, opts.base), null, 2) + "\n"
  );

  for (const file of ASSET_FILES) {
    await cp(join(opts.srcRoot, file), join(destDir, file));
  }
  for (const dir of ASSET_DIRS) {
    await cp(join(opts.srcRoot, dir), join(destDir, dir), { recursive: true });
  }
  return destDir;
}

/** Read the base manifest and stage every requested target. Returns staged dirs. */
export async function run(
  argv: string[],
  srcRoot: string,
  outRoot: string
): Promise<string[]> {
  const base = (await Bun.file(
    join(srcRoot, "manifest.json")
  ).json()) as Manifest;
  const staged: string[] = [];
  for (const target of parseTarget(argv)) {
    const dir = await stage({ srcRoot, outRoot, target, base });
    console.log(`staged ${target} -> ${dir}`);
    staged.push(dir);
  }
  return staged;
}

if (import.meta.main) {
  await run(process.argv, process.cwd(), join(process.cwd(), "dist"));
}
