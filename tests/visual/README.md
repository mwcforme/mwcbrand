# Visual regression — Father's Day carousel

Captures each slide (`#fd-slide-1..4`) at native **1080×1350** in headless
Chromium, then pixel-diffs the result against committed baselines.

## Commands

```bash
# Capture baselines (run this once after a known-good build)
node tests/visual/run.mjs --baseline

# Diff current render vs baselines (CI / pre-publish check)
node tests/visual/run.mjs

# Point at a different environment
VISUAL_URL=http://localhost:3000/social/fathers-day node tests/visual/run.mjs
```

Or via npm scripts:

```bash
bun run test:visual:baseline
bun run test:visual
```

## Layout

```
tests/visual/
  run.mjs              # Playwright capture + pixelmatch diff
  baselines/           # committed truth (slide-1.png … slide-4.png)
  current/             # latest run output (gitignored)
  diff/                # red-highlight diff PNGs on failure (gitignored)
```

## Tuning

| Env var           | Default | Meaning                                        |
| ----------------- | ------- | ---------------------------------------------- |
| `VISUAL_URL`      | preview | Full URL to `/social/fathers-day`              |
| `FAIL_RATIO`      | `0.005` | Max share of pixels allowed to differ (0..1)   |
| `PIXEL_THRESHOLD` | `0.1`   | Per-pixel color tolerance (pixelmatch, 0..1)   |

A small slack on `FAIL_RATIO` (0.5%) absorbs sub-pixel font rasterization
drift between runs. Tighten to `0` for exact-match enforcement.

## Updating baselines

When an intentional design change lands, re-run with `--baseline` and commit
the new PNGs in `tests/visual/baselines/`. The diff PNGs in `current/` and
`diff/` are gitignored — only baselines are version-controlled.
