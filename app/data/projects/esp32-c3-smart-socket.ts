import type { Project } from "../schema";

const project: Project = {
  "slug": "esp32-c3-smart-socket",
  "title": "ESP32-C3 Smart Home & Dual-Channel Smart Socket",
  "category": "EMBEDDED IoT / SMART HOME",
  "group": "IoT",
  "icon": "power",
  "hue": "#fbbf24",
  "built": true,
  "videoUrl": "https://www.tiktok.com/@ajayi.promise/video/7670517180043169045?is_from_webapp=1&sender_device=pc&web_id=7698934462520296980",
  "videoLabel": "Watch Smart Home Demo on TikTok",
  "image": "/projects/esp32-c3-smart-socket/socket-hero.jpg",
  "imageAlt": "ESP32-C3 Supermini Smart Home web interface for two-channel relay control",
  "gallery": [
    { "src": "/projects/esp32-c3-smart-socket/socket-hero.jpg", "caption": "ESP32-C3 Supermini Smart Home web interface for two-channel relay control" },
    { "src": "/projects/esp32-c3-smart-socket/socket-wall-mounted.jpg", "caption": "Wall-mounted 3D-printed smart switch installed alongside a three-gang wall switch" },
    { "src": "/projects/esp32-c3-smart-socket/socket-round-switch.jpg", "caption": "Internal view of the circular 3D-printed smart switch housing dual relays and USB-C power" },
    { "src": "/projects/esp32-c3-smart-socket/socket-perfboard.jpg", "caption": "Perfboard assembly pairing the ESP32-C3 Super Mini with a dual 5V Songle relay module" },
    { "src": "/projects/esp32-c3-smart-socket/socket-relay-node.jpg", "caption": "Standalone AC-powered two-channel relay node on perfboard" }
  ],
  "tags": "ESP32-C3 · Smart Home Web UI · Voice / IR / Wi-Fi Relay Control · 3D-Printed Wall Switch",
  "summary": "A complete smart-home switching and socket ecosystem built on the ESP32-C3 Super Mini — combining two-channel AC relay control, a responsive mobile/browser Smart Home web UI, IR remote support, and a custom 3D-printed wall-mounted enclosure.",
  "status": "WORKING SYSTEM / DEPLOYED",
  "implementation": "HARDWARE & DEMO VIDEO VERIFIED",
  "evidence": "Wall-mounted and live-tested in a real room installation: switching AC lighting and appliance loads via the ESP32-C3 Smart Home web interface and physical/remote triggers, housed inside a custom circular 3D-printed enclosure.",
  "platform": "ESP32-C3 Super Mini",
  "control": "Smart Home Web UI + IR Remote + Voice/Mobile",
  "communication": "Wi-Fi AP / STA",
  "video": "Live Demo Video (TikTok)",
  "audio": "—",
  "hardware": [
    "ESP32-C3 Super Mini wireless microcontroller",
    "Dual-channel 5 V Songle AC relay module (10 A / 250 VAC rated)",
    "Custom circular 3D-printed wall-mount enclosure",
    "Infrared receiver and IR remote control support",
    "Compact AC-to-5V isolated power module / USB-C supply",
    "Perfboard carrier and protected terminal blocks"
  ],
  "software": [
    "Embedded C/C++ firmware (Arduino / ESP-IDF)",
    "Responsive ESP32-C3 Smart Home web interface for real-time ON/OFF switching and state feedback",
    "ESPAsyncWebServer HTTP endpoints with synchronized relay state tracking",
    "IRremote command decoding mapped to relay toggle actions",
    "Safe default power-on relay states (active-low boot protection)",
    "Wi-Fi station and fallback access-point operation"
  ],
  "facts": [
    [
      "Controller",
      "ESP32-C3 Super Mini"
    ],
    [
      "Switching",
      "2× 10 A AC Relay Channels"
    ],
    [
      "Enclosure",
      "Custom 3D-Printed Wall Housing"
    ],
    [
      "Interfaces",
      "Mobile Web UI · IR Remote"
    ]
  ],
  "problem": "Retrofitting existing room lighting and wall outlets for smart control often requires cloud-dependent gadgets that stop working when internet connectivity drops.",
  "solution": "Designed and built a self-contained smart-home switch around the ESP32-C3 Super Mini and dual 10 A relays housed in a custom 3D-printed circular wall enclosure. Residents can toggle lights and appliances instantaneously from any phone browser on the local Wi-Fi network or with a standard IR remote, with synchronized relay state feedback and safe power-up defaults.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Designed and soldered the compact ESP32-C3 Super Mini + dual Songle relay perfboard assembly",
    "Modeled and 3D-printed the custom circular wall-mount switch enclosure",
    "Built and deployed the mobile-friendly ESP32-C3 Smart Home web control dashboard",
    "Verified safe active-low relay initialization on reboot and synchronized state feedback",
    "Installed on-wall alongside existing room switches and demonstrated live AC load control on video"
  ],
  "related": [
    "3d-printing-fabrication",
    "aegis-smart-lock",
    "pt-1-portable-power-station"
  ]
};

export default project;
