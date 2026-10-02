import { expect, it } from "vitest";
import { getMessages } from "../content/messages";
import { getPortfolio, portfolio } from "../content/portfolio";
import { locales } from "./i18n";

it("keeps career relationships and confirmed periods equivalent in every language", async () => {
  for (const locale of locales) {
    const messages = await getMessages(locale);
    const view = getPortfolio(messages, locale);
    expect(view.employment.map((job) => job.company)).toEqual(["Strike System", "Creative Heroes", "KSK Analytics", "Kissco Japan"]);
    expect(view.employment.map((job) => job.selectedWork.map((work) => work.id))).toEqual([
      ["redevelopment", "hvac", "existingBusiness"], ["webDevelopment"], ["dataAnalytics", "platformMaintenance"], ["systemMaintenance"],
    ]);
    expect(view.experience.map((work) => work.id)).toEqual(["dataAnalytics", "hvac"]);
    expect(view.experience.map((work) => work.company)).toEqual(["KSK Analytics", "Strike System"]);
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
  expect(portfolio.employment[0].period.end).toEqual({ year: 2026, month: 4 });
  expect(portfolio.work.redevelopment.period.end).toEqual({ year: 2025, month: 10 });
});

it("describes approximately 150 validated screens and preserves frontend positioning", async () => {
  const expectations = {
    en: { screen: "Validated approximately 150 screens", role: "Frontend Engineer", duration: "around nine years" },
    ja: { screen: "約150画面を検証", role: "フロントエンドエンジニア", duration: "約9年" },
    ko: { screen: "약 150개 화면을 검증", role: "프론트엔드 엔지니어", duration: "약 9년" },
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
