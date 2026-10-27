/** About page copy, taken from the existing Framer About page. */

export const stats = [
  { label: "Experience", value: "2+ years" },
  { label: "Location", value: "West Lafayette" },
  { label: "Origin", value: "India" },
];

export const bio = [
  "I began my journey as a Computer Science undergrad, but my strengths leaned more toward understanding people than writing code.",
  "I'm currently pursuing a Master's in UX Design at Purdue University, where I explore how design can make technology more meaningful and accessible.",
];

export type TimelineEntry = {
  /** Rendered on two lines on wide screens: start / end. */
  dates: [string, string?];
  org: string;
  sub?: string;
  description: string;
};

export const education: TimelineEntry[] = [
  {
    dates: ["Aug’25 –", "Present"],
    org: "Purdue University, West Lafayette, United States of America",
    sub: "Current GPA: 3.95/4",
    description:
      "Masters of Science, Computer Graphics Technology with concentration in UX Design",
  },
  {
    dates: ["2019 – 2023"],
    org: "SRM Institute of Science & Technology, Chennai, India",
    sub: "GPA: 3.644/4",
    description:
      "Bachelor of Technology, Computer Science Engineering with a specialization in Information Technology",
  },
];

export const experience: TimelineEntry[] = [
  {
    dates: ["Aug’26 –", "Present"],
    org: "Teaching Assistant and Project Owner",
    sub: "Purdue Polytechnic University",
    description:
      "Supporting students through the full design process on client-sponsored projects, reviewing research plans, critiquing wireframes, and coaching design rationale.",
  },
  {
    dates: ["Dec’23 –", "May’25"],
    org: "Ernst and Young",
    sub: "Technology Consultant (Product and UX evaluation)",
    description:
      "Evaluated product workflows across Morgan Stanley's banking platform, surfacing 100+ usability and functional issues in multi-step user journeys. Worked with product, engineering, and QA to turn findings into prioritized fixes.",
  },
  {
    dates: ["Mar’23 –", "Sep’23"],
    org: "Global Groupware Solutions (EmployWise)",
    sub: "UX/UI Intern",
    description:
      "Owned end-to-end design for HR product features, shipping pixel-perfect work with engineers. Built a 40+ component Figma design system from scratch and presented prototypes to prospective clients.",
  },
  {
    dates: ["Feb’23 –", "Mar’23"],
    org: "Texla Culture",
    sub: "UI Designer Intern",
    description:
      "Part of the design team of an early stage startup. Contributed to ideation, wireframing, design, and prototyping of HRMS and LMS products. Contributed in designing the company's website.",
  },
  {
    dates: ["Oct’22 –", "Dec’22"],
    org: "KonnectNXT",
    sub: "UI Designer Intern",
    description:
      "Contributed to ideation, wireframing, design, and prototyping UIs for various microservices of their product (HRTech). Contributed in designing the company's website.",
  },
];
