import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import ApiRescueLab from "./api-rescue-lab";

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { cleanup(); vi.clearAllTimers(); vi.useRealTimers(); });

function select(name: string) { fireEvent.click(screen.getByRole("radio", { name: new RegExp(name) })); }
async function run(milliseconds = 600) {
  fireEvent.click(screen.getByRole("button"));
  await act(async () => { await vi.advanceTimersByTimeAsync(milliseconds); });
}

it("starts empty and loads all validated tasks", async () => {
  render(<ApiRescueLab />);
  expect(screen.getByText("No data loaded yet")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: /Run request/ }));
  expect(screen.getByRole("radio", { name: /^Normal/ })).toBeDisabled();
  await act(async () => { await vi.advanceTimersByTimeAsync(600); });
  expect(screen.getByText("Prepare activity report")).toBeVisible();
  expect(screen.getByText("Process sample records")).toBeVisible();
  expect(screen.getByText("Refresh dashboard summary")).toBeVisible();
  expect(screen.getByRole("status")).toHaveTextContent("Request succeeded");
  expect(vi.getTimerCount()).toBe(0);
});

it.each(["Server error", "Invalid data"])("preserves last successful data after %s", async (scenario) => {
  render(<ApiRescueLab />);
  await run();
  select(scenario);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByText("Showing last successful response")).toBeVisible();
  await act(async () => { await vi.advanceTimersByTimeAsync(600); });
  expect(screen.getByText("Prepare activity report")).toBeVisible();
  expect(screen.getByText("Showing last successful response")).toBeVisible();
  expect(screen.getByRole("button", { name: /Retry/ })).toBeEnabled();
  expect(screen.getByRole("status")).toHaveTextContent(scenario === "Server error" ? "could not complete" : "was rejected");
});

it("does not invent baseline data and retry preserves the failed scenario", async () => {
  render(<ApiRescueLab />);
  select("Server error");
  await run();
  await run();
  expect(screen.getByRole("status")).toHaveTextContent("could not complete");
  expect(screen.getByText("No data loaded yet")).toBeVisible();
  expect(screen.queryByText("Prepare activity report")).not.toBeInTheDocument();
  select("Normal");
  expect(screen.getByRole("button", { name: /Run request/ })).toBeEnabled();
});

it("times out, recovers with Normal, and cannot be overwritten by the late response", async () => {
  render(<ApiRescueLab />);
  select("Slow response");
  await run(2000);
  expect(screen.getByRole("status")).toHaveTextContent("stopped after 2 seconds");
  expect(vi.getTimerCount()).toBe(0);
  select("Normal");
  await run();
  await act(async () => { await vi.advanceTimersByTimeAsync(5000); });
  expect(screen.getByRole("status")).toHaveTextContent("Request succeeded");
  expect(screen.getByText("Showing validated response")).toBeVisible();
  expect(vi.getTimerCount()).toBe(0);
});

it("cleans pending timers when unmounted", async () => {
  const { unmount } = render(<ApiRescueLab />);
  select("Slow response");
  fireEvent.click(screen.getByRole("button"));
  unmount();
  await act(async () => { await Promise.resolve(); });
  expect(vi.getTimerCount()).toBe(0);
});
