import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { logEntries, benchNotes, type LabEntry } from "../data/lab";

export const metadata = { title: "Lab — P-TECH" };

function List({ entries }: { entries: LabEntry[] }) {
  return (
    <div className="lab-page-list">
      {entries.map(([date, title, detail, status, repo]) => (
        <article key={date + title}>
          <span>{date}</span>
          <div>
            <h2>{title}</h2>
            <p>{detail}</p>
            {repo && (
              repo.startsWith("/") ? (
                <Link className="case-github" href={repo}>VIEW CASE STUDY ↗</Link>
              ) : (
                <a className="case-github" href={repo} target="_blank" rel="noreferrer">VIEW REPOSITORY ↗</a>
              )
            )}
          </div>
          <em>● {status}</em>
        </article>
      ))}
    </div>
  );
}

export default function Lab() {
  return (
    <main>
      <Nav />
      <section className="section container">
        <span className="eyebrow">P-TECH LAB</span>
        <h1 className="page-title">WHERE IDEAS<br />BECOME SYSTEMS.</h1>
        <p className="page-intro">An engineering log for experiments, debugging, prototype development and technical validation.</p>
        <List entries={logEntries} />
        <span className="eyebrow lab-sub">BENCH NOTES &amp; CONCEPTS</span>
        <p className="page-intro">Smaller experiments and early concepts that sit behind the full case studies.</p>
        <List entries={benchNotes} />
      </section>
      <Footer />
    </main>
  );
}
