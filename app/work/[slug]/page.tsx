import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Play } from "lucide-react";
import Visual from "../../components/Visual";
import GalleryLightbox from "../../components/GalleryLightbox";
import ProjectReviews from "../../components/ProjectReviews";
import ProjectHeroRating from "../../components/ProjectHeroRating";
import { projects, bySlug } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug[slug];
  return p ? { title: `${p.title} — P-TECH`, description: p.summary } : { title: "Project not found — P-TECH" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = bySlug[slug];

  if (!project) notFound();

  return (
    <main>
      <Nav />
      <section className="case-hero container">
        <Link href="/work" className="back-link"><ArrowLeft size={15} /> WORK / PROJECTS</Link>
        <span className="eyebrow">{project.category}</span>
        <h1>{project.title.toUpperCase()}</h1><p>{project.summary}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 14, marginBottom: 6 }}>
          <span className="case-status">● {project.status}</span>
          <ProjectHeroRating projectSlug={project.slug} />
        </div>
        {((project.repos && project.repos.length > 0) || project.videoUrl) && (
          <p className="case-repos">
            {project.videoUrl && (
              <a className="case-github" href={project.videoUrl} target="_blank" rel="noreferrer">
                <Play size={16} /> {(project.videoLabel ?? "WATCH DEMO VIDEO").toUpperCase()} <ArrowUpRight size={15} />
              </a>
            )}
            {project.repos?.map((r) => (
              <a key={r.url} className="case-github" href={r.url} target="_blank" rel="noreferrer">
                <Github size={16} /> {r.label.toUpperCase()} <ArrowUpRight size={15} />
              </a>
            ))}
          </p>
        )}
      </section>
      <div className="case-image container">
        <Visual icon={project.icon} hue={project.hue} image={project.image} alt={project.imageAlt ?? project.title} big />
        <span className="media-note">{project.image ? "BUILD PHOTOGRAPH — P-TECH HARDWARE ARCHIVE" : "ILLUSTRATION — REAL PHOTOS & DIAGRAMS TO BE ADDED"}</span>
      </div>
      <section className="case-meta container">
        {Object.entries({ PLATFORM: project.platform, CONTROL: project.control, COMMUNICATION: project.communication, VIDEO: project.video, AUDIO: project.audio }).map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}
      </section>
      <section className="case-body container">
        <aside className="case-index">
          <span>PROJECT INDEX</span>
          <a href="#overview">Overview</a>
          <a href="#problem">Problem</a>
          <a href="#architecture">Architecture</a>
          <a href="#hardware">Hardware</a>
          <a href="#software">Software</a>
          {project.gallery && project.gallery.length > 0 && <a href="#gallery">Build Photos</a>}
          <a href="#testing">Testing</a>
          <a href="#future">{project.futureLabel === "AVAILABLE PACKAGES" ? "Packages" : project.futureLabel ? "Milestones" : "Future"}</a>
          <a href="#reviews">Reviews</a>
        </aside>
        <article>
          <section id="overview"><span className="eyebrow">OVERVIEW</span><h2>FROM PROBLEM TO SYSTEM</h2><p>{project.summary}</p>{project.facts && <div className="facts">{project.facts.map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>}</section>
          <section id="problem"><span className="eyebrow">PROBLEM &amp; APPROACH</span><h2>DESIGNED FOR A REAL USE CASE</h2><p>{project.problem}</p><p>{project.solution}</p></section>
          <section id="architecture"><span className="eyebrow">ARCHITECTURE</span><h2>SYSTEM ARCHITECTURE</h2><div className="architecture"><div>INPUT<br/><b>SENSORS / INTERFACE</b></div><i>→</i><div>PROCESSING<br/><b>CONTROLLER</b></div><i>→</i><div>OUTPUT<br/><b>ACTION / FEEDBACK</b></div></div>{!project.built && !project.image && <p className="note">Conceptual overview. Replace with a verified project-specific schematic or architecture diagram before public release.</p>}</section>
          <section id="hardware"><span className="eyebrow">HARDWARE</span><h2>HARDWARE STACK</h2><div className="spec-grid">{project.hardware.map((x) => <div key={x}>{x}</div>)}</div></section>
          <section id="software"><span className="eyebrow">SOFTWARE</span><h2>SOFTWARE STACK</h2><div className="spec-grid">{project.software.map((x) => <div key={x}>{x}</div>)}</div></section>
          {project.gallery && project.gallery.length > 0 && (
            <section id="gallery">
              <span className="eyebrow">BUILD PHOTOGRAPHS</span>
              <h2>HARDWARE &amp; BENCH GALLERY</h2>
              <GalleryLightbox items={project.gallery} />
            </section>
          )}
          <section id="testing">
            <span className="eyebrow">TESTING</span>
            <h2>ENGINEERING VALIDATION</h2>
            <div className="test-panel">
              <div><span>SYSTEM STATUS</span><strong>● {project.status}</strong></div>
              <div><span>IMPLEMENTATION</span><strong>{project.implementation ?? (project.built ? "HARDWARE BUILT" : "ITERATIVE")}</strong></div>
              <div><span>EVIDENCE</span><strong>{project.evidence ? "VERIFIED BUILD" : (project.gallery && project.gallery.length > 0 ? "BUILD PHOTOS VERIFIED" : "TO BE DOCUMENTED")}</strong></div>
            </div>
            {project.evidence && <p className="evidence-panel">{project.evidence}</p>}
            {project.videoUrl && (
              <p style={{ marginTop: 18 }}>
                <a className="button secondary" href={project.videoUrl} target="_blank" rel="noreferrer">
                  <Play size={16} /> {(project.videoLabel ?? "WATCH FIELD TEST VIDEO").toUpperCase()} <ArrowUpRight size={16} />
                </a>
              </p>
            )}
            {!project.evidence && !(project.gallery && project.gallery.length > 0) && (
              <p className="note">Only measured or directly observed results should be published as validated outcomes. Add test conditions, dates, measurements and evidence as they become available.</p>
            )}
          </section>
          <section id="future"><span className="eyebrow">{project.futureLabel ?? "FUTURE DEVELOPMENT"}</span><h2>{project.futureHeading ?? "NEXT ENGINEERING STEPS"}</h2><ul className="future-list">{project.future.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <ProjectReviews projectSlug={project.slug} projectTitle={project.title} />
          {project.related && project.related.length > 0 && (
            <section id="related"><span className="eyebrow">RELATED PROJECTS</span><div className="spec-grid">{project.related.map((r) => bySlug[r] && <Link key={r} href={`/work/${r}`}>{bySlug[r].title} →</Link>)}</div></section>
          )}
          <Link className="button primary" href="/contact">DISCUSS A SIMILAR SYSTEM <ArrowUpRight size={17}/></Link>
        </article>
      </section>
    <Footer /></main>
  );
}