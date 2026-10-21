import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0d",
};

export const metadata: Metadata = {
  title: "P-TECH — Promise Ajayi | Robotics, Embedded Systems, 3D Printing & Solar Power",
  description:
    "Portfolio of Promise Ajayi (P-TECH): 3D Printing & Robotics Engineer building embedded systems, autonomous robots, portable solar power stations, school CBT servers, and IoT hardware.",
  openGraph: {
    title: "P-TECH — Promise Ajayi | Precision Technology, Engineering & Creative Hardware",
    description:
      "24+ engineered hardware & software systems across Robotics, Embedded Systems, 3D Printing, Solar Power Stations, and Raspberry Pi Servers.",
    type: "website",
    images: [
      {
        url: "/projects/smart-multi-purpose-ugv/ugv-full-dashboard.png",
        width: 1200,
        height: 630,
        alt: "P-TECH Engineering Portfolio — Promise Ajayi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P-TECH — Promise Ajayi | Robotics, 3D Printing & Embedded Systems",
    description:
      "Embedded systems, autonomous robotics, 3D printing, portable solar power stations, and campus CBT servers.",
    images: ["/projects/smart-multi-purpose-ugv/ugv-full-dashboard.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
