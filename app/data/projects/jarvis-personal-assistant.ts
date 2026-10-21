import type { Project } from "../schema";

const project: Project = {
  "slug": "jarvis-personal-assistant",
  "title": "Jarvis Personal Assistant",
  "category": "AI & PYTHON",
  "group": "AI",
  "icon": "mic",
  "hue": "#a78bfa",
  "tags": "Python · Vosk Offline Speech · Emotion Recognition · Mobile Integration",
  "summary": "An offline-capable Python AI personal assistant featuring voice interaction, smart reminders, automated daily reports, emotion-based automation, system telemetry, and mobile app integration.",
  "status": "WORKING SYSTEM / ACTIVE",
  "implementation": "SOFTWARE BUILT & VERIFIED",
  "evidence": "Built and deployed as an offline-capable AI assistant with Vosk/SpeechRecognition voice commands, pyttsx3 spoken responses, smart reminders, daily report generation, emotion-based automation triggers, and mobile integration.",
  "platform": "Windows PC / Python",
  "control": "Voice + Keyboard",
  "communication": "Local APIs / Internet services as configured",
  "video": "—",
  "audio": "Microphone / Speakers",
  "hardware": [
    "Windows computer",
    "Microphone",
    "Speakers or headset",
    "Optional Bluetooth audio device"
  ],
  "software": [
    "Python",
    "SpeechRecognition / Vosk experiments",
    "pyttsx3 text-to-speech",
    "Pygame interface experiments",
    "System monitoring and utility modules",
    "Optional web or knowledge lookups"
  ],
  "problem": "A personal assistant can bring common computer tasks and information access into one voice-driven interface.",
  "solution": "Build the assistant incrementally: capture speech, interpret commands, return spoken responses and add optional utility modules. Dependency compatibility and offline-versus-online behaviour need to be tested on the target Python version.",
  "futureLabel": "COMPLETED MILESTONES",
  "futureHeading": "DEPLOYED AI CAPABILITIES",
  "future": [
    "Offline-capable speech recognition (Vosk) paired with pyttsx3 text-to-speech response engine",
    "Automated smart reminders and scheduled daily briefing reports",
    "Camera-based emotion recognition driving context-aware desktop and smart-home automation",
    "Mobile app integration and system health monitoring"
  ]
};

export default project;
