import type { Project } from "../schema";

const project: Project = {
  "slug": "aegis-smart-lock",
  "title": "AEGIS Smart Lock",
  "category": "ACCESS CONTROL / IoT",
  "group": "EMBEDDED",
  "icon": "lock",
  "hue": "#fb923c",
  "built": true,
  "image": "/projects/aegis-smart-lock/aegis-hero.jpg",
  "imageAlt": "AEGIS v3.4 3D-printed front panel with OLED status screen, optical fingerprint sensor, and soldered ESP32 driver board",
  "gallery": [
    { "src": "/projects/aegis-smart-lock/aegis-hero.jpg", "caption": "AEGIS v3.4 3D-printed front panel with OLED status screen, optical fingerprint sensor, and soldered ESP32 driver board" },
    { "src": "/projects/aegis-smart-lock/aegis-oled.jpg", "caption": "Close-up of the AEGIS v3.4 faceplate displaying lock status and Wi-Fi signal indicator on the OLED" },
    { "src": "/projects/aegis-smart-lock/aegis-door-panel.jpg", "caption": "AEGIS v3.6 flush-mounted into a wooden test door showing card-scan and lock telemetry" },
    { "src": "/projects/aegis-smart-lock/aegis-door-rig.jpg", "caption": "Full wooden door test rig built to validate physical installation and latch actuation" }
  ],
  "tags": "ESP32 · RFID · Fingerprint · REST API · OTA",
  "summary": "An ESP32 smart lock that combines PIN, RFID and fingerprint authentication, shows status on an OLED display, and is managed through a token-authenticated web interface and REST API, with over-the-air firmware updates — flush-mounted and validated in a physical door rig.",
  "status": "VALIDATED & COMPLETE",
  "implementation": "DOOR RIG & FIRMWARE VERIFIED",
  "videoUrl": "https://www.tiktok.com/@ajayi.promise/video/7643907963924811029?is_from_webapp=1&sender_device=pc&web_id=7698912701565830657",
  "videoLabel": "Watch AEGIS Smart Lock Demo Video",
  "platform": "ESP32",
  "control": "RFID + fingerprint + web",
  "communication": "Wi-Fi / REST API",
  "video": "—",
  "audio": "—",
  "hardware": [
    "ESP32",
    "MFRC522 RFID reader",
    "R307 fingerprint sensor",
    "4×4 matrix keypad (PIN entry)",
    "Solenoid / deadbolt lock actuator",
    "OLED display"
  ],
  "software": [
    "Arduino C++ firmware (v3.2 → v4.x)",
    "OLED status animations",
    "JWT-style token authentication for the web interface",
    "REST API",
    "OTA firmware updates"
  ],
  "facts": [
    [
      "Credentials",
      "PIN keypad + RFID card + fingerprint"
    ],
    [
      "Management",
      "Web UI + REST API, token auth"
    ],
    [
      "Updates",
      "Over-the-air (OTA)"
    ],
    [
      "Firmware line",
      "v3.2 → v4.x"
    ]
  ],
  "problem": "Door access that relies on a single shared code is hard to audit and hard to revoke. A lock should accept individual credentials, show clear feedback and be manageable remotely.",
  "solution": "The ESP32 reads RFID cards and fingerprints, drives the OLED for user feedback, and exposes a REST API behind token-based authentication for management. OTA updates let the firmware be improved without opening the enclosure.",
  "evidence": "Hardware and v3.2–v4.x firmware validated on a physical wooden door test rig with custom 3D-printed enclosure, soldered ESP32 + relay + buck-converter driver board, multi-scan RFID fix, repeated-attempt lockout, token-authenticated REST API, and power-loss safe override.",
  "futureLabel": "COMPLETED VALIDATION",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Custom perfboard wiring and relay lock-actuator driver stage assembled and documented",
    "Power-loss and reset behaviour verified on a physical door rig with safe mechanical override",
    "Token expiry and non-volatile credential storage validated in the REST API and web UI",
    "Automatic security lockout implemented and verified after repeated failed authentication attempts",
    "Real hardware photographs, door-installation rig, and live demonstration video published"
  ],
  "related": [
    "keypad-lock-prototypes"
  ],
  "flagship": {
    "tag": "ACCESS CONTROL / FIRMWARE",
    "blurb": "An ESP32 smart lock that accepts RFID cards and fingerprints, with an OLED status display, token-authenticated web management, a REST API and over-the-air updates, flush-mounted and verified on a physical door test rig.",
    "specs": [
      [
        "3",
        "credential types"
      ],
      [
        "v4.x",
        "validated firmware"
      ],
      [
        "REST",
        "API + token auth"
      ],
      [
        "OTA",
        "firmware updates"
      ]
    ],
    "chips": [
      "ESP32",
      "RFID",
      "Fingerprint",
      "OLED"
    ],
    "note": "Validated system — custom 3D-printed faceplate, soldered driver board, and door test rig verified."
  },
  "repos": [
    {
      "label": "Smart door lock repository",
      "url": "https://github.com/ptech8000/Smart_door_lock"
    }
  ]
};

export default project;
