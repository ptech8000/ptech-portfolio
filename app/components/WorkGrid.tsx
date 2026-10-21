"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import type { Group } from "../data/schema";
import Visual from "./Visual";

const filters: ("ALL" | Group)[] = ["ALL", "ROBOTICS", "EMBEDDED", "IoT", "AI", "POWER", "EDUCATION"];

export default function WorkGrid() {
  const [f, setF] = useState<"ALL" | Group>("ALL");
  const list = projects.filter((p) => f === "ALL" || p.group === f);
  return (
    <>
      <div className="filter-row" role="tablist">
        {filters.map((x) => (
          <button key={x} role="tab" aria-selected={f === x} className={f === x ? "on" : ""} onClick={() => setF(x)}>
            {x}<sup>{x === "ALL" ? projects.length : projects.filter((p) => p.group === x).length}</sup>
          </button>
        ))}
      </div>
      <div className="archive-grid">
        {list.map((p) => (
          <Link className="archive-card" href={`/work/${p.slug}`} key={p.slug}>
            <div className="archive-image">
              <Visual icon={p.icon} hue={p.hue} image={p.image} alt={p.imageAlt ?? p.title} />
              <b>{p.num}</b>
              {p.built && <em className="badge">BUILT BY P-TECH</em>}
              <ArrowUpRight size={21} />
            </div>
            <span className="project-category">{p.category}</span>
            <h2>{p.title}</h2>
            <p>{p.tags}</p>
            <span className="case-link">VIEW CASE STUDY <ArrowUpRight size={15} /></span>
          </Link>
        ))}
      </div>
    </>
  );
}
