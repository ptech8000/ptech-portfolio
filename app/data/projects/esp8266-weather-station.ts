import type { Project } from "../schema";

const project: Project = {
  "slug": "esp8266-weather-station",
  "title": "ESP8266 Weather Station",
  "category": "ENVIRONMENTAL IoT",
  "group": "IoT",
  "icon": "cloud",
  "hue": "#38bdf8",
  "tags": "ESP8266 · DHT11 · Web Dashboard",
  "summary": "An IoT weather-monitoring project using an ESP8266 and DHT11 sensor to publish temperature and humidity readings to a web interface, with history and weather-condition estimates.",
  "status": "PROTOTYPE / ITERATION",
  "platform": "ESP8266 NodeMCU",
  "control": "Web Dashboard",
  "communication": "Wi-Fi / HTTP",
  "video": "—",
  "audio": "—",
  "hardware": [
    "ESP8266 NodeMCU",
    "DHT11 temperature and humidity sensor",
    "USB power supply",
    "Jumper wires and prototype board"
  ],
  "software": [
    "Arduino IDE / C++",
    "Embedded web server or web interface",
    "Temperature and humidity display",
    "Historical readings and graph concept",
    "Rule-based weather-condition estimates"
  ],
  "problem": "A low-cost station can make local environmental readings visible without requiring a commercial weather device.",
  "solution": "Read temperature and humidity from the DHT11 and display the latest values on a web page. Historical charts and condition labels should be presented as experimental estimates, not official meteorological forecasts.",
  "future": [
    "Verify sensor readings against a reference instrument",
    "Handle sensor errors and Wi-Fi disconnections",
    "Persist readings for reliable history",
    "Document the prediction rules and their limitations",
    "Add enclosure and outdoor-weather protection"
  ]
};

export default project;
