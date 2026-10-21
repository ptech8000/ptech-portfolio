import type { Project } from "../schema";

const project: Project = {
  "slug": "smart-blind-walking-stick",
  "title": "Smart Blind Walking Stick",
  "category": "ASSISTIVE TECHNOLOGY",
  "group": "AI",
  "icon": "eye",
  "hue": "#a78bfa",
  "built": true,
  "image": "/projects/smart-blind-walking-stick/stick-hero.jpg",
  "imageAlt": "Completed Smart Blind Walking Stick prototype showing ultrasonic sensor head, audio buzzer, and status LED",
  "gallery": [
    { "src": "/projects/smart-blind-walking-stick/stick-hero.jpg", "caption": "Completed Smart Blind Walking Stick prototype showing ultrasonic sensor head, audio buzzer, and status LED" },
    { "src": "/projects/smart-blind-walking-stick/stick-outdoor.jpg", "caption": "Outdoor field test view of the sensor housing and power switch mounted on the walking cane" },
    { "src": "/projects/smart-blind-walking-stick/stick-shaft.jpg", "caption": "Ergonomic handle and adjustable aluminum shaft during hardware assembly" },
    { "src": "/projects/smart-blind-walking-stick/stick-schematic.png", "caption": "Full system wiring schematic: Arduino Nano, HC-SR04 ultrasonic sensor, water sensor, TIP120 vibration driver, 2N2222 buzzer driver, ESP32-CAM, MAX98357A I²S amplifier, and LiPo power rail" },
    { "src": "/projects/smart-blind-walking-stick/stick-pinout-table.png", "caption": "Hardware pinout reference table mapping every Arduino Nano and ESP32-CAM pin connection" }
  ],
  "tags": "ESP32-CAM · Arduino Nano · Computer Vision · I²S Audio & Haptics",
  "summary": "An assistive walking cane combining ESP32-CAM computer-vision object detection, ultrasonic obstacle sensing, wet-ground detection, and spoken/haptic hazard alerts.",
  "status": "WORKING SYSTEM / VERIFIED",
  "implementation": "HARDWARE & VISION API VERIFIED",
  "platform": "ESP32-CAM + Arduino Nano",
  "control": "Sensor + Vision Pipeline",
  "communication": "SoftwareSerial / API",
  "video": "Computer Vision API",
  "audio": "MAX98357A / Speaker",
  "hardware": [
    "ESP32-CAM",
    "Arduino Nano",
    "HC-SR04 ultrasonic sensor",
    "Water / wet-ground sensor",
    "Vibration motor with transistor driver",
    "Buzzer with transistor driver",
    "MAX98357A I²S amplifier",
    "Speaker",
    "TP4056 charging module",
    "3.7 V battery + 5 V boost converter",
    "Logic-level shifting for serial RX"
  ],
  "software": [
    "Arduino C++ sensor-node firmware",
    "Non-blocking haptic pattern",
    "Computer-vision API integration",
    "Serial sensor messaging",
    "Spoken object alerts",
    "Obstacle and water event handling",
    "Trigger-button image capture (AI Thinker ESP32-CAM, VGA)",
    "HTTPS upload to an online object-detection API",
    "Configurable detection confidence threshold"
  ],
  "problem": "A walking aid should communicate nearby obstacles and wet-ground hazards in a way that can be perceived without relying only on vision.",
  "solution": "Use an Arduino Nano sensor node for distance and water sensing, while the ESP32-CAM-based vision path can classify objects. Combine distinct vibration and buzzer feedback with spoken descriptions, while keeping sensor sampling responsive through non-blocking timing.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Assembled complete walking cane with ultrasonic obstacle sensor, wet-ground detector, vibration motor, buzzer, and I²S speaker",
    "Verified ESP32-CAM vision detection pipeline and spoken person-ahead audio alerts (79.05% confidence test logged)",
    "Engineered non-blocking haptic and buzzer alert patterns driven via TIP120 and 2N2222 transistor stages",
    "Integrated rechargeable 3.7 V LiPo battery with TP4056 charger and 5 V boost regulation",
    "Documented full wiring schematic, pinout table, outdoor field photos, and dual open-source firmware repositories"
  ],
  "evidence": "Recorded API test: status success, detection_count 1, class_name person, confidence 79.05%. The project log also records a spoken person-ahead alert; repeat testing is still needed to confirm reliable playback in all conditions.",
  "related": [
    "smart-multi-purpose-ugv"
  ],
  "repos": [
    {
      "label": "Walking stick firmware",
      "url": "https://github.com/ptech8000/Smart-AI-Powered-Blind-walking-Stick"
    },
    {
      "label": "Vision analyst (ESP32-CAM)",
      "url": "https://github.com/ptech8000/Smart_Vision_Analyst_ESP32_CAM"
    }
  ]
};

export default project;
