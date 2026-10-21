import type { Project } from "../schema";

const project: Project = {
  "slug": "agribot",
  "title": "AgriBot",
  "category": "AGRICULTURAL ROBOTICS",
  "group": "ROBOTICS",
  "icon": "leaf",
  "hue": "#4ade80",
  "built": true,
  "image": "/projects/agribot/agribot-hero.jpg",
  "imageAlt": "AgriBot 6-wheel agricultural rover chassis with front-mounted vision camera mast",
  "gallery": [
    { "src": "/projects/agribot/agribot-hero.jpg", "caption": "AgriBot 6-wheel agricultural rover chassis with front-mounted vision camera mast" },
    { "src": "/projects/agribot/agribot-top.jpg", "caption": "Top-angle view showing hinged service panels, camera ribbon cable, and wheel bogies" },
    { "src": "/projects/agribot/agribot-front.jpg", "caption": "Front prow profile showing camera mast and low-mounted ultrasonic obstacle sensors" }
  ],
  "tags": "Raspberry Pi 5 · ESP32-C3 · YOLO11n · State machine",
  "summary": "An autonomous 6-wheel agricultural rover: a Raspberry Pi 5 runs a quantised YOLO11n detector and a five-state decision machine, and commands an ESP32-C3 drive controller over Wi-Fi — field-tested and validated on live crop footage.",
  "status": "FIELD TESTED & VALIDATED",
  "implementation": "AUTONOMOUS ROVER VERIFIED",
  "videoUrl": "https://www.tiktok.com/@ajayi.promise/video/7698932663129754900?is_from_webapp=1&sender_device=pc&web_id=7698912701565830657",
  "videoLabel": "Watch AgriBot Field Test Video",
  "evidence": "Detection accuracy and false-positive rejection (confidence, bounding-box area, and aspect-ratio filters) validated on real field footage. 6-wheel rover drive and actuator hardware, Wi-Fi loss/reconnect handling in the 5-state autonomy loop, and Raspberry Pi 5 INT8 inference speed and power draw have all been verified and recorded on video.",
  "platform": "Raspberry Pi 5 + ESP32-C3",
  "control": "Autonomous state machine",
  "communication": "Wi-Fi AP + STA · HTTP",
  "video": "Camera + YOLO11n (INT8)",
  "audio": "—",
  "hardware": [
    "Raspberry Pi 5 (vision and decision-making)",
    "ESP32-C3 (receives drive and actuator commands from the Pi over HTTP)",
    "6-wheel agricultural rover chassis with hinged service panels",
    "Front mast-mounted camera for YOLO11n inference",
    "Low-mounted ultrasonic obstacle sensors"
  ],
  "software": [
    "YOLO11n object detection, INT8",
    "Five-state machine: ROAMING → CENTERING → APPROACH → ACTING → REVERSING",
    "False-positive filtering: confidence threshold, bounding-box area and aspect ratio",
    "Wi-Fi AP + STA networking",
    "HTTP link between Pi and ESP32",
    "systemd service for start-up on boot"
  ],
  "facts": [
    [
      "Detector",
      "YOLO11n, INT8"
    ],
    [
      "Behaviour",
      "5-state autonomy loop"
    ],
    [
      "Link",
      "HTTP over Wi-Fi (AP + STA)"
    ],
    [
      "Start-up",
      "systemd service"
    ]
  ],
  "problem": "Farm robots must find the right plants in a cluttered scene and act on them, without confusing crops with weeds or grass, on low-cost hardware.",
  "solution": "The Pi runs the detector and replaces a flat if/elif block with an explicit five-state machine, so each behaviour (roaming, centering on a target, approaching, acting, reversing) can be tested on its own. Grass being detected as maize was fixed with three filters: a confidence threshold, a bounding-box area filter and an aspect-ratio filter. The Pi talks to the ESP32-C3 over HTTP on a Wi-Fi network it hosts alongside its client connection, and the whole stack starts automatically through systemd.",
  "futureLabel": "COMPLETED VALIDATION",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Detection accuracy and false-positive rejection verified on real field footage",
    "6-wheel rover drive, ultrasonic sensors, and actuator hardware documented and assembled",
    "Wi-Fi loss and automatic reconnect behaviour verified in the 5-state autonomy machine",
    "Inference speed (YOLO11n INT8) and power draw measured and validated on Raspberry Pi 5",
    "Hardware build photographs and live field-test video published"
  ],
  "related": [
    "smart-greenhouse-monitoring"
  ],
  "flagship": {
    "tag": "AGRICULTURAL ROBOTICS / VISION",
    "blurb": "An autonomous 6-wheel farm rover: a Raspberry Pi 5 runs a quantised YOLO11n model and a five-state decision machine, then commands an ESP32-C3 over Wi-Fi. Confidence, area and aspect-ratio filters stop grass being mistaken for maize.",
    "specs": [
      [
        "5",
        "state autonomy loop"
      ],
      [
        "INT8",
        "YOLO11n on Pi 5"
      ],
      [
        "3",
        "false-positive filters"
      ],
      [
        "AP + STA",
        "Wi-Fi mode"
      ]
    ],
    "chips": [
      "Raspberry Pi 5",
      "ESP32-C3",
      "YOLO11n",
      "systemd"
    ],
    "note": "Field-tested & validated — autonomous vision, state machine, and 6-wheel rover verified."
  }
};

export default project;
