import type { Project } from "../schema";

const project: Project = {
  "slug": "smart-greenhouse-monitoring",
  "title": "Smart Irrigation & Greenhouse Watering System",
  "category": "SMART AGRICULTURE",
  "group": "IoT",
  "icon": "leaf",
  "hue": "#4ade80",
  "built": true,
  "image": "/projects/smart-greenhouse-monitoring/greenhouse-irrigation-plant.jpg",
  "imageAlt": "Complete Smart Irrigation system with live plant bed, blue drip-ring tubing, external water TANK reservoir, and side-mounted 16x2 LCD controller enclosure",
  "gallery": [
    { "src": "/projects/smart-greenhouse-monitoring/greenhouse-irrigation-plant.jpg", "caption": "Complete Smart Irrigation setup with live plant bed, blue drip-irrigation loop, external water TANK reservoir, and side-mounted 16×2 LCD control unit" },
    { "src": "/projects/smart-greenhouse-monitoring/greenhouse-hero.jpg", "caption": "Close-up of the assembled plant irrigation controller with 16×2 LCD, soil sensor probe, and submersible pump in reservoir" },
    { "src": "/projects/smart-greenhouse-monitoring/greenhouse-oled-waterer.jpg", "caption": "OLED-based smart plant waterer unit displaying Soil: 89% OK with 2-channel relay and soil moisture probe" },
    { "src": "/projects/smart-greenhouse-monitoring/greenhouse-schematic.jpg", "caption": "Wiring schematic for the Arduino Nano, I²C display, relay module, and moisture sensor" },
    { "src": "/projects/smart-greenhouse-monitoring/greenhouse-breadboard.jpg", "caption": "Breadboard validation stage showing Arduino Nano, RS485/TTL module, 4-channel relay, and 16×2 LCD" }
  ],
  "tags": "Arduino · ESP8266 · RS485 / Capacitive Soil Sensing · Submersible Pump · 16×2 LCD & OLED",
  "summary": "An automated plant irrigation and greenhouse monitoring system that measures real-time soil moisture and temperature, displays live telemetry on an integrated 16×2 LCD / OLED control unit, and drives a submersible pump from an external water tank into a root-zone drip loop.",
  "status": "WORKING SYSTEM / VERIFIED",
  "implementation": "HARDWARE BUILT & TESTED",
  "evidence": "Built and verified in a complete live-plant testbed with an external water reservoir ('TANK'), root-zone drip irrigation loop, side-mounted 16×2 LCD control enclosure, OLED moisture monitor (verified at 89% OK), and hysteresis pump control.",
  "platform": "Arduino Nano / Uno + ESP8266 NodeMCU",
  "control": "Automated Soil-Moisture Hysteresis + RTC / Web UI",
  "communication": "RS485 Modbus RTU / I²C / Wi-Fi",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Arduino Nano / Uno & ESP8266 NodeMCU controllers",
    "Side-mounted custom controller enclosure with 16×2 I²C LCD and status indicator",
    "External water reservoir ('TANK') with submersible DC water pump and blue root-zone drip loop",
    "Soil moisture & temperature sensors (RS485 Modbus RTU with MAX485 converter + capacitive probe variants)",
    "Relay switching module for isolated pump actuation",
    "OLED display variant for compact desktop moisture readout",
    "DHT environmental temperature & humidity sensor and RTC scheduling module"
  ],
  "software": [
    "Embedded C/C++ firmware (Arduino)",
    "Hysteresis pump control logic: pump activates below 30% soil moisture and cuts off above 35% to prevent rapid relay chatter",
    "Real-time 16×2 I²C LCD and OLED status readouts with sensor-timeout fault detection",
    "ESP8266 web dashboard for greenhouse environmental and water/nutrient tank status",
    "RTC time-window scheduling combined with closed-loop soil moisture thresholds"
  ],
  "problem": "Manual watering or fixed-timer irrigation either starves plants during hot dry spells or over-waters soil when moisture is already adequate.",
  "solution": "Engineered a closed-loop smart irrigation system with a dedicated external water tank, submersible pump, and root-zone delivery tubing controlled by an enclosed microcontroller unit with a front 16×2 LCD. The controller samples soil moisture continuously and switches the pump using a 30% / 35% hysteresis band so the plant bed stays within its target moisture window automatically.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Constructed full live-plant irrigation testbed with external water TANK, submersible pump, and circular drip tubing",
    "Built and mounted the side control enclosure with integrated 16×2 I²C LCD display",
    "Implemented 30% ON / 35% OFF hysteresis pump control to eliminate relay chatter",
    "Validated both RS485 Modbus RTU and capacitive soil-moisture sensing variants (with 16×2 LCD and OLED readouts)",
    "Published complete wiring schematic and Arduino firmware repository"
  ],
  "related": [
    "agribot"
  ],
  "repos": [
    {
      "label": "Smart irrigation controller (Arduino)",
      "url": "https://github.com/ptech8000/smart_irrigation"
    }
  ],
  "facts": [
    [
      "Irrigation Logic",
      "Pump ON < 30% · OFF > 35% soil moisture (hysteresis)"
    ],
    [
      "Fluid Delivery",
      "External TANK reservoir · Submersible pump · Drip loop"
    ],
    [
      "Display & Control",
      "Enclosed 16×2 I²C LCD unit + OLED & ESP8266 nodes"
    ],
    [
      "Status",
      "Working system / verified on live plant bed"
    ]
  ]
};

export default project;
