import type { Project } from "../schema";

const project: Project = {
  "slug": "robotics-bench-builds",
  "title": "Servo Arm & Line-Following Robot",
  "category": "ROBOTICS EDUCATION",
  "group": "ROBOTICS",
  "icon": "arm",
  "hue": "#00d9ff",
  "built": true,
  "image": "/projects/robotics-bench-builds/bench-arm-hero.jpg",
  "imageAlt": "3D-printed multi-DOF servo robotic arm with claw gripper, rotating base, and 4-potentiometer Arduino Uno controller",
  "gallery": [
    { "src": "/projects/robotics-bench-builds/bench-arm-hero.jpg", "caption": "3D-printed multi-DOF servo robotic arm with claw gripper, rotating base, and 4-potentiometer Arduino Uno controller" },
    { "src": "/projects/esp8266-robot-car/robot-car-servo-arm.jpg", "caption": "3D-printed servo robotic arm integrated onto a wheeled mobile robot base with dual 18650 lithium battery pack" },
    { "src": "/projects/robotics-bench-builds/bench-line-follower.jpg", "caption": "Dual-wheel MDF line-following robot chassis with front IR line sensors and dual 18650 battery pack" }
  ],
  "tags": "Servos · Line sensors · Arduino · Makeblock MegaPi",
  "summary": "Two robotics teaching builds: a servo-actuated arm for coordinated joint movement (both bench-mounted and mobile-chassis mounted), and a line-following robot on a Makeblock MegaPi / Arduino Uno platform for sensor-based steering.",
  "status": "WORKING SYSTEM / VERIFIED",
  "implementation": "HARDWARE BUILT & TESTED",
  "evidence": "Assembled and tested both the 4-DOF 3D-printed servo robotic arm (controlled via 4-potentiometer analog rig and mounted on a mobile chassis) and the dual-18650 IR line-following robot.",
  "platform": "Arduino / Makeblock MegaPi",
  "control": "Servo commands + line sensors",
  "communication": "Local / Wi-Fi if enabled",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Microcontroller board",
    "Servo motors",
    "Arm brackets or 3D-printed links",
    "Suitable regulated servo power supply",
    "Jumper wires and mounting hardware",
    "Makeblock MegaPi platform",
    "Arduino Uno used in related experiments",
    "Line-tracking sensors",
    "DC motors and driver",
    "Robot chassis"
  ],
  "software": [
    "Arduino C++",
    "Servo control library",
    "Joint-angle mapping",
    "Optional web or Blynk control",
    "Embedded C/C++",
    "Sensor threshold logic",
    "Motor steering control",
    "Calibration and tuning"
  ],
  "problem": "Small arms and line followers are accessible ways to learn the link between code, sensing and physical movement, feedback control and mechanical limits.",
  "solution": "For the arm, controller commands map to safe servo positions and each joint is tested before coordinated movement. For the line follower, sensor readings adjust left and right motor behaviour to keep the robot on the track. Joint count, payload and the final sensor arrangement should be documented from the assembled builds.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "3D-printed multi-DOF servo arm links, rotating base, and parallel claw gripper",
    "Calibrated safe mechanical joint angle limits and 4-potentiometer manual control mapping",
    "Mounted the servo robotic arm onto a mobile wheeled base powered by dual 18650 cells",
    "Built and tuned the IR sensor line-following robot for track following and differential steering",
    "Documented full bench and mobile-arm build photographs"
  ],
  "related": [
    "esp8266-robot-car",
    "code4us"
  ]
};

export default project;
