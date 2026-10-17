"use client";

import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { hvacMessages } from "../content/hvac-messages";
import { devices, getDevice, sampleReference, type DeviceId } from "../lib/hvac-monitoring";
import type { Locale } from "../lib/i18n";
import HvacBuilding from "./hvac-building";

export default function HvacMonitoringDemo({ locale }: { locale: Locale }) {
  const copy = hvacMessages(locale);
  const [selectedId, setSelectedId] = useState<DeviceId>("AC-101");
  const [announcement, setAnnouncement] = useState("");
  const selected = getDevice(selectedId);
  const temperature = (value: number | null) => value === null ? `— (${copy.missing})` : `${value.toFixed(1)} °C`;
  function selectDevice(id: DeviceId) {
    setSelectedId(id);
    setAnnouncement(`${copy.selected}: ${id} · ${copy.rooms[getDevice(id).room]}`);
  }

  return <div className="hvac-monitor">
    <div className="hvac-monitor-heading"><p className="hvac-reference">{copy.reference}: {sampleReference}</p></div>
    <p role="status" aria-live="polite" className="sr-only">{announcement}</p>
    <div className="hvac-monitor-grid">
      <section className="hvac-diagram-panel" aria-label={copy.building}>
        <h2>{copy.building}</h2><p>{copy.previewHint}</p>
        <HvacBuilding selectedId={selectedId} onSelect={selectDevice} copy={copy} />
        <a href="#hvac-device-details">{copy.details} →</a>
      </section>
      <section className="hvac-detail-panel" id="hvac-device-details" aria-label={copy.details} tabIndex={-1}>
        <p className="eyebrow">{copy.selectedDevice}</p>
        <div className="hvac-detail-title"><h2>{selected.id}</h2><span className={`hvac-badge hvac-badge--${selected.freshness}`}>{copy[selected.freshness]}</span></div>
        {selected.freshness === "stale" && <p className="hvac-stale-notice">{copy.lastKnownNotice}</p>}
        <dl className="hvac-device-facts">
          <div><dt>{copy.room}</dt><dd>{selected.floor}F · {copy.rooms[selected.room]}</dd></div>
          <div><dt>{copy.operation}</dt><dd>{copy[selected.operation]}</dd></div>
          <div><dt>{selected.freshness === "stale" ? copy.lastKnownTemperature : copy.temperature}</dt><dd>{temperature(selected.indoorTemperature)}</dd></div>
          <div><dt>{copy.setTemperature}</dt><dd>{temperature(selected.setTemperature)}</dd></div>
          <div><dt>{copy.lastReceived}</dt><dd>{selected.lastReceivedAt ?? `— (${copy.missing})`}</dd></div>
          <div><dt>{copy.freshness}</dt><dd>{copy[selected.freshness]}</dd></div>
        </dl>
      </section>
    </div>
    <section className="hvac-device-list-panel" aria-label={copy.deviceList}>
      <h2>{copy.deviceList}</h2><div className="hvac-device-list">
        {devices.map((device) => <button type="button" className={`hvac-device-row${selectedId === device.id ? " is-selected" : ""}`} aria-pressed={selectedId === device.id} key={device.id} onClick={() => selectDevice(device.id)}>
          <strong>{device.id}</strong><span>{device.floor}F · {copy.rooms[device.room]}</span><span>{copy[device.operation]}</span><span>{device.freshness === "stale" ? copy.lastKnownTemperature : copy.temperature}: {temperature(device.indoorTemperature)}</span><span className={`hvac-badge hvac-badge--${device.freshness}`}>{copy[device.freshness]}</span>
          {selectedId === device.id && <span className="hvac-list-selected">✓ {copy.selected}</span>}
        </button>)}
      </div>
    </section>
    <section className="hvac-trend-panel" aria-label={copy.trend}>
      <h2>{copy.trend} <span>{selected.id}</span></h2>
      <figure aria-label={`${selected.id} · ${copy.trend}`}>
        <div className="hvac-chart-canvas"><ResponsiveContainer width="100%" height={260} minWidth={0} initialDimension={{ width: 480, height: 260 }}>
          <LineChart data={[...selected.temperatureHistory]} margin={{ top: 16, right: 18, bottom: 8, left: 0 }} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="time" minTickGap={16} interval="preserveStartEnd" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} />
            <YAxis width={48} unit="°C" domain={[20, 30]} ticks={[20, 22, 24, 26, 28, 30]} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} />
            <Tooltip formatter={(value) => [temperature(typeof value === "number" ? value : null), copy.temperature]} contentStyle={{ borderRadius: 8, borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }} />
            <Line type="linear" dataKey="temperature" name={copy.temperature} stroke="var(--primary-action)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} connectNulls={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer></div>
        <details className="hvac-values"><summary>{copy.values}</summary><div className="hvac-table-scroll"><table>
          <caption className="sr-only">{selected.id} · {copy.trend}</caption>
          <thead><tr><th scope="col">{copy.time}</th><th scope="col">{copy.temperature}</th></tr></thead>
          <tbody>{selected.temperatureHistory.map((point) => <tr key={point.time}><th scope="row">{point.time}</th><td>{temperature(point.temperature)}</td></tr>)}</tbody>
        </table></div></details>
      </figure>
    </section>
  </div>;
}
