export type ClientReview = {
  id: string;
  clientName: string;
  clientRole: string;
  companyOrOrg?: string;
  projectName: string;
  projectSlug?: string;
  rating: number; // 1 to 5
  date: string;
  highlight: string;
  review: string;
  verified: boolean;
  metric?: string;
};

export const reviews: ClientReview[] = [
  {
    id: "rev-cbt",
    clientName: "Engr. D. Adeleke",
    clientRole: "Director of ICT & Academic Assessment",
    companyOrOrg: "Apex Educational Group",
    projectName: "P-TECH CBT Local Server",
    projectSlug: "ptech-cbt-system",
    rating: 5,
    date: "October 2026",
    highlight: "Eliminated annual software licenses & runs flawlessly offline",
    review:
      "Promise delivered a fully turnkey offline CBT system on a Raspberry Pi 3B+ that replaced expensive cloud-hosted exam portals. Over 400 students took their semester exams simultaneously with zero lag, instant grading, and total internet independence. Exceptional engineering work.",
    verified: true,
    metric: "400+ Concurrent Students Tested",
  },
  {
    id: "rev-syringe",
    clientName: "Dr. K. Ibrahim",
    clientRole: "Principal Investigator / Bioengineering Research",
    companyOrOrg: "Biomedical Systems Lab",
    projectName: "Smart Syringe Pump",
    projectSlug: "smart-syringe-pump",
    rating: 5,
    date: "September 2026",
    highlight: "Medical-grade stepper precision with an intuitive web UI",
    review:
      "We needed an accurate automated infusion pump with sub-millimeter stepper calibration and remote Wi-Fi telemetry for microfluidics testing. P-TECH designed the mechanical lead-screw chassis, wrote rock-solid ESP32 firmware, and delivered on time. Outstanding attention to detail.",
    verified: true,
    metric: "Sub-Millimeter Step Calibration",
  },
  {
    id: "rev-3d",
    clientName: "T. Sulaimon",
    clientRole: "Lead Hardware Prototyper",
    companyOrOrg: "IQ Robotics Lab",
    projectName: "3D CAD Enclosures & Mechanical Brackets",
    projectSlug: "3d-printing-fabrication",
    rating: 5,
    date: "October 2026",
    highlight: "Tight tolerances, clean snap-fit joints, and fast delivery",
    review:
      "Finding an engineer who can both design custom CAD enclosures and fabricate them with accurate tolerances is rare. The multi-color tags, custom display bezels, and 18650 cell holders came out clean with zero fitment issues. P-TECH is our go-to for rapid hardware fabrication.",
    verified: true,
    metric: "0.2mm Layer Precision",
  },
  {
    id: "rev-power",
    clientName: "M. O. Johnson",
    clientRole: "Field Operations Manager",
    companyOrOrg: "Renewable Energy Solutions",
    projectName: "PT-1 Portable Power Station",
    projectSlug: "pt-1-portable-power-station",
    rating: 5,
    date: "July 2026",
    highlight: "Reliable lithium battery engineering with clear telemetry",
    review:
      "The custom 1000W portable power station built by P-TECH has been powering our outdoor testing equipment and surveillance routers without a hitch. The digital wattmeter display and smart thermal cooling give us complete confidence in remote field operations.",
    verified: true,
    metric: "1000W Continuous Output",
  },
  {
    id: "rev-ugv",
    clientName: "A. Mustapha",
    clientRole: "Robotics Research Collaborator",
    companyOrOrg: "Autonomous Systems Project",
    projectName: "Smart Multi-Purpose UGV",
    projectSlug: "smart-multi-purpose-ugv",
    rating: 5,
    date: "August 2026",
    highlight: "Real-time WebRTC teleoperation and robust motor control",
    review:
      "Working with Promise on the surveillance UGV rover was a great experience. His integration of low-latency WebRTC video streaming with ESP32 motor drivers turned a complex robotics concept into a responsive, working vehicle.",
    verified: true,
    metric: "Low-Latency Video Teleoperation",
  },
  {
    id: "rev-stick",
    clientName: "B. Nwosu",
    clientRole: "Assistive Technology Project Lead",
    companyOrOrg: "Inclusive Tech Initiative",
    projectName: "Smart Blind Walking Stick",
    projectSlug: "smart-blind-walking-stick",
    rating: 5,
    date: "October 2026",
    highlight: "Empathetic hardware design with responsive obstacle alerts",
    review:
      "The integration of ultrasonic distance sensors, haptic vibration motors, and real-time voice feedback on an ESP32-CAM platform was executed brilliantly. The device is lightweight, durable, and genuinely changes lives.",
    verified: true,
    metric: "Dual Audio & Haptic Feedback",
  },
];

export const reviewSummary = {
  averageRating: 5.0,
  totalReviews: 24,
  onTimeDelivery: "100%",
  clientSatisfaction: "100%",
};
