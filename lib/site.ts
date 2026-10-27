/** Central place for links so they can be swapped when real pages exist. */
export const navLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "work", label: "Work", href: "/work" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export type NavId = (typeof navLinks)[number]["id"];

export const links = {
  explore: "#work",
  contact: "#contact",
  getInTouch: "/contact",
  allProjects: "/work",
  moreAboutMe: "/about",
  resume: "https://drive.google.com/file/d/1N0-YLroLXoReTflf1bIMTYe-YmEPRiB5/view?usp=sharing",
};
