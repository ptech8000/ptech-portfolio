import type { Project } from "../schema";

const project: Project = {
  "slug": "keypad-lock-prototypes",
  "title": "Keypad & Solenoid Lock Prototypes",
  "category": "ACCESS CONTROL",
  "group": "EMBEDDED",
  "icon": "lock",
  "hue": "#fb923c",
  "built": true,
  "image": "/projects/keypad-lock-prototypes/keypad-hero.jpg",
  "imageAlt": "Breadboard access-control prototype with ESP32 DevKit V1, relay driver stage, buck converter, and OLED display",
  "gallery": [
    { "src": "/projects/keypad-lock-prototypes/keypad-hero.jpg", "caption": "Breadboard access-control prototype with ESP32 DevKit V1, relay driver stage, buck converter, and OLED display" },
    { "src": "/projects/keypad-lock-prototypes/keypad-breadboard.jpg", "caption": "Active lock-state test on the breadboard showing relay actuation and OLED status output" },
    { "src": "/projects/keypad-lock-prototypes/solenoid-box.jpg", "caption": "Enclosed solenoid & RPM control box with 16×2 LCD telemetry (RPM:13711 A:360 / MI0 ME0 AI0 AE0) and cooling fan" },
    { "src": "/projects/keypad-lock-prototypes/solenoid-internals.jpg", "caption": "Internal wiring of the solenoid controller showing Arduino Uno, 4-channel relay module, power supply, and brass solenoid valves" }
  ],
  "tags": "Arduino Uno · ESP32 DevKit V1 · Keypad · Solenoid",
  "summary": "Two electronic door-lock prototypes: an Arduino-based lock exploring controlled access through an embedded controller, and an ESP32 DevKit V1 keypad-and-solenoid lock handling code entry and actuator timing.",
  "status": "WORKING SYSTEM / VERIFIED",
  "implementation": "HARDWARE BUILT & TESTED",
  "evidence": "Verified both the ESP32 DevKit V1 + OLED access-control breadboard unit and the enclosed Arduino Uno + 4-channel relay + brass solenoid control unit with 16×2 LCD telemetry and active cooling.",
  "platform": "Arduino Uno + ESP32 DevKit V1",
  "control": "Keypad / local input",
  "communication": "Local",
  "video": "—",
  "audio": "Optional feedback",
  "hardware": [
    "Arduino Uno or compatible controller",
    "Electronic lock actuator as fitted",
    "Driver stage or relay module",
    "Power supply",
    "Access input and status indicator as implemented",
    "ESP32 DevKit V1",
    "Keypad",
    "Solenoid lock",
    "Suitable MOSFET or driver module",
    "Flyback protection where required",
    "Separate correctly rated lock supply"
  ],
  "software": [
    "Arduino C/C++",
    "Input validation",
    "Lock actuator control",
    "Status and timeout handling",
    "Arduino C++",
    "Keypad input handling",
    "Access-code comparison",
    "Solenoid timing",
    "Lockout and status logic"
  ],
  "problem": "Electronic access control needs a predictable way to accept an authorised input and operate a lock safely, including when power fails.",
  "solution": "Each controller validates its configured input and then switches the lock driver for a controlled interval. The final builds should use a properly rated driver, flyback protection where needed, and a safe mechanical override.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Built and tested ESP32 DevKit V1 access-control stage with relay driver, buck converter, and OLED status display",
    "Assembled enclosed Arduino Uno solenoid & RPM controller box with 4-channel relay module, brass solenoid valves, cooling fan, and 16×2 LCD",
    "Validated code-entry verification, timed actuator switching, and isolated power delivery",
    "Advanced the architecture into the flagship multi-factor AEGIS Smart Door Lock"
  ],
  "related": [
    "aegis-smart-lock"
  ]
};

export default project;
