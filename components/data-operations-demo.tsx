"use client";

import { useEffect, useId, useReducer, useRef } from "react";
import { dataOperationsUi } from "../content/data-operations-ui";
import { categories, defaultFilters, deriveView, parseAmount, sampleOrders, statuses, validateFilters, type Filters, type Order, type OrderStatus, type SortKey } from "../lib/data-operations";
import type { Locale } from "../lib/i18n";
import OrderCharts from "./order-charts";

type Editor = { kind: "closed" } | { kind: "editing"; id: string; amount: string; status: OrderStatus; invalid: boolean };
type Notice = "saved" | "excluded" | "cancelled" | "filtered" | "filterReset" | "sampleReset" | null;
type State = { orders: readonly Order[]; draft: Filters; applied: Filters; sort: SortKey; editor: Editor; filterInvalid: boolean; notice: Notice; focus: { id: string; revision: number } | null };
type Action = { type: "filter"; filters: Filters } | { type: "apply" } | { type: "resetFilters" } | { type: "resetSample" } | { type: "sort"; sort: SortKey } | { type: "open"; order: Order } | { type: "edit"; amount: string; status: OrderStatus } | { type: "save" } | { type: "cancel" };

function initialState(): State {
  return { orders: sampleOrders, draft: defaultFilters, applied: defaultFilters, sort: "date-asc", editor: { kind: "closed" }, filterInvalid: false, notice: null, focus: null };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "filter": return { ...state, draft: action.filters };
    case "sort": return { ...state, sort: action.sort };
    case "open": return { ...state, editor: { kind: "editing", id: action.order.id, amount: String(action.order.amount), status: action.order.status, invalid: false }, notice: null };
    case "edit": return state.editor.kind === "closed" ? state : { ...state, editor: { ...state.editor, amount: action.amount, status: action.status, invalid: false } };
    case "apply": {
      const invalid = validateFilters(state.draft) !== null;
      return { ...state, applied: invalid ? state.applied : state.draft, filterInvalid: invalid, editor: { kind: "closed" }, notice: invalid ? null : "filtered" };
    }
    case "resetFilters": return { ...state, draft: defaultFilters, applied: defaultFilters, filterInvalid: false, editor: { kind: "closed" }, notice: "filterReset" };
    case "resetSample": return { ...initialState(), notice: "sampleReset" };
    case "cancel": return state.editor.kind === "closed" ? state : { ...state, editor: { kind: "closed" }, notice: "cancelled", focus: { id: state.editor.id, revision: (state.focus?.revision ?? 0) + 1 } };
    case "save": {
      const editor = state.editor;
      if (editor.kind === "closed") return state;
      const amount = parseAmount(editor.amount);
      if (amount === null) return { ...state, editor: { ...editor, invalid: true } };
      const orders = state.orders.map((order) => order.id === editor.id ? { ...order, amount, status: editor.status } : order);
      const visible = deriveView(orders, state.applied, state.sort).rows.some((order) => order.id === editor.id);
      return { ...state, orders, editor: { kind: "closed" }, notice: visible ? "saved" : "excluded", focus: { id: editor.id, revision: (state.focus?.revision ?? 0) + 1 } };
    }
  }
}

function isStatus(value: string): value is OrderStatus { return statuses.some((status) => status === value); }
function isSort(value: string): value is SortKey { return ["date-asc", "date-desc", "amount-asc", "amount-desc"].includes(value); }

export default function DataOperationsDemo({ locale }: { locale: Locale }) {
  const copy = dataOperationsUi[locale];
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const uid = useId();
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const editButtons = useRef(new Map<string, HTMLButtonElement>());
  const amountInput = useRef<HTMLInputElement>(null);
  const view = deriveView(state.orders, state.applied, state.sort);
  const formatter = new Intl.NumberFormat(locale);
  const editor = state.editor;
  const editingOrder = editor.kind === "editing" ? state.orders.find((order) => order.id === editor.id) : undefined;
  const editingId = editor.kind === "editing" ? editor.id : null;

  useEffect(() => { if (state.focus) (editButtons.current.get(state.focus.id) ?? resultHeading.current)?.focus(); }, [state.focus]);
  useEffect(() => { if (editingId) amountInput.current?.focus(); }, [editingId]);

  return <section className="orders-demo" aria-labelledby={`${uid}-title`}>
    <h2 id={`${uid}-title`}>{copy.title}</h2>
    <p>{copy.intro}</p>
    <form className="orders-filters" noValidate onSubmit={(event) => { event.preventDefault(); dispatch({ type: "apply" }); }}>
      <label>{copy.query}<input type="search" value={state.draft.query} onChange={(event) => dispatch({ type: "filter", filters: { ...state.draft, query: event.target.value } })} /></label>
      <label>{copy.start}<input type="date" value={state.draft.start} aria-invalid={state.filterInvalid} aria-describedby={state.filterInvalid ? `${uid}-filter-error` : undefined} onChange={(event) => dispatch({ type: "filter", filters: { ...state.draft, start: event.target.value } })} /></label>
      <label>{copy.end}<input type="date" value={state.draft.end} aria-invalid={state.filterInvalid} aria-describedby={state.filterInvalid ? `${uid}-filter-error` : undefined} onChange={(event) => dispatch({ type: "filter", filters: { ...state.draft, end: event.target.value } })} /></label>
      <label>{copy.status}<select value={state.draft.status} onChange={(event) => { const value = event.target.value; if (value === "all" || isStatus(value)) dispatch({ type: "filter", filters: { ...state.draft, status: value } }); }}><option value="all">{copy.all}</option>{statuses.map((status) => <option key={status} value={status}>{copy.statuses[status]}</option>)}</select></label>
      <label>{copy.category}<select value={state.draft.category} onChange={(event) => { const value = event.target.value; const category = categories.find((item) => item === value); if (value === "all" || category) dispatch({ type: "filter", filters: { ...state.draft, category: category ?? "all" } }); }}><option value="all">{copy.all}</option>{categories.map((category) => <option key={category} value={category}>{copy.categories[category]}</option>)}</select></label>
      <div className="orders-toolbar"><button type="submit">{copy.apply}</button><button type="button" onClick={() => dispatch({ type: "resetFilters" })}>{copy.resetFilters}</button></div>
    </form>
    {state.filterInvalid && <p id={`${uid}-filter-error`} role="alert">{copy.filterError}</p>}
    <div className="orders-toolbar"><label>{copy.sort}<select value={state.sort} onChange={(event) => { if (isSort(event.target.value)) dispatch({ type: "sort", sort: event.target.value }); }}><option value="date-asc">{copy.dateAsc}</option><option value="date-desc">{copy.dateDesc}</option><option value="amount-asc">{copy.amountAsc}</option><option value="amount-desc">{copy.amountDesc}</option></select></label><button type="button" onClick={() => dispatch({ type: "resetSample" })}>{copy.resetSample}</button></div>
    <dl className="orders-summary"><div><dt>{copy.total}</dt><dd>{formatter.format(view.totalOrders)}</dd></div><div><dt>{copy.completed}</dt><dd>{formatter.format(view.completedOrders)}</dd></div><div><dt>{copy.revenue}</dt><dd>{formatter.format(view.revenue)}</dd></div></dl>
    <p role="status">{state.notice ? copy[state.notice] : ""}</p>
    {view.totalOrders === 0 ? <p>{copy.noResults}</p> : view.completedOrders === 0 ? <p>{copy.noCompleted}</p> : view.revenue === 0 ? <p>{copy.zeroRevenue}</p> : null}
    {view.totalOrders > 0 && <OrderCharts daily={view.daily} categories={view.byCategory.map((item) => ({ label: copy.categories[item.category], revenue: item.revenue }))} dailyTitle={copy.daily} categoryTitle={copy.byCategory} revenueLabel={copy.revenue} valuesLabel={copy.values} dateLabel={copy.date} categoryLabel={copy.category} locale={locale} />}
    <h3 ref={resultHeading} tabIndex={-1}>{copy.results}</h3>
    <div className="orders-table-scroll"><table><caption>{copy.results}</caption>
      <thead><tr>
        <th scope="col">{copy.id}</th>
        <th scope="col" aria-sort={state.sort.startsWith("date") ? state.sort.endsWith("asc") ? "ascending" : "descending" : undefined}>{copy.date}</th>
        <th scope="col">{copy.product}</th><th scope="col">{copy.category}</th>
        <th scope="col" aria-sort={state.sort.startsWith("amount") ? state.sort.endsWith("asc") ? "ascending" : "descending" : undefined}>{copy.amount}</th>
        <th scope="col">{copy.status}</th><th scope="col">{copy.action}</th>
      </tr></thead>
      <tbody>{view.rows.map((order) => <tr key={order.id}>
        <th scope="row">{order.id}</th><td>{order.date}</td><td>{order.product}</td>
        <td>{copy.categories[order.category]}</td><td>{formatter.format(order.amount)}</td><td>{copy.statuses[order.status]}</td>
        <td><button type="button" ref={(button) => { if (button) editButtons.current.set(order.id, button); else editButtons.current.delete(order.id); }}
          aria-label={`${copy.edit} ${order.id}`} aria-expanded={editingId === order.id}
          aria-controls={editingId === order.id ? `${uid}-editor` : undefined}
          onClick={() => dispatch({ type: "open", order })}>{copy.edit}</button></td>
      </tr>)}</tbody>
    </table></div>
    {editor.kind === "editing" && editingOrder && <form id={`${uid}-editor`} className="orders-editor" aria-labelledby={`${uid}-editor-title`} noValidate onSubmit={(event) => { event.preventDefault(); dispatch({ type: "save" }); }}>
      <h3 id={`${uid}-editor-title`}>{copy.editor}: {editor.id}</h3><p>{copy.editHint}</p>
      <dl><div><dt>{copy.date}</dt><dd>{editingOrder.date}</dd></div><div><dt>{copy.product}</dt><dd>{editingOrder.product}</dd></div><div><dt>{copy.category}</dt><dd>{copy.categories[editingOrder.category]}</dd></div></dl>
      <label>{copy.amount}<input ref={amountInput} inputMode="numeric" value={editor.amount} aria-invalid={editor.invalid} aria-describedby={editor.invalid ? `${uid}-amount-error` : undefined} onChange={(event) => dispatch({ type: "edit", amount: event.target.value, status: editor.status })} /></label>
      {editor.invalid && <p id={`${uid}-amount-error`} role="alert">{copy.amountError}</p>}
      <label>{copy.status}<select value={editor.status} onChange={(event) => { if (isStatus(event.target.value)) dispatch({ type: "edit", amount: editor.amount, status: event.target.value }); }}>{statuses.map((status) => <option key={status} value={status}>{copy.statuses[status]}</option>)}</select></label>
      <button type="submit">{copy.save}</button><button type="button" onClick={() => dispatch({ type: "cancel" })}>{copy.cancel}</button>
    </form>}
  </section>;
}
