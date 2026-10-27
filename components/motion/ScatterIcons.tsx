"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { BrickIcon, ClaudeSpark, FigmaLogo } from "@/components/ui/icons";

/**
 * Same set and timing as the Framer version, with the spots pulled in toward the
 * origin by SPREAD. Right-anchored spots are converted to left % so every icon can
 * fly from the centre via transform (cheaper than animating top/left).
 */
const ICONS = [
  { emoji: "🎮", top: 15, left: 10, size: 28, delay: 0.3, duration: 6 },
  { emoji: "✏️", top: 25, right: 12, size: 24, delay: 0.5, duration: 7 },
  { emoji: "💡", top: 60, left: 8, size: 22, delay: 0.8, duration: 8 },
  { emoji: "📱", top: 70, right: 10, size: 26, delay: 0.6, duration: 7.5 },
  { emoji: "figma", top: 12, right: 25, size: 24, delay: 1.0, duration: 9 },
  { emoji: "🎯", top: 75, left: 14, size: 22, delay: 1.2, duration: 8.5 },
  { emoji: "🖱️", top: 45, right: 6, size: 20, delay: 0.9, duration: 7 },
  { emoji: "🧩", top: 50, left: 5, size: 24, delay: 0.4, duration: 6.5 },
  // Added beyond the Framer set, in gaps clear of the headline and buttons.
  { emoji: "chelsea", top: 32, left: 10, size: 28, delay: 0.7, duration: 7.5 },
  { emoji: "claude", top: 8, left: 92, size: 22, delay: 1.1, duration: 8 },
  { emoji: "⚽", top: 92, left: 8, size: 22, delay: 1.3, duration: 6.5 },
  { emoji: "☕", top: 90, left: 84, size: 22, delay: 1.0, duration: 7 },
  { emoji: "brick", top: 5, left: 30, size: 24, delay: 0.9, duration: 8 },
];

const START = 0.6;
const FLY = 1.8;
const OPACITY = 0.5;
const EASE = [0.16, 1, 0.3, 1] as const;
/** Where the cluster starts, in % of the hero (matches Framer: top 45%, ~48% across). */
const ORIGIN = { x: 48, y: 45 };
/** How far each icon settles from the origin, relative to the Framer spots (1 = same spot). */
const SPREAD = 0.82;

const PLACED = ICONS.map((ic) => {
  const left = ic.left ?? 100 - (ic.right ?? 0);
  return {
    ...ic,
    left: ORIGIN.x + (left - ORIGIN.x) * SPREAD,
    top: ORIGIN.y + (ic.top - ORIGIN.y) * SPREAD,
  };
});

function Glyph({ emoji, size }: { emoji: string; size: number }) {
  if (emoji === "figma") return <FigmaLogo style={{ width: size, height: size }} />;
  if (emoji === "claude") return <ClaudeSpark style={{ width: size, height: size }} />;
  if (emoji === "brick") return <BrickIcon style={{ width: size, height: size }} />;
  if (emoji === "chelsea")
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/icons/chelsea.svg"
        alt=""
        width={size}
        height={size}
        draggable={false}
        className="block select-none"
        // Lift the dark navy crest so it reads against the dark hero like the emoji do.
        style={{ filter: "brightness(1.6) saturate(0.9)" }}
      />
    );
  return (
    <span className="block select-none leading-none" style={{ fontSize: size }}>
      {emoji}
    </span>
  );
}

export function ScatterIcons({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  // Measure once so each icon can start at the origin and fly to its own (0,0).
  useLayoutEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setBox({ w: r.width, h: r.height });
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0">
      {box &&
        PLACED.map(({ emoji, top, left, size, delay, duration }, i) => {
          const style = { left: `${left}%`, top: `${top}%`, marginLeft: -size / 2 };
          if (reducedMotion) {
            return (
              <div key={i} className="absolute" style={{ ...style, opacity: OPACITY }}>
                <Glyph emoji={emoji} size={size} />
              </div>
            );
          }
          const dx = ((ORIGIN.x - left) / 100) * box.w;
          const dy = ((ORIGIN.y - top) / 100) * box.h;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={style}
              initial={{ x: dx, y: dy, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: OPACITY }}
              transition={{
                x: { delay: START + delay, duration: FLY, ease: EASE },
                y: { delay: START + delay, duration: FLY, ease: EASE },
                opacity: { delay: START + delay, duration: 1, ease: "easeOut" },
              }}
            >
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
                transition={{
                  delay: START + delay + 2,
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Glyph emoji={emoji} size={size} />
              </motion.div>
            </motion.div>
          );
        })}
    </div>
  );
}
