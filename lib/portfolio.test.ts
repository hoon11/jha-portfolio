import { expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../app/[locale]/page";
import WorkPage from "../app/[locale]/work/page";
import LabDetailPage from "../app/[locale]/lab/api-rescue-lab/page";
import { getMessages } from "../content/messages";
import { getPortfolio, portfolio } from "../content/portfolio";
import { locales } from "./i18n";

it("keeps career relationships and confirmed periods equivalent in every language", async () => {
  for (const locale of locales) {
    const messages = await getMessages(locale);
    const view = getPortfolio(messages, locale);
    expect(view.employment.map((job) => job.id)).toEqual(["experience1", "experience2", "experience3", "experience4"]);
    expect(view.employment.map((job) => job.context)).toEqual(portfolio.employment.map((job) => messages.work.contexts[job.id]));
    expect(view.employment.map((job) => job.selectedWork.map((work) => work.id))).toEqual([
      ["redevelopment", "hvac", "existingBusiness"], ["webDevelopment"], ["dataAnalytics", "platformMaintenance"], ["systemMaintenance"],
    ]);
    expect(view.experience.map((work) => work.id)).toEqual(["dataAnalytics", "hvac"]);
    expect(view.experience.map((work) => work.context)).toEqual([messages.work.contexts.experience3, messages.work.contexts.experience1]);
    expect(view.experience[0].technologies).toBe({ en: "React / TypeScript / Data visualization", ja: "React / TypeScript / データ可視化", ko: "React / TypeScript / 데이터 시각화" }[locale]);
    expect(view.employment[2].selectedWork.every((work) => work.projectDates === null)).toBe(true);
    expect(view.employment[1].selectedWork[0].projectDates).toBeNull();
    expect(view.employment[3].selectedWork[0].projectDates).toBeNull();
    expect(view.experience[0].dates).toBe(view.employment[2].dates);
    expect(view.experience[1].dates).toBe(view.employment[0].selectedWork[1].projectDates);
    expect(view.employment[0].dates).not.toBe(view.employment[0].selectedWork[0].projectDates);
    expect(view.employment[0].role).toBe(messages.roles["Full-Stack Engineer"]);
    expect(view.employment[2].role).toBe(messages.roles["Frontend Engineer"]);
    expect(Object.keys(messages.work.items).sort()).toEqual(Object.keys(portfolio.work).sort());
    for (const job of view.employment) for (const work of job.selectedWork) {
      expect(work.title.trim()).not.toBe("");
      expect(work.description.trim()).not.toBe("");
      if (work.id !== "dataAnalytics") expect(work.technologies).toBe(portfolio.work[work.id].technologies.join(" / "));
    }
  }
  expect(portfolio.employment[0].period.end).toBe(2026);
  expect(portfolio.work.redevelopment.period.end).toBe(2025);
});

it("describes screen investigation and preserves frontend positioning", async () => {
  const expectations = {
    en: { screen: "Checked screens", role: "Frontend Engineer", duration: "around nine years" },
    ja: { screen: "画面を検証", role: "フロントエンドエンジニア", duration: "約9年" },
    ko: { screen: "화면을 검증", role: "프론트엔드 엔지니어", duration: "약 9년" },
  };
  for (const locale of locales) {
    const messages = await getMessages(locale);
    expect(messages.work.items.existingBusiness.description).toContain(expectations[locale].screen);
    expect(messages.home.headline).toContain(expectations[locale].role);
    expect(messages.home.about).toContain(expectations[locale].duration);
    expect(messages.home.portfolioStack).toContain("Next.js");
    expect(messages.home.workflow).toHaveLength(4);
    expect(messages.detail.demonstrations).toHaveLength(4);
    expect(messages.detail.steps).toHaveLength(4);
  }
});

it("omits personal contact and repository links and month dates from rendered public pages", async () => {
  for (const locale of locales) {
    const params = Promise.resolve({ locale });
    const pages = [await HomePage({ params }), await WorkPage({ params }), await LabDetailPage({ params })];
    for (const page of pages) {
      const html = renderToStaticMarkup(page);
      expect(html).not.toMatch(/href=["'][^"']*(?:mailto:|linkedin\.com|github\.com)/i);
      expect(html).not.toMatch(/\b20\d{2}[/-]\d{1,2}\b|20\d{2}年\d{1,2}月|20\d{2}년\s*\d{1,2}월/);
    }
    const messages = await getMessages(locale);
    const workHtml = renderToStaticMarkup(await WorkPage({ params }));
    for (const context of Object.values(messages.work.contexts)) expect(workHtml).toContain(context);
    expect(workHtml).toContain("TypeScript");
    expect(workHtml).toContain("CSS");
  }
  expect(portfolio).not.toHaveProperty("email");
  expect(portfolio).not.toHaveProperty("linkedIn");
  for (const job of portfolio.employment) {
    expect(job).not.toHaveProperty("company");
    expect(typeof job.period.start).toBe("number");
    expect(typeof job.period.end).toBe("number");
  }
});
