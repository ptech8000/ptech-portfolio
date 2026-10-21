import type { Project } from "../schema";

const project: Project = {
  "slug": "gps-tracker",
  "title": "P-TECH GPS Tracker",
  "category": "TRACKING / IoT",
  "group": "IoT",
  "icon": "pin",
  "hue": "#38bdf8",
  "built": true,
  "image": "/projects/gps-tracker/gps-hero.jpg",
  "imageAlt": "ESP32-C3 Super Mini and u-blox NEO GPS module with ceramic patch antenna during bench testing",
  "gallery": [
    { "src": "/projects/gps-tracker/gps-hero.jpg", "caption": "ESP32-C3 Super Mini and u-blox NEO GPS module with ceramic patch antenna during bench testing" },
    { "src": "/projects/gps-tracker/gps-module.jpg", "caption": "Compact tracker hardware layout showing the GPS receiver and microcontroller footprint" }
  ],
  "tags": "ESP32-C3 · NEO-6M/8M GPS · WiFiManager · LittleFS",
  "summary": "A compact GPS tracker on an ESP32-C3 that is set up through a captive portal, logs location history to flash, emails location alerts and serves a local web dashboard behind a login.",
  "status": "WORKING SYSTEM / VERIFIED",
  "implementation": "HARDWARE BUILT & TESTED",
  "evidence": "Assembled and bench-tested on the ESP32-C3 Super Mini paired with a u-blox NEO GPS receiver and ceramic patch antenna, running WiFiManager captive-portal provisioning, LittleFS coordinate logging, and authenticated local web dashboard.",
  "platform": "ESP32-C3 Super Mini",
  "control": "Push button + web dashboard",
  "communication": "Wi-Fi / email alerts",
  "video": "—",
  "audio": "—",
  "hardware": [
    "ESP32-C3",
    "NEO-6M / NEO-8M GPS module",
    "Push button",
    "Status LED"
  ],
  "software": [
    "Arduino C++ firmware",
    "WiFiManager captive-portal setup",
    "Gmail-based location email alerts",
    "LittleFS location-history logging",
    "Local web dashboard",
    "Login and session system"
  ],
  "problem": "Tracking vehicles and valuables is useful, but commercial trackers can depend on subscriptions and cloud accounts. A small device that stores its own history and reports by email is simpler to own.",
  "solution": "The ESP32-C3 reads position from the GPS module, stores it in LittleFS, and sends location alerts by email. First-time Wi-Fi setup happens through a captive portal instead of hard-coded credentials, and the dashboard is protected by a login.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Integrated ESP32-C3 Super Mini with u-blox NEO-6M/8M GPS receiver and active patch antenna",
    "Implemented WiFiManager captive-portal setup for zero-hardcode Wi-Fi provisioning",
    "Built LittleFS flash location-history logger and session-protected local web dashboard",
    "Configured automated email location alerts triggered by push-button or geofence events"
  ]
};

export default project;
