import type { Project } from "../schema";

const project: Project = {
  "slug": "mediflight-mf1",
  "title": "MediFlight MF-1",
  "category": "MEDICAL LOGISTICS / UAV",
  "group": "ROBOTICS",
  "icon": "plane",
  "hue": "#38bdf8",
  "tags": "Autonomous medical cargo drone · Oyo State · Concept",
  "summary": "A concept for an autonomous cargo drone to carry blood and pharmaceuticals between facilities in Oyo State, Nigeria.",
  "status": "CONCEPT / DESIGN",
  "platform": "Autonomous UAV (concept)",
  "control": "Autonomous flight (planned)",
  "communication": "—",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Component parts list compiled (to be published after review)",
    "Orthographic blueprint set",
    "Isometric concept illustration"
  ],
  "software": [
    "Concept stage — flight and mission software not yet developed"
  ],
  "problem": "Blood and pharmaceuticals can be slow to reach clinics when roads are poor or congested, and some deliveries are urgent.",
  "solution": "MF-1 is a design concept for an autonomous medical cargo drone for Oyo State. So far the work covers the parts list, orthographic blueprints and an isometric illustration; no flight hardware has been built or tested.",
  "future": [
    "Define payload mass, range and cold-chain requirements with clinical partners",
    "Select flight controller, propulsion and power system",
    "Identify aviation regulatory requirements before any flight testing",
    "Build and bench-test a subscale prototype",
    "Publish the blueprint and illustration set"
  ],
  "related": [
    "smart-multi-purpose-ugv"
  ]
};

export default project;
