import type { Project } from "../schema";

const project: Project = {
  "slug": "3d-printing-fabrication",
  "title": "3D Printing & Custom CAD Fabrication",
  "category": "3D PRINTING / CAD",
  "group": "ROBOTICS",
  "icon": "arm",
  "hue": "#00d9ff",
  "built": true,
  "image": "/projects/3d-printing-fabrication/3d-carabiner-tag-hero.jpg",
  "imageAlt": "3D-printed cyan locking carabiner and dual-color IQ Robotics Lab tag produced on the Creality Ender-3 S1 Pro",
  "gallery": [
    { "src": "/projects/3d-printing-fabrication/3d-carabiner-tag-hero.jpg", "caption": "Functional 3D-printed threaded locking carabiner and dual-color IQ Robotics Lab tag" },
    { "src": "/projects/3d-printing-fabrication/3d-iq-robotics-tags.jpg", "caption": "Batch of dual-color red and white IQ Robotics Lab tags freshly printed on the Creality build plate" },
    { "src": "/projects/3d-printing-fabrication/3d-lpi-hub-stand.jpg", "caption": "Multi-color LPI Hub phone stand printing on the lab FDM 3D printer" },
    { "src": "/projects/3d-printing-fabrication/3d-cura-18650-slicing.jpg", "caption": "UltiMaker Cura slicing a 28-piece batch of 18650 lithium-ion cell holders for the Creality Ender-3 S1 Pro (0.4 mm nozzle, 0.2 mm layer height)" },
    { "src": "/projects/3d-printing-fabrication/3d-ender3-s1-pro.jpg", "caption": "Creality Ender-3 S1 Pro with top LED light bar, Sprite Direct Drive extruder, CR-Touch probe, touchscreen UI, and 3D-printed brackets on the PEI build plate" },
    { "src": "/projects/3d-printing-fabrication/3d-blue-display-bezels.jpg", "caption": "Pair of custom blue 3D-printed display and sensor bezel housings on the 220×220 mm Creality PEI bed" },
    { "src": "/projects/3d-printing-fabrication/3d-yellow-enclosure.jpg", "caption": "Custom 3D-printed yellow electronics enclosure body and snap-fit top cover" },
    { "src": "/projects/3d-printing-fabrication/3d-yellow-usb-faceplate.jpg", "caption": "Precision port cutouts for dual USB-A and USB Type-C / Micro-USB connectors on the 3D-printed powerbank faceplate" },
    { "src": "/projects/3d-printing-fabrication/3d-print-in-place-flexi.jpg", "caption": "Articulated print-in-place mechanism demonstrating tuned joint clearances and retraction settings" },
    { "src": "/projects/3d-printing-fabrication/3d-print-in-place-bed.jpg", "caption": "Print-in-place articulated model on the build plate with brim adhesion" }
  ],
  "tags": "Creality Ender-3 S1 Pro · UltiMaker Cura · CAD · Custom Enclosures · PLA / PETG",
  "summary": "In-house 3D printing and CAD fabrication for custom electronics enclosures, 18650 battery pack spacers, syringe-pump actuator mounts, robotic arm links, smart-lock faceplates, and functional mechanical parts.",
  "status": "ACTIVE PRODUCTION",
  "implementation": "IN-HOUSE FDM FABRICATION",
  "evidence": "Dozens of functional parts designed, sliced in UltiMaker Cura, and printed on the Creality Ender-3 S1 Pro across P-TECH hardware builds — including AEGIS Smart Lock enclosures, Smart Syringe Pump mounts, WiFi Pager handheld cases, 18650 battery spacers, robotic arm joints, and custom multi-color branding tags.",
  "platform": "Creality Ender-3 S1 Pro (220×220 mm)",
  "control": "UltiMaker Cura / G-code",
  "communication": "SD / USB Serial",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Creality Ender-3 S1 Pro FDM 3D printer (220 × 220 × 270 mm build volume)",
    "Direct-drive extruder with 0.4 mm nozzle",
    "Spring-steel PEI magnetic build plate",
    "PLA, Tough PLA, and PETG filaments (single and multi-color)",
    "Digital calipers for PCB and port tolerance measurement"
  ],
  "software": [
    "3D CAD modelling for enclosures, brackets, and mechanical joints",
    "UltiMaker Cura slicing & toolpath generation (0.16 mm – 0.20 mm layer profiles)",
    "Multi-color filament swap at layer height for embossed text and logos",
    "Batch production nesting (e.g., 28× 18650 cell holders per plate)",
    "Print-in-place tolerance tuning for hinges, threads, and articulated joints"
  ],
  "facts": [
    [
      "Printer",
      "Creality Ender-3 S1 Pro · Direct Drive"
    ],
    [
      "Slicer",
      "UltiMaker Cura (0.4 mm nozzle · 0.2 mm layers)"
    ],
    [
      "Applications",
      "Enclosures · Battery Holders · Robot Parts"
    ],
    [
      "Capabilities",
      "Snap-fit cases · Threaded parts · Multi-color"
    ]
  ],
  "problem": "Off-the-shelf project boxes rarely fit custom PCBs, displays, sensors, actuators, or battery packs cleanly, leaving prototypes fragile and difficult to mount or deploy.",
  "solution": "Every P-TECH hardware system is supported by in-house CAD design and 3D printing on a Creality Ender-3 S1 Pro. Custom enclosures with exact cutouts for OLED/TFT screens, fingerprint sensors, USB/XT60 ports, NEMA 17 stepper brackets, robotic arm links, and 28-up batches of 18650 battery cell holders are sliced in UltiMaker Cura and printed on demand.",
  "futureLabel": "MODELS & PARTS PRINTED",
  "futureHeading": "FABRICATED ENCLOSURES & MECHANICAL MODELS",
  "future": [
    "AEGIS Smart Lock enclosures and flush-mount door faceplates",
    "Smart Syringe Pump NEMA 17 mounts, plunger carriage, and 60 mL syringe retention brackets",
    "WiFi Pager v1.0 handheld enclosure and Circular Smart Switch wall housings",
    "Batch-printed 18650 lithium-ion cell holders for PT-1 Portable Power Stations",
    "Multi-DOF 3D-printed robotic arm links, claw grippers, and ultrasonic sensor brackets",
    "Dual-color IQ Robotics Lab keytags, LPI Hub stands, and functional threaded locking carabiners"
  ],
  "related": [
    "aegis-smart-lock",
    "smart-syringe-pump",
    "wifi-pager",
    "pt-1-portable-power-station",
    "robotics-bench-builds"
  ]
};

export default project;
