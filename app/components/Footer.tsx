import Link from "next/link";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer container">
      <div>
        <Link href="/" className="brand">P-TECH<span>●</span></Link>
        <p>Precision Technology, Engineering &amp; Creative Hardware.</p>
      </div>
      <div className="footer-links">
        <Link href="/">HOME</Link><Link href="/work">WORK</Link><Link href="/lab">LAB</Link><Link href="/services">SERVICES</Link><Link href="/about">ABOUT</Link><Link href="/resume">RESUME</Link><Link href="/#reviews">REVIEWS</Link><Link href="/dashboard">DASHBOARD</Link>
        <a href="https://wa.me/2349121134682" target="_blank" rel="noreferrer">WHATSAPP</a>
        <a href="https://www.linkedin.com/in/ajayi-promise/" target="_blank" rel="noreferrer">LINKEDIN</a>
        <a href="https://www.tiktok.com/@ajayi.promise" target="_blank" rel="noreferrer">TIKTOK</a>
        <a href="https://github.com/ptech8000" target="_blank" rel="noreferrer"><Github size={16} /> GITHUB</a>
        <a href="mailto:ptech8000@gmail.com"><Mail size={16} /> EMAIL</a>
      </div>
      <div className="copyright">© 2026 P-TECH</div>
    </footer>
  );
}
