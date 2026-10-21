"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [["HOME", "/"], ["WORK", "/work"], ["LAB", "/lab"], ["SERVICES", "/services"], ["ABOUT", "/about"], ["CONTACT", "/contact"]];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="navwrap">
      <div className="navbar">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>P-TECH<span>●</span></Link>
        <nav aria-label="Primary">
          {links.map(([l, h]) => (
            <Link key={h} href={h} className={(h === "/" ? path === "/" : path.startsWith(h)) ? "active" : ""}>
              {l}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta">HIRE ME</Link>
        <button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="mobile-panel">
          {links.map(([l, h]) => (
            <Link
              key={h}
              href={h}
              className={(h === "/" ? path === "/" : path.startsWith(h)) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l}
            </Link>
          ))}
          <Link href="/contact" className="button primary mobile-cta" onClick={() => setOpen(false)}>
            HIRE ME / START A PROJECT
          </Link>
        </div>
      )}
    </header>
  );
}
