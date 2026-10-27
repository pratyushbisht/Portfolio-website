type IconProps = React.SVGProps<SVGSVGElement>;

const line = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const LayersIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const FileIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const ChatIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/* ---- Hero scatter icons ---- */

/** Simple coral starburst standing in for Claude (not the official mark). */
export const ClaudeSpark = (p: IconProps) => (
  <svg viewBox="-12 -12 24 24" aria-hidden {...p}>
    <g fill="#D97757">
      {[0, 30, 60, 90, 120, 150].map((deg, i) => (
        <rect key={deg} x={-1.1} y={i % 2 ? -10 : -11.5} width={2.2} height={i % 2 ? 20 : 23} rx={1.1} transform={`rotate(${deg})`} />
      ))}
    </g>
  </svg>
);

/** Generic 2x2 toy building brick, three-quarter view. */
export const BrickIcon = (p: IconProps) => (
  <svg viewBox="0 0 32 28" aria-hidden {...p}>
    {/* body: front, side, top */}
    <path fill="#C8102E" d="M2 12h20v14H2z" />
    <path fill="#9A0C23" d="M22 12l8-5v14l-8 5z" />
    <path fill="#E8343F" d="M2 12l8-5h20l-8 5z" />
    {/* studs, back row first so the front row overlaps */}
    {[
      [17, 7.5],
      [24, 7.5],
      [10, 10.5],
      [17, 10.5],
    ].map(([cx, cy]) => (
      <g key={`${cx}-${cy}`}>
        <path fill="#B00D27" d={`M${cx - 3} ${cy}v-2.5h6v2.5a3 1.2 0 0 1-6 0z`} />
        <ellipse cx={cx} cy={cy - 2.5} rx={3} ry={1.2} fill="#F25560" />
      </g>
    ))}
  </svg>
);

export const FigmaLogo = (p: IconProps) => (
  <svg viewBox="0 0 38 57" aria-hidden {...p}>
    <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" />
    <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z" />
    <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" />
    <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" />
    <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" />
  </svg>
);
