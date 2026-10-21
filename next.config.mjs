/** Old case-study URLs from earlier versions now point to their merged pages. */
const moved = {
  "500w-power-station": "/work/pt-1-portable-power-station",
  "rtc-plant-watering-system": "/work/smart-greenhouse-monitoring",
  "esp8266-led-motor-controller": "/work/esp8266-robot-car",
  "servo-robotic-arm": "/work/robotics-bench-builds",
  "megapi-line-follower": "/work/robotics-bench-builds",
  "arduino-door-lock": "/work/keypad-lock-prototypes",
  "esp32-keypad-solenoid-lock": "/work/keypad-lock-prototypes",
  "arduino-nano-bluetooth-config": "/lab",
  "esp32-c3-cbt-practice-device": "/lab",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return Object.entries(moved).map(([slug, destination]) => ({
      source: `/work/${slug}`,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
