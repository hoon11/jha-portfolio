import type { Locale } from "../lib/i18n";
import type { WorkId } from "./portfolio";

type PageCopy = { title: string; description: string };
export type Messages = {
  technologyLabels: { dataVisualization: string };
  shell: { skip: string; backToTop: string; footer: string; portfolio: string };
  roles: Record<"Frontend Engineer" | "Full-Stack Engineer" | "Software Engineer", string>;
  metadata: { home: PageCopy; work: PageCopy; lab: PageCopy; detail: PageCopy };
  home: {
    greeting: string; headline: string; introduction: string; viewWork: string; exploreLab: string;
    workEyebrow: string; experienceTitle: string; allWork: string; labEyebrow: string; labTitle: string; viewLab: string;
    aboutEyebrow: string; aboutTitle: string; about: string; portfolioStack: string;
    skills: { frontend: string; integration: string; practice: string; practiceItems: string };
    workflowTitle: string; workflow: { title: string; text: string }[];
    contactEyebrow: string; contactTitle: string; contactText: string; email: string;
  };
  work: { eyebrow: string; title: string; introduction: string; employment: string; selectedWork: string; project: string; items: Record<WorkId, { title: string; description: string }> };
  lab: { eyebrow: string; title: string; introduction: string; projects: string; cardOverline: string; homeSummary: string; indexSummary: string; openProject: string };
  detail: { back: string; eyebrow: string; introduction: string; instruction: string; simulation: string; simulator: string; demonstrates: string; demonstrations: string[]; stepsTitle: string; steps: string[]; retry: string };
};

const resources = {
  en: () => import("./locales/en").then((resource) => resource.default),
  ja: () => import("./locales/ja").then((resource) => resource.default),
  ko: () => import("./locales/ko").then((resource) => resource.default),
} satisfies Record<Locale, () => Promise<Messages>>;

export async function getMessages(locale: Locale): Promise<Messages> {
  return resources[locale]();
}
