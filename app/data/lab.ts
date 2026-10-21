export type LabEntry = [date: string, title: string, detail: string, status: string, repo?: string];

/** Dated engineering log, newest first */
export const logEntries: LabEntry[] = [
  ["20 OCT 2026", "SMART BLIND WALKING STICK", "Object detection + voice feedback", "TESTING"],
  ["17 OCT 2026", "RASPBERRY PI UGV", "WebRTC audio development", "DEVELOPMENT"],
  ["14 OCT 2026", "WALKING STICK", "Haptic feedback improvements", "TESTED"],
  ["12 OCT 2026", "RASPBERRY PI 3 MODEL B FILE SERVER", "Self-hosted Vault web file server deployed with user authentication, Public/Restricted folder permissions, and storage monitoring.", "WORKING SYSTEM", "/work/vault-raspberry-pi-file-server"],
  ["10 OCT 2026", "RASPBERRY PI REMOTE SYSTEM", "Service diagnostics and SSH recovery", "DEVELOPMENT"],
];

/** Smaller experiments and concepts that do not need a full case study */
export const benchNotes: LabEntry[] = [
  ["BENCH NOTE", "ARDUINO NANO BLUETOOTH CONFIGURATION", "Configuring a serial Bluetooth module (name, pairing password, baud rate) through AT commands on an Arduino Nano. Exact module model and working commands still to be recorded.", "EXPERIMENT"],
  ["BENCH NOTE", "ESP32 ATTENDANCE REGISTER", "An attendance register built around an ESP32, with a dashboard. Documentation and test results still to be written.", "EXPERIMENT", "https://github.com/ptech8000/attendance-dashboard"],
  ["CONCEPT", "ESP32-C3 CBT PRACTICE DEVICE", "Handheld offline exam-practice device with a 240×240 TFT, buttons and microSD question banks. Pin map and question-file format still to be defined.", "CONCEPT"],
];
