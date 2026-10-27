import { BehanceIcon, GitHubIcon, LinkedInIcon, ResumeIcon } from "@/components/contact/SocialIcons";
import { links } from "@/lib/site";

export const contactEmail = "bishtpratyush01@gmail.com";

export type SocialLink = {
  label: string;
  href: string;
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  /** Border + icon + text colour on hover/focus/press. */
  hoverColor: string;
  /** CSS transform for the icon on desktop hover only. Keep it small. */
  iconMotion: string;
  /** Contact page row: 1 = main row, 2 = centred row below it. */
  row: 1 | 2;
};

/** Adding a platform = adding one object here. */
export const socialLinks: SocialLink[] = [
  {
    label: "Resume",
    href: links.resume,
    Icon: ResumeIcon,
    hoverColor: "#6EA8FE", // no platform brand — site accent
    iconMotion: "translateY(-2px)", // "picked up"
    row: 1,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bishtpratyush/",
    Icon: LinkedInIcon,
    hoverColor: "#0A66C2",
    iconMotion: "scale(1.1)",
    row: 1,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/pratyushbisht1",
    Icon: BehanceIcon,
    hoverColor: "#1769FF",
    iconMotion: "scale(1.1)",
    row: 1,
  },
  {
    label: "Github",
    href: "https://github.com/pratyushbisht?tab=repositories",
    Icon: GitHubIcon,
    hoverColor: "#FFFFFF", // GitHub has no colour identity on dark — bright white instead
    iconMotion: "scale(1.1)",
    row: 2,
  },
];
