import type { Project } from "../schema";

const project: Project = {
  "slug": "smart-iot-parking-system",
  "title": "Smart IoT Parking System",
  "category": "IoT",
  "group": "IoT",
  "icon": "wifi",
  "hue": "#38bdf8",
  "tags": "ESP32 · ESP-NOW · Automation",
  "summary": "A distributed parking prototype using three ESP32 boards, ESP-NOW messaging, ultrasonic sensing, a central web page and an automated gate.",
  "status": "PROTOTYPE",
  "platform": "ESP32 ×3",
  "control": "Central Web Page",
  "communication": "ESP-NOW",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Central ESP32",
    "Left-server ESP32",
    "Right-server ESP32",
    "Ultrasonic sensors for slot occupancy",
    "16×4 LCD",
    "Servo gate",
    "INA219 current/voltage monitor",
    "Parking slot indicators"
  ],
  "software": [
    "Arduino C++",
    "ESP-NOW messaging",
    "Central web server",
    "Slot-state handling",
    "LCD status output",
    "Servo gate control"
  ],
  "problem": "Parking availability is easier to manage when multiple areas report their slot states to one central interface.",
  "solution": "Use one central controller and two side controllers. The side controllers monitor parking areas and send slot-state updates over ESP-NOW; the central controller presents availability and manages the gate interface.",
  "future": [
    "Validate sensor placement for car-versus-person discrimination",
    "Add message timeout and offline-node indicators",
    "Test simultaneous occupancy changes",
    "Document full slot-state protocol",
    "Improve dashboard accessibility and diagnostics"
  ],
  "repos": [
    {
      "label": "Source repository",
      "url": "https://github.com/ptech8000/Smart_IOT_Parking_System"
    }
  ]
};

export default project;
