import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { Mail, Phone, MessageCircle, ArrowUpRight, Github } from "lucide-react";

export const metadata = { title: "Contact — P-TECH" };

export default function Contact() {
  return (
    <main>
      <Nav />
      <section className="contact-page container">
        <span className="eyebrow">CONTACT / P-TECH</span>
        <h1>HAVE A PROBLEM<br />WORTH BUILDING?</h1>
        <p>Tell P-TECH what you are trying to build, automate, 3D print, or deploy.</p>
        <div className="contact-layout">
          <ContactForm />
          <div className="contact-info">
            <strong>PROMISE AJAYI · P-TECH</strong>
            <p className="contact-sub">
              Direct engineering inquiries, Power Station orders, School CBT deployments, and custom 3D printing.
            </p>
            <a
              className="button primary"
              href="https://wa.me/2349121134682?text=Hello%20Promise%20(P-TECH)%2C%20I%20want%20to%20inquire%20about%20a%20project."
              target="_blank"
              rel="noreferrer"
              style={{ justifyContent: "center", marginBottom: 8 }}
            >
              <MessageCircle size={16} /> WHATSAPP BUSINESS (+234 912 113 4682) <ArrowUpRight size={16} />
            </a>
            <a href="mailto:ptech8000@gmail.com"><Mail size={16} /> ptech8000@gmail.com</a>
            <a href="tel:+2349121134682"><Phone size={16} /> +234 912 113 4682 (WhatsApp Business)</a>
            <a href="tel:+2349069001906"><Phone size={16} /> +234 906 900 1906</a>
            <a href="https://www.linkedin.com/in/ajayi-promise/" target="_blank" rel="noreferrer">
              LINKEDIN — PROMISE AJAYI <ArrowUpRight size={14} />
            </a>
            <a href="https://www.tiktok.com/@ajayi.promise" target="_blank" rel="noreferrer">
              TIKTOK — @ajayi.promise <ArrowUpRight size={14} />
            </a>
            <a href="https://github.com/ptech8000" target="_blank" rel="noreferrer">
              <Github size={16} /> github.com/ptech8000
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
