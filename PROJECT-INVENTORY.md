# P-TECH Project Inventory (v5)

Case studies live in `app/data/projects/` — one file per project. Numbering on the site is automatic (order in `index.ts`).
Discussion of a project does not prove it is complete: confirm status and component details before presenting anything as a finished build.

## Work page (21 case studies)

| # | Project | Status | Notes |
|---:|---|---|---|
| 01 | Smart Multi-Purpose UGV | Active development | Flagship. Pi + Arduino, 4G/ngrok, watchdog / obstacle-stop / tilt-cutoff firmware |
| 02 | Smart Syringe Pump | Prototype | Flagship. Firmware v7, calibrated 12,463 steps = 60 mL, IEC 60601-2-24 benchmark target |
| 03 | AgriBot | Active development | Flagship. Pi 5 + ESP32-C3, YOLO11n INT8, five-state machine |
| 04 | AEGIS Smart Lock | Active development | Flagship. ESP32 RFID + fingerprint, REST API, OTA |
| 05 | PT-1 Portable Power Station | Design / prototype | Replaces "500 W Power Station" (assumed same product line — see below) |
| 06 | Smart Blind Walking Stick | Prototype | |
| 07 | Smart IoT Parking System | Prototype | Repository linked |
| 08 | MediFlight MF-1 | Concept | No flight hardware built |
| 09 | P-TECH GPS Tracker | Development | |
| 10 | Code4Us: Classroom Hardware & Tools | Active | Pi CBT server + EduComm-Device |
| 11 | WiFi Pager | Prototype (v1.0) | New, from the WiFi_Pager_v1.0 repository |
| 12 | Raspberry Pi Security Camera | Development / testing | |
| 13 | Smart Greenhouse & Plant Watering | Prototype | Merged: Greenhouse Monitoring + RTC Plant Watering |
| 14 | ESP8266 Weather Station | Prototype | |
| 15 | ESP32-C3 Smart Socket | Development | |
| 16 | Automated Pet Feeder | Prototype | |
| 17 | Keypad & Solenoid Lock Prototypes | Prototype | Merged: Arduino Door-Lock + ESP32 Keypad Solenoid Lock |
| 18 | ESP8266 Robot Car & Wi-Fi Controller | Prototype / iteration | Merged: Robot Car + LED/Motor Controller |
| 19 | Servo Arm & Line-Following Robot | Prototype / experiment | Merged: Servo Robotic Arm + MegaPi Line Follower |
| 20 | Robotic Telescope and Camera | Design / experiment | |
| 21 | Jarvis Personal Assistant | Experiment | |

## GitHub repositories linked
- Syringe pump: Smart_Syringe_Pump, ESP32_NEMA17_Web_Controller
- Smart IoT Parking System: Smart_IOT_Parking_System
- Smart Blind Walking Stick: Smart-AI-Powered-Blind-walking-Stick, Smart_Vision_Analyst_ESP32_CAM
- AEGIS Smart Lock: Smart_door_lock (assumed to be the AEGIS repo — confirm)
- Smart Greenhouse & Plant Watering: smart_irrigation
- WiFi Pager: WiFi_Pager_v1.0
- Lab bench note: attendance-dashboard

## Moved to Lab → Bench notes & concepts (`app/data/lab.ts`)
Arduino Nano Bluetooth configuration · Raspberry Pi JSON over HTTPS · Raspberry Pi 5 file server plan · ESP32-C3 CBT practice device.

Old URLs for merged or moved entries redirect automatically (`next.config.mjs`).

## Still to confirm before public release
1. PT-1 vs the older "500 W power station": the original concept figures (12.6 V, 66 Ah, 831.6 Wh) are kept as "original concept figures" on the PT-1 page. Split them if they are different products.
2. Syringe pump: the older theoretical figures (2,560 steps/mm, 0.26 µL/step, M8 1.25 mm lead rod) were removed because the calibrated firmware figure (207.7 steps/mL) does not match them. Add the real leadscrew / microstep details.
3. UGV: firmware pin map was written for an Arduino Uno; the page says Arduino (Nano-class). Confirm the final board.
4. AEGIS, AgriBot, GPS tracker, pet feeder: add the lock/actuator/drive hardware and photos.
5. Real photographs, circuit diagrams and test results for every project.
6. Never publish credentials, Wi-Fi passwords, API keys or sensitive network details.
