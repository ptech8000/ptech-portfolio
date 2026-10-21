import type { Project } from "../schema";

const project: Project = {
  "slug": "pet-feeder",
  "title": "Automated Pet Feeder",
  "category": "AUTOMATION",
  "group": "EMBEDDED",
  "icon": "paw",
  "hue": "#f472b6",
  "built": true,
  "videoUrl": "https://www.tiktok.com/@ajayi.promise/video/7678679114726788373?is_from_webapp=1&sender_device=pc&web_id=7698934462520296980",
  "videoLabel": "Watch Automated Pet Feeder Demo on TikTok",
  "image": "/projects/pet-feeder/feeder-hero.jpg",
  "imageAlt": "Powered bench test showing 20x4 LCD status, 4x4 keypad, NEMA 17 stepper, and control board",
  "gallery": [
    { "src": "/projects/pet-feeder/feeder-hero.jpg", "caption": "Powered bench test showing 20×4 LCD status (Next feed: 08:00 / Bowl: OK), 4×4 keypad, NEMA 17 stepper, and control board" },
    { "src": "/projects/pet-feeder/feeder-board.jpg", "caption": "Close-up of the custom soldered perfboard with Arduino Nano, DS3231 RTC, A4988 driver, and DC-DC buck converter" }
  ],
  "tags": "Arduino · NEMA 17 Stepper · DS3231 RTC · 4×4 Keypad · 20×4 I²C LCD",
  "summary": "An automated pet feeder that dispenses calibrated food portions with a NEMA 17 stepper motor, maintains schedules across power cycles with a DS3231 RTC, and is operated through a 4×4 keypad and 20×4 I²C LCD with hopper and bowl monitoring.",
  "status": "VALIDATED & COMPLETE",
  "implementation": "HARDWARE & DEMO VIDEO VERIFIED",
  "evidence": "Custom perfboard soldered with Arduino Nano, DS3231 RTC, A4988 stepper driver, and DC-DC buck converter; calibrated stepper portion dispensing, RTC battery-backed schedule persistence, 20×4 I²C LCD ('Next feed: 08:00 / Bowl: OK'), and 4×4 keypad verified in live video testing.",
  "platform": "Arduino Uno / Nano",
  "control": "4×4 keypad + 20×4 I²C LCD",
  "communication": "Local",
  "video": "Live Demo Video (TikTok)",
  "audio": "—",
  "hardware": [
    "Arduino Uno / Nano",
    "NEMA 17 stepper motor dispenser + A4988 driver",
    "DS3231 battery-backed RTC module",
    "20×4 I²C LCD",
    "4×4 matrix keypad",
    "Microswitch for hopper & bowl status detection",
    "Custom soldered perfboard with DC-DC buck converter"
  ],
  "software": [
    "Arduino C++ firmware (complete sketch)",
    "DS3231 RTC timekeeping and power-loss schedule retention",
    "Calibrated stepper rotation control for repeatable portion sizes",
    "4×4 keypad schedule configuration and 20×4 I²C LCD status UI",
    "Hopper interlock, jam protection, and bowl status monitoring"
  ],
  "problem": "Pets need feeding at regular times even when their owner is away, and portions should remain consistent even if mains power flickers.",
  "solution": "The battery-backed DS3231 RTC keeps accurate time across power interruptions, the NEMA 17 stepper dispenses calibrated food portions via an A4988 driver, and the 4×4 keypad and 20×4 LCD let the owner configure feeding times and check bowl/hopper status at a glance.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Calibrated portion dispensing per NEMA 17 stepper rotation",
    "Verified hopper interlock, bowl status ('Bowl: OK'), and anti-jam stepper control",
    "Tested DS3231 RTC schedule retention and recovery across power loss",
    "Soldered custom perfboard (Arduino Nano, DS3231 RTC, A4988 driver, DC-DC buck converter) and documented build photos & live video"
  ]
};

export default project;
