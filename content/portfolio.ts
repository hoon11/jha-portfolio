import type { Locale } from "../lib/i18n";
import type { Messages } from "./messages";

type Month = { year: number; month: number };
type Period = { start: Month; end: Month };
type Role = "Frontend Engineer" | "Full-Stack Engineer" | "Software Engineer";
type WorkFact = { id: WorkId; period: Period | null; technologies: readonly string[] };
export type WorkId = "dataAnalytics" | "hvac" | "existingBusiness" | "redevelopment" | "webDevelopment" | "platformMaintenance" | "systemMaintenance";

const period = (startYear: number, startMonth: number, endYear: number, endMonth: number): Period => ({
  start: { year: startYear, month: startMonth }, end: { year: endYear, month: endMonth },
});

export const portfolio = {
  name: "J. Ha",
  email: "jhoonen@gmail.com",
  linkedIn: "https://www.linkedin.com/in/jaehoon-ha-1a69b1142/",
  primaryRole: "Frontend Engineer",
  featured: ["dataAnalytics", "hvac"] satisfies WorkId[],
  work: {
    dataAnalytics: { id: "dataAnalytics", period: null, technologies: ["React", "TypeScript", "Data visualization"] },
    hvac: { id: "hvac", period: period(2023, 4, 2024, 10), technologies: ["Angular", "Python", "AWS Lambda"] },
    existingBusiness: { id: "existingBusiness", period: period(2023, 1, 2023, 3), technologies: ["JavaScript", "HTML", "CSS", "PL/SQL"] },
    redevelopment: { id: "redevelopment", period: period(2024, 12, 2025, 10), technologies: [] },
    webDevelopment: { id: "webDevelopment", period: null, technologies: ["AWS Amplify", "Serverless Framework"] },
    platformMaintenance: { id: "platformMaintenance", period: null, technologies: [] },
    systemMaintenance: { id: "systemMaintenance", period: null, technologies: [] },
  } satisfies Record<WorkId, WorkFact>,
  employment: [
    { company: "Strike System", role: "Full-Stack Engineer", period: period(2023, 1, 2026, 4), selectedWork: ["redevelopment", "hvac", "existingBusiness"] },
    { company: "Creative Heroes", role: "Full-Stack Engineer", period: period(2022, 1, 2022, 12), selectedWork: ["webDevelopment"] },
    { company: "KSK Analytics", role: "Frontend Engineer", period: period(2019, 2, 2021, 12), selectedWork: ["dataAnalytics", "platformMaintenance"] },
    { company: "Kissco Japan", role: "Software Engineer", period: period(2017, 3, 2018, 12), selectedWork: ["systemMaintenance"] },
  ] satisfies { company: string; role: Role; period: Period; selectedWork: WorkId[] }[],
  labProject: { title: "API Rescue Lab", href: "/lab/api-rescue-lab", technologies: "React / TypeScript" },
  frontendSkills: "React, TypeScript, JavaScript, Angular, HTML, CSS",
  integrationSkills: "REST APIs, AWS Lambda, AWS Amplify, Serverless Framework, Python",
};

export function formatPeriod(value: Period, locale: Locale): string {
  const month = (date: Month) => locale === "en"
    ? `${date.year}/${String(date.month).padStart(2, "0")}`
    : locale === "ja" ? `${date.year}年${date.month}月` : `${date.year}년 ${date.month}월`;
  return `${month(value.start)} – ${month(value.end)}`;
}

export type Experience = {
  id: WorkId; company: string; role: string; dates: string;
  title: string; description: string; technologies: string;
};

export function getPortfolio(messages: Messages, locale: Locale) {
  const technologies = (names: readonly string[]) => names.map((name) => name === "Data visualization" ? messages.technologyLabels.dataVisualization : name).join(" / ");
  const employment = portfolio.employment.map((job) => ({
    company: job.company,
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
      id, company: job.company, role: messages.roles[job.role],
      dates: formatPeriod(work.period ?? job.period, locale),
      ...messages.work.items[id], technologies: technologies(work.technologies),
    };
  });
  return { employment, experience };
}
