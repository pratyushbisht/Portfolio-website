// One-time prep for the header mascot.
// Turns white-on-black line art into white lines on real transparency, crops all
// frames to one shared bounding box (so nothing jumps when frames swap), and
// downscales to about 520px tall.
//
// It also writes a head-and-shoulders "bust" set for the header itself: the top
// ~45% of the character (hair to chest, including the raised hand), cropped to one
// shared box, rendered at 256px tall and with the lines thickened so they still
// read at ~40px display height.
//
// Usage: node scripts/prep-mascot.mjs [--dilate=3.2]
// Input:  assets/mascot-src/{standing,wave-a,wave-b}.jpg
// Output: public/mascot/{standing,wave-a,wave-b}.png        (full body, unused in UI)
//         public/mascot/bust-{standing,wave-a,wave-b}.png
//         lib/mascot-meta.json                               (bust size + head centre)

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "assets", "mascot-src");
const OUT = path.join(root, "public", "mascot");
const FRAMES = ["standing", "wave-a", "wave-b"];

const LOW = 40; // luminance at or below: fully transparent (kills JPEG noise on black)
const HIGH = 200; // luminance at or above: fully opaque
const PAD = 16;
const TARGET_HEIGHT = 520;
/** Alpha below this is ignored when measuring the bounding box. */
const BBOX_ALPHA = 24;

const levels = (lum) => {
  if (lum <= LOW) return 0;
  if (lum >= HIGH) return 255;
  return Math.round(((lum - LOW) / (HIGH - LOW)) * 255);
};

async function toWhiteOnAlpha(file) {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const rgba = Buffer.alloc(width * height * 4);
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const a = levels(data[i * info.channels]);
      rgba[i * 4] = 255;
      rgba[i * 4 + 1] = 255;
      rgba[i * 4 + 2] = 255;
      rgba[i * 4 + 3] = a;
      if (a > BBOX_ALPHA) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { rgba, width, height, box: { minX, minY, maxX, maxY } };
}

const frames = await Promise.all(
  FRAMES.map(async (name) => ({ name, ...(await toWhiteOnAlpha(path.join(SRC, `${name}.jpg`))) })),
);

const { width, height } = frames[0];
if (frames.some((f) => f.width !== width || f.height !== height)) {
  throw new Error("All mascot frames must share the same canvas size.");
}

// Union of every frame's artwork, plus padding, clamped to the canvas.
const left = Math.max(0, Math.min(...frames.map((f) => f.box.minX)) - PAD);
const top = Math.max(0, Math.min(...frames.map((f) => f.box.minY)) - PAD);
const right = Math.min(width - 1, Math.max(...frames.map((f) => f.box.maxX)) + PAD);
const bottom = Math.min(height - 1, Math.max(...frames.map((f) => f.box.maxY)) + PAD);
const crop = { left, top, width: right - left + 1, height: bottom - top + 1 };

for (const f of frames) {
  const out = path.join(OUT, `${f.name}.png`);
  const info = await sharp(f.rgba, { raw: { width, height, channels: 4 } })
    .extract(crop)
    .resize({ height: TARGET_HEIGHT })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  console.log(`${f.name}.png  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}
console.log(`shared crop: ${JSON.stringify(crop)} from ${width}x${height}`);

/* ---------------------------------------------------------------- */
/* Bust set for the header                                           */
/* ---------------------------------------------------------------- */

const BUST_BAND = 0.45; // top share of the character's height: hair down to chest
const HEAD_BAND = 0.25; // top share used to find the head's horizontal centre
const BUST_HEIGHT = 256; // render size (about 6x the 40px display height)
const BUST_PAD = 12; // padding, in output pixels
const dilateArg = process.argv.find((a) => a.startsWith("--dilate="));
/** Dilation radius in output pixels. Tuned by eye against the header face logo. */
// 3.2 gives about 1.6px lines at the 40px header size (2.5 was a touch faint).
const DILATE = dilateArg ? Number(dilateArg.split("=")[1]) : 3.2;

const charTop = Math.min(...frames.map((f) => f.box.minY));
const charBottom = Math.max(...frames.map((f) => f.box.maxY));
const charH = charBottom - charTop + 1;
const bandBottom = Math.round(charTop + charH * BUST_BAND);

/** Horizontal extent of artwork in rows [y0, y1) of one frame. */
function columnExtent(f, y0, y1) {
  let minX = f.width, maxX = -1;
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < f.width; x++) {
      if (f.rgba[(y * f.width + x) * 4 + 3] > BBOX_ALPHA) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  return { minX, maxX };
}

// Union across the three frames within the band (the raised hand sets the right edge).
const bandExtents = frames.map((f) => columnExtent(f, charTop, bandBottom));
const srcPerOut = (bandBottom - charTop) / BUST_HEIGHT; // approximate, refined below
const padSrc = Math.round(BUST_PAD * srcPerOut);
const bLeft = Math.max(0, Math.min(...bandExtents.map((e) => e.minX)) - padSrc);
const bRight = Math.min(width - 1, Math.max(...bandExtents.map((e) => e.maxX)) + padSrc);
const bTop = Math.max(0, charTop - padSrc);
const bBottom = Math.min(height - 1, bandBottom);
const bustCrop = { left: bLeft, top: bTop, width: bRight - bLeft + 1, height: bBottom - bTop + 1 };

// Head centre (standing frame), as a fraction of the bust width.
const standing = frames.find((f) => f.name === "standing");
const head = columnExtent(standing, charTop, Math.round(charTop + charH * HEAD_BAND));
const headCenterX = ((head.minX + head.maxX) / 2 - bLeft) / bustCrop.width;

/** Circular max filter on the alpha channel: thickens strokes by `r` px each side. */
function dilateAlpha(rgba, w, h, r) {
  if (r <= 0) return rgba;
  const offsets = [];
  const R = Math.ceil(r);
  for (let dy = -R; dy <= R; dy++) {
    for (let dx = -R; dx <= R; dx++) {
      const d = Math.hypot(dx, dy);
      // Soft edge for fractional radii so strokes stay anti-aliased.
      const weight = d <= r - 0.5 ? 1 : d <= r + 0.5 ? r + 0.5 - d : 0;
      if (weight > 0) offsets.push([dx, dy, weight]);
    }
  }
  const out = Buffer.from(rgba);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let best = 0;
      for (const [dx, dy, wgt] of offsets) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const a = rgba[(ny * w + nx) * 4 + 3] * wgt;
        if (a > best) best = a;
      }
      out[(y * w + x) * 4 + 3] = Math.round(best);
    }
  }
  return out;
}

let bustW = 0;
for (const f of frames) {
  const { data, info } = await sharp(f.rgba, { raw: { width, height, channels: 4 } })
    .extract(bustCrop)
    .resize({ height: BUST_HEIGHT })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const thick = dilateAlpha(data, info.width, info.height, DILATE);
  const out = path.join(OUT, `bust-${f.name}.png`);
  const saved = await sharp(thick, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  bustW = info.width;
  console.log(`bust-${f.name}.png  ${saved.width}x${saved.height}  ${(saved.size / 1024).toFixed(1)} KB`);
}

const meta = {
  bust: { width: bustW, height: BUST_HEIGHT, headCenterX: Number(headCenterX.toFixed(4)) },
  dilate: DILATE,
};
await writeFile(path.join(root, "lib", "mascot-meta.json"), JSON.stringify(meta, null, 2) + "\n");
console.log(`bust crop: ${JSON.stringify(bustCrop)}, meta: ${JSON.stringify(meta)}`);
