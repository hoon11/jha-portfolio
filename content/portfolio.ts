import type { Locale } from "../lib/i18n";
import type { Messages } from "./messages";

type Period = { start: number; end: number };
type Role = "Frontend Engineer" | "Full-Stack Engineer" | "Software Engineer";
type WorkFact = { id: WorkId; period: Period | null; technologies: readonly string[] };
export type WorkId = "dataAnalytics" | "hvac" | "existingBusiness" | "redevelopment" | "webDevelopment" | "platformMaintenance" | "systemMaintenance";

const period = (start: number, end: number): Period => ({ start, end });

export const portfolio = {
  name: "J. Ha",
  primaryRole: "Frontend Engineer",
  featured: ["dataAnalytics", "hvac"] satisfies WorkId[],
  work: {
    dataAnalytics: { id: "dataAnalytics", period: null, technologies: ["React", "TypeScript", "Data visualization"] },
    hvac: { id: "hvac", period: period(2023, 2024), technologies: ["Angular", "Python", "AWS Lambda"] },
    existingBusiness: { id: "existingBusiness", period: period(2023, 2023), technologies: ["JavaScript", "HTML", "CSS", "PL/SQL"] },
    redevelopment: { id: "redevelopment", period: period(2024, 2025), technologies: ["JavaScript", "HTML", "CSS"] },
    webDevelopment: { id: "webDevelopment", period: null, technologies: ["AWS Amplify", "Serverless Framework"] },
    platformMaintenance: { id: "platformMaintenance", period: null, technologies: [] },
    systemMaintenance: { id: "systemMaintenance", period: null, technologies: [] },
  } satisfies Record<WorkId, WorkFact>,
  employment: [
    { id: "experience1", role: "Full-Stack Engineer", period: period(2023, 2026), selectedWork: ["redevelopment", "hvac", "existingBusiness"] },
    { id: "experience2", role: "Full-Stack Engineer", period: period(2022, 2022), selectedWork: ["webDevelopment"] },
    { id: "experience3", role: "Frontend Engineer", period: period(2019, 2021), selectedWork: ["dataAnalytics", "platformMaintenance"] },
    { id: "experience4", role: "Software Engineer", period: period(2017, 2018), selectedWork: ["systemMaintenance"] },
  ] as const satisfies readonly { id: string; role: Role; period: Period; selectedWork: readonly WorkId[] }[],
  labProject: { title: "API Rescue Lab", href: "/lab/api-rescue-lab", technologies: "React / TypeScript" },
  frontendSkills: "React, TypeScript, JavaScript, Angular, HTML, CSS",
  integrationSkills: "REST APIs, AWS Lambda, AWS Amplify, Serverless Framework, Python",
};

export function formatPeriod(value: Period, locale: Locale): string {
  const year = (value: number) => locale === "en" ? String(value) : locale === "ja" ? `${value}年` : `${value}년`;
  return value.start === value.end ? year(value.start) : `${year(value.start)} – ${year(value.end)}`;
}

export type EmploymentId = typeof portfolio.employment[number]["id"];

export type Experience = {
  id: WorkId; context: string; role: string; dates: string;
  title: string; description: string; technologies: string;
};

export function getPortfolio(messages: Messages, locale: Locale) {
  const technologies = (names: readonly string[]) => names.map((name) => name === "Data visualization" ? messages.technologyLabels.dataVisualization : name).join(" / ");
  const employment = portfolio.employment.map((job) => ({
    id: job.id,
    context: messages.work.contexts[job.id],
    role: messages.roles[job.role],
    dates: formatPeriod(job.period, locale),
    selectedWork: job.selectedWork.map((id) => {
      const work: WorkFact = portfolio.work[id];
      return {
        id, ...messages.work.items[id],
        projectDates: work.period ? formatPeriod(work.period, locale) : null,
        technologies: technologies(work.technologies),
      };
    }),
  }));
  const experience: Experience[] = portfolio.featured.map((id) => {
    const job = portfolio.employment.find((employer) => employer.selectedWork.some((workId) => workId === id));
    if (!job) throw new Error(`Featured work has no employer: ${id}`);
    const work: WorkFact = portfolio.work[id];
    return {
      id, context: messages.work.contexts[job.id], role: messages.roles[job.role],
      dates: formatPeriod(work.period ?? job.period, locale),
      ...messages.work.items[id], technologies: technologies(work.technologies),
    };
  });
  return { employment, experience };
}
