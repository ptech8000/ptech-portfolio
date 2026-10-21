import type { Project } from "../schema";

const project: Project = {
  "slug": "esp8266-robot-car",
  "title": "Wi-Fi Surveillance & Arm Robot Car (ESP8266 / ESP32-CAM)",
  "category": "ROBOTICS",
  "group": "ROBOTICS",
  "icon": "ugv",
  "hue": "#00d9ff",
  "built": true,
  "image": "/projects/esp8266-robot-car/robot-car-hero.jpg",
  "imageAlt": "4WD mobile robot chassis with DC gear motors, motor driver, and 3D-printed ultrasonic sensor mount",
  "gallery": [
    { "src": "/projects/esp8266-robot-car/robot-car-hero.jpg", "caption": "4WD mobile robot chassis with DC gear motors, L298N motor driver, and 3D-printed ultrasonic sensor mount" },
    { "src": "/projects/esp8266-robot-car/robot-car-webui-live.jpg", "caption": "Wi-Fi surveillance robot car on the bench with live camera stream and directional web control UI running on the laptop" },
    { "src": "/projects/esp8266-robot-car/robot-car-servo-arm.jpg", "caption": "Mobile robot platform fitted with a 3D-printed multi-DOF servo robotic arm, claw gripper, and dual 18650 lithium battery pack" },
    { "src": "/projects/esp8266-robot-car/robot-car-side.jpg", "caption": "Side profile of the 4WD robot platform showing chassis wiring and wheel drive" }
  ],
  "tags": "ESP8266 · ESP32-CAM · L298N · Web UI & Live Video · 3D-Printed Servo Arm",
  "summary": "A Wi-Fi-controlled mobile robot platform built across modular configurations: a 4WD chassis with L298N motor drive, an ESP32-CAM live video surveillance & browser directional control interface, and a 3D-printed multi-DOF servo robotic arm configuration.",
  "status": "WORKING SYSTEM / VERIFIED",
  "implementation": "HARDWARE & WEB UI VERIFIED",
  "evidence": "Verified across multiple physical configurations: (1) 4WD ultrasonic/L298N chassis, (2) ESP32-CAM wireless surveillance car streaming live video to the browser directional D-pad controller, and (3) wheeled manipulator fitted with a 3D-printed servo robotic arm and dual 18650 battery pack.",
  "platform": "ESP8266 NodeMCU / ESP32-CAM",
  "control": "Browser Web UI (D-Pad + Live Stream) / Blynk",
  "communication": "Wi-Fi HTTP / WebSockets",
  "video": "ESP32-CAM Live MJPEG Stream",
  "audio": "—",
  "hardware": [
    "ESP8266 NodeMCU & ESP32-CAM wireless controller modules",
    "L298N dual H-bridge DC motor driver",
    "4WD DC gear motors, robot chassis, and high-grip wheels",
    "3D-printed multi-DOF servo robotic arm with claw gripper attachment",
    "3D-printed ultrasonic sensor bracket and camera mast",
    "Dual 18650 lithium-ion battery pack and regulated motor power rail",
    "Status LEDs and onboard microSD capture support"
  ],
  "software": [
    "Embedded C/C++ firmware (Arduino / ESP-IDF)",
    "Browser-based Web Control UI with live camera feed and 5-button directional pad (Forward, Left, Stop, Right, Reverse)",
    "Differential H-bridge motor direction, speed (PWM), and interlock logic preventing conflicting output states",
    "Immediate stop command and connection-loss safe-stop handling",
    "Servo joint-angle control for the mounted 3D-printed robotic arm",
    "Blynk and local Wi-Fi AP/Station control modes"
  ],
  "facts": [
    [
      "Controllers",
      "ESP8266 NodeMCU & ESP32-CAM"
    ],
    [
      "Drive Stage",
      "L298N Dual H-Bridge · 4WD DC Gear Motors"
    ],
    [
      "Control UI",
      "Web D-Pad + Live Camera Stream"
    ],
    [
      "Payload Modules",
      "3D-Printed Servo Arm · Ultrasonic Sensor"
    ]
  ],
  "problem": "A compact mobile robot platform needs reliable wireless motor control, live visual feedback for remote driving, and modular mechanical attachments without risking motor driver shoot-through or runaway motion.",
  "solution": "Built a modular Wi-Fi robot car driven through an L298N H-bridge with explicit pin mapping, mutually exclusive direction interlocks, and dedicated 18650 battery power distribution. One configuration pairs an ESP32-CAM with a browser control interface displaying real-time video above a directional control pad, while a second configuration mounts a custom 3D-printed servo robotic arm and gripper directly onto the mobile base.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Finalized motor and L298N driver pin mapping with mutually exclusive directional interlocks",
    "Verified forward, reverse, and differential pivot-turn torque under full chassis load",
    "Implemented immediate stop and connection-loss safe-stop behaviour in firmware",
    "Validated dual 18650 lithium battery supply and motor-driver current handling under load",
    "Integrated live ESP32-CAM video streaming with browser-based directional control UI",
    "Fabricated and mounted a 3D-printed multi-DOF servo robotic arm and ultrasonic mount",
    "Documented complete bench build photographs across all three hardware configurations"
  ],
  "related": [
    "smart-multi-purpose-ugv",
    "robotics-bench-builds",
    "3d-printing-fabrication"
  ]
};

export default project;
