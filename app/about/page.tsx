import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Cpu, Award, MapPin, Calendar } from "lucide-react";

const responsibilities = [
  "Lead design, prototyping, and deployment of smart robotics and automation systems using Arduino, ESP8266/ESP32, and Raspberry Pi.",
  "Develop AI-integrated systems for voice, facial, and emotion recognition using OpenCV, Vosk, and custom machine learning models.",
  "Build and manage IoT infrastructures using MQTT, WebSockets, and cloud/offline architectures for smart home and industrial control.",
  "Design, model, and 3D print parts for robotic prototypes and functional systems using CAD software and filament printers (1.75 mm PLA/ABS).",
  "Create STEM and robotics curricula for students aged 5–18 using Scratch, PictoBlox, and hands-on engineering challenges.",
  "Integrate web and mobile dashboards with real-time controls and monitoring features (Flask, WebRTC, Leaflet.js).",
];

const keySuccesses = [
  [
    "JARVIS AI ASSISTANT",
    "Built an offline-capable AI system with smart reminders, daily reports, emotion-based automation, and mobile app integration.",
    "/work/jarvis-personal-assistant",
  ],
  [
    "TELEMEDICINE & MULTI-PURPOSE UGV",
    "Designed a web-controlled, two-way communication robot for remote interaction, live video, and autonomous GPS corridor navigation.",
    "/work/smart-multi-purpose-ugv",
  ],
  [
    "FOLLOW-ME AUTONOMOUS ROBOT",
    "Developed a GPS and camera-based autonomous tracking robot with a custom mission dashboard and visual recognition.",
    "/work/smart-multi-purpose-ugv",
  ],
  [
    "GREENHOUSE AUTOMATION",
    "Automated a greenhouse with smart nutrient/water tank control, environmental sensor monitoring, and SD card data logging.",
    "/work/smart-greenhouse-monitoring",
  ],
  [
    "ESP32-CAM SURVEILLANCE CAR",
    "Created a remote-controlled Wi-Fi robot car with live video streaming, SD storage, and photo/video capture features.",
    "/work/esp8266-robot-car",
  ],
  [
    "SMART HOME & POWER ECOSYSTEM",
    "Integrated voice-controlled relays and sensors alongside custom portable solar power stations and smart socket hardware.",
    "/work/esp32-c3-smart-socket",
  ],
];

const skills = [
  {
    title: "3D Modeling",
    org: "Linux Professional Institute (LPI) · MODINS (Modern Intelligent Systems) · IQ Academy",
    detail: "Parametric CAD design for mechanical assemblies, robotic chassis, gears, and custom hardware enclosures.",
  },
  {
    title: "3D Printing & CAD",
    org: "Linux Professional Institute (LPI) · MODINS (Modern Intelligent Systems) · IQ Academy",
    detail: "FDM production on Creality Ender-3 S1 Pro using 1.75 mm PLA/ABS, multi-color slicing in UltiMaker Cura, and print-in-place mechanisms.",
  },
  {
    title: "IoT & Automation",
    org: "Linux Professional Institute (LPI) · MODINS (Modern Intelligent Systems) · IQ Academy",
    detail: "MQTT, ESP-NOW, WebSockets, cloud and offline local-network architectures for smart home, greenhouse, and industrial automation.",
  },
  {
    title: "Robotics & Embedded Systems",
    org: "Linux Professional Institute (LPI) · MODINS (Modern Intelligent Systems) · IQ Academy",
    detail: "Firmware and hardware integration across ESP32, ESP8266, Arduino, and Raspberry Pi with sensors, actuators, and motor drivers.",
  },
  {
    title: "Education & STEM Training",
    org: "Linux Professional Institute (LPI) · MODINS (Modern Intelligent Systems) · IQ Academy",
    detail: "Hands-on STEM, coding, and robotics curricula for ages 5–18 using Scratch, PictoBlox, Tinkercad, and classroom CBT systems.",
  },
  {
    title: "Mobile & Web Integration",
    org: "Linux Professional Institute (LPI) · MODINS (Modern Intelligent Systems) · IQ Academy",
    detail: "Full-stack device dashboards and self-hosted servers using Python Flask, SQLite, WebRTC, Leaflet.js, and responsive web UIs.",
  },
];

export default function About() {
  return (
    <main>
      <Nav />
      <section className="section container">
        <span className="eyebrow">ABOUT / P-TECH &amp; FOUNDER</span>
        <h1 className="page-title">
          ENGINEERING<br />WITH PURPOSE.
        </h1>
        <p className="page-intro">
          P-TECH is led by <strong>Promise Ajayi</strong> — a 3D Printing, Robotics, and Embedded Systems Engineer building practical hardware, AI-integrated robots, portable solar power systems, and educational technology.
        </p>

        {/* Founder Profile Card */}
        <div className="founder-card">
          <div className="founder-photo-wrap">
            <img
              src="/founder-promise-ajayi.jpg"
              alt="Promise Ajayi — Founder & Lead Engineer at P-TECH"
              className="founder-photo"
            />
            <span className="badge">FOUNDER · P-TECH</span>
          </div>

          <div className="founder-main">
            <span className="eyebrow">FOUNDER &amp; LEAD ENGINEER</span>
            <h2>PROMISE AJAYI</h2>
            <p className="founder-role">
              3D Printing &amp; Robotics Engineer · Embedded Systems, IoT, AI &amp; CAD Fabrication
            </p>
            <div className="founder-meta">
              <span><Briefcase size={14} /> Linux Professional Institute (LPI) · MODINS · IQ Academy</span>
              <span><MapPin size={14} /> Ibadan North, Oyo State, Nigeria (On-site &amp; Remote)</span>
              <span><Calendar size={14} /> Feb 2022 – Present (4+ Years)</span>
            </div>
            <p className="founder-bio">
              Specializing in end-to-end hardware product development — from schematic capture, embedded C/C++ and Python firmware, and custom 3D-printed enclosures to real-time web/mobile mission dashboards, edge computer vision, and STEM robotics education.
            </p>
            <div className="founder-links">
              <a
                className="button primary"
                href="https://www.linkedin.com/in/ajayi-promise/"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN PROFILE <ArrowUpRight size={16} />
              </a>
              <a
                className="button secondary"
                href="https://www.tiktok.com/@ajayi.promise"
                target="_blank"
                rel="noreferrer"
              >
                TIKTOK BUILD VIDEOS <ArrowUpRight size={16} />
              </a>
              <Link className="button secondary" href="/contact">
                WORK WITH PROMISE <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="founder-stats">
            <div>
              <strong>4+ YRS</strong>
              <span>PROFESSIONAL ROBOTICS &amp; 3D PRINTING</span>
            </div>
            <div>
              <strong>24+</strong>
              <span>ENGINEERED HARDWARE &amp; SOFTWARE SYSTEMS</span>
            </div>
            <div>
              <strong>3 ORGS</strong>
              <span>LPI · MODINS · IQ ACADEMY</span>
            </div>
            <div>
              <strong>AGES 5–18</strong>
              <span>STEM &amp; ROBOTICS CURRICULUM LEAD</span>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="about-block">
          <div className="section-header">
            <div>
              <span className="eyebrow">PROFESSIONAL EXPERIENCE</span>
              <h2>EXPERIENCE &amp; LEADERSHIP</h2>
            </div>
            <p>Hands-on engineering, AI robotics deployment, CAD fabrication, and STEM instruction since February 2022.</p>
          </div>

          <div className="exp-card">
            <div className="exp-header">
              <div>
                <span className="exp-badge">FEB 2022 – PRESENT · 4 YRS 9 MOS</span>
                <h3>3D Printing and Robotics Engineer</h3>
                <p className="exp-company">
                  Linux Professional Institute (LPI) · MODINS (Modern Intelligent Systems) · IQ Academy — Ibadan North, Oyo State, Nigeria · Remote &amp; On-site
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/ajayi-promise/"
                target="_blank"
                rel="noreferrer"
                className="case-link"
              >
                VIEW ON LINKEDIN <ArrowUpRight size={14} />
              </a>
            </div>

            <ul className="exp-list">
              {responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="exp-projects">
              <span className="eyebrow">KEY PROJECTS &amp; ENGINEERING SUCCESSES</span>
              <div className="exp-project-grid">
                {keySuccesses.map(([name, desc, href]) => (
                  <Link href={href} key={name} className="exp-project-item">
                    <div className="exp-project-top">
                      <strong>{name}</strong>
                      <ArrowUpRight size={15} />
                    </div>
                    <p>{desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="about-block">
          <div className="section-header">
            <div>
              <span className="eyebrow">CORE COMPETENCIES</span>
              <h2>ENGINEERING SKILLS</h2>
            </div>
            <p>Applied across Linux Professional Institute (LPI), MODINS (Modern Intelligent Systems), and IQ Academy.</p>
          </div>

          <div className="skills-grid">
            {skills.map((s, idx) => (
              <article key={s.title} className="skill-card">
                <div className="skill-top">
                  <Cpu size={18} />
                  <span>0{idx + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p className="skill-detail">{s.detail}</p>
                <div className="skill-org">
                  <Award size={13} />
                  <span>{s.org}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Engineering Method */}
        <div className="about-block">
          <span className="eyebrow">HOW P-TECH WORKS</span>
          <div className="method">
            <div>01<br /><strong>UNDERSTAND</strong></div>
            <div>02<br /><strong>ARCHITECT</strong></div>
            <div>03<br /><strong>BUILD</strong></div>
            <div>04<br /><strong>TEST</strong></div>
            <div>05<br /><strong>ITERATE</strong></div>
            <div>06<br /><strong>DEPLOY</strong></div>
          </div>
        </div>

        <div className="about-columns">
          <div>
            <span className="eyebrow">FOCUS</span>
            <p>Embedded Systems<br />Robotics &amp; Autonomous Vehicles<br />3D Printing &amp; CAD Enclosures<br />IoT &amp; Local Server Infrastructure<br />AI &amp; Computer Vision<br />Portable Solar Power<br />STEM &amp; EdTech Systems</p>
          </div>
          <div>
            <span className="eyebrow">CORE PLATFORMS</span>
            <p>ESP32 / ESP8266<br />Arduino (Uno, Nano, Mega)<br />Raspberry Pi (3B, 3B+, 5)<br />Creality Ender-3 S1 Pro<br />Linux &amp; Self-Hosted Servers</p>
          </div>
          <div>
            <span className="eyebrow">LANGUAGES &amp; TOOLS</span>
            <p>C / C++<br />Python (Flask, OpenCV, Vosk)<br />JavaScript / WebRTC / Leaflet.js<br />SQLite &amp; MQTT<br />3D CAD &amp; UltiMaker Cura</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
