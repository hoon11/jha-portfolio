import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import DataOperationsDemo from "./data-operations-demo";
import { deriveView, defaultFilters, sampleOrders } from "../lib/data-operations";
import { dataOperationsUi } from "../content/data-operations-ui";
import { locales } from "../lib/i18n";

// jsdom has no layout measurement for responsive chart containers. Browser checks use the real charts.
vi.mock("./order-charts", () => ({ default: ({ daily, categories }: { daily: { revenue: number }[]; categories: { revenue: number }[] }) => <div data-testid="chart-totals">{daily.reduce((sum, point) => sum + point.revenue, 0)} / {categories.reduce((sum, point) => sum + point.revenue, 0)}</div> }));
afterEach(cleanup);

function applySearch(query: string) {
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: query } });
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
}
function open(id = "ORD-003") { fireEvent.click(screen.getByRole("button", { name: `Edit ${id}` })); }
function editor() { return screen.getByRole("form", { name: /Order details/ }); }
function changeAmount(value: string) { fireEvent.change(within(editor()).getByRole("textbox", { name: "Amount (JPY)" }), { target: { value } }); }

it("U01 displays saved-order totals and chart totals from the same dataset", () => {
  render(<DataOperationsDemo locale="en" />);
  const view = deriveView(sampleOrders, defaultFilters, "date-asc");
  expect(screen.getByTestId("chart-totals")).toHaveTextContent(`${view.revenue} / ${view.revenue}`);
  expect(screen.getAllByRole("button", { name: /^Edit ORD-/ })).toHaveLength(view.totalOrders);
});

it("U02 keeps drafts out of aggregates, validates amounts, saves and restores origin focus", () => {
  render(<DataOperationsDemo locale="en" />);
  applySearch("ORD-003");
  open();
  const form = editor();
  fireEvent.change(within(form).getByRole("combobox", { name: "Status" }), { target: { value: "completed" } });
  expect(screen.getByTestId("chart-totals")).toHaveTextContent("0 / 0");
  changeAmount("1.5");
  fireEvent.click(within(form).getByRole("button", { name: "Save changes" }));
  expect(screen.getByRole("alert")).toHaveTextContent("whole number");
  expect(screen.getByTestId("chart-totals")).toHaveTextContent("0 / 0");
  changeAmount("4000");
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
  expect(screen.queryByRole("form", { name: /Order details/ })).not.toBeInTheDocument();
  expect(screen.getByTestId("chart-totals")).toHaveTextContent("4000 / 4000");
  expect(screen.getByRole("button", { name: "Edit ORD-003" })).toHaveFocus();
});

it("U03 cancels edits without changing saved data and returns keyboard focus", () => {
  render(<DataOperationsDemo locale="en" />);
  applySearch("ORD-003"); open(); changeAmount("25");
  fireEvent.click(screen.getByRole("button", { name: "Cancel editing" }));
  expect(screen.getByRole("button", { name: "Edit ORD-003" })).toHaveFocus();
  expect(screen.getByRole("row", { name: /ORD-003/ })).toHaveTextContent("9,000");
  expect(screen.getByTestId("chart-totals")).toHaveTextContent("0 / 0");
});

it("U04 preserves last valid results on invalid dates and discards the open edit", () => {
  render(<DataOperationsDemo locale="en" />);
  applySearch("ORD-003"); open(); changeAmount("25");
  fireEvent.change(screen.getByLabelText("Start date"), { target: { value: "2026-10-10" } });
  fireEvent.change(screen.getByLabelText("End date"), { target: { value: "2026-10-01" } });
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Previous results");
  expect(screen.getByRole("row", { name: /ORD-003/ })).toHaveTextContent("9,000");
  expect(screen.queryByRole("form", { name: /Order details/ })).not.toBeInTheDocument();
});

it("U05 explains a saved order leaving the filter and focuses the result heading", () => {
  render(<DataOperationsDemo locale="en" />);
  fireEvent.change(screen.getByLabelText("Status"), { target: { value: "cancelled" } });
  applySearch("ORD-003"); open();
  fireEvent.change(within(editor()).getByRole("combobox", { name: "Status" }), { target: { value: "completed" } });
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
  expect(screen.getByRole("status")).toHaveTextContent("no longer matches");
  expect(screen.getByRole("heading", { name: "Order results" })).toHaveFocus();
  expect(screen.getByText("No orders match these filters.")).toBeInTheDocument();
});

it("U06 filter reset retains saved edits; sample reset restores data, filters and sort", () => {
  render(<DataOperationsDemo locale="en" />);
  applySearch("ORD-003"); open(); changeAmount("25");
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
  fireEvent.change(screen.getByLabelText("Sort orders"), { target: { value: "amount-desc" } });
  fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
  expect(screen.getByRole("row", { name: /ORD-003/ })).toHaveTextContent("25");
  open(); changeAmount("99");
  fireEvent.click(screen.getByRole("button", { name: "Reset sample (discards edits)" }));
  expect(screen.getByRole("row", { name: /ORD-003/ })).toHaveTextContent("9,000");
  expect(screen.getByLabelText("Sort orders")).toHaveValue("date-asc");
  expect(screen.getByRole("searchbox")).toHaveValue("");
  expect(screen.queryByRole("form", { name: /Order details/ })).not.toBeInTheDocument();
});

it("U07 distinguishes no completed orders from completed orders with zero revenue", () => {
  render(<DataOperationsDemo locale="en" />);
  applySearch("ORD-003");
  expect(screen.getByText(/Matching orders exist, but none/)).toBeInTheDocument();
  open(); changeAmount("0");
  fireEvent.change(within(editor()).getByRole("combobox", { name: "Status" }), { target: { value: "completed" } });
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
  expect(screen.getByText("Completed orders exist, with total revenue of zero.")).toBeInTheDocument();
  expect(screen.queryByText(/Matching orders exist, but none/)).not.toBeInTheDocument();
});

it.each(locales)("U08 supplies native labeled editing and filtering controls in %s", (locale) => {
  render(<DataOperationsDemo locale={locale} />);
  const copy = dataOperationsUi[locale];
  expect(screen.getByRole("heading", { name: copy.title })).toBeInTheDocument();
  expect(screen.getByRole("searchbox", { name: copy.query })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: `${copy.edit} ORD-001` }));
  expect(screen.getByRole("textbox", { name: copy.amount })).toHaveFocus();
  expect(screen.getByRole("button", { name: copy.save })).toBeInTheDocument();
});

it("U09 combines search, inclusive dates, status and category; sort changes only row order", () => {
  render(<DataOperationsDemo locale="en" />);
  fireEvent.change(screen.getByLabelText("Start date"), { target: { value: "2026-09-01" } });
  fireEvent.change(screen.getByLabelText("End date"), { target: { value: "2026-09-05" } });
  fireEvent.change(screen.getByLabelText("Status"), { target: { value: "completed" } });
  fireEvent.change(screen.getByLabelText("Category"), { target: { value: "stationery" } });
  applySearch("  NOTEBOOK  ");
  expect(screen.getAllByRole("button", { name: /^Edit ORD-/ }).map((button) => button.getAttribute("aria-label"))).toEqual(["Edit ORD-001", "Edit ORD-007"]);
  expect(screen.getByTestId("chart-totals")).toHaveTextContent("2000 / 2000");
  fireEvent.change(screen.getByLabelText("Sort orders"), { target: { value: "date-desc" } });
  expect(within(screen.getByRole("table", { name: "Order results" })).getByRole("columnheader", { name: "Date" })).toHaveAttribute("aria-sort", "descending");
  expect(screen.getAllByRole("button", { name: /^Edit ORD-/ }).map((button) => button.getAttribute("aria-label"))).toEqual(["Edit ORD-007", "Edit ORD-001"]);
  expect(screen.getByTestId("chart-totals")).toHaveTextContent("2000 / 2000");
});

it("U10 keeps the applied summary and results unchanged until valid filters are applied", () => {
  render(<DataOperationsDemo locale="en" />);
  const summary = screen.getByRole("region", { name: "Applied filters" });
  expect(summary).toHaveTextContent(`Matching orders: ${sampleOrders.length}`);
  expect(summary).toHaveTextContent("All dates");
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "ORD-003" } });
  expect(screen.getByText(/You have unapplied filter changes/)).toBeInTheDocument();
  expect(summary).not.toHaveTextContent("ORD-003");
  expect(screen.getAllByRole("button", { name: /^Edit ORD-/ })).toHaveLength(sampleOrders.length);
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  expect(summary).toHaveTextContent("Matching orders: 1");
  expect(summary).toHaveTextContent("Search: “ORD-003”");
  expect(screen.queryByText(/You have unapplied filter changes/)).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Start date"), { target: { value: "2026-10-10" } });
  fireEvent.change(screen.getByLabelText("End date"), { target: { value: "2026-10-01" } });
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(summary).toHaveTextContent("All dates");
  expect(summary).toHaveTextContent("Search: “ORD-003”");
  expect(summary).not.toHaveTextContent("2026-10-10");
  expect(screen.getByText(/You have unapplied filter changes/)).toBeInTheDocument();
});

it("U11 clears pending conditions on reversion and resets, and describes open date bounds", () => {
  render(<DataOperationsDemo locale="en" />);
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Notebook" } });
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "" } });
  expect(screen.queryByText(/You have unapplied filter changes/)).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("End date"), { target: { value: "2026-09-05" } });
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  expect(screen.getByRole("region", { name: "Applied filters" })).toHaveTextContent("Period: No start date → 2026-09-05");
  fireEvent.change(screen.getByLabelText("Status"), { target: { value: "pending" } });
  fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
  expect(screen.queryByText(/You have unapplied filter changes/)).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Notebook" } });
  fireEvent.click(screen.getByRole("button", { name: "Reset sample (discards edits)" }));
  expect(screen.queryByText(/You have unapplied filter changes/)).not.toBeInTheDocument();
});

it("U12 places the labeled editor immediately after its selected order and moves it with selection", () => {
  render(<DataOperationsDemo locale="en" />);
  open("ORD-003");
  const selectedRow = screen.getByRole("button", { name: "Edit ORD-003" }).closest("tr");
  expect(selectedRow).toHaveAttribute("data-editing", "true");
  expect(selectedRow?.nextElementSibling).toContainElement(editor());
  expect(within(editor()).getByRole("textbox", { name: "Amount (JPY)" })).toHaveFocus();
  open("ORD-001");
  expect(selectedRow).toHaveAttribute("data-editing", "false");
  expect(screen.getByRole("button", { name: "Edit ORD-001" }).closest("tr")?.nextElementSibling).toContainElement(editor());
  expect(within(editor()).getByRole("textbox", { name: "Amount (JPY)" })).toHaveFocus();
  fireEvent.click(screen.getByRole("button", { name: "Cancel editing" }));
  expect(screen.getByRole("button", { name: "Edit ORD-001" })).toHaveFocus();
});
