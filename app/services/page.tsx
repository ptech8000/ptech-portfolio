import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Zap, Printer, GraduationCap, Server } from "lucide-react";

const services = [
  ["01", "CUSTOM EMBEDDED SYSTEMS", "ESP32, Arduino and Raspberry Pi firmware, sensor integration, communication and control systems."],
  ["02", "ROBOTICS & AUTOMATION", "Mobile robots, motor control, remote vehicles, automation and intelligent sensing."],
  ["03", "3D PRINTING & CUSTOM ENCLOSURES", "In-house FDM 3D printing on Creality Ender-3 S1 Pro, CAD enclosure design, battery holders, mechanical brackets and multi-color functional prints."],
  ["04", "IoT SYSTEMS & SERVERS", "Connected devices, ESP-NOW, MQTT, self-hosted Raspberry Pi file/CBT servers, dashboards and remote monitoring."],
  ["05", "AI / COMPUTER VISION", "Object detection, OCR, voice/facial recognition, intelligent alerts and edge-oriented systems."],
  ["06", "POWER & SOLAR SOLUTIONS", "Custom lithium battery packs, solar integration, portable power stations (250W–1000W) and energy management."],
  ["07", "STEM & ROBOTICS TRAINING", "Curriculum design, classroom CBT servers, and hands-on coding & robotics training for schools and academies."],
];

const packages = [
  {
    badge: "SOLAR & BACKUP POWER",
    title: "PT-1 Portable Power Stations & Powertanks",
    summary: "Custom-built portable AC/DC power stations with digital wattmeter/voltmeter telemetry, active cooling, and solar charging support.",
    tiers: [
      "12V DC Powerbanks (routers, CCTV, LED lighting)",
      "250 Watt Powertank",
      "300 Watt Powertank",
      "500 Watt Powertank + 2× 200 Watt Solar Panels",
      "1000 Watt Heavy-Duty Powertank",
    ],
    caseLink: "/work/pt-1-portable-power-station",
    waText: "Hello P-TECH, I want to inquire about ordering a Portable Power Station / Powertank.",
  },
  {
    badge: "EDTECH INFRASTRUCTURE",
    title: "P-TECH CBT System for Schools & Universities",
    summary: "Turnkey offline local-network Computer-Based Testing server running on a Raspberry Pi 3 Model B+ — zero recurring cloud fees.",
    tiers: [
      "Raspberry Pi 3 Model B+ pre-configured CBT server",
      "Admin & Student web portals over campus Wi-Fi / LAN",
      "CSV bulk question upload & topic/difficulty bank",
      "Exam Mode & Practice Mode with per-student question/option shuffling",
      "Real-time active examinee monitor & instant grading",
    ],
    caseLink: "/work/ptech-cbt-system",
    waText: "Hello P-TECH, I want to inquire about deploying the P-TECH CBT System for our school/institution.",
  },
  {
    badge: "CAD & ADDITIVE MANUFACTURING",
    title: "On-Demand 3D Printing & Custom Enclosures",
    summary: "Parametric 3D CAD modeling and precision 1.75 mm PLA/ABS fabrication on the Creality Ender-3 S1 Pro.",
    tiers: [
      "Custom electronics & PCB snap-fit enclosures",
      "Robotic chassis parts, servo brackets & gears",
      "18650 lithium battery cell holders & structural spacers",
      "Multi-color branded desk stands, tags & functional mechanical prints",
    ],
    caseLink: "/work/3d-printing-fabrication",
    waText: "Hello P-TECH, I need custom 3D printing / CAD enclosure fabrication.",
  },
  {
    badge: "PRIVATE LAN STORAGE",
    title: "Vault Raspberry Pi File Server",
    summary: "Self-hosted private file server on a Raspberry Pi 3 Model B with role-based access control and live storage telemetry.",
    tiers: [
      "Authenticated web file manager UI ('Vault')",
      "Public & Restricted folder visibility permissions",
      "Browser file uploads, instant search & folder management",
      "Admin user management, Activity Log & Trash recovery",
    ],
    caseLink: "/work/vault-raspberry-pi-file-server",
    waText: "Hello P-TECH, I want to inquire about setting up a Vault Raspberry Pi File Server.",
  },
];

export default function Services() {
  return (
    <main>
      <Nav />
      <section className="section container">
        <span className="eyebrow">P-TECH / SERVICES &amp; PRODUCTS</span>
        <h1 className="page-title">
          TECHNOLOGY SYSTEMS<br />BUILT AROUND PROBLEMS.
        </h1>
        <p className="page-intro">
          From custom embedded hardware and 3D-printed enclosures to ready-to-deploy portable solar power stations and school CBT servers.
        </p>

        {/* Ready-to-Deploy Product Packages */}
        <div className="about-block">
          <div className="section-header">
            <div>
              <span className="eyebrow">READY-TO-DEPLOY HARDWARE &amp; SYSTEMS</span>
              <h2>PRODUCT PACKAGES</h2>
            </div>
            <p>Field-tested P-TECH systems available for direct order, customization, or institutional deployment.</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg) => (
              <article key={pkg.title} className="package-card">
                <span className="exp-badge">{pkg.badge}</span>
                <h3>{pkg.title}</h3>
                <p>{pkg.summary}</p>
                <ul className="package-tiers">
                  {pkg.tiers.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="package-actions">
                  <a
                    className="button primary"
                    href={`https://wa.me/2349121134682?text=${encodeURIComponent(pkg.waText)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={15} /> ORDER ON WHATSAPP <ArrowUpRight size={15} />
                  </a>
                  <Link className="button secondary" href={pkg.caseLink}>
                    VIEW CASE STUDY <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Core Engineering Services */}
        <div className="about-block">
          <div className="section-header">
            <div>
              <span className="eyebrow">CUSTOM ENGINEERING</span>
              <h2>ENGINEERING CAPABILITIES</h2>
            </div>
            <p>End-to-end R&amp;D, schematic capture, firmware, CAD fabrication, and software integration.</p>
          </div>
          <div className="service-detail-list">
            {services.map(([n, t, d]) => (
              <article key={n}>
                <span>{n}</span>
                <div>
                  <h2>{t}</h2>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="services-cta">
          <div>
            <span className="eyebrow">START A PROJECT</span>
            <h2>NEED A CUSTOM SYSTEM OR PRODUCT QUOTE?</h2>
            <p>Tell P-TECH what you are building or select a ready-to-deploy package.</p>
          </div>
          <div className="founder-links">
            <a
              className="button primary"
              href="https://wa.me/2349121134682?text=Hello%20P-TECH%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} /> CHAT ON WHATSAPP <ArrowUpRight size={16} />
            </a>
            <Link className="button secondary" href="/contact">
              USE CONTACT FORM <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
