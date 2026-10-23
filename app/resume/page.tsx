import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ResumeView from "./ResumeView";

export const metadata: Metadata = {
  title: "Resume & Curriculum Vitae — Promise Ajayi | Robotics, Embedded Systems & 3D Printing Engineer",
  description:
    "Official Resume and Curriculum Vitae of Promise Ajayi, Founder of P-TECH. Specializing in Robotics, Embedded C/C++, IoT Architectures, Additive Manufacturing & 3D CAD, and Local CBT Examination Appliances.",
  openGraph: {
    title: "Promise Ajayi — Engineering Resume & CV | P-TECH",
    description:
      "Robotics, Embedded Systems & 3D Prototyping Engineer with 4+ years of hands-on expertise building 24+ intelligent hardware and software systems.",
    url: "https://ptech-site.vercel.app/resume",
    type: "profile",
  },
};

export default function ResumePage() {
  return (
    <main>
      <div className="no-print">
        <Nav />
      </div>
      <ResumeView />
      <div className="no-print">
        <Footer />
      </div>
    </main>
  );
}
