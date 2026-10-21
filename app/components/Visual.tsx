import { Bot, Eye, Wifi, BatteryCharging, Cloud, Leaf, Camera, Mic, Telescope, Cpu, Lock, Server, Syringe, Zap, Plane, MapPin, PawPrint, GraduationCap } from "lucide-react";

const icons: Record<string, any> = {
  eye: Eye, wifi: Wifi, power: BatteryCharging, cloud: Cloud, leaf: Leaf, camera: Camera, mic: Mic,
  telescope: Telescope, chip: Cpu, lock: Lock, server: Server, arm: Bot, syringe: Syringe, zap: Zap, ugv: Bot,
  plane: Plane, pin: MapPin, paw: PawPrint, grad: GraduationCap,
};

/** Tracked-vehicle illustration (UGV) */
function UGV() {
  return (
    <svg viewBox="0 0 640 360" className="vis-svg" role="img" aria-label="Tracked UGV illustration">
      <defs>
        <linearGradient id="trk" x1="0" x2="1"><stop offset="0" stopColor="#1b222b"/><stop offset="1" stopColor="#10151b"/></linearGradient>
      </defs>
      <g stroke="currentColor" fill="none" strokeWidth="1.5">
        <rect x="120" y="200" width="400" height="90" rx="45" fill="url(#trk)" />
        <rect x="132" y="212" width="376" height="66" rx="33" strokeDasharray="6 6" opacity=".5" className="vis-track"/>
        {[170, 250, 330, 410, 470].map((x) => <circle key={x} cx={x} cy="245" r="17" opacity=".8" />)}
        <circle cx="160" cy="245" r="6" fill="currentColor"/><circle cx="480" cy="245" r="6" fill="currentColor"/>
        <rect x="170" y="150" width="300" height="52" rx="8" fill="#0c1015"/>
        <rect x="190" y="164" width="60" height="24" rx="3" opacity=".6"/>
        <rect x="262" y="164" width="60" height="24" rx="3" opacity=".6"/>
        <circle cx="400" cy="176" r="5" fill="currentColor"/>
        <path d="M300 150 V112 M300 112 h40 v-18 h-40 z" />
        <circle cx="440" cy="104" r="26" fill="#0c1015"/><circle cx="440" cy="104" r="11" className="vis-lens"/>
        <path d="M440 130 V150" />
        <path d="M210 150 V96 M200 96 h20" /><circle cx="210" cy="88" r="6" fill="currentColor" className="vis-ping"/>
        <path d="M468 104 h40" strokeDasharray="3 5" opacity=".6"/>
        <path d="M520 78 q22 26 0 52 M538 66 q34 38 0 76" opacity=".5" className="vis-wave"/>
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#68717d">
        <text x="456" y="62">CAM · WebRTC</text><text x="150" y="70">GPS NEO-6</text>
        <text x="190" y="312">2× BTS7960 · 12 V DC · TRACKED</text>
      </g>
    </svg>
  );
}

/** Syringe pump illustration */
function Pump() {
  return (
    <svg viewBox="0 0 640 360" className="vis-svg" role="img" aria-label="Syringe pump illustration">
      <g stroke="currentColor" fill="none" strokeWidth="1.5">
        <rect x="70" y="236" width="500" height="40" rx="4" fill="#0c1015" />
        <rect x="70" y="190" width="70" height="86" rx="4" fill="#10151b" />
        <rect x="84" y="206" width="42" height="42" rx="3"/><circle cx="105" cy="227" r="10"/>
        <path d="M140 224 H460" strokeDasharray="2 5" opacity=".6"/>
        <path d="M150 218 H440 M150 232 H440" opacity=".8"/>
        {Array.from({ length: 22 }).map((_, i) => <path key={i} d={`M${160 + i * 13} 215 l6 20`} opacity=".35" />)}
        <rect x="300" y="196" width="46" height="56" rx="3" fill="#10151b" className="vis-slide"/>
        <rect x="346" y="210" width="110" height="28" rx="2" className="vis-slide" />
        <rect x="456" y="180" width="12" height="72" fill="#10151b"/>
        <rect x="468" y="190" width="100" height="54" rx="6" fill="#0c1015"/>
        <path d="M468 217 H568 M500 190 v54 M534 190 v54" opacity=".4"/>
        <path d="M568 217 h26 l14 -4" />
        <rect x="518" y="270" width="56" height="30" rx="3"/><text x="526" y="289" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="currentColor" stroke="none">HX711</text>
        <circle cx="106" cy="170" r="4" fill="currentColor" className="vis-ping"/>
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#68717d">
        <text x="76" y="152">NEMA17 + A4988</text><text x="190" y="186">LEAD SCREW DRIVE</text>
        <text x="470" y="176">60 mL SYRINGE</text><text x="410" y="326">ESP32 · MQTT/TLS · LOAD CELL</text>
      </g>
    </svg>
  );
}

/** PCB-trace backdrop + large glowing icon, tinted per project, or real hardware photograph when available */
export default function Visual({ icon, hue, big = false, image, alt }: { icon: string; hue: string; big?: boolean; image?: string; alt?: string }) {
  const style = { ["--hue" as string]: hue } as React.CSSProperties;
  if (image) {
    return (
      <div className="vis vis-has-photo" style={style}>
        <img src={image} alt={alt ?? ""} className="vis-photo" loading={big ? "eager" : "lazy"} />
        <div className="vis-photo-overlay" />
      </div>
    );
  }
  if (icon === "ugv" && big) return <div className="vis" style={style}><div className="vis-bg" /><UGV /></div>;
  if (icon === "syringe" && big) return <div className="vis" style={style}><div className="vis-bg" /><Pump /></div>;
  const Icon = icons[icon] ?? Cpu;
  return (
    <div className="vis" style={style}>
      <div className="vis-bg" />
      <svg className="vis-traces" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".35">
          <path d="M0 60 H120 L150 90 H260 L290 60 H400" /><path d="M0 180 H90 L120 150 H210 L240 180 H400" />
          <path d="M200 0 V70 L230 100 V240" /><path d="M60 0 V40 L90 70" />
        </g>
        <g fill="currentColor" opacity=".7"><circle cx="120" cy="60" r="3"/><circle cx="260" cy="90" r="3"/><circle cx="90" cy="180" r="3"/><circle cx="240" cy="180" r="3"/></g>
      </svg>
      <div className="vis-icon"><Icon size={big ? 96 : 56} strokeWidth={1.1} /></div>
    </div>
  );
}
