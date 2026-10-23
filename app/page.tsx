import Link from "next/link";
import { ArrowUpRight, Cpu, Bot, Wifi, Eye, BatteryCharging, Accessibility, Box, Mail, Phone } from "lucide-react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Visual from "./components/Visual";
import Reveal from "./components/Reveal";
import ReviewsSection from "./components/ReviewsSection";
import { projects, flagships } from "./data/projects";

const domains = [
  { icon: Cpu, title: "Embedded Systems", detail: "ESP32 · Arduino · Raspberry Pi" },
  { icon: Bot, title: "Robotics", detail: "Motion · Automation · Remote Systems" },
  { icon: Wifi, title: "IoT", detail: "Connected Devices · Dashboards · MQTT" },
  { icon: Eye, title: "AI & Vision", detail: "Detection · Intelligent Sensing" },
  { icon: BatteryCharging, title: "Power", detail: "Solar · Battery · Energy Systems" },
  { icon: Box, title: "3D Printing & CAD", detail: "Custom Enclosures · Mechanical Parts · FDM" },
];

const stack = ["ESP32", "ESP8266", "Raspberry Pi", "Arduino", "3D Printing / FDM", "CAD Enclosures", "UltiMaker Cura", "MQTT", "WebRTC", "ESP-NOW", "Python", "C/C++", "JavaScript", "Linux", "I²C / SPI / UART", "Stepper control", "Computer Vision"];

const prints3d = [
  { src: "/projects/3d-printing-fabrication/3d-carabiner-tag-hero.jpg", caption: "3D-printed threaded locking carabiner & dual-color IQ Robotics Lab keytag" },
  { src: "/projects/3d-printing-fabrication/3d-iq-robotics-tags.jpg", caption: "Multi-color red & white IQ Robotics Lab tags on the Creality build plate" },
  { src: "/projects/3d-printing-fabrication/3d-lpi-hub-stand.jpg", caption: "Multi-color LPI Hub phone stand printing on the lab FDM printer" },
  { src: "/projects/3d-printing-fabrication/3d-cura-18650-slicing.jpg", caption: "UltiMaker Cura slicing 28× 18650 lithium-ion cell holders (0.4 mm nozzle, 0.2 mm layers)" },
  { src: "/projects/3d-printing-fabrication/3d-ender3-s1-pro.jpg", caption: "Creality Ender-3 S1 Pro with LED light bar, Sprite Direct Drive extruder, and 3D-printed brackets on the PEI build plate" },
  { src: "/projects/3d-printing-fabrication/3d-blue-display-bezels.jpg", caption: "Custom blue 3D-printed display and sensor bezel housings on the 220×220 mm PEI bed" },
  { src: "/projects/3d-printing-fabrication/3d-yellow-enclosure.jpg", caption: "Custom yellow 3D-printed electronics enclosure shell and snap-fit cover" },
  { src: "/projects/3d-printing-fabrication/3d-print-in-place-flexi.jpg", caption: "Articulated print-in-place model demonstrating fine joint clearances" },
];


function SystemGraphic() {
  return (
    <div className="system-graphic" aria-label="Engineering system visualization">
      <div className="graphic-grid" />
      <div className="graphic-label top">SYSTEM / 01</div>
      <div className="node sensor"><span className="node-dot" />SENSOR<small>INPUT</small></div>
      <div className="connector connector-a" /><div className="connector connector-b" />
      <div className="processor"><span className="processor-kicker">CORE</span><strong>ESP32 / PI</strong><span className="processor-status">● ONLINE</span></div>
      <div className="node output"><span className="node-dot" />MOTOR<small>OUTPUT</small></div>
      <div className="node camera"><span className="node-dot" />CAMERA<small>VISION</small></div>
      <div className="connector connector-c" />
      <div className="signal signal-one" /><div className="signal signal-two" />
    </div>
  );
}

function SectionHeader({ title, description }: { number?: string; title: string; description?: string }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{title}</span>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Home() {
  const more = projects.filter((p) => !p.flagship).slice(0, 6);
  return (
    <main>
      <Nav />

      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow"><i className="status-dot pulse" /> OPEN FOR HARDWARE PROJECTS</span>
          <h1>
            PRECISION<br /><span className="grad">TECHNOLOGY,</span><br />ENGINEERING &amp;<br />CREATIVE HARDWARE
          </h1>
          <p className="hero-description">
            I design and build intelligent hardware systems for real-world problems — combining embedded firmware,
            robotics, IoT, AI, power engineering and in-house 3D printing, from CAD &amp; schematic to working product.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/work">EXPLORE WORK <ArrowUpRight size={17} /></Link>
            <Link className="button secondary" href="/contact">START A PROJECT <ArrowUpRight size={17} /></Link>
          </div>
        </div>
        <SystemGraphic />
      </section>

      <div className="stats container">
        {[[String(projects.length), "Case studies"], ["6", "Engineering domains"], [String(flagships.length), "Flagship builds"], ["ESP32 · Pi · Arduino", "Core platforms"]].map(([n, l]) => (
          <div key={l}><strong>{n}</strong><span>{l}</span></div>
        ))}
      </div>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...stack, ...stack].map((s, i) => <span key={i}>{s}<i>◆</i></span>)}
        </div>
      </div>

      <section className="section container" id="work">
        <Reveal><SectionHeader number="01" title="FLAGSHIP BUILDS" description="Four systems built end to end — firmware, electronics and connectivity." /></Reveal>
        <div className="flagships">
          {flagships.map((p, i) => { const f = { ...p.flagship!, slug: p.slug, icon: p.icon, hue: p.hue, title: p.title, image: p.image, imageAlt: p.imageAlt }; return (
            <Reveal key={f.slug} delay={i * 90}>
              <Link href={`/work/${f.slug}`} className="flagship">
                <div className="flagship-vis"><Visual icon={f.icon} hue={f.hue} image={f.image} alt={f.imageAlt ?? f.title} big /></div>
                <div className="flagship-body">
                  <span className="project-category" style={{ color: f.hue }}>{f.tag}</span>
                  <h3>{f.title}</h3>
                  <p>{f.blurb}</p>
                  <div className="spec-row">
                    {f.specs.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
                  </div>
                  <div className="tag-row">{f.chips.map((c) => <span key={c}>{c}</span>)}</div>
                  <small className="flagship-note">{f.note}</small>
                  <span className="case-link">VIEW CASE STUDY <ArrowUpRight size={16} /></span>
                </div>
              </Link>
            </Reveal>
          ); })}
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <Reveal><SectionHeader number="02" title="MORE PROJECTS" description="Prototypes, experiments and builds across the archive." /></Reveal>
        <div className="mini-grid">
          {more.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link href={`/work/${p.slug}`} className="mini-card">
                <div className="mini-vis"><Visual icon={p.icon} hue={p.hue} image={p.image} alt={p.imageAlt ?? p.title} /></div>
                <span className="project-category" style={{ color: p.hue }}>{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.tags}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="center-link"><Link href="/work">VIEW ALL {projects.length} PROJECTS <ArrowUpRight size={17} /></Link></div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }} id="3d-printing">
        <Reveal>
          <SectionHeader
            title="3D PRINTING & CAD FABRICATION"
            description="In-house FDM 3D printing on a Creality Ender-3 S1 Pro — custom enclosures, battery cell holders, robotic joints, and multi-color functional models."
          />
        </Reveal>
        <div className="case-gallery">
          {prints3d.map((item) => (
            <figure key={item.src} className="gallery-card">
              <div className="gallery-img-wrap">
                <img src={item.src} alt={item.caption} loading="lazy" />
              </div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="center-link">
          <Link href="/work/3d-printing-fabrication">VIEW FULL 3D PRINTING CASE STUDY <ArrowUpRight size={17} /></Link>
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <Reveal><SectionHeader number="03" title="ENGINEERING DOMAINS" description="Systems I design, prototype and integrate." /></Reveal>
        <div className="domain-grid">
          {domains.map(({ icon: Icon, title, detail }, index) => (
            <div className="domain-card" key={title}>
              <span className="card-number">0{index + 1}</span>
              <Icon size={26} strokeWidth={1.5} />
              <h3>{title}</h3><p>{detail}</p>
              <ArrowUpRight className="domain-arrow" size={18} />
            </div>
          ))}
        </div>
      </section>

      <section className="lab-section" id="lab">
        <div className="container">
          <SectionHeader number="04" title="THE LAB" description="Where ideas become systems." />
          <div className="lab-grid">
            <div>
              <h2>ENGINEERING<br />IN PROGRESS</h2>
              <p>Experiments, tests and prototypes document the development process behind the finished projects.</p>
              <Link className="button secondary" href="/lab">ENTER THE LAB <ArrowUpRight size={17} /></Link>
            </div>
            <div className="timeline">
              {[["20 OCT 2026", "SMART BLIND WALKING STICK", "Object detection + voice feedback", "TESTING"],
                ["17 OCT 2026", "RASPBERRY PI UGV", "WebRTC audio development", "DEVELOPMENT"],
                ["14 OCT 2026", "WALKING STICK", "Haptic feedback improvements", "TESTED"]].map(([d, t, p, s]) => (
                <div className="timeline-item" key={d}><span>{d}</span><strong>{t}</strong><p>{p}</p><em>● {s}</em></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="about">
        <SectionHeader number="05" title="TECHNOLOGY" />
        <div className="tech-panel">
          <div><span className="eyebrow">HARDWARE &amp; 3D PRINTING</span><h3>ESP32 · RASPBERRY PI · ARDUINO · ENDER-3 S1 PRO</h3></div>
          <div><span className="eyebrow">SOFTWARE &amp; CAD</span><h3>PYTHON · C/C++ · JAVASCRIPT · ULTIMAKER CURA</h3></div>
          <div><span className="eyebrow">PROTOCOLS</span><h3>Wi-Fi · MQTT · ESP-NOW · WEBRTC · SERIAL</h3></div>
          <div><span className="eyebrow">INTELLIGENCE &amp; FAB</span><h3>COMPUTER VISION · CUSTOM ENCLOSURES · AUTOMATION</h3></div>
        </div>
      </section>

      <section className="section container" id="services">
        <SectionHeader number="06" title="SERVICES" description="Technology systems built around real problems." />
        <div className="services-list">
          {["Custom Embedded Systems", "Robotics & Automation", "3D Printing & Custom Enclosures", "IoT Systems", "AI / Computer Vision", "Power & Solar Solutions", "Custom Hardware Prototyping"].map((service, i) => (
            <Link href="/services" className="service-row" key={service}>
              <span>0{i + 1}</span><h3>{service}</h3><ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>

      <ReviewsSection />

      <section className="contact-section" id="contact">
        <div className="container contact-inner">
          <span className="eyebrow">CONTACT</span>
          <h2>HAVE A PROBLEM<br />WORTH BUILDING?</h2>
          <p>Let&apos;s turn the idea into a working system.</p>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <a className="button primary" href="https://wa.me/2349121134682?text=Hello%20Promise%20(P-TECH)%2C%20I%20want%20to%20inquire%20about%20a%20project." target="_blank" rel="noreferrer">WHATSAPP (+234 912 113 4682) <ArrowUpRight size={17} /></a>
            <a className="button secondary" href="mailto:ptech8000@gmail.com">EMAIL P-TECH <Mail size={17} /></a>
            <a className="button secondary" href="tel:+2349069001906">CALL 09069001906 <Phone size={17} /></a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
