import type { Project } from "../schema";

const project: Project = {
  "slug": "robotic-telescope",
  "title": "Robotic Telescope and Camera",
  "category": "SPACE TECHNOLOGY",
  "group": "EMBEDDED",
  "icon": "telescope",
  "hue": "#f472b6",
  "tags": "ESP8266 · Raspberry Pi Camera",
  "summary": "A proposed telescope-control system combining ESP8266 motor control with a Raspberry Pi camera stream for remote observation and STEM demonstrations.",
  "status": "DESIGN / EXPERIMENT",
  "platform": "ESP8266 + Raspberry Pi 3 Model B",
  "control": "Web interface concept",
  "communication": "Wi-Fi / LAN",
  "video": "Raspberry Pi camera stream",
  "audio": "—",
  "hardware": [
    "ESP8266 NodeMCU",
    "Raspberry Pi 3 Model B",
    "Raspberry Pi camera",
    "Telescope mount",
    "Motors and suitable drivers",
    "Power supply and mechanical couplings"
  ],
  "software": [
    "Arduino C++ motor-control firmware",
    "Raspberry Pi camera utilities",
    "Web interface concept",
    "Network video streaming",
    "Optional zoom controls subject to camera optics"
  ],
  "problem": "Remote telescope operation can make observation and space-science demonstrations easier to control and share.",
  "solution": "Separate motor-control commands on the ESP8266 from camera capture and streaming on the Raspberry Pi. The design needs mechanical limits and controlled movement to avoid damaging the mount or optics.",
  "future": [
    "Confirm mount mechanics and motor type",
    "Implement calibrated movement and limit handling",
    "Test camera focus and stream latency",
    "Distinguish optical zoom from digital crop",
    "Add system diagram and real observation footage"
  ]
};

export default project;
