import type { Project } from "../schema";

const project: Project = {
  "slug": "smart-multi-purpose-ugv",
  "title": "Smart Multi-Purpose UGV",
  "category": "ROBOTICS",
  "group": "ROBOTICS",
  "icon": "ugv",
  "hue": "#00d9ff",
  "tags": "Raspberry Pi · Arduino Nano · Vision AI HUD · GPS Corridor Nav · 4G Remote",
  "built": true,
  "image": "/projects/smart-multi-purpose-ugv/ugv-hero.jpg",
  "imageAlt": "Tracked Smart Multi-Purpose UGV prototype with front camera, dual LED headlights, and sealed electronics enclosure",
  "gallery": [
    { "src": "/projects/smart-multi-purpose-ugv/ugv-hero.jpg", "caption": "Tracked UGV with front camera, dual LED headlights, and sealed electronics enclosure" },
    { "src": "/projects/smart-multi-purpose-ugv/ugv-full-dashboard.png", "caption": "Full mission-control web dashboard showing live camera feed with Vision AI HUD (PATH CLEAR), satellite GPS corridor navigation, environmental telemetry (29.6 °C / 62%), and Audio & Voice Center" },
    { "src": "/projects/smart-multi-purpose-ugv/ugv-front.jpg", "caption": "Front profile showing DC gear motor drive, rubber tracks, and optical/ultrasonic sensor mount" },
    { "src": "/projects/smart-multi-purpose-ugv/ugv-dashboard-1.jpg", "caption": "Satellite map & GPS tracking panel with live breadcrumb trail and waypoint corridor overlay" },
    { "src": "/projects/smart-multi-purpose-ugv/ugv-dashboard-2.jpg", "caption": "Multi-waypoint autonomous corridor navigation view with distance and bearing telemetry" }
  ],
  "summary": "A globally accessible tracked ground vehicle combining autonomous GPS waypoint corridor navigation, real-time Vision AI HUD object detection, OCR text scanning, two-way audio and Text-to-Speech voice projection, environmental telemetry, and hardware safety watchdogs.",
  "status": "WORKING SYSTEM / ACTIVE",
  "implementation": "FULL STACK INTEGRATED",
  "evidence": "Verified live mission-control run over Airtel 4G + Wi-Fi Repeater: 640×480 @ 15 FPS video stream with 8 FPS Vision AI HUD (humans, chairs, vehicles, obstacles), 3D GPS fix (7.3874° N), active autonomous waypoint corridor navigation with Return-to-Home (RTH), live temperature/humidity readout (29.6 °C, 62%), and two-way microphone + TTS voice center.",
  "platform": "Raspberry Pi 3 + Arduino Nano",
  "control": "Auto Corridor Nav + Web Mission Control",
  "communication": "4G (Airtel) + Wi-Fi Repeater + Global Tunnel",
  "video": "640×480 @ 15 FPS + Vision AI HUD (8 FPS)",
  "audio": "INMP441 Mic + MAX98357A + TTS Voice",
  "hardware": [
    "Raspberry Pi 3 Model B (vision, autonomy, web server, audio)",
    "Arduino Nano (real-time motor drive + sensor I/O)",
    "BTS7960 high-current motor drivers ×2",
    "12 V DC gear motors ×2 + tracked chassis",
    "Day/night camera with servo tilt control",
    "NEO-6 GPS receiver (3D fix + waypoint tracking)",
    "nRF24L01 radio transceiver",
    "INMP441 I²S digital microphone + MAX98357A speaker amplifier",
    "HC-SR04 ultrasonic + HLK-LD2450 mmWave radar",
    "MPU6050 (GY-521) 6-axis IMU",
    "DHT11 temperature & humidity + MQ-2 gas + LDR sensors",
    "OLED status display + dual front LED headlights",
    "Buck converter + 12 V battery pack with voltage telemetry",
    "Airtel 4G router + onboard Wi-Fi repeater"
  ],
  "software": [
    "Full mission-control web dashboard (Drive, Health, Hardware, Logs)",
    "Real-time Vision AI HUD (detects humans, chairs, vehicles, obstacles at ~8 FPS) + OCR Scan Text",
    "Autonomous GPS Waypoint Corridor Navigation with cross-track offset & Return-to-Home (RTH)",
    "Satellite, Cyber Dark, and Streets interactive GPS map layers",
    "Live 640×480 @ 15 FPS video feed with snapshot and onboard recording",
    "Audio & Voice Center: live robot mic streaming + Text-to-Speech (TTS) voice output",
    "Auto / Manual drive modes with variable motor-speed and camera-tilt sliders",
    "Pi ⇄ Arduino WebSocket serial bridge (port 8765, 115200 baud)",
    "Hardware safety interlocks: 800 ms command watchdog, 20 cm obstacle stop, and 35° tilt cutoff"
  ],
  "facts": [
    [
      "Autonomy",
      "GPS Waypoint Corridor Nav + Return-to-Home (RTH)"
    ],
    [
      "Vision AI HUD",
      "640×480 @ 15 FPS video · 8 FPS object detection + OCR"
    ],
    [
      "Remote Link",
      "Airtel 4G + Wi-Fi Repeater + Global Access tunnel"
    ],
    [
      "Audio & Voice",
      "Live robot mic + Text-to-Speech (TTS) broadcast"
    ],
    [
      "Safety Logic",
      "800 ms watchdog · 20 cm stop · 35° tilt cutoff"
    ],
    [
      "Telemetry",
      "Battery % · Speed · 3D GPS · Temp & Humidity · System Health"
    ]
  ],
  "problem": "Build a modular unmanned ground vehicle that can be driven manually or navigated autonomously from anywhere in the world for healthcare delivery, inspection, security patrol and environmental monitoring.",
  "solution": "High-level autonomy, Vision AI object detection, video/audio streaming and the mission-control dashboard run on the Raspberry Pi, while real-time motor control and safety sensors run on an Arduino over a 115200-baud serial bridge. Operators can switch between Manual Mode (with live motor speed and camera tilt controls) and Autonomous Corridor Navigation on a live satellite GPS map with Return-to-Home (RTH), while viewing real-time AI HUD overlays, environmental telemetry, and speaking through the robot via Text-to-Speech.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "DEPLOYED MISSION CAPABILITIES",
  "future": [
    "Live 640×480 @ 15 FPS camera stream with 8 FPS Vision AI object detection HUD and OCR text scanning",
    "Autonomous GPS Waypoint Corridor Navigation on satellite map with Return-to-Home (RTH)",
    "Global 4G (Airtel) + Wi-Fi Repeater remote command link with 800 ms safety watchdog",
    "Two-way Audio & Voice Center with live robot microphone streaming and Text-to-Speech (TTS) broadcast",
    "Full hardware safety interlocks: 20 cm ultrasonic emergency stop and 35° IMU tilt cutoff"
  ],
  "flagship": {
    "tag": "ROBOTICS / AUTONOMOUS & REMOTE SYSTEMS",
    "blurb": "A globally accessible tracked UGV with live 640×480 video, real-time Vision AI HUD object detection, autonomous GPS waypoint corridor navigation with Return-to-Home, two-way audio + Text-to-Speech, and hardware safety watchdogs over 4G.",
    "specs": [
      [
        "AI HUD",
        "8 FPS object detection + OCR"
      ],
      [
        "GPS Auto",
        "Corridor Nav + RTH"
      ],
      [
        "4G + WiFi",
        "Global remote access"
      ],
      [
        "800 ms",
        "Hardware safety watchdog"
      ]
    ],
    "chips": [
      "Raspberry Pi 3",
      "Arduino",
      "Vision AI HUD",
      "GPS Corridor Nav"
    ],
    "note": "Working system — verified with live Vision AI HUD, GPS corridor navigation, and 4G mission control."
  }
};

export default project;
