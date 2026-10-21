import type { Project } from "../schema";

const project: Project = {
  "slug": "ptech-cbt-system",
  "title": "P-TECH CBT System for Schools & Universities",
  "category": "EDTECH / SERVER INFRASTRUCTURE",
  "group": "EDUCATION",
  "icon": "grad",
  "hue": "#2563eb",
  "built": true,
  "image": "/projects/ptech-cbt-system/cbt-dashboard-hero.png",
  "imageAlt": "P-TECH CBT System Admin Dashboard running live on a Raspberry Pi 3 Model B+ showing student counts, question bank, active exams, submissions, recent results, and live test monitoring",
  "gallery": [
    { "src": "/projects/ptech-cbt-system/cbt-dashboard-hero.png", "caption": "P-TECH CBT System Admin Dashboard displaying total Students, Questions, Tests/Exams, Submissions, Recent Results (10/10 · 100.0% on Tinkercad Design), and Currently Taking Test live monitor" },
    { "src": "/projects/ptech-cbt-system/cbt-create-test.png", "caption": "Create Test / Exam panel with Exam vs. Practice Test modes, duration timer, topic restriction, per-student question and answer shuffling, and active exam toggles" },
    { "src": "/projects/ptech-cbt-system/cbt-questions-csv.png", "caption": "Question Bank management with manual question entry (Options A–D, Correct Option, Topic, Difficulty) and CSV Bulk Upload importer" },
    { "src": "/projects/ptech-cbt-system/cbt-student-login.png", "caption": "P-TECH CBT System Student Login portal where candidates sign in with instructor-issued credentials" },
    { "src": "/projects/ptech-cbt-system/cbt-admin-login.png", "caption": "Dedicated P-TECH CBT System Admin Login portal for instructors and examination officers" }
  ],
  "tags": "Raspberry Pi 3 Model B+ · Python Flask · SQLite · LAN / Wi-Fi CBT Server",
  "summary": "A live, self-hosted Computer-Based Testing (CBT) platform built on a Raspberry Pi 3 Model B+ for schools and universities — featuring separate Student and Admin portals, Exam and Practice Test modes, CSV bulk question import, per-student question & option shuffling, live exam monitoring, and instant automated grading.",
  "status": "WORKING SYSTEM / LIVE",
  "implementation": "PRODUCTION READY",
  "evidence": "Live and working on a Raspberry Pi 3 Model B+ hosting real timed examinations (such as the 20-question Tinkercad Design exam bank), with verified CSV bulk upload, randomized per-student question/option order, live active-candidate tracking, and instant score calculation.",
  "platform": "Raspberry Pi 3 Model B+",
  "control": "Web Admin & Student Portals",
  "communication": "LAN / Campus Wi-Fi HTTP Server",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Raspberry Pi 3 Model B+ (quad-core 64-bit ARM Cortex-A53 @ 1.4 GHz, dual-band Wi-Fi & Ethernet)",
    "High-endurance microSD / USB storage for SQLite exam database",
    "Dedicated 5 V regulated power supply",
    "Local Wi-Fi router / campus LAN switch for multi-client student access"
  ],
  "software": [
    "Python Flask backend with SQLite relational database",
    "Separate Student Login and Admin Login authentication portals",
    "Admin Dashboard with real-time counters (Students, Questions, Tests/Exams, Submissions), Recent Results table, and 'Currently Taking Test' live monitor",
    "Question Bank manager with single-question form (Option A–D, Correct Option, Topic, Easy/Medium/Hard difficulty) and CSV Bulk Upload parser",
    "Test & Exam builder supporting Exam Mode and Practice Test Mode, custom duration (minutes), topic filtering, and post-submission answer visibility",
    "Anti-cheating randomization: independent per-student question order shuffling and answer option shuffling",
    "systemd service configured for automatic boot and crash recovery on the Raspberry Pi 3 Model B+"
  ],
  "facts": [
    [
      "Server Hardware",
      "Raspberry Pi 3 Model B+"
    ],
    [
      "Software Stack",
      "Python Flask · SQLite · Web UI"
    ],
    [
      "Exam Integrity",
      "Per-student question & option shuffling · Timed exams"
    ],
    [
      "Admin Workflow",
      "CSV bulk question upload · Live test monitor · Auto-grading"
    ]
  ],
  "problem": "Schools, universities, and training centres often face unreliable internet connectivity, high recurring licensing fees for cloud CBT platforms, or manual paper grading bottlenecks during tests and examinations.",
  "solution": "Engineered the P-TECH CBT System on a Raspberry Pi 3 Model B+ to operate as a plug-and-play, offline-capable local examination server. Instructors log into the Admin Portal to add questions individually or bulk-upload entire question banks via CSV, configure timed Exams or Practice Tests, restrict tests by topic, and enable per-student shuffling of both question order and answer choices. Students connect over campus Wi-Fi or LAN through any browser to take their exams, while invigilators monitor active test-takers and view graded submissions in real time.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "LIVE SYSTEM CAPABILITIES",
  "future": [
    "Deployed and running live on a Raspberry Pi 3 Model B+ with systemd auto-start",
    "Dedicated Admin and Student authentication portals",
    "Bulk CSV question importer alongside manual question creation with Topic and Difficulty tagging",
    "Configurable Exam Mode and Practice Test Mode with countdown timers and per-student question/option shuffling",
    "Real-time Admin Dashboard tracking active examinees ('Currently Taking Test') and instant graded results"
  ],
  "related": [
    "code4us",
    "vault-raspberry-pi-file-server"
  ]
};

export default project;
