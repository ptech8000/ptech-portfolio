import type { Project } from "../schema";

const project: Project = {
  "slug": "wifi-pager",
  "title": "WiFi Pager",
  "category": "COMMUNICATION / EMBEDDED",
  "group": "EMBEDDED",
  "icon": "wifi",
  "hue": "#38bdf8",
  "built": true,
  "image": "/projects/wifi-pager/pager-hero.jpg",
  "imageAlt": "Assembled WiFi Pager v1.0 in 3D-printed enclosure showing AP mode status on the 1.3-inch ST7789 TFT display",
  "gallery": [
    { "src": "/projects/wifi-pager/pager-hero.jpg", "caption": "Assembled WiFi Pager v1.0 in 3D-printed enclosure showing AP mode status on the 1.3″ ST7789 TFT display" },
    { "src": "/projects/wifi-pager/pager-sta-mode.jpg", "caption": "Station mode view showing assigned local IP address and 6-button navigation bar (UP/DOWN, MENU, DEL, PWR)" },
    { "src": "/projects/wifi-pager/pager-internals.jpg", "caption": "Internal view during assembly showing the ESP32-C3 board beside the 6-button keypad perfboard" }
  ],
  "tags": "ESP32-C3 · ST7789 TFT · Web interface · Deep sleep",
  "repos": [
    {
      "label": "WiFi Pager repository",
      "url": "https://github.com/ptech8000/WiFi_Pager_v1.0"
    }
  ],
  "summary": "A complete handheld Wi-Fi pager on an ESP32-C3 housed in a custom 3D-printed enclosure with rechargeable battery power: messages sent from any browser on the network appear on a 1.3″ colour TFT display with buzzer alerts, priority messages, persistent storage across deep sleep, and quick preset replies.",
  "status": "WORKING PRODUCT (v1.0)",
  "implementation": "ASSEMBLED & VALIDATED",
  "evidence": "Assembled in a custom 3D-printed handheld enclosure with rechargeable battery & charging circuit, 6-button tactile keypad perfboard, 1.3″ ST7789 TFT display, message persistence across deep sleep, and verified in both Wi-Fi AP and Station modes.",
  "platform": "ESP32-C3",
  "control": "6 buttons + web interface",
  "communication": "Wi-Fi AP / Station · HTTP",
  "video": "1.3″ ST7789 240×240 TFT",
  "audio": "Active buzzer",
  "hardware": [
    "ESP32-C3 development board",
    "1.3″ ST7789 240×240 SPI TFT display",
    "Active buzzer + blue status LED",
    "6 × tactile buttons on custom perfboard (UP, DOWN, MENU, DEL, BACK, PWR)",
    "Rechargeable lithium battery + onboard charging circuit",
    "Custom 3D-printed two-piece handheld enclosure"
  ],
  "software": [
    "Arduino C++ firmware (v1.0)",
    "Web interface to send, clear and test messages",
    "Message persistence across light sleep and deep sleep",
    "Priority messages (starting with “!”) highlighted in red",
    "Buzzer alert patterns selectable from the menu",
    "Preset quick replies",
    "/status JSON endpoint (unread and total messages)",
    "Backlight dimming, light sleep and deep sleep power management",
    "Cached rendering, frame-rate limiting and differential screen updates"
  ],
  "facts": [
    [
      "Display",
      "1.3″ ST7789, 240×240"
    ],
    [
      "Input",
      "6 physical buttons + browser"
    ],
    [
      "Enclosure",
      "Custom 3D-printed handheld case"
    ],
    [
      "Power",
      "Battery + charging · persistent deep sleep"
    ]
  ],
  "problem": "A simple, low-cost way to push short alerts and messages to someone in a workshop, classroom or office, without needing a phone app.",
  "solution": "The ESP32-C3 hosts a responsive web interface on the local network (or its own AP) where anyone can send a message. Housed in a custom 3D-printed enclosure with a rechargeable battery, the pager displays incoming alerts on its 1.3″ colour TFT, sounds a configurable buzzer pattern, persists messages across deep sleep, and uses differential screen updates to maximize battery runtime.",
  "futureLabel": "COMPLETED VALIDATION",
  "futureHeading": "VERIFIED ENGINEERING MILESTONES",
  "future": [
    "Integrated rechargeable battery and charging circuit with verified portable runtime",
    "Non-volatile message persistence across light sleep and deep sleep cycles",
    "Web interface access control and /status JSON telemetry endpoint",
    "Custom 3D-printed handheld enclosure with 6-button tactile keypad",
    "Complete wiring documentation and hardware build photographs published"
  ],
  "related": [
    "code4us"
  ]
};

export default project;
