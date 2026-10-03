import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { labMessages } from "../content/lab-messages";
import type { Scenario } from "../lib/rescue-lab";
import ApiRescueLab, { displayTaskTitle } from "./api-rescue-lab";

const localeCases = [
  { locale: "en", messages: labMessages.en, started: "Request 1 started (Normal).", succeeded: "Request 1 succeeded. Response validated.",
    failed: "Request 2 failed (server error). Previous data preserved.", noData: "Request 1 failed (server error). No data loaded." },
  { locale: "ja", messages: labMessages.ja, started: "リクエスト1を開始しました（正常）。", succeeded: "リクエスト1が成功しました。応答を検証しました。",
    failed: "リクエスト2が失敗しました（サーバーエラー）。前のデータを保持しました。", noData: "リクエスト1が失敗しました（サーバーエラー）。データは読み込まれていません。" },
  { locale: "ko", messages: labMessages.ko, started: "요청 1 시작 (정상).", succeeded: "요청 1 성공. 응답을 검증했습니다.",
    failed: "요청 2 실패 (서버 오류). 이전 데이터를 유지했습니다.", noData: "요청 1 실패 (서버 오류). 불러온 데이터가 없습니다." },
];

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { cleanup(); vi.clearAllTimers(); vi.useRealTimers(); });

function select(scenario: Scenario) {
  const radio = screen.getAllByRole("radio").find((element) => element.getAttribute("value") === scenario);
  if (!radio) throw new Error(`Missing scenario control: ${scenario}`);
  fireEvent.click(radio);
}
async function run(milliseconds = 600) {
  fireEvent.click(screen.getByRole("button"));
  await act(async () => { await vi.advanceTimersByTimeAsync(milliseconds); });
}

it.each(localeCases)("$locale starts empty and loads all validated tasks", async ({ messages, started, succeeded }) => {
  render(<ApiRescueLab messages={messages} />);
  expect(screen.getByText(messages.empty.title)).toBeVisible();
  expect(screen.getByText(messages.toolbar.detail)).toBeVisible();
  expect(screen.getByText(messages.languageResetNote)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: messages.buttons.run }));
  expect(screen.getByRole("button", { name: messages.buttons.running })).toBeDisabled();
  for (const radio of screen.getAllByRole("radio")) expect(radio).toBeDisabled();
  expect(screen.getByRole("status")).toHaveTextContent(messages.status.loading);
  expect(screen.getByText(started)).toBeVisible();
  await act(async () => { await vi.advanceTimersByTimeAsync(599); });
  expect(screen.getByText(messages.empty.title)).toBeVisible();
  await act(async () => { await vi.advanceTimersByTimeAsync(1); });
  for (const title of Object.values(messages.taskTitles)) expect(screen.getByText(title)).toBeVisible();
  for (const status of Object.values(messages.taskStatuses)) expect(screen.getByText(status)).toBeVisible();
  for (const id of ["TASK-01", "TASK-02", "TASK-03"]) expect(screen.getByText(id)).toBeVisible();
  expect(screen.getByRole("status")).toHaveTextContent(messages.status.success);
  expect(screen.getByText(succeeded)).toBeVisible();
  expect(vi.getTimerCount()).toBe(0);
});

it.each(localeCases)("$locale preserves last successful data after server and invalid responses", async ({ messages, failed }) => {
  render(<ApiRescueLab messages={messages} />);
  await run();
  for (const scenario of ["server", "invalid"] satisfies Scenario[]) {
    select(scenario);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(messages.dataCaption.previous)).toBeVisible();
    await act(async () => { await vi.advanceTimersByTimeAsync(600); });
    expect(screen.getByText(messages.taskTitles["TASK-01"])).toBeVisible();
    expect(screen.getByText(messages.dataCaption.previous)).toBeVisible();
    expect(screen.getByRole("button", { name: messages.buttons.retry })).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent(messages.failures[scenario]);
    if (scenario === "server") expect(screen.getByText(failed)).toBeVisible();
    expect(vi.getTimerCount()).toBe(0);
  }
});

it.each(localeCases)("$locale does not invent baseline data and retry repeats both failure conditions", async ({ messages, noData }) => {
  render(<ApiRescueLab messages={messages} />);
  for (const scenario of ["server", "invalid"] satisfies Scenario[]) {
    select(scenario);
    await run();
    expect(screen.getByRole("button", { name: messages.buttons.retry })).toBeEnabled();
    await run();
    expect(screen.getByRole("status")).toHaveTextContent(messages.failures[scenario]);
    expect(screen.getByText(messages.empty.title)).toBeVisible();
    expect(screen.queryByText(messages.taskTitles["TASK-01"])).not.toBeInTheDocument();
    if (scenario === "server") expect(screen.getByText(noData)).toBeVisible();
  }
  select("normal");
  expect(screen.getByRole("button", { name: messages.buttons.run })).toBeEnabled();
  await run();
  expect(screen.getByRole("status")).toHaveTextContent(messages.status.success);
});

it.each(localeCases)("$locale times out, clears pending timers, repeats timeout on retry, and recovers", async ({ messages }) => {
  render(<ApiRescueLab messages={messages} />);
  select("slow");
  await run(1999);
  expect(screen.getByRole("status")).toHaveTextContent(messages.status.loading);
  await act(async () => { await vi.advanceTimersByTimeAsync(1); });
  expect(screen.getByRole("status")).toHaveTextContent(messages.failures.timeout);
  expect(screen.getByRole("button", { name: messages.buttons.retry })).toBeEnabled();
  expect(vi.getTimerCount()).toBe(0);
  await run(2000);
  expect(screen.getByRole("status")).toHaveTextContent(messages.failures.timeout);
  select("normal");
  await run();
  await act(async () => { await vi.advanceTimersByTimeAsync(5000); });
  expect(screen.getByRole("status")).toHaveTextContent(messages.status.success);
  expect(screen.getByText(messages.dataCaption.validated)).toBeVisible();
  expect(vi.getTimerCount()).toBe(0);
});

it.each(localeCases)("$locale cleans pending timers when unmounted", async ({ messages }) => {
  const { unmount } = render(<ApiRescueLab messages={messages} />);
  select("slow");
  fireEvent.click(screen.getByRole("button"));
  unmount();
  await act(async () => { await Promise.resolve(); });
  expect(vi.getTimerCount()).toBe(0);
});

it.each(localeCases)("$locale shows only the six latest translated events", async ({ messages, started, succeeded }) => {
  render(<ApiRescueLab messages={messages} />);
  for (let request = 0; request < 4; request++) await run();
  const log = screen.getAllByRole("list").find((element) => element.tagName === "OL");
  if (!log) throw new Error("Missing event log");
  expect(within(log).getAllByRole("listitem")).toHaveLength(6);
  expect(screen.queryByText(started)).not.toBeInTheDocument();
  expect(screen.queryByText(succeeded)).not.toBeInTheDocument();
  expect(within(log).getAllByRole("listitem")[0]).toHaveTextContent("2");
  expect(within(log).getAllByRole("listitem").at(-1)).toHaveTextContent("4");
});

it("renders retained tasks, status and earlier events consistently when copy changes", async () => {
  const { rerender } = render(<ApiRescueLab messages={labMessages.en} />);
  await run();
  select("server");
  await run();
  for (const { messages, started, succeeded, failed } of localeCases.slice(1)) {
    rerender(<ApiRescueLab messages={messages} />);
    expect(screen.getByRole("status")).toHaveTextContent(messages.failures.server);
    expect(screen.getByText(messages.taskTitles["TASK-01"])).toBeVisible();
    for (const status of Object.values(messages.taskStatuses)) expect(screen.getByText(status)).toBeVisible();
    expect(screen.getByText(started)).toBeVisible();
    expect(screen.getByText(succeeded)).toBeVisible();
    expect(screen.getByText(failed)).toBeVisible();
    expect(screen.getByRole("button", { name: messages.buttons.retry })).toBeEnabled();
    expect(screen.queryByText("Prepare activity report")).not.toBeInTheDocument();
    expect(screen.queryByText(localeCases[0].failed)).not.toBeInTheDocument();
  }
});

it.each(localeCases)("$locale displays a validated unknown task title without changing protocol data", ({ messages }) => {
  const task = { id: "CUSTOM-01", title: "A validated custom task", status: "Queued" } satisfies Parameters<typeof displayTaskTitle>[0];
  expect(displayTaskTitle(task, messages)).toBe("A validated custom task");
  expect(task).toEqual({ id: "CUSTOM-01", title: "A validated custom task", status: "Queued" });
});
