import type { Project } from "../schema";
import pCbt from "./ptech-cbt-system";
import pVault from "./raspberry-pi-file-server";
import p3d from "./3d-printing-fabrication";
import pPager from "./wifi-pager";
import p0 from "./smart-multi-purpose-ugv";
import p1 from "./smart-syringe-pump";
import p2 from "./agribot";
import p3 from "./aegis-smart-lock";
import p4 from "./pt-1-portable-power-station";
import p5 from "./smart-blind-walking-stick";
import p6 from "./smart-iot-parking-system";
import p7 from "./mediflight-mf1";
import p8 from "./gps-tracker";
import p9 from "./code4us";
import p10 from "./raspberry-pi-security-camera";
import p11 from "./smart-greenhouse-monitoring";
import p12 from "./esp8266-weather-station";
import p13 from "./esp32-c3-smart-socket";
import p14 from "./pet-feeder";
import p15 from "./keypad-lock-prototypes";
import p16 from "./esp8266-robot-car";
import p17 from "./robotics-bench-builds";
import p18 from "./robotic-telescope";
import p19 from "./jarvis-personal-assistant";

// Display order. Add a new project: create a file in this folder, import it, add it here.
const ordered: Project[] = [p0, p1, p2, p3, p4, pCbt, p3d, pVault, p5, pPager, p8, p9, p11, p13, p14, p15, p16, p17, p6, p7, p10, p12, p18, p19];

export const projects = ordered.map((p, i) => ({ ...p, num: String(i + 1).padStart(2, "0") }));
export type NumberedProject = (typeof projects)[number];
export const bySlug: Record<string, NumberedProject> = Object.fromEntries(projects.map((p) => [p.slug, p]));
export const flagships = projects.filter((p) => p.flagship);
