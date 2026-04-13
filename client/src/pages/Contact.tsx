/**
 * OCEANEX CONTACT PAGE — Dark Opulence + CRO
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle, Mail, MapPin, Calendar, Users, Package, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/contexts/ThemeContext";
import Footer from "@/components/Footer";
import { ghlContactFormSubmit } from "@/lib/ghl";

const ENQUIRY_TYPES = [
  { id: "preorder", label: "Pre-Order a Unit", icon: <Package size={15} /> },
  { id: "trade", label: "Trade / Wholesale", icon: <Globe size={15} /> },
  { id: "agent", label: "Sales Agent Application", icon: <Users size={15} /> },
  { id: "rental", label: "Rental Enquiry", icon: <Calendar size={15} /> },
  { id: "worldcup", label: "World Cup 2026", icon: <Package size={15} /> },
  { id: "resort", label: "Resort / Cruise Line", icon: <Globe size={15} /> },
  { id: "general", label: "General Enquiry", icon: <Mail size={15} /> },
];

export default function Contact() {
  const [enquiryType, setEnquiryType] = useState("preorder");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "", budget: "" });

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await ghlContactFormSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      enquiryType: enquiryType,
      message: form.message,
      budget: form.budget,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
    background: "var(--theme-bg-card)", border: "1px solid var(--theme-border)",
    color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem",
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.70rem", fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--theme-text-muted)",
    display: "block", marginBottom: "0.4rem",
  };

  return (
    <div style={{ background: "var(--theme-bg-card)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: "9rem", paddingBottom: "4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 80% 60% at 30% 0%, oklch(0.60 0.20 220 / 0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "oklch(0.60 0.20 220)", display: "block", marginBottom: "1rem" }}>Get in Touch</span>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "white", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: "1.25rem" }}>
              LET'S BUILD<br />
              <span style={{ background: "linear-gradient(135deg, oklch(0.60 0.20 220), oklch(0.75 0.14 75))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>YOUR REVENUE.</span>
            </h1>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", color: "var(--theme-text-muted)", lineHeight: 1.7 }}>
              Pre-orders, trade accounts, sales agent applications, or the World Cup 2026 campaign. Our team responds within 4 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="container">
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr min(380px, 100%)", gap: "2.5rem", alignItems: "start" }}>

            {/* Form */}
            <div style={{ background: "var(--theme-bg-card)", border: "1px solid var(--theme-border)", borderRadius: "1.5rem", padding: "2.5rem" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "oklch(0.55 0.18 165 / 0.15)", border: "1px solid oklch(0.55 0.18 165 / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.75rem", color: "oklch(0.65 0.18 145)" }}>✓</div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "white", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>ENQUIRY RECEIVED</h3>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "var(--theme-text-muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
                    Thank you, {form.name || "there"}. Our team will respond within 4 business hours. Check your inbox at {form.email || "your email"}.
                  </p>
                  <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="https://wa.me/447541609734" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <button className="btn-ghost" style={{ fontSize: "0.82rem" }}><MessageCircle size={16} /> WhatsApp Us Now</button>
                    </a>
                    <button onClick={() => setSubmitted(false)} style={{ padding: "0.75rem 1.5rem", borderRadius: "9999px", background: "transparent", border: "1px solid var(--theme-border)", color: "var(--theme-text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", fontWeight: 700, cursor: "auto" }}>Send Another</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: "white", letterSpacing: "0.04em", marginBottom: "1.75rem" }}>SEND AN ENQUIRY</h3>

                  {/* Enquiry type */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label style={labelStyle}>Enquiry Type</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {ENQUIRY_TYPES.map(type => (
                        <button key={type.id} type="button" onClick={() => setEnquiryType(type.id)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.875rem", borderRadius: "0.75rem", border: `1px solid ${enquiryType === type.id ? "oklch(0.60 0.20 220 / 0.5)" : "oklch(1 0 0 / 0.08)"}`, background: enquiryType === type.id ? "oklch(0.60 0.20 220 / 0.1)" : "transparent", color: enquiryType === type.id ? "oklch(0.75 0.15 220)" : "oklch(0.52 0.010 240)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, cursor: "auto", transition: "all 0.2s ease", textAlign: "left" }}>
                          <span style={{ flexShrink: 0 }}>{type.icon}</span>{type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div><label style={labelStyle}>Full Name *</label><input type="text" required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Email Address *</label><input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} /></div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div><label style={labelStyle}>Phone / WhatsApp</label><input type="tel" placeholder="+44 7xxx xxxxxx" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Company Name</label><input type="text" placeholder="Your company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} style={inputStyle} /></div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={labelStyle}>Budget / Order Size</label>
                    <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} style={{ ...inputStyle, color: form.budget ? "white" : "oklch(0.45 0.010 240)" }}>
                      <option value="" disabled>Select budget range</option>
                      <option value="1-unit">1 unit (£3,000–£7,000)</option>
                      <option value="2-5">2–5 units (£6,000–£35,000)</option>
                      <option value="6-20">6–20 units (£36,000–£140,000)</option>
                      <option value="20+">20+ units (£140,000+)</option>
                      <option value="rental">Rental enquiry</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label style={labelStyle}>Message</label>
                    <textarea rows={4} placeholder="Tell us about your project, event, or business..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "0.9rem", padding: "1rem", opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? "Sending..." : <>{"Send Enquiry"} <ArrowRight size={16} /></>}
                  </button>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.70rem", color: "var(--theme-text-muted)", textAlign: "center", marginTop: "0.75rem" }}>We respond within 4 business hours. Your data is never shared.</p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* WhatsApp */}
              <a href="https://wa.me/447541609734?text=Hi%20Oceanex%2C%20I%27m%20interested%20in%20your%20inflatable%20bar%20systems." target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ background: "linear-gradient(135deg, oklch(0.30 0.15 145), oklch(0.22 0.12 145))", border: "1px solid oklch(0.50 0.15 145 / 0.3)", borderRadius: "1.25rem", padding: "1.5rem", cursor: "auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "oklch(0.50 0.15 145 / 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "oklch(0.70 0.18 145)", flexShrink: 0 }}><MessageCircle size={20} /></div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "white" }}>WhatsApp Us Directly</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "oklch(0.65 0.10 145)" }}>Usually under 1 hour response</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--theme-text-secondary)", lineHeight: 1.5 }}>Click to open WhatsApp with a pre-filled message. Active Mon–Sat, 8am–8pm GMT.</p>
                </div>
              </a>

              {/* Book a call */}
              <div style={{ background: "var(--theme-bg-card)", border: "1px solid oklch(0.60 0.20 220 / 0.2)", borderRadius: "1.25rem", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "oklch(0.60 0.20 220 / 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "oklch(0.60 0.20 220)", flexShrink: 0 }}><Calendar size={20} /></div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "white" }}>Book a 30-Min Trade Call</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "var(--theme-text-muted)" }}>Speak directly with our trade team</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--theme-text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>For distributors, large pre-orders, and World Cup 2026 campaign discussions.</p>
                <a href="https://calendly.com/hello-oceanex/30min" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: "0.80rem" }}><Calendar size={14} /> Book a 30-Min Call
                  </button>
                </a>
              </div>
              {/* Contact details */}
              <div style={{ background: "var(--theme-bg-card)", border: "1px solid var(--theme-border)", borderRadius: "1.25rem", padding: "1.5rem" }}>
                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "white", letterSpacing: "0.04em", marginBottom: "1rem" }}>DIRECT CONTACT</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { icon: <Mail size={16} />, label: "Email", value: "hello@oceanex.group", href: "mailto:hello@oceanex.group" },
                    { icon: <Globe size={16} />, label: "Website", value: "www.oceanex.group", href: "https://www.oceanex.group" },
                    { icon: <MapPin size={16} />, label: "Registered", value: "United Kingdom", href: null },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ color: "oklch(0.60 0.20 220)", flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", color: "var(--theme-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</div>
                        {item.href ? <a href={item.href} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "oklch(0.75 0.15 220)", textDecoration: "none" }}>{item.value}</a> : <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "var(--theme-text-secondary)" }}>{item.value}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div style={{ background: "oklch(0.75 0.14 75 / 0.08)", border: "1px solid oklch(0.75 0.14 75 / 0.2)", borderRadius: "1.25rem", padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "var(--theme-accent)", letterSpacing: "0.04em", lineHeight: 1 }}>4 HOURS</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "var(--theme-text-muted)", marginTop: "0.3rem" }}>Average response time, Mon–Sat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Calendly Booking Section */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "oklch(0.60 0.20 220)", display: "block", marginBottom: "0.75rem" }}>Schedule a Call</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white", letterSpacing: "0.02em", lineHeight: 1 }}>BOOK A 30-MINUTE TRADE CALL</h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", color: "var(--theme-text-muted)", marginTop: "0.75rem" }}>Pick a time that works for you. Our commercial team will call you directly.</p>
          </div>
          <div style={{ background: "var(--theme-bg-card)", border: "1px solid var(--theme-border)", borderRadius: "1.5rem", overflow: "hidden", maxWidth: "900px", margin: "0 auto" }}>
            <iframe
              src="https://calendly.com/hello-oceanex/30min?embed_domain=oceanexlux-e87x8f5q.manus.space&embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1&background_color=040e1e&text_color=ffffff&primary_color=c9a961"
              style={{ width: "100%", height: "700px", border: "none" }}
              title="Book a 30-Minute Trade Call with Oceanex"
              scrolling="no"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
