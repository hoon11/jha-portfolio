import type { Locale } from "../lib/i18n";

export type NavigationMessages = {
  home: string; work: string; lab: string; about: string; contact: string;
  profession: string; open: string; close: string; main: string; language: string;
  approach: string; steps: string;
};

export const navigationMessages: Record<Locale, NavigationMessages> = {
  en: { home: "Home", work: "Work", lab: "Lab", about: "About", contact: "Contact", profession: "Frontend Engineer", open: "Open menu", close: "Close menu", main: "Main navigation", language: "Display language", approach: "Approach", steps: "Understand · Reproduce · Fix · Verify" },
  ja: { home: "ホーム", work: "職務経歴", lab: "Lab", about: "自己紹介", contact: "お問い合わせ", profession: "フロントエンドエンジニア", open: "メニューを開く", close: "メニューを閉じる", main: "メインナビゲーション", language: "表示言語", approach: "取り組み方", steps: "理解 · 再現 · 修正 · 検証" },
  ko: { home: "홈", work: "경력", lab: "Lab", about: "소개", contact: "연락", profession: "프론트엔드 엔지니어", open: "메뉴 열기", close: "메뉴 닫기", main: "주 메뉴", language: "표시 언어", approach: "작업 방식", steps: "이해 · 재현 · 수정 · 검증" },
};
