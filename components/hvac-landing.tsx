"use client";

import Link from "next/link";
import { useState } from "react";
import HvacBuilding from "./hvac-building";
import { hvacMessages } from "../content/hvac-messages";
import { getDevice, sampleReference, type DeviceId } from "../lib/hvac-monitoring";
import { localizedPath, type Locale } from "../lib/i18n";

export default function HvacLanding({ locale }: { locale: Locale }) {
  const copy = hvacMessages(locale);
  const [selectedId, setSelectedId] = useState<DeviceId>("AC-101");
  const device = getDevice(selectedId);
  const demoUrl = localizedPath(locale, "/lab/hvac-monitoring/demo");

  return <div className="hvac-landing">
    <section className="hvac-hero">
      <div className="hvac-hero-copy"><p className="hvac-kicker">HVAC / CONCEPT</p><h2>{copy.hero}</h2><p>{copy.heroBody}</p><Link className="hvac-primary" href={demoUrl}>{copy.openDemo}<span aria-hidden="true"> ↗</span></Link><p className="hvac-sample-note">{copy.sampleNotice}</p></div>
      <div className="hvac-preview"><HvacBuilding selectedId={selectedId} onSelect={setSelectedId} copy={copy} />
        <p className="hvac-preview-hint">{copy.previewHint}</p>
        <div className="hvac-preview-card" role="status" aria-live="polite"><div><span className="hvac-kicker">{device.id}</span><strong>{copy.rooms[device.room]}</strong><span>{copy[device.operation]}</span></div><div><span>{device.freshness === "stale" ? copy.lastKnownTemperature : copy.temperature}</span><strong>{device.indoorTemperature === null ? "—" : `${device.indoorTemperature.toFixed(1)}°C`}</strong>{device.freshness === "stale" && <span className="hvac-stale">{copy.stale}</span>}</div></div>
        {device.freshness === "stale" && <p className="hvac-stale-notice">{copy.lastKnownNotice}</p>}
        <p className="hvac-reference">{copy.reference}: {sampleReference}</p>
      </div>
    </section>
    <section className="hvac-benefits"><p className="hvac-kicker">OVERVIEW</p><h2>{copy.featuresTitle}</h2><div className="hvac-feature-grid">{copy.features.map((feature, index) => <article key={feature.title}><span className="hvac-step-number">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div></section>
    <section className="hvac-flow"><h2>{copy.flowTitle}</h2><ol>{copy.flow.map((step) => <li key={step}>{step}</li>)}</ol></section>
    <section className="hvac-cta"><div><h2>{copy.ctaTitle}</h2><p>{copy.ctaBody}</p></div><Link className="hvac-primary" href={demoUrl}>{copy.openDemo} ↗</Link></section>
  </div>;
}
