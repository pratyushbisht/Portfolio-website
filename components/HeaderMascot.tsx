"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import meta from "@/lib/mascot-meta.json";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Header logo with a greeting: on hover (with intent), keyboard focus, or a one-time
 * touch auto-greeting, the face logo is replaced in place by a head-and-shoulders
 * "mini me" that waves while the name fades out and a "Hi!" bubble appears.
 * Everything is absolutely positioned inside the existing logo slot, so the header
 * never changes size. Frames come from `npm run prep:mascot` (bust-*.png).
 */

const FRAMES = {
  standing: "/mascot/bust-standing.png",
  a: "/mascot/bust-wave-a.png",
  b: "/mascot/bust-wave-b.png",
} as const;
type Frame = keyof typeof FRAMES;
const { width: IMG_W, height: IMG_H, headCenterX: HEAD_X } = meta.bust;
const ASPECT = IMG_W / IMG_H;

const FADE = 0.15;
const HOVER_IN_DELAY = 120;
const HOVER_OUT_DELAY = 100;
const BUBBLE_AT = 200;
const BUBBLE_OUT = 100; // bubble leaves first, then the bust crossfades back
const WAVE_AT = 300;
const WAVE_STEP = 260;
const WAVE_SWAPS = 4; // a, b, a, b = 2 full waves
const HOLD = 300; // brief pause on the standing pose before the logo and name return
/** The greeting always ends on its own, even while the pointer is still on the logo. */
const SHOW_FOR = WAVE_AT + WAVE_SWAPS * WAVE_STEP + HOLD;
/** Reduced motion has no wave, so just show the pose and bubble for a moment. */
const SHOW_FOR_REDUCED = 1400;
const TOUCH_DELAY = 1200;
const SESSION_KEY = "mascot-greeted";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function useMascot() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [frame, setFrame] = useState<Frame>("standing");
  const timers = useRef<number[]>([]);
  const intent = useRef<number | null>(null);
  // Read through a ref so delayed callbacks see the current setting, not the
  // value from the first (pre-hydration) render.
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const clearAll = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (intent.current !== null) window.clearTimeout(intent.current);
    intent.current = null;
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const hide = useCallback(() => {
    clearAll();
    setBubble(false);
    later(() => {
      setOpen(false);
      setFrame("standing");
    }, BUBBLE_OUT);
  }, [clearAll, later]);

  const show = useCallback(
    () => {
      clearAll();
      setFrame("standing");
      setOpen(true);
      later(() => setBubble(true), BUBBLE_AT);
      if (!reducedRef.current) {
        for (let i = 0; i < WAVE_SWAPS; i++) {
          later(() => setFrame(i % 2 === 0 ? "a" : "b"), WAVE_AT + i * WAVE_STEP);
        }
        later(() => setFrame("standing"), WAVE_AT + WAVE_SWAPS * WAVE_STEP);
      }
      // Restore the face logo and name. Leaving and re-entering plays it again.
      later(hide, reducedRef.current ? SHOW_FOR_REDUCED : SHOW_FOR);
    },
    [clearAll, later, hide],
  );

  // Clear every timer on unmount so nothing fires into a dead component.
  useEffect(() => clearAll, [clearAll]);

  // Touch devices: greet once per browser session, shortly after the first load.
  // The header persists across route changes, so this runs once per page load.
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
      if (!seen) sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      seen = true; // no storage: skip rather than risk greeting on every page
    }
    if (seen) return;
    const t = window.setTimeout(() => show(), TOUCH_DELAY);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlers = {
    onMouseEnter: () => {
      if (!window.matchMedia(FINE_POINTER).matches) return; // taps fire mouseenter too
      clearAll();
      intent.current = window.setTimeout(() => show(), HOVER_IN_DELAY);
    },
    onMouseLeave: () => {
      if (!window.matchMedia(FINE_POINTER).matches) return;
      if (intent.current !== null) window.clearTimeout(intent.current);
      intent.current = window.setTimeout(hide, HOVER_OUT_DELAY);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      if (e.currentTarget.matches(":focus-visible")) show();
    },
    onBlur: () => hide(),
  };

  return { open, bubble, frame, reduced, handlers };
}

/** The header's left cluster: face logo + "Pratyush", linking home, with the greeting. */
export function MascotWordmark() {
  const { open, bubble, frame, reduced, handlers } = useMascot();
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [bubbleFits, setBubbleFits] = useState(true);

  // Warm the cache so the first wave never waits on decoding.
  preload(FRAMES.standing, { as: "image" });
  preload(FRAMES.a, { as: "image" });
  preload(FRAMES.b, { as: "image" });

  // Narrow phones: if the bubble would reach the menu button, let the bust wave alone.
  useLayoutEffect(() => {
    if (!bubble) return;
    const b = bubbleRef.current?.getBoundingClientRect();
    const menu = document.querySelector<HTMLElement>("[data-menu-button]");
    const m = menu && menu.offsetParent !== null ? menu.getBoundingClientRect() : null;
    setBubbleFits(!b || !m || b.right <= m.left - 8);
  }, [bubble]);

  const fade = { transition: `opacity ${FADE}s ease` };

  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-[length:var(--fs-brand)] font-medium text-text"
      {...handlers}
    >
      {/* Logo slot: the face and the bust share this box; the bust overflows it on purpose. */}
      <span className="relative block size-[clamp(22px,1.8vw,26px)] shrink-0">
        <Image
          src="/brand/face-mark.png"
          alt=""
          width={128}
          height={128}
          quality={90}
          priority
          className="size-full"
          style={{ ...fade, opacity: open ? 0 : 1 }}
        />

        <AnimatePresence>
          {open && (
            <motion.span
              aria-hidden="true"
              className="mascot-bust pointer-events-none absolute block select-none"
              style={{
                aspectRatio: `${IMG_W} / ${IMG_H}`,
                // Centre the bust's head over the logo's centre.
                left: `calc(50% - var(--bust-h) * ${(HEAD_X * ASPECT).toFixed(4)})`,
                transformOrigin: `${(HEAD_X * 100).toFixed(1)}% 35%`,
              }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE, ease: "easeOut" }}
            >
              {(Object.keys(FRAMES) as Frame[]).map((f) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={f}
                  src={FRAMES[f]}
                  alt=""
                  width={IMG_W}
                  height={IMG_H}
                  draggable={false}
                  className="absolute inset-0 size-full"
                  style={{ opacity: frame === f ? 1 : 0 }}
                />
              ))}

              <AnimatePresence>
                {bubble && (
                  <motion.span
                    ref={bubbleRef}
                    className="mascot-bubble absolute top-1/2 left-[calc(100%+8px)] whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.12)] bg-surface px-3 py-1.5 text-[length:var(--fs-nav)] font-medium leading-none text-text"
                    style={{ visibility: bubbleFits ? "visible" : "hidden", originX: 0, originY: 0.5, y: "-50%" }}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                    animate={
                      reduced
                        ? { opacity: 1, transition: { duration: FADE } }
                        : { opacity: 1, scale: 1, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } }
                    }
                    exit={{ opacity: 0, transition: { duration: BUBBLE_OUT / 1000 } }}
                  >
                    Hi!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* The name keeps its layout box while hidden, so nothing shifts. */}
      <span style={{ ...fade, opacity: open ? 0 : 1 }}>Pratyush</span>
    </Link>
  );
}
