import { describe, expect, it } from "vitest";
import { defaultFilters, deriveView, parseAmount, sampleOrders, validateFilters, type Filters } from "./data-operations";

const fixture = sampleOrders.slice(0, 3);
const view = (filters: Partial<Filters> = {}) => deriveView(fixture, { ...defaultFilters, ...filters }, "date-desc");
const chartTotal = (points: { revenue: number }[]) => points.reduce((sum, point) => sum + point.revenue, 0);

describe("data operations domain", () => {
  it("D01 / F01 F06–F08 / A01: excludes cancelled amounts from all revenue totals", () => {
    const result = view();
    expect([result.totalOrders, result.completedOrders, result.revenue]).toEqual([3, 2, 3000]);
    expect(chartTotal(result.daily)).toBe(3000);
    expect(chartTotal(result.byCategory)).toBe(3000);
  });

  it("D02 / F09 / A02: derives updated totals from saved orders without changing the original", () => {
    const completed = fixture.map((order) => order.id === "ORD-003" ? { ...order, status: "completed" as const } : order);
    expect(deriveView(completed, defaultFilters, "date-desc").revenue).toBe(12000);
    const changed = completed.map((order) => order.id === "ORD-003" ? { ...order, amount: 4000 } : order);
    const result = deriveView(changed, defaultFilters, "date-desc");
    expect(result.revenue).toBe(7000);
    expect(chartTotal(result.daily)).toBe(7000);
    expect(chartTotal(result.byCategory)).toBe(7000);
    expect(view().revenue).toBe(3000);
  });

  it("D03 / F02 F06 / A03: applies status to rows and both charts", () => {
    const result = view({ status: "cancelled" });
    expect([result.totalOrders, result.completedOrders, result.revenue]).toEqual([1, 0, 0]);
    expect(chartTotal(result.daily)).toBe(0);
    expect(chartTotal(result.byCategory)).toBe(0);
  });

  it("D04 / F02 / A04: combines trimmed case-insensitive search with inclusive bounds and category", () => {
    const result = deriveView(sampleOrders, { ...defaultFilters, query: "  NOTEBOOK  ", start: "2026-09-05", end: "2026-09-10", category: "stationery", status: "completed" }, "date-asc");
    expect(result.rows.map((order) => order.id)).toEqual(["ORD-007", "ORD-013"]);
    expect(result.revenue).toBe(2000);
    expect(result.daily.map((point) => point.label)).toEqual(["2026-09-05", "2026-09-06", "2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10"]);
    expect(result.byCategory).toEqual([{ category: "stationery", revenue: 2000 }]);
    expect(view({ query: "ord-003" }).rows[0]?.id).toBe("ORD-003");
  });

  it("D05 / F03 / A04: sorts each column and preserves totals and deterministic ascending ID ties", () => {
    const orders = [sampleOrders[6], sampleOrders[0], sampleOrders[1]].filter((order) => order !== undefined);
    expect(deriveView(orders, defaultFilters, "amount-asc").rows.map((order) => order.id)).toEqual(["ORD-001", "ORD-007", "ORD-002"]);
    expect(deriveView(orders, defaultFilters, "amount-desc").rows.map((order) => order.id)).toEqual(["ORD-002", "ORD-001", "ORD-007"]);
    expect(deriveView(orders, defaultFilters, "date-asc").rows.map((order) => order.id)).toEqual(["ORD-001", "ORD-002", "ORD-007"]);
    expect(deriveView(orders, defaultFilters, "date-desc").rows.map((order) => order.id)).toEqual(["ORD-007", "ORD-001", "ORD-002"]);
    for (const sort of ["date-asc", "date-desc", "amount-asc", "amount-desc"] as const) expect(deriveView(orders, defaultFilters, sort).revenue).toBe(4000);
    expect(orders.map((order) => order.id)).toEqual(["ORD-007", "ORD-001", "ORD-002"]);
  });

  it.each(["", "-1", "+1", "1.2", "1e3", "1,000", "NaN", "Infinity", "1000001", " 100", "100 "])("D06 / F05 / A05: rejects invalid amount %j", (input) => expect(parseAmount(input)).toBeNull());
  it.each([["0", 0], ["1000000", 1000000], ["0042", 42]])("D07 / F05 / A05: accepts integer boundary %s", (input, expected) => expect(parseAmount(input)).toBe(expected));

  it.each(["2026-02-29", "2026-04-31", "2026-13-01", "2026-00-01", "2026-01-00", "0000-01-01", "2026-1-01", "not-a-date"])("D08 / F02 / A05: rejects invalid calendar date %s", (start) => expect(validateFilters({ ...defaultFilters, start })).toBe("date"));
  it("D09 / F02 / A05: accepts leap days and open ranges, rejects reversed or invalid end dates", () => {
    expect(validateFilters({ ...defaultFilters, start: "2024-02-29" })).toBeNull();
    expect(validateFilters(defaultFilters)).toBeNull();
    expect(validateFilters({ ...defaultFilters, start: "2026-09-02", end: "2026-09-01" })).toBe("date");
    expect(validateFilters({ ...defaultFilters, end: "1900-02-29" })).toBe("date");
    expect(validateFilters({ ...defaultFilters, start: "2000-02-29", end: "2000-02-29" })).toBeNull();
  });

  it("D10 / F06–F08 / A07: distinguishes no matching rows, no completed rows and completed zero amounts", () => {
    expect(view({ query: "missing" })).toMatchObject({ rows: [], totalOrders: 0, completedOrders: 0, revenue: 0, daily: [] });
    const zero = deriveView(sampleOrders, { ...defaultFilters, query: "ORD-006" }, "date-desc");
    expect([zero.totalOrders, zero.completedOrders, zero.revenue]).toEqual([1, 1, 0]);
    expect(zero.daily).toHaveLength(14);
    expect(view({ status: "pending" }).completedOrders).toBe(0);
  });

  it("D11 / F07 / A07: fills gaps and clamps open and extreme filter bounds to the sample extent", () => {
    const all = deriveView(sampleOrders, { ...defaultFilters, start: "0001-01-01", end: "9999-12-31" }, "date-desc");
    expect(all.daily).toHaveLength(14);
    expect(all.daily.find((point) => point.label === "2026-09-03")?.revenue).toBe(0);
    expect(all.daily[0]?.label).toBe("2026-09-01");
    expect(all.daily.at(-1)?.label).toBe("2026-09-14");
    expect(view({ start: "2027-01-01" }).daily).toEqual([]);
    expect(deriveView([], defaultFilters, "date-desc").daily).toEqual([]);
  });
});
