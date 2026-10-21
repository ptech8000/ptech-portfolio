import type { Project } from "../schema";

const project: Project = {
  "slug": "pt-1-portable-power-station",
  "title": "PT-1 Portable Power Station",
  "category": "POWER",
  "group": "POWER",
  "icon": "power",
  "hue": "#fbbf24",
  "built": true,
  "image": "/projects/pt-1-portable-power-station/pt1-lineup-hero.jpg",
  "imageAlt": "Three P-TECH portable power station builds on the workbench showing battery capacity monitor, DC barrel outputs, USB voltmeter, and AC outlet configurations",
  "gallery": [
    { "src": "/projects/pt-1-portable-power-station/pt1-lineup-hero.jpg", "caption": "Three P-TECH portable power station builds showing the 500 W station (12.3 V / 85%) alongside compact AC and DC/USB portable units" },
    { "src": "/projects/pt-1-portable-power-station/pt1-500w-installed-solar.jpg", "caption": "Deployed 500 Watt Power Station wall-mounted and charging from 2× 200 W solar panels (400 W solar input)" },
    { "src": "/projects/pt-1-portable-power-station/pt1-500w-fan-terminals.jpg", "caption": "500 Watt Power Station left panel showing heavy-duty solar/DC binding post terminals, 3D-printed cooling fan vent, and front battery monitor" },
    { "src": "/projects/pt-1-portable-power-station/pt1-500w-ac-side.jpg", "caption": "500 Watt Power Station right panel showing universal AC output socket, master power rocker switch, and carry handle" },
    { "src": "/projects/pt-1-portable-power-station/pt1-top-ports.jpg", "caption": "Compact unit top panel with covered 12V–24V DC / USB port and dual DC barrel outputs" },
    { "src": "/projects/pt-1-portable-power-station/pt1-battery-pack.jpg", "caption": "Internal high-capacity 18650 lithium-ion cell pack with copper busbars and BMS protection board" }
  ],
  "tags": "500W Power Tank · 2× 200W Solar Panels · Lithium-Ion BMS · AC/DC Backup",
  "summary": "A complete, working portable power station line featuring the 500 Watt Power Station paired with 2× 200 W solar panels (400 W solar array), high-capacity 18650 lithium-ion battery packs with BMS protection, active thermal cooling, digital capacity and voltage telemetry, and multiple configurations from 12V DC powerbanks up to 1000 W powertanks.",
  "status": "WORKING PRODUCT",
  "implementation": "PRODUCTION READY",
  "evidence": "Multiple units built, tested and deployed — including the 500 Watt Power Station running on 2 pieces of 200 Watt solar panels — across 12V DC powerbank, 250 W, 300 W, 500 W and 1000 W powertank packages with integrated BMS protection, digital voltage/capacity displays, AC outlets, DC barrel ports and USB outputs.",
  "platform": "Lithium-Ion BMS + Solar Charge System",
  "control": "Panel Switches + Digital Telemetry",
  "communication": "On-device Capacity & Voltage Display",
  "video": "—",
  "audio": "—",
  "hardware": [
    "500 Watt Power Station paired with 2× 200 W solar panels (400 W solar array)",
    "High-capacity 18650 lithium-ion battery packs with copper busbars",
    "Dedicated Battery Management System (BMS) for overcharge, over-discharge and short-circuit protection",
    "Digital battery capacity (%) and voltage (V) panel display with dual status LEDs",
    "Universal AC output socket + illuminated master power rocker switch",
    "Heavy-duty solar/DC binding post terminals + active cooling fan with 3D-printed fan guard",
    "12V–24V DC / USB fast-charge socket + dual 12V DC barrel outputs + XT60 port",
    "Rugged portable and wall-mountable enclosures with top carry handles"
  ],
  "software": [
    "Real-time battery state-of-charge (%) and voltage monitoring",
    "Automatic BMS cell balancing and load protection cutoff",
    "ESP32 firmware with automatic solar / grid / battery transfer",
    "Telegram bot control and status monitoring",
    "Load and runtime sizing across 12V, 250 W, 300 W, 500 W and 1000 W packages"
  ],
  "facts": [
    [
      "Available Sizes",
      "12V Powerbanks · 250 W · 300 W · 500 W · 1000 W"
    ],
    [
      "Solar Setup",
      "500 W station + 2× 200 W solar panels (400 W)"
    ],
    [
      "Outputs",
      "AC Socket · 12V DC Barrel · USB · XT60"
    ],
    [
      "Protection",
      "Integrated Lithium-Ion BMS + Active Cooling"
    ]
  ],
  "problem": "Power outages and unreliable grid supply mean homes, workstations and small businesses need dependable backup power that charges from solar or grid and delivers clean AC and DC power without interruption.",
  "solution": "Built as a complete line of working portable power stations using custom-assembled 18650 lithium-ion packs, copper busbars, BMS protection, active fan cooling, and rugged enclosures with carry handles. The 500 Watt Power Tank is deployed with 2 pieces of 200 Watt solar panels (400 W solar array) for rapid off-grid recharging, and the lineup scales from compact 12V router/laptop powerbanks up to 1000 W powertanks.",
  "futureLabel": "AVAILABLE PACKAGES",
  "futureHeading": "AVAILABLE IN DIFFERENT SIZES",
  "future": [
    "12V Powerbanks",
    "250 Watt powertank",
    "300 Watt powertank",
    "500 Watt powertank (with 2× 200 Watt solar panels)",
    "1000 Watt powertank"
  ]
};

export default project;
