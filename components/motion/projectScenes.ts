import type { ProjectScene } from "@/lib/projects";

/**
 * Abstract hover backdrops, one per project. Each scene is drawn on a canvas
 * covering the whole row; `elapsed` is seconds since hover began.
 * All strokes/fills stay in the 8–15% alpha range of --accent.
 */
/** Where the scene's shapes gather: the text half of a row, or the centre of a hero. */
export type SceneRegion = "left" | "right" | "center";

export type Scene = {
  layout(w: number, h: number, region: SceneRegion): void;
  reset(): void;
  draw(ctx: CanvasRenderingContext2D, elapsed: number, dt: number): void;
  /**
   * Seconds after which the drawing no longer changes, so a play-once (mount)
   * backdrop can draw one last frame and stop. Undefined = keeps a gentle idle.
   */
  settleAt?: number;
};

const A = (alpha: number) => `rgba(110,168,254,${alpha})`;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Horizontal band the scene works in (a row's text half, or the middle of a hero). */
function textRegion(w: number, region: SceneRegion) {
  if (region === "center") return { x: w * 0.15, w: w * 0.7 };
  return region === "right" ? { x: w * 0.5, w: w * 0.5 } : { x: 0, w: w * 0.5 };
}

/* 1. Uline — scattered fragments snap into one left-aligned list. */
function uline(): Scene {
  const N = 20;
  let items: { sx: number; sy: number; sr: number; tx: number; ty: number; w: number }[] = [];
  return {
    settleAt: 0.25 + (N - 1) * 0.025 + 0.9,
    layout(w, h, side) {
      const reg = textRegion(w, side);
      const rowH = Math.min(14, (h * 0.86) / N);
      const top = (h - rowH * N) / 2;
      const colX = reg.x + reg.w * 0.66;
      items = Array.from({ length: N }, (_, i) => ({
        sx: reg.x + Math.random() * reg.w * 0.9,
        sy: h * 0.06 + Math.random() * h * 0.88,
        sr: (Math.random() - 0.5) * 1.4,
        tx: colX,
        ty: top + i * rowH,
        w: 28 + ((i * 37) % 9) * 10,
      }));
    },
    reset() {},
    draw(ctx, elapsed) {
      ctx.fillStyle = A(0.13);
      items.forEach((it, i) => {
        const q = easeInOut(clamp01((elapsed - 0.25 - i * 0.025) / 0.9));
        const x = lerp(it.sx, it.tx, q);
        const y = lerp(it.sy, it.ty, q);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(it.sr * (1 - q));
        roundRect(ctx, 0, 0, it.w, 6, 2);
        ctx.fill();
        ctx.restore();
      });
    },
  };
}

/*
 * 2. Curl Commander — one sine wave at the 2-0-2-0 tempo (one cycle per 4s).
 * Eases up to full amplitude, holds for one full rep, then relaxes into a slow,
 * low-amplitude idle (8s cycle, 30% height) rather than stopping dead.
 */
function curl(): Scene {
  let W = 0;
  let H = 0;
  let phase = 0;
  const RISE = 1.2;
  const HOLD_UNTIL = RISE + 4;
  const RELAX = 1.3;
  return {
    layout(w, h) {
      W = w;
      H = h;
    },
    reset() {
      phase = 0;
    },
    draw(ctx, elapsed, dt) {
      const relax = easeInOut(clamp01((elapsed - HOLD_UNTIL) / RELAX));
      const amp = easeInOut(clamp01(elapsed / RISE)) * lerp(1, 0.3, relax) * H * 0.22;
      const period = lerp(4, 8, relax);
      phase += (Math.PI * 2 * dt) / period;
      const k = (Math.PI * 2) / (W * 0.5);
      ctx.strokeStyle = A(0.15);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const y = H / 2 + amp * Math.sin(x * k - phase);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    },
  };
}

/* 3. Plan-It — chat bubbles drift up a loose thread, then settle into one aligned stack. */
function planit(): Scene {
  const N = 9;
  const BH = 16;
  const GAP = 10;
  let H = 0;
  let colX = 0;
  let bubbles: { y0: number; jx: number; w: number }[] = [];
  let drift = 0;
  return {
    settleAt: 0.7 + 1.4,
    layout(w, h, side) {
      H = h;
      const reg = textRegion(w, side);
      colX = reg.x + reg.w * 0.62;
      bubbles = Array.from({ length: N }, (_, i) => ({
        y0: ((i + 0.5) / N) * (h + 40) - 20 + (Math.random() - 0.5) * 10,
        jx: (i % 2 ? 1 : -1) * (14 + Math.random() * 36),
        w: 46 + Math.random() * 70,
      }));
    },
    reset() {
      drift = 0;
    },
    draw(ctx, elapsed, dt) {
      const q = easeInOut(clamp01((elapsed - 0.7) / 1.4));
      drift += 22 * dt * (1 - q);
      const span = H + 40;
      const stackTop = (H - (N * BH + (N - 1) * GAP)) / 2;
      ctx.fillStyle = A(0.12);
      bubbles.forEach((b, i) => {
        const loose = ((((b.y0 - drift + 20) % span) + span) % span) - 20;
        const y = lerp(loose, stackTop + i * (BH + GAP), q);
        const x = colX + b.jx * (1 - q);
        roundRect(ctx, x, y, lerp(b.w, 96, q), BH, 8);
        ctx.fill();
      });
    },
  };
}

/*
 * 4. Starship Weather Alerts: a signal going out across campus. Three ripples
 * expand once from one point (staggered 250ms, 1.6s each, fading out) while a
 * dotted route draws in over 1.4s, then everything settles to a very faint
 * static state. Plays once; never loops.
 */
function starship(): Scene {
  const RINGS = 3;
  const STAGGER = 0.25;
  const RING_LIFE = 1.6;
  const DRAW = 1.4;
  const SETTLE_FROM = (RINGS - 1) * STAGGER + RING_LIFE; // last ripple gone
  const SETTLE_FOR = 0.4;
  const ROUTE_STEPS = 90;
  let W = 0;
  let H = 0;
  let ox = 0;
  let oy = 0;
  const bez = (t: number, a: number, b: number, c: number, d: number) => {
    const u = 1 - t;
    return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
  };
  return {
    settleAt: SETTLE_FROM + SETTLE_FOR,
    layout(w, h, region) {
      W = w;
      H = h;
      const reg = textRegion(w, region);
      // Hero: near the title. Home row: inside the text half.
      ox = reg.x + reg.w * (region === "center" ? 0.5 : 0.72);
      oy = h * 0.5;
    },
    reset() {},
    draw(ctx, elapsed) {
      const settle = easeInOut(clamp01((elapsed - SETTLE_FROM) / SETTLE_FOR));

      // Ripples: each expands once and fades out.
      const maxR = Math.min(W * 0.3, H * 0.9);
      ctx.lineWidth = 1;
      for (let i = 0; i < RINGS; i++) {
        const age = elapsed - i * STAGGER;
        if (age < 0 || age > RING_LIFE) continue;
        const f = age / RING_LIFE;
        const grow = 1 - Math.pow(1 - f, 3); // ease out
        ctx.strokeStyle = A(+(0.15 * (1 - f)).toFixed(3));
        ctx.beginPath();
        ctx.arc(ox, oy, 4 + grow * maxR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Dotted route across the frame, passing near the origin, drawn in left to right.
      const p = [0, H * 0.78, W * 0.3, H * 0.95, W * 0.6, H * 0.1, W, H * 0.3];
      const drawn = easeInOut(clamp01(elapsed / DRAW));
      if (drawn > 0) {
        ctx.strokeStyle = A(+lerp(0.14, 0.07, settle).toFixed(3));
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.setLineDash([1, 7]);
        ctx.beginPath();
        const last = Math.round(ROUTE_STEPS * drawn);
        for (let k = 0; k <= last; k++) {
          const t = k / ROUTE_STEPS;
          const x = bez(t, p[0], p[2], p[4], p[6]);
          const y = bez(t, p[1], p[3], p[5], p[7]);
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineCap = "butt";
      }

      // Origin point stays as a faint marker once settled.
      ctx.fillStyle = A(+lerp(0.15, 0.08, settle).toFixed(3));
      ctx.beginPath();
      ctx.arc(ox, oy, 3, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

/*
 * 5. FaceLock: a faint kiosk screen with a few content lines. A soft face dot
 * slides in to sit in front of it, then slides away; as it leaves, a lock fades
 * over the screen and the lines dim to about 15%. Settles at about 2.2s, no loop.
 */
function facelock(): Scene {
  const FADE_IN = 0.35;
  const FACE_IN: [number, number] = [0.1, 0.75];
  const FACE_OUT: [number, number] = [1.0, 1.6];
  const LOCK: [number, number] = [1.3, 2.0];
  const LINES = [0.72, 0.56, 0.64, 0.42]; // relative widths of the content lines
  let cx = 0;
  let cy = 0;
  let sw = 0;
  let sh = 0;
  let enterFrom = 0;
  const phase = (t: number, [a, b]: [number, number]) => clamp01((t - a) / (b - a));
  return {
    settleAt: LOCK[1] + 0.2,
    layout(w, h, region) {
      const reg = textRegion(w, region);
      cx = reg.x + reg.w * (region === "center" ? 0.5 : 0.62);
      cy = h * 0.5;
      sh = Math.min(h * 0.7, 230);
      sw = Math.min(sh / 1.3, reg.w * 0.4);
      sh = sw * 1.3;
      enterFrom = cx - Math.max(reg.w * 0.55, sw * 2); // the face arrives from the left
    },
    reset() {},
    draw(ctx, t) {
      const shown = easeInOut(phase(t, [0, FADE_IN]));
      const lock = easeInOut(phase(t, LOCK));
      const x0 = cx - sw / 2;
      const y0 = cy - sh / 2;

      // Screen outline.
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = A(+(0.12 * shown).toFixed(3));
      roundRect(ctx, x0, y0, sw, sh, Math.min(14, sw * 0.08));
      ctx.stroke();

      // Content lines, dimming to ~15% once locked.
      ctx.fillStyle = A(+(0.14 * shown * lerp(1, 0.15, lock)).toFixed(3));
      LINES.forEach((f, i) => {
        roundRect(ctx, x0 + sw * 0.14, y0 + sh * (0.22 + i * 0.14), sw * 0.72 * f, Math.max(4, sh * 0.035), 3);
        ctx.fill();
      });

      // Face dot: slides in, pauses in front of the screen, slides back out.
      const inP = 1 - Math.pow(1 - phase(t, FACE_IN), 3); // ease out
      const outP = Math.pow(phase(t, FACE_OUT), 2); // ease in
      const faceVisible = t < FACE_OUT[1];
      if (faceVisible && inP > 0) {
        const r = sw * 0.2;
        const fx = lerp(lerp(enterFrom, cx, inP), enterFrom, outP);
        const fy = cy + sh * 0.08;
        const alpha = 0.15 * Math.min(inP * 2, 1) * (1 - outP);
        ctx.fillStyle = A(+(alpha * 0.6).toFixed(3));
        ctx.strokeStyle = A(+alpha.toFixed(3));
        ctx.beginPath();
        ctx.arc(fx, fy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Lock: shackle + body, fading in over the screen.
      if (lock > 0) {
        const bw = sw * 0.4;
        const bh = bw * 0.8;
        const by = cy - bh * 0.1;
        ctx.strokeStyle = A(+(0.16 * lock).toFixed(3));
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, by, bw * 0.3, Math.PI, 0);
        ctx.lineTo(cx + bw * 0.3, by + bh * 0.1);
        ctx.moveTo(cx - bw * 0.3, by);
        ctx.lineTo(cx - bw * 0.3, by + bh * 0.1);
        ctx.stroke();
        roundRect(ctx, cx - bw / 2, by + bh * 0.1, bw, bh, 6);
        ctx.stroke();
        ctx.fillStyle = A(+(0.16 * lock).toFixed(3));
        ctx.beginPath();
        ctx.arc(cx, by + bh * 0.5, Math.max(2, bw * 0.06), 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

export function createScene(kind: ProjectScene): Scene {
  switch (kind) {
    case "uline":
      return uline();
    case "curl":
      return curl();
    case "planit":
      return planit();
    case "starship":
      return starship();
    case "facelock":
      return facelock();
  }
}
