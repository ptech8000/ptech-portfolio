import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WorkGrid from "../components/WorkGrid";

export const metadata = { title: "Work — P-TECH" };

export default function WorkPage() {
  return (
    <main>
      <Nav />
      <section className="section container">
        <span className="eyebrow">WORK / PROJECT ARCHIVE</span>
        <h1 className="page-title">ENGINEERING<br />PROJECTS</h1>
        <p className="page-intro">Systems, prototypes and experiments spanning embedded electronics, robotics, IoT, AI, power and assistive technology.</p>
        <WorkGrid />
      </section>
      <Footer />
    </main>
  );
}
