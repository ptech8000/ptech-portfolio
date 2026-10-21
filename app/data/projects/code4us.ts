import type { Project } from "../schema";

const project: Project = {
  "slug": "code4us",
  "title": "Code4Us: Classroom Hardware & Tools",
  "category": "EDTECH",
  "group": "EDUCATION",
  "icon": "grad",
  "hue": "#a78bfa",
  "built": true,
  "image": "/projects/code4us/code4us-hero.jpg",
  "imageAlt": "3D-printed IQ Robotics Lab tag and functional locking carabiner produced for robotics classes",
  "gallery": [
    { "src": "/projects/code4us/code4us-hero.jpg", "caption": "3D-printed IQ Robotics Lab tag and functional locking carabiner produced for robotics classes" },
    { "src": "/projects/code4us/code4us-printer.jpg", "caption": "Multi-color LPI Hub phone stand printing on the lab FDM 3D printer" },
    { "src": "/projects/code4us/code4us-enclosure.jpg", "caption": "Custom 3D-printed yellow hardware enclosure and snap-fit lid" },
    { "src": "/projects/code4us/code4us-print-in-place.jpg", "caption": "Articulated print-in-place mechanism demonstrating 3D printing tolerances for students" }
  ],
  "tags": "Flask · SQLite · Raspberry Pi 3 Model B+ · ESP32-C3 · nRF24L01",
  "summary": "Hardware and software built for Code4Us, P-TECH's coding and robotics education initiative: the P-TECH CBT System on a Raspberry Pi 3 Model B+, custom 3D-printed classroom hardware, and an ESP32-C3 handheld communicator used for teaching.",
  "status": "ACTIVE",
  "platform": "Raspberry Pi 3 Model B+ + ESP32-C3 Super Mini",
  "control": "Web admin panel + handheld device",
  "communication": "LAN / nRF24L01 / MQTT",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Raspberry Pi 3 Model B+ (CBT server)",
    "ESP32-C3 Super Mini (EduComm-Device handheld)",
    "nRF24L01 radio module"
  ],
  "software": [
    "CBT web app in Python Flask + SQLite",
    "Admin panel with CSV bulk question upload",
    "Per-student question shuffling and session resumption",
    "systemd auto-start on the Pi",
    "EduComm-Device: nRF24L01 messaging, XOR-encryption demo, Wi-Fi analyser, BLE scanner, RF-spectrum view",
    "MQTT long-range relay via HiveMQ"
  ],
  "facts": [
    [
      "CBT server",
      "Raspberry Pi 3 Model B+ · Flask + SQLite"
    ],
    [
      "Question import",
      "CSV bulk upload"
    ],
    [
      "Handheld",
      "ESP32-C3 Super Mini + nRF24L01"
    ],
    [
      "2026 student builds",
      "Arduino Nano calculator · Bluetooth smart car · smart-home automation"
    ]
  ],
  "problem": "Classes need practice tests and hands-on wireless examples without relying on constant internet access or expensive lab equipment.",
  "solution": "A Raspberry Pi 3 Model B+ serves a CBT web app on the local network: teachers manage questions and students through an admin panel, import questions from CSV, and each student gets shuffled questions and can resume an interrupted session. The EduComm-Device is a handheld two-way communicator that demonstrates radio messaging, simple encryption, and Wi-Fi, BLE and RF scanning for students. It deliberately leaves out offensive wireless features. The 2026 programme included student projects such as an Arduino Nano calculator, a Bluetooth-controlled smart car and a smart-home automation system, and P-TECH led the Robotics and AI Automation track.",
  "evidence": "CSV bulk upload was exercised with a 20-question Tinkercad question set; a comma-quoting bug was found and fixed.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "DEPLOYED CLASSROOM TOOLS",
  "future": [
    "P-TECH CBT server deployed live on a Raspberry Pi 3 Model B+ for student tests and exams",
    "Instant automated grading and result tracking for instructors",
    "EduComm-Device handheld wireless teaching tool built on ESP32-C3 + nRF24L01",
    "3D-printed classroom kits, enclosures, and mechanical teaching aids"
  ],
  "related": [
    "ptech-cbt-system",
    "robotics-bench-builds"
  ]
};

export default project;
