export type OrderStatus = "pending" | "completed" | "cancelled";
export type Category = "stationery" | "home" | "accessories";
export type Order = {
  readonly id: string;
  readonly date: string;
  readonly product: string;
  readonly category: Category;
  readonly amount: number;
  readonly status: OrderStatus;
};
export type Filters = {
  query: string;
  start: string;
  end: string;
  status: OrderStatus | "all";
  category: Category | "all";
};
export type SortKey = "date-asc" | "date-desc" | "amount-asc" | "amount-desc";

export const categories: readonly Category[] = ["stationery", "home", "accessories"];
export const statuses: readonly OrderStatus[] = ["pending", "completed", "cancelled"];
export const defaultFilters: Filters = { query: "", start: "", end: "", status: "all", category: "all" };

export const sampleOrders: readonly Order[] = [
  { id: "ORD-001", date: "2026-09-01", product: "Notebook", category: "stationery", amount: 1000, status: "completed" },
  { id: "ORD-002", date: "2026-09-01", product: "Desk lamp", category: "home", amount: 2000, status: "completed" },
  { id: "ORD-003", date: "2026-09-02", product: "Canvas bag", category: "accessories", amount: 9000, status: "cancelled" },
  { id: "ORD-004", date: "2026-09-02", product: "Pen set", category: "stationery", amount: 800, status: "pending" },
  { id: "ORD-005", date: "2026-09-04", product: "Ceramic cup", category: "home", amount: 1500, status: "completed" },
  { id: "ORD-006", date: "2026-09-04", product: "Key ring", category: "accessories", amount: 0, status: "completed" },
  { id: "ORD-007", date: "2026-09-05", product: "Notebook blue", category: "stationery", amount: 1000, status: "completed" },
  { id: "ORD-008", date: "2026-09-05", product: "Storage box", category: "home", amount: 3200, status: "pending" },
  { id: "ORD-009", date: "2026-09-07", product: "Travel pouch", category: "accessories", amount: 2400, status: "completed" },
  { id: "ORD-010", date: "2026-09-07", product: "Sticky notes", category: "stationery", amount: 450, status: "cancelled" },
  { id: "ORD-011", date: "2026-09-08", product: "Desk mat", category: "home", amount: 2800, status: "completed" },
  { id: "ORD-012", date: "2026-09-08", product: "Card holder", category: "accessories", amount: 1800, status: "pending" },
  { id: "ORD-013", date: "2026-09-10", product: "Notebook green", category: "stationery", amount: 1000, status: "completed" },
  { id: "ORD-014", date: "2026-09-10", product: "Plant pot", category: "home", amount: 2200, status: "cancelled" },
  { id: "ORD-015", date: "2026-09-11", product: "Canvas bag small", category: "accessories", amount: 3500, status: "completed" },
  { id: "ORD-016", date: "2026-09-11", product: "Pencil case", category: "stationery", amount: 1200, status: "pending" },
  { id: "ORD-017", date: "2026-09-13", product: "Coaster set", category: "home", amount: 900, status: "completed" },
  { id: "ORD-018", date: "2026-09-13", product: "Cable pouch", category: "accessories", amount: 1600, status: "completed" },
  { id: "ORD-019", date: "2026-09-14", product: "Bookmark", category: "stationery", amount: 300, status: "cancelled" },
  { id: "ORD-020", date: "2026-09-14", product: "Wall clock", category: "home", amount: 4200, status: "completed" },
];

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000-")) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateFilters(filters: Filters): "date" | null {
  if ((filters.start && !validDate(filters.start)) || (filters.end && !validDate(filters.end))) return "date";
  return filters.start && filters.end && filters.start > filters.end ? "date" : null;
}

export function parseAmount(input: string): number | null {
  if (!/^\d+$/.test(input)) return null;
  const amount = Number(input);
  return Number.isSafeInteger(amount) && amount <= 1_000_000 ? amount : null;
}

export function deriveView(orders: readonly Order[], filters: Filters, sort: SortKey) {
  const query = filters.query.trim().toLowerCase();
  const rows = orders.filter((order) =>
    (!query || order.id.toLowerCase().includes(query) || order.product.toLowerCase().includes(query)) &&
    (!filters.start || order.date >= filters.start) && (!filters.end || order.date <= filters.end) &&
    (filters.status === "all" || order.status === filters.status) &&
    (filters.category === "all" || order.category === filters.category),
  );
  rows.sort((a, b) => {
    const difference = sort.startsWith("date") ? a.date.localeCompare(b.date) : a.amount - b.amount;
    return (sort.endsWith("desc") ? -difference : difference) || a.id.localeCompare(b.id);
  });
  const completed = rows.filter((order) => order.status === "completed");
  const revenue = completed.reduce((sum, order) => sum + order.amount, 0);
  const byCategory = categories
    .filter((category) => filters.category === "all" || category === filters.category)
    .map((category) => ({ category, revenue: completed.filter((order) => order.category === category).reduce((sum, order) => sum + order.amount, 0) }));
  const daily: { label: string; revenue: number }[] = [];
  if (rows.length > 0) {
    const dates = orders.map((order) => order.date).sort();
    const first = dates[0];
    const last = dates[dates.length - 1];
    if (first && last) {
      const start = filters.start && filters.start > first ? filters.start : first;
      const end = filters.end && filters.end < last ? filters.end : last;
      const totals = new Map<string, number>();
      for (const order of completed) totals.set(order.date, (totals.get(order.date) ?? 0) + order.amount);
      const cursor = new Date(`${start}T00:00:00.000Z`);
      while (cursor.toISOString().slice(0, 10) <= end) {
        const label = cursor.toISOString().slice(0, 10);
        daily.push({ label, revenue: totals.get(label) ?? 0 });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
    }
  }
  return { rows, totalOrders: rows.length, completedOrders: completed.length, revenue, daily, byCategory };
}
