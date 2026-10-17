"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Locale } from "../lib/i18n";

type Point = { label: string; revenue: number };
type Props = {
  daily: readonly Point[];
  categories: readonly Point[];
  dailyTitle: string;
  categoryTitle: string;
  revenueLabel: string;
  valuesLabel: string;
  dateLabel: string;
  categoryLabel: string;
  locale: Locale;
};

function Values({ points, title, label, revenueLabel, valuesLabel, money }: {
  points: readonly Point[]; title: string; label: string; revenueLabel: string;
  valuesLabel: string; money: (value: number) => string;
}) {
  return <details className="orders-chart-values"><summary>{valuesLabel}</summary>
    <div className="orders-table-scroll"><table><caption className="sr-only">{title}</caption>
      <thead><tr><th scope="col">{label}</th><th scope="col">{revenueLabel}</th></tr></thead>
      <tbody>{points.map((point) => <tr key={point.label}><th scope="row">{point.label}</th><td>{money(point.revenue)}</td></tr>)}</tbody>
    </table></div>
  </details>;
}

export default function OrderCharts({ daily, categories, dailyTitle, categoryTitle, revenueLabel, valuesLabel, dateLabel, categoryLabel, locale }: Props) {
  const money = (value: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(value);
  const tick = (value: number) => value >= 1000 ? `${value / 1000}k` : String(value);
  return <div className="orders-charts">
    <figure className="orders-chart" aria-label={dailyTitle}>
      <figcaption>{dailyTitle} <span>JPY</span></figcaption>
      {daily.length > 0 && <div className="orders-chart-canvas"><ResponsiveContainer width="100%" height={260} minWidth={0} initialDimension={{ width: 480, height: 260 }}>
        <LineChart data={[...daily]} margin={{ top: 12, right: 20, bottom: 10, left: 0 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis dataKey="label" tickFormatter={(value: string) => value.slice(5)} minTickGap={20} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} />
          <YAxis tickFormatter={tick} width={48} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} />
          <Tooltip formatter={(value) => [money(Number(value)), revenueLabel]} />
          <Line type="linear" dataKey="revenue" name={revenueLabel} stroke="var(--primary-action)" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer></div>}
      <Values points={daily} title={dailyTitle} label={dateLabel} revenueLabel={revenueLabel} valuesLabel={valuesLabel} money={money} />
    </figure>
    <figure className="orders-chart" aria-label={categoryTitle}>
      <figcaption>{categoryTitle} <span>JPY</span></figcaption>
      {categories.length > 0 && <div className="orders-chart-canvas"><ResponsiveContainer width="100%" height={260} minWidth={0} initialDimension={{ width: 480, height: 260 }}>
        <BarChart data={[...categories]} margin={{ top: 12, right: 20, bottom: 10, left: 0 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} interval={0} />
          <YAxis tickFormatter={tick} width={48} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} />
          <Tooltip formatter={(value) => [money(Number(value)), revenueLabel]} />
          <Bar dataKey="revenue" name={revenueLabel} fill="var(--primary-action)" radius={[5, 5, 0, 0]} maxBarSize={72} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer></div>}
      <Values points={categories} title={categoryTitle} label={categoryLabel} revenueLabel={revenueLabel} valuesLabel={valuesLabel} money={money} />
    </figure>
  </div>;
}
