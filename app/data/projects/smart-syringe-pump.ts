import type { Project } from "../schema";

const project: Project = {
  "slug": "smart-syringe-pump",
  "title": "Smart Syringe Pump",
  "category": "PRECISION",
  "group": "EMBEDDED",
  "icon": "syringe",
  "hue": "#34d399",
  "tags": "ESP32 · NEMA17 · A4988 · HX711 · MQTT",
  "built": true,
  "image": "/projects/smart-syringe-pump/syringe-hero.jpg",
  "imageAlt": "Complete Smart Syringe Pump assembly with 60 mL syringe, 3D-printed mounts, lead screw linear actuator, and electronics enclosure",
  "gallery": [
    { "src": "/projects/smart-syringe-pump/syringe-hero.jpg", "caption": "Complete syringe pump assembly with 60 mL syringe, 3D-printed mounts, lead screw, and electronics enclosure" },
    { "src": "/projects/smart-syringe-pump/syringe-front.jpg", "caption": "Front close-up of 60 mL syringe retention bracket, guide rod, and end-stop wiring" },
    { "src": "/projects/smart-syringe-pump/syringe-rear.jpg", "caption": "Rear view showing NEMA 17 stepper motor mount, power switch, status LED, and mains power inlet" },
    { "src": "/projects/smart-syringe-pump/syringe-top.jpg", "caption": "Top-down view of the linear drive train, plunger carriage, and limit switch placement" },
    { "src": "/projects/smart-syringe-pump/pump-schematic.png", "caption": "Complete wiring schematic showing ESP32, A4988 stepper driver, NEMA 17 motor, HX711 load-cell amplifier, limit switches, and 12V/5V regulation" }
  ],
  "summary": "An ESP32-controlled precision syringe pump with a stepper-driven plunger, load-cell and motor-current feedback, limit switches and a secure cloud telemetry link, calibrated and validated against IEC 60601-2-24 using gravimetric testing.",
  "status": "VALIDATED & COMPLETE",
  "implementation": "CALIBRATED & VERIFIED",
  "evidence": "Gravimetric accuracy and repeatability tested across the full 60 mL travel (12,463 steps = 60 mL, 207.7 steps/mL) following IEC 60601-2-24. Occlusion detection thresholds, HOME/MAX limit switches, emergency stop, fault handling, and complete electrical and mechanical documentation have been validated.",
  "platform": "ESP32",
  "control": "MQTT / Node-RED dashboard",
  "communication": "Wi-Fi / MQTT over TLS",
  "video": "—",
  "audio": "—",
  "hardware": [
    "ESP32",
    "NEMA 17 stepper motor",
    "A4988 stepper driver",
    "Custom PCB",
    "LM2596 buck converter + 12 V supply",
    "60 mL syringe",
    "HOME and MAX limit switches",
    "HX711 + load cell (force feedback)",
    "Motor-current sense (GPIO 34)"
  ],
  "software": [
    "Arduino C++ firmware (v7)",
    "AccelStepper with real acceleration and deceleration",
    "Smooth pause / resume and hard stop",
    "Learned running-current occlusion detection",
    "MQTT over TLS to HiveMQ Cloud, per-device topics",
    "Node-RED remote monitoring dashboard"
  ],
  "facts": [
    [
      "Calibration",
      "12,463 steps = 60 mL (207.7 steps/mL)"
    ],
    [
      "Firmware",
      "v7 · accel/decel motion profile"
    ],
    [
      "Safety inputs",
      "Limit switches · load cell · motor current"
    ],
    [
      "Occlusion",
      "Learned running-current detection"
    ],
    [
      "Telemetry",
      "MQTT / TLS · HiveMQ → Node-RED"
    ],
    [
      "Benchmark",
      "IEC 60601-2-24:2012, gravimetric"
    ]
  ],
  "problem": "A low-cost syringe pump needs controlled, repeatable linear movement, position limits, and a way to detect problems such as occlusion while reporting its state remotely.",
  "solution": "The ESP32 drives a stepper through an A4988 using AccelStepper, so motion starts and stops with a controlled ramp, and supports smooth pause/resume and a hard stop. Limit switches define the travel boundaries, an HX711 load cell and motor-current sensing provide feedback, and the firmware learns the normal running current to flag occlusions. Delivery is calibrated and validated gravimetrically — 12,463 steps for a 60 mL syringe — and telemetry is published over TLS-secured MQTT to a Node-RED dashboard, with full fault handling and electrical/mechanical documentation completed.",
  "futureLabel": "COMPLETED VALIDATION",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Gravimetric accuracy and repeatability validated across the full syringe travel per IEC 60601-2-24",
    "Occlusion detection thresholds validated across flow rates and syringe fill levels",
    "HOME/MAX limit-switch bounds and hard emergency-stop behaviour verified",
    "Comprehensive fault handling and safety review completed",
    "Complete electrical schematics, custom PCB, and mechanical assembly documented"
  ],
  "flagship": {
    "tag": "PRECISION / FIRMWARE",
    "blurb": "A networked precision syringe pump: ESP32 firmware drives a NEMA 17 stepper through an A4988 with smooth acceleration, monitors limit switches, a load cell and motor current for occlusions, and reports to a Node-RED dashboard over TLS.",
    "specs": [
      [
        "207.7",
        "steps / mL (calibrated)"
      ],
      [
        "v7",
        "validated firmware"
      ],
      [
        "TLS 8883",
        "MQTT link"
      ],
      [
        "IEC 60601-2-24",
        "gravimetric verified"
      ]
    ],
    "chips": [
      "ESP32",
      "A4988",
      "HX711",
      "MQTT / HiveMQ"
    ],
    "note": "Validated system — gravimetric accuracy, occlusion detection, and safety interlocks verified."
  },
  "repos": [
    {
      "label": "Syringe pump firmware & project",
      "url": "https://github.com/ptech8000/Smart_Syringe_Pump"
    },
    {
      "label": "Standalone NEMA 17 web controller",
      "url": "https://github.com/ptech8000/ESP32_NEMA17_Web_Controller"
    }
  ]
};

export default project;
