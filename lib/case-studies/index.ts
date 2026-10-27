import { curlCommander } from "./curl-commander";
import { facelockKioskPrivacy } from "./facelock-kiosk-privacy";
import { favoriteItems } from "./favorite-items";
import { planIt } from "./plan-it";
import { starshipWeatherAlerts } from "./starship-weather-alerts";
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  curlCommander,
  favoriteItems,
  planIt,
  starshipWeatherAlerts,
  facelockKioskPrivacy,
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export * from "./types";
