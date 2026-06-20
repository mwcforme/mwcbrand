#!/usr/bin/env node
/**
 * Visual regression for the Father's Day social carousel.
 *
 * Captures each of the 4 slides (#fd-slide-1..4) at native 1080x1350 via
 * Playwright, then either:
 *   --baseline  : writes captures to tests/visual/baselines/ (treat as truth)
 *   (default)   : writes captures to tests/visual/current/, diffs vs baselines
 *                 using pixelmatch, writes diff PNGs to tests/visual/diff/,
 *                 and exits non-zero on any failure.
 *
 * URL is configurable via VISUAL_URL env var. Defaults to the Lovable preview.
 *
 * Usage:
 *   node tests/visual/run.mjs --baseline
 *   node tests/visual/run.mjs
 *   VISUAL_URL=http://localhost:3000/social/fathers-day node tests/visual/run.mjs
 */
import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLIDES = [1, 2, 3, 4];
const WIDTH = 1080;
const HEIGHT = 1350;
// Allow up to 0.5% of pixels to differ before flagging — accounts for sub-pixel
// font rasterization between runs. Tune via THRESHOLD env var (0..1).
const FAIL_RATIO = Number(process.env.FAIL_RATIO ?? "0.005");
// Per-pixel color sensitivity (0 strict .. 1 loose). pixelmatch default 0.1.
const PIXEL_THRESHOLD = Number(process.env.PIXEL_THRESHOLD ?? "0.1");

const URL_DEFAULT =
  "https://id-preview--e34db6b0-0bf1-4c65-882f-eaad75911473.lovable.app/social/fathers-day";
const TARGET_URL = process.env.VISUAL_URL ?? URL_DEFAULT;

const isBaseline = process.argv.includes("--baseline");
const baselineDir = path.join(__dirname, "baselines");
const currentDir = path.join(__dirname, "current");
const diffDir = path.join(__dirname, "diff");

for (const d of [baselineDir, currentDir, diffDir]) {
  fs.mkdirSync(d, { recursive: true });
}

console.log(`→ Target: ${TARGET_URL}`);
console.log(`→ Mode:   ${isBaseline ? "WRITE BASELINES" : "DIFF vs baselines"}`);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 1400 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

await page.goto(TARGET_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
// Wait for first slide DOM + all slide images to decode.
await page.waitForSelector("#fd-slide-1", { timeout: 30_000 });
await page.evaluate(async () => {
  const imgs = Array.from(document.images);
  await Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise((res) => {
            img.addEventListener("load", res, { once: true });
            img.addEventListener("error", res, { once: true });
          }),
    ),
  );
  if (document.fonts?.ready) await document.fonts.ready;
});

const captureSlide = async (n) => {
  const sel = `#fd-slide-${n}`;
  // Neutralize the preview transform so the element renders at 1080x1350,
  // then scroll it into view and screenshot only that bounding box.
  await page.evaluate(
    ({ sel, w, h }) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error(`Missing ${sel}`);
      el.dataset.prevTransform = el.style.transform;
      el.style.transform = "none";
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.scrollIntoView({ block: "start" });
    },
    { sel, w: WIDTH, h: HEIGHT },
  );
  const handle = await page.$(sel);
  const buf = await handle.screenshot({ omitBackground: false });
  // Restore transform so the next slide measures cleanly.
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el && el.dataset.prevTransform != null) {
      el.style.transform = el.dataset.prevTransform;
      delete el.dataset.prevTransform;
    }
  }, sel);
  return buf;
};

const results = [];
for (const n of SLIDES) {
  const buf = await captureSlide(n);
  const outPath = path.join(
    isBaseline ? baselineDir : currentDir,
    `slide-${n}.png`,
  );
  fs.writeFileSync(outPath, buf);
  console.log(`  · slide-${n}.png  ${(buf.length / 1024).toFixed(1)} KB`);

  if (!isBaseline) {
    const baselinePath = path.join(baselineDir, `slide-${n}.png`);
    if (!fs.existsSync(baselinePath)) {
      results.push({ n, status: "missing-baseline" });
      continue;
    }
    const a = PNG.sync.read(fs.readFileSync(baselinePath));
    const b = PNG.sync.read(buf);
    if (a.width !== b.width || a.height !== b.height) {
      results.push({
        n,
        status: "size-mismatch",
        detail: `${a.width}x${a.height} vs ${b.width}x${b.height}`,
      });
      continue;
    }
    const diff = new PNG({ width: a.width, height: a.height });
    const mismatched = pixelmatch(
      a.data,
      b.data,
      diff.data,
      a.width,
      a.height,
      { threshold: PIXEL_THRESHOLD, includeAA: false },
    );
    const total = a.width * a.height;
    const ratio = mismatched / total;
    const diffPath = path.join(diffDir, `slide-${n}.diff.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    results.push({
      n,
      status: ratio <= FAIL_RATIO ? "pass" : "fail",
      mismatched,
      ratio,
      diffPath,
    });
  }
}

await browser.close();

if (isBaseline) {
  console.log(`\n✓ Baselines written to ${path.relative(process.cwd(), baselineDir)}`);
  process.exit(0);
}

console.log("\nResults:");
let failures = 0;
for (const r of results) {
  if (r.status === "pass") {
    console.log(
      `  ✓ slide-${r.n}  ${(r.ratio * 100).toFixed(3)}% diff (${r.mismatched}px)`,
    );
  } else if (r.status === "fail") {
    failures++;
    console.log(
      `  ✗ slide-${r.n}  ${(r.ratio * 100).toFixed(3)}% diff (${r.mismatched}px) > ${(FAIL_RATIO * 100).toFixed(3)}%  → ${path.relative(process.cwd(), r.diffPath)}`,
    );
  } else if (r.status === "missing-baseline") {
    failures++;
    console.log(`  ! slide-${r.n}  no baseline yet — run with --baseline`);
  } else if (r.status === "size-mismatch") {
    failures++;
    console.log(`  ✗ slide-${r.n}  size mismatch: ${r.detail}`);
  }
}
console.log(
  `\n${failures === 0 ? "✓ All slides match baselines" : `✗ ${failures} / ${results.length} slide(s) failed`}`,
);
process.exit(failures === 0 ? 0 : 1);
