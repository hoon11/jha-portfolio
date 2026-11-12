import type { Locale } from "../lib/i18n";
import type { Messages } from "./messages";

type Period = { start: number; end: number };
type Role = "Frontend Engineer" | "Full-Stack Engineer" | "Software Engineer";
type WorkFact = { id: WorkId; period: Period | null; technologies: readonly string[] };
export type WorkId = "dataAnalytics" | "hvac" | "existingBusiness" | "redevelopment" | "assetApi" | "webDevelopment" | "biReporting" | "platformMaintenance" | "businessMaintenance" | "systemMaintenance";

const period = (start: number, end: number): Period => ({ start, end });

export const portfolio = {
  name: "J. H.",
  primaryRole: "Frontend Engineer",
  featured: ["dataAnalytics", "hvac"] satisfies WorkId[],
  work: {
    dataAnalytics: { id: "dataAnalytics", period: period(2019, 2021), technologies: ["React", "TypeScript", "Data visualization"] },
    hvac: { id: "hvac", period: period(2023, 2024), technologies: ["Angular", "Python", "AWS Lambda"] },
    existingBusiness: { id: "existingBusiness", period: period(2023, 2023), technologies: ["JavaScript", "HTML", "CSS", "PL/SQL"] },
    redevelopment: { id: "redevelopment", period: period(2024, 2025), technologies: ["TypeScript", "Angular", "Java", "Spring", "HTML", "CSS"] },
    assetApi: { id: "assetApi", period: period(2022, 2022), technologies: ["TypeScript", "Node.js", "MySQL", "AWS Lambda", "Swagger", "PlantUML", "Jest"] },
    webDevelopment: { id: "webDevelopment", period: period(2022, 2022), technologies: ["JavaScript", "Vue.js", "Nuxt", "AWS Amplify", "AWS Lambda", "Amazon Cognito", "DynamoDB"] },
    biReporting: { id: "biReporting", period: period(2021, 2021), technologies: ["PHP", "Jedox"] },
    platformMaintenance: { id: "platformMaintenance", period: null, technologies: [] },
    businessMaintenance: { id: "businessMaintenance", period: period(2018, 2018), technologies: ["Java", "Spring", "JavaScript", "jQuery", "Oracle Database"] },
    systemMaintenance: { id: "systemMaintenance", period: period(2017, 2018), technologies: ["Windows 7", "Windows 10"] },
  } satisfies Record<WorkId, WorkFact>,
  employment: [
    { id: "experience1", role: "Full-Stack Engineer", period: period(2023, 2026), selectedWork: ["redevelopment", "hvac", "existingBusiness"] },
    { id: "experience2", role: "Full-Stack Engineer", period: period(2022, 2022), selectedWork: ["assetApi", "webDevelopment"] },
    { id: "experience3", role: "Frontend Engineer", period: period(2019, 2021), selectedWork: ["biReporting", "dataAnalytics", "platformMaintenance"] },
    { id: "experience4", role: "Software Engineer", period: period(2017, 2018), selectedWork: ["businessMaintenance", "systemMaintenance"] },
  ] as const satisfies readonly { id: string; role: Role; period: Period; selectedWork: readonly WorkId[] }[],
  labProject: { title: "API Rescue Lab", href: "/lab/api-rescue-lab", technologies: "React / TypeScript" },
  frontendSkills: "React, TypeScript, JavaScript, Angular, Vue.js, Nuxt, HTML, CSS",
  integrationSkills: "REST / GraphQL APIs, Node.js, Java / Spring, PHP, Python, AWS Lambda, AWS Amplify, Serverless Framework",
  careerBreak: { period: period(2025, 2026) },
  returnPreparation: { period: period(2026, 2026) },
  certification: { name: "AWS Certified Solutions Architect - Associate", year: 2026 },
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
