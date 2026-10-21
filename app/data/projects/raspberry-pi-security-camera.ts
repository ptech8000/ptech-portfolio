import type { Project } from "../schema";

const project: Project = {
  "slug": "raspberry-pi-security-camera",
  "title": "Raspberry Pi Security Camera",
  "category": "COMPUTER VISION",
  "group": "AI",
  "icon": "camera",
  "hue": "#a78bfa",
  "tags": "Raspberry Pi 3 · Camera · Motion Detection",
  "summary": "A Raspberry Pi 3 camera-monitoring project exploring live viewing, motion-triggered recording and local network access using the modern Raspberry Pi camera tools.",
  "status": "DEVELOPMENT / TESTING",
  "platform": "Raspberry Pi 3 Model B",
  "control": "Linux camera tools",
  "communication": "Local network",
  "video": "Pi Camera / rpicam",
  "audio": "—",
  "hardware": [
    "Raspberry Pi 3 Model B",
    "Camera module (including IMX219 where configured)",
    "microSD card",
    "Power supply",
    "Network connection",
    "Optional IR illumination for a suitable night-vision camera"
  ],
  "software": [
    "Raspberry Pi OS",
    "rpicam camera utilities",
    "Motion or compatible streaming/recording tools",
    "Local network stream and recording configuration"
  ],
  "problem": "A small single-board computer can provide a configurable local camera system for monitoring and recording.",
  "solution": "Configure the Pi camera stack, verify camera capture, then add a local stream and motion-based recording. Stream availability depends on the chosen service, port configuration, network and camera compatibility; features should be marked complete only after successful end-to-end tests.",
  "future": [
    "Confirm stable capture and focus with the installed camera",
    "Verify stream access from another device on the LAN",
    "Test motion recording and storage rotation",
    "Add privacy-conscious access controls",
    "Measure CPU, RAM, temperature and recording reliability"
  ],
  "related": [
    "smart-multi-purpose-ugv"
  ]
};

export default project;
