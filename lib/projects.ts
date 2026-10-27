export type ProjectScene = "uline" | "curl" | "planit" | "starship" | "facelock";

export type Project = {
  slug: string;
  title: string;
  meta: string;
  caption: string;
  image: string;
  imageAlt: string;
  /** object-position for the cover crop */
  imagePosition?: string;
  scene: ProjectScene;
};

export const projects: Project[] = [
  {
    slug: "favorite-items-list-redesign",
    title: "Uline Favorite Items & Shopping Lists",
    meta: "2026 · UX Research · UX Redesign · E-commerce",
    caption:
      "Partnering with Uline to redesign how users save and organize products, backed by competitive analysis, usability audits, and testing with real users.",
    image: "/projects/uline.webp",
    imageAlt: "Uline box logo beside the title “UX Redesign: Uline Favorite Items and Shopping Lists”",
    scene: "uline",
  },
  {
    slug: "curl-commander",
    title: "Smartwatch Exercise Form Coach",
    meta: "2026 · Wearable UX · UX Research",
    caption:
      "Built a real-time rep counter and form feedback system on a Bangle.js smartwatch using accelerometer data, haptic cues, and on-screen nudges to coach bicep curl technique without a phone or trainer.",
    image: "/projects/smartwatch.png",
    imageAlt: "Line illustration of a person wearing a smartwatch in a gym",
    imagePosition: "center 62%",
    scene: "curl",
  },
  {
    slug: "plan-it",
    title: "Plan-It : Group Planning in WhatsApp",
    meta: "2025 · UX Research · UI Design",
    caption:
      "Reducing chaos, decision loss, and ambiguity in group chats by meeting users where they already are.",
    image: "/projects/plan-it.png",
    imageAlt: "Illustration of four friends planning together in a living room",
    imagePosition: "center 62%",
    scene: "planit",
  },
  {
    slug: "starship-weather-alerts",
    title: "Starship Weather Alerts",
    meta: "2025 · UX Research · Human-Robot Interaction · Safety",
    caption: "Turning campus delivery robots into a second channel for severe weather alerts",
    image: "/case-studies/starship-weather-alerts/hero.jpg",
    imageAlt:
      "Illustration of a student waving at a Starship delivery robot under the Purdue University gateway arch at sunset",
    imagePosition: "center 62%",
    scene: "starship",
  },
];

export type WorkCard = {
  slug: string;
  title: string;
  meta: string;
  caption: string;
  /** Only for Work-only projects (not in the Home rows). Others reuse the Home row image. */
  image?: { src: string; alt: string; position?: string };
};

/** /work grid: its own copy, sharing slugs (and so images) with the Home rows. */
export const workCards: WorkCard[] = [
  {
    slug: "curl-commander",
    title: "Curl Commander",
    meta: "2026 · UX Research · Interaction Design · Wearable UX",
    caption: "Real-time rep counting and form feedback on a wrist-worn device",
  },
  {
    slug: "favorite-items-list-redesign",
    title: "Favorite Items List Redesign",
    meta: "2026 · UX Research · E-commerce · UX Redesign",
    caption: "Untangling two overlapping features on a B2B e-commerce platform",
  },
  {
    slug: "plan-it",
    title: "Plan-It – Group Planning Inside WhatsApp",
    meta: "2026 · UX Research · Mobile App · Interaction Design",
    caption: "Bringing structure to group plans without leaving the chat",
  },
  {
    slug: "starship-weather-alerts",
    title: "Starship Weather Alerts",
    meta: "2025 · UX Research · Human-Robot Interaction · Safety",
    caption: "Turning campus delivery robots into a second channel for severe weather alerts",
  },
  {
    // Work page only: deliberately not in the Home rows above.
    slug: "facelock-kiosk-privacy",
    title: "FaceLock",
    meta: "2025 · UX Research · Kiosk UX · Privacy",
    caption: "Making self-order kiosks feel private in a crowded boba shop",
    image: {
      src: "/projects/facelock/hero.jpg",
      alt: "Illustration of a worried customer at a self-order kiosk while another customer stands close behind him",
      position: "center 40%",
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
