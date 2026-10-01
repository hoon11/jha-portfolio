import type { Metadata } from "next";
import LabProjectCard from "../../components/lab-project-card";

export const metadata: Metadata = { title: "Lab | J. Ha", description: "Personal frontend projects by J. Ha." };

export default function LabPage() {
  return <div className="inner-page">
    <header className="page-intro"><p className="eyebrow">Personal projects</p><h1>Lab</h1><p>Explore a working frontend simulation that handles slow, failed, and invalid responses while keeping its task view understandable.</p></header>
    <section className="content-panel" aria-labelledby="projects-title"><h2 id="projects-title" className="sr-only">Projects</h2><LabProjectCard location="index" /></section>
  </div>;
}
