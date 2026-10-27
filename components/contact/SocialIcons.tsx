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

export const MailIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

export const ResumeIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const LinkedInIcon = (p: IconProps) => (
  <svg {...line} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10.5V16M8 7.75v.01M12 16v-5.5M12 13a2.5 2.5 0 0 1 5 0v3" />
  </svg>
);

export const BehanceIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    {/* Simplified "Bē" mark, stroked to match the other outline icons. */}
    <path
      d="M3 7h4.6c1.6 0 2.7.9 2.7 2.3 0 1.1-.7 1.9-1.6 2.1 1.2.2 2 1.1 2 2.4 0 1.6-1.2 2.7-3 2.7H3V7Zm0 4.5h4.4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M14 13.4h7c0-2.2-1.4-3.7-3.4-3.7S14 11.2 14 13.4Zm0 0c0 2.1 1.4 3.6 3.6 3.6 1.4 0 2.4-.6 2.9-1.6M15.2 7.3h4.6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GitHubIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);
