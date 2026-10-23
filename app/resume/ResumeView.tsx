"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Printer,
  Download,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  ArrowLeft,
  ExternalLink,
  Cpu,
  Layers,
  Wrench,
  Radio,
  Eye,
  Award,
  Sparkles,
  Share2,
} from "lucide-react";

export default function ResumeView() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "https://ptech-site.vercel.app/resume";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="resume-page">
      <div className="container">
        {/* Sticky Action Toolbar (Hidden in Print) */}
        <div className="resume-toolbar no-print">
          <div className="resume-toolbar-left">
            <Link href="/" className="resume-btn" title="Back to Portfolio">
              <ArrowLeft size={14} /> HOME
            </Link>
            <span>
              <span className="resume-status-dot"></span> AVAILABLE FOR CONTRACTS &amp; ROLES
            </span>
          </div>

          <div className="resume-toolbar-actions">
            <button
              onClick={handleCopyLink}
              className={`resume-btn ${copied ? "copied" : ""}`}
              title="Copy link to this resume"
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {copied ? "LINK COPIED!" : "SHARE LINK"}
            </button>

            <a
              href="mailto:ptech8000@gmail.com?subject=Engineering%20Inquiry%20via%20P-TECH%20Resume"
              className="resume-btn"
            >
              <Mail size={14} /> EMAIL PROMISE
            </a>

            <button
              onClick={handlePrint}
              className="resume-btn primary"
              title="Print to paper or save as PDF"
            >
              <Printer size={15} /> PRINT / SAVE PDF
            </button>
          </div>
        </div>

        {/* The Printable Resume Sheet */}
        <article className="resume-sheet" id="resume-sheet">
          {/* Header */}
          <header className="resume-header">
            <div className="resume-header-top">
              <div className="resume-header-info">
                <h1 className="resume-name">PROMISE AJAYI</h1>
                <div className="resume-role">
                  Robotics, Embedded Systems &amp; 3D Prototyping Engineer
                </div>
                <p className="resume-sub-role">
                  Founder &amp; Lead Engineer at <strong>P-TECH</strong> (Precision Technology, Engineering &amp; Creative Hardware). Architecting intelligent autonomous robotics, medical infusion hardware, edge AI systems, and self-hosted local server appliances.
                </p>
              </div>

              <div className="resume-photo-wrap">
                <img
                  src="/founder-promise-ajayi.jpg"
                  alt="Promise Ajayi — Founder &amp; Lead Engineer at P-TECH"
                  className="resume-photo"
                />
              </div>
            </div>

            {/* Contact Matrix */}
            <div className="resume-contact-list">
              <div className="resume-contact-item">
                <MapPin size={14} />
                <span>Ibadan North, Nigeria (On-site &amp; Remote)</span>
              </div>
              <div className="resume-contact-item">
                <Mail size={14} />
                <a href="mailto:ptech8000@gmail.com">ptech8000@gmail.com</a>
              </div>
              <div className="resume-contact-item">
                <Phone size={14} />
                <a href="tel:+2349121134682">+234 912 113 4682</a>
              </div>
              <div className="resume-contact-item">
                <Globe size={14} />
                <a href="https://ptech-site.vercel.app" target="_blank" rel="noreferrer">
                  ptech-site.vercel.app
                </a>
              </div>
              <div className="resume-contact-item">
                <Linkedin size={14} />
                <a href="https://www.linkedin.com/in/ajayi-promise/" target="_blank" rel="noreferrer">
                  linkedin.com/in/ajayi-promise
                </a>
              </div>
              <div className="resume-contact-item">
                <Github size={14} />
                <a href="https://github.com/ptech8000" target="_blank" rel="noreferrer">
                  github.com/ptech8000
                </a>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="resume-section">
            <div className="resume-section-heading">
              <Sparkles size={14} /> EXECUTIVE SUMMARY
            </div>
            <p className="resume-summary-text">
              Multidisciplinary Hardware &amp; Embedded Systems Engineer with <strong>4+ years of hands-on expertise</strong> designing, prototyping, and deploying <strong>24+ intelligent hardware systems</strong>. Proven track record delivering mission-critical projects including autonomous ground vehicles (UGVs), medical infusion pumps, self-hosted offline CBT server appliances, portable Li-ion power stations, and custom parametric CAD/3D fabrication. Proven leadership across embedded C/C++ firmware, edge computer vision (OpenCV/Python), and STEM education mentoring 100+ students across Linux Professional Institute (LPI), MODINS, and IQ Academy.
            </p>
          </section>

          {/* Core Technical Competencies */}
          <section className="resume-section">
            <div className="resume-section-heading">
              <Cpu size={14} /> TECHNICAL COMPETENCIES &amp; SKILLS MATRIX
            </div>
            <div className="resume-skills-matrix">
              <div className="resume-skill-group">
                <h4>Microcontrollers &amp; SBCs</h4>
                <div className="resume-skill-tags">
                  <span className="resume-skill-tag">ESP32 (S3/C3/CAM)</span>
                  <span className="resume-skill-tag">ESP8266</span>
                  <span className="resume-skill-tag">Raspberry Pi (3B, 3B+, 5)</span>
                  <span className="resume-skill-tag">Arduino (Uno/Mega/Nano)</span>
                  <span className="resume-skill-tag">STM32</span>
                  <span className="resume-skill-tag">Motor Drivers (TB6600, L298N, A4988)</span>
                </div>
              </div>

              <div className="resume-skill-group">
                <h4>Firmware &amp; Software</h4>
                <div className="resume-skill-tags">
                  <span className="resume-skill-tag">Embedded C / C++</span>
                  <span className="resume-skill-tag">Python (Flask, NumPy)</span>
                  <span className="resume-skill-tag">JavaScript / TypeScript</span>
                  <span className="resume-skill-tag">React / Next.js</span>
                  <span className="resume-skill-tag">Linux / Bash Scripting</span>
                  <span className="resume-skill-tag">SQLite / SQL</span>
                </div>
              </div>

              <div className="resume-skill-group">
                <h4>IoT Protocols &amp; Wireless</h4>
                <div className="resume-skill-tags">
                  <span className="resume-skill-tag">MQTT</span>
                  <span className="resume-skill-tag">ESP-NOW</span>
                  <span className="resume-skill-tag">WebRTC</span>
                  <span className="resume-skill-tag">WebSockets</span>
                  <span className="resume-skill-tag">HTTP / REST APIs</span>
                  <span className="resume-skill-tag">I2C · SPI · UART</span>
                  <span className="resume-skill-tag">Captive Portal / Local AP</span>
                </div>
              </div>

              <div className="resume-skill-group">
                <h4>Rapid Prototyping &amp; CAD / Fab</h4>
                <div className="resume-skill-tags">
                  <span className="resume-skill-tag">Parametric 3D CAD</span>
                  <span className="resume-skill-tag">Creality Ender-3 S1 Pro</span>
                  <span className="resume-skill-tag">UltiMaker Cura Slicing</span>
                  <span className="resume-skill-tag">FDM 1.75mm PLA / ABS (±0.2mm)</span>
                  <span className="resume-skill-tag">PCB Design &amp; Soldering</span>
                  <span className="resume-skill-tag">Snap-fit Enclosures</span>
                </div>
              </div>

              <div className="resume-skill-group">
                <h4>Edge AI &amp; Computer Vision</h4>
                <div className="resume-skill-tags">
                  <span className="resume-skill-tag">OpenCV</span>
                  <span className="resume-skill-tag">Vosk Offline Speech AI</span>
                  <span className="resume-skill-tag">Real-Time Object Tracking</span>
                  <span className="resume-skill-tag">Face &amp; Emotion Recognition</span>
                  <span className="resume-skill-tag">Autonomous Follow-Me Navigation</span>
                </div>
              </div>

              <div className="resume-skill-group">
                <h4>Power Systems &amp; Hardware Lab</h4>
                <div className="resume-skill-tags">
                  <span className="resume-skill-tag">18650 Li-ion Battery Packs</span>
                  <span className="resume-skill-tag">Spot Welding &amp; BMS Safety</span>
                  <span className="resume-skill-tag">1000W AC/DC Power Stations</span>
                  <span className="resume-skill-tag">Solar MPPT Charging</span>
                  <span className="resume-skill-tag">Oscilloscopes &amp; Multimeters</span>
                </div>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="resume-section">
            <div className="resume-section-heading">
              <Layers size={14} /> PROFESSIONAL ENGINEERING EXPERIENCE
            </div>
            <div className="resume-exp-list">
              {/* Role 1 */}
              <div className="resume-exp-item">
                <div className="resume-exp-header">
                  <div>
                    <span className="resume-exp-title">Founder &amp; Lead Hardware Engineer</span>
                    {" · "}
                    <span className="resume-exp-company">P-TECH</span>
                  </div>
                  <span className="resume-exp-meta">Feb 2022 – Present · 4+ Years</span>
                </div>
                <div className="resume-exp-meta" style={{ marginBottom: "6px" }}>
                  Ibadan North, Nigeria · Hardware Lab &amp; Production Workshop
                </div>
                <ul className="resume-exp-bullets">
                  <li>
                    <strong>End-to-End Hardware Lifecycle:</strong> Architected, prototyped, bench-tested, and deployed <strong>24+ intelligent hardware and embedded software systems</strong> for commercial, medical, energy, and educational clients.
                  </li>
                  <li>
                    <strong>P-TECH CBT Local Server Appliance:</strong> Engineered a zero-cloud-fee, offline exam server appliance on Raspberry Pi 3B+ capable of concurrently serving <strong>400+ student devices</strong> over local Wi-Fi with sub-50ms latency, zero internet dependency, and automated local SQLite scoring.
                  </li>
                  <li>
                    <strong>Medical Smart Syringe Pump:</strong> Designed and built an ESP32-powered micro-infusion pump with stepper motor drive, sub-millimeter lead-screw calibration, volume dosing safeguards, and safety limit sensing for medical delivery applications.
                  </li>
                  <li>
                    <strong>Autonomous Telemedicine UGV:</strong> Fabricated a multi-purpose tracked robotic rover incorporating low-latency WebRTC teleoperation, bidirectional audio, live camera streaming, autonomous GPS corridor navigation, and OpenCV visual person-tracking.
                  </li>
                  <li>
                    <strong>PT-1 1000W Portable Lithium Power Station:</strong> Engineered a custom AC/DC lithium-ion power backup with spot-welded 18650 cell packs, smart BMS protection, real-time digital wattmeter telemetry, and integrated solar charging.
                  </li>
                  <li>
                    <strong>Parametric CAD &amp; Additive Manufacturing:</strong> Designed functional snap-fit enclosures, robotic gear assemblies, and custom sensor brackets with tight mechanical tolerances (±0.2mm) using Creality Ender-3 S1 Pro and UltiMaker Cura.
                  </li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="resume-exp-item">
                <div className="resume-exp-header">
                  <div>
                    <span className="resume-exp-title">Robotics, Embedded Systems &amp; STEM Lead Instructor</span>
                    {" · "}
                    <span className="resume-exp-company">
                      Linux Professional Institute (LPI) · MODINS · IQ Academy
                    </span>
                  </div>
                  <span className="resume-exp-meta">Feb 2022 – Present · 4+ Years</span>
                </div>
                <div className="resume-exp-meta" style={{ marginBottom: "6px" }}>
                  Ibadan North, Oyo State, Nigeria · On-site &amp; Hybrid
                </div>
                <ul className="resume-exp-bullets">
                  <li>
                    <strong>Curriculum Authoring &amp; Delivery:</strong> Authored and instructed comprehensive hands-on STEM, embedded electronics, and robotics curricula for <strong>100+ students aged 5–18</strong> using Scratch, PictoBlox, Arduino C++, and mechanical engineering kits.
                  </li>
                  <li>
                    <strong>Hands-on Hardware Instruction:</strong> Led weekly laboratory workshops on motor drivers (L298N, TB6600), ultrasonic/IR sensors, ESP8266/ESP32 Wi-Fi modules, circuit breadboarding, and safe 3D printer operation.
                  </li>
                  <li>
                    <strong>Robotics Mentorship &amp; Competitions:</strong> Mentored student teams through robotics build challenges, guiding them to construct autonomous obstacle avoidance rovers, line-trackers, and smart home prototypes that won top institutional honors.
                  </li>
                  <li>
                    <strong>Laboratory Management:</strong> Supervised electronic component inventory, 3D printer maintenance, firmware flashing benches, and electrical safety standards.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Engineering Projects Showcase */}
          <section className="resume-section">
            <div className="resume-section-heading">
              <Wrench size={14} /> SELECTED FLAGSHIP HARDWARE BUILDS
            </div>
            <div className="resume-projects-grid">
              <div className="resume-project-card">
                <div>
                  <div className="resume-project-card-top">
                    <span className="resume-project-name">P-TECH CBT Local Offline Server</span>
                    <Link href="/work/ptech-cbt-system" className="resume-project-link">
                      CASE STUDY <ExternalLink size={12} />
                    </Link>
                  </div>
                  <p className="resume-project-desc">
                    Self-hosted offline examination server deployed on Raspberry Pi 3B+. Delivers zero-lag CBT exams to 400+ concurrent students without internet access or monthly recurring fees.
                  </p>
                </div>
                <div className="resume-project-tech">
                  Raspberry Pi 3B+ · Hostapd Wi-Fi AP · Python Flask · SQLite · Linux
                </div>
              </div>

              <div className="resume-project-card">
                <div>
                  <div className="resume-project-card-top">
                    <span className="resume-project-name">Smart Medical Syringe Pump</span>
                    <Link href="/work/smart-syringe-pump" className="resume-project-link">
                      CASE STUDY <ExternalLink size={12} />
                    </Link>
                  </div>
                  <p className="resume-project-desc">
                    Precision micro-infusion device driven by stepper motors and an ESP32 web interface. Features sub-millimeter lead-screw calibration, volume alerts, and emergency stop triggers.
                  </p>
                </div>
                <div className="resume-project-tech">
                  ESP32 · NEMA Stepper Motor · A4988 Driver · WebSockets · 3D Printed Chassis
                </div>
              </div>

              <div className="resume-project-card">
                <div>
                  <div className="resume-project-card-top">
                    <span className="resume-project-name">Smart Multi-Purpose UGV Rover</span>
                    <Link href="/work/smart-multi-purpose-ugv" className="resume-project-link">
                      CASE STUDY <ExternalLink size={12} />
                    </Link>
                  </div>
                  <p className="resume-project-desc">
                    Tracked robotic platform featuring low-latency WebRTC teleoperation, live bidirectional audio/video, autonomous corridor GPS navigation, and OpenCV visual follow-me tracking.
                  </p>
                </div>
                <div className="resume-project-tech">
                  Raspberry Pi · ESP32 · WebRTC · OpenCV · L298N · Tank Chassis
                </div>
              </div>

              <div className="resume-project-card">
                <div>
                  <div className="resume-project-card-top">
                    <span className="resume-project-name">PT-1 1000W Portable Power Station</span>
                    <Link href="/work/pt-1-portable-power-station" className="resume-project-link">
                      CASE STUDY <ExternalLink size={12} />
                    </Link>
                  </div>
                  <p className="resume-project-desc">
                    Custom-built AC/DC lithium-ion power backup for field operations and off-grid workstations. Features active cell balancing, smart BMS circuitry, and digital wattmeter telemetry.
                  </p>
                </div>
                <div className="resume-project-tech">
                  18650 Li-ion Cells · Spot-Welded Busbars · Smart BMS · Pure Sine Inverter
                </div>
              </div>

              <div className="resume-project-card">
                <div>
                  <div className="resume-project-card-top">
                    <span className="resume-project-name">JARVIS AI Personal Assistant</span>
                    <Link href="/work/jarvis-personal-assistant" className="resume-project-link">
                      CASE STUDY <ExternalLink size={12} />
                    </Link>
                  </div>
                  <p className="resume-project-desc">
                    Fully offline edge assistant utilizing Vosk speech recognition, OpenCV facial verification, and multi-channel relay control for automated smart-home and workshop management.
                  </p>
                </div>
                <div className="resume-project-tech">
                  Python · Vosk Speech AI · OpenCV · Raspberry Pi · Relay Network
                </div>
              </div>

              <div className="resume-project-card">
                <div>
                  <div className="resume-project-card-top">
                    <span className="resume-project-name">3D Printing &amp; CAD Fabrication</span>
                    <Link href="/work/3d-printing-fabrication" className="resume-project-link">
                      CASE STUDY <ExternalLink size={12} />
                    </Link>
                  </div>
                  <p className="resume-project-desc">
                    Full rapid prototyping pipeline producing snap-fit project enclosures, robotic drivetrains, and mechanical brackets in PLA/ABS with ±0.2mm mechanical tolerances.
                  </p>
                </div>
                <div className="resume-project-tech">
                  Creality Ender-3 S1 Pro · UltiMaker Cura · Parametric CAD · FDM PLA/ABS
                </div>
              </div>
            </div>
          </section>

          {/* Education & Professional Certifications */}
          <section className="resume-section" style={{ marginBottom: "16px" }}>
            <div className="resume-section-heading">
              <Award size={14} /> CREDENTIALS, CERTIFICATIONS &amp; AFFILIATIONS
            </div>
            <div className="resume-certs-list">
              <div className="resume-cert-item">
                <span className="resume-cert-title">Linux Professional Institute (LPI)</span>
                <span className="resume-cert-issuer">Systems &amp; Embedded Linux</span>
                <span className="resume-cert-desc">Operating systems, bash automation, and headless server architecture</span>
              </div>

              <div className="resume-cert-item">
                <span className="resume-cert-title">MODINS (Modern Intelligent Systems)</span>
                <span className="resume-cert-issuer">Robotics &amp; Embedded Hardware</span>
                <span className="resume-cert-desc">Advanced microcontrollers, sensor integration, and motor actuation</span>
              </div>

              <div className="resume-cert-item">
                <span className="resume-cert-title">IQ Academy</span>
                <span className="resume-cert-issuer">STEM &amp; Robotics Curriculum Lead</span>
                <span className="resume-cert-desc">Instructional design, competitive robotics coaching, and hardware pedagogy</span>
              </div>
            </div>
          </section>

          {/* Additional Info Footer */}
          <footer
            style={{
              paddingTop: "14px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              fontSize: "11px",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              color: "var(--faint)",
            }}
          >
            <span>LANGUAGES: English (Native / Full Professional Proficiency)</span>
            <span>VERIFIED PORTFOLIO: https://ptech-site.vercel.app</span>
          </footer>
        </article>
      </div>
    </div>
  );
}
