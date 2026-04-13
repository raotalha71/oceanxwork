/**
 * OCEANEX TRADE PORTAL — Gated B2B Channel
 * All wholesale pricing, trade tiers, and product data are gated behind an approved trade account.
 * Public visitors see only the application form and programme overview.
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  Lock, ArrowRight, Check, Building2, Globe,
  Package, TrendingUp, Shield, Award, Users, Zap, Mail, Phone, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ghlTradeApplication } from "@/lib/ghl";

const G = "#C9A961";
const INK = "#2C2416";
const CREAM = "#FAF8F5";
const DARK = "#0E0D0B";

const BENEFITS = [
  { icon: TrendingUp, title: "Wholesale Pricing", desc: "Approved trade accounts receive exclusive wholesale pricing and tiered volume discounts. Pricing is shared privately after approval." },
  { icon: Package, title: "Full Product Catalogue", desc: "Access the complete Oceanex range including limited editions, seasonal collections, and custom branding options." },
  { icon: Globe, title: "Territory Exclusivity", desc: "Qualifying distributors can apply for exclusive regional territories, protecting your investment and market position." },
  { icon: Award, title: "Priority Production Slots", desc: "Trade accounts receive priority placement in the production queue, ensuring faster lead times for your orders." },
  { icon: Shield, title: "Dedicated Account Manager", desc: "Every approved trade account is assigned a dedicated account manager for ongoing support and order management." },
  { icon: Zap, title: "Co-Branded Marketing", desc: "Access co-branded marketing materials, product photography, and sales collateral to support your sales efforts." },
];

const TIERS = [
  { name: "Reseller", units: "1–4 units per order", features: ["Product catalogue access", "Marketing materials", "Email support", "Standard lead times"] },
  { name: "Distributor", units: "5–19 units per order", features: ["Priority production slots", "Co-branded materials", "Dedicated account manager", "Expedited shipping", "Territory exclusivity available"], featured: true },
  { name: "Strategic Partner", units: "20+ units per order", features: ["Container pricing", "Custom branding included", "Exclusive territory rights", "White-label options", "Executive account support"] },
];

const STEPS = [
  { n: "01", title: "Apply", desc: "Complete the trade account application. Tell us about your business and intended markets." },
  { n: "02", title: "Review", desc: "Our trade team reviews your application within 24–48 hours and contacts you to discuss fit." },
  { n: "03", title: "Approval", desc: "Approved accounts receive full access to wholesale pricing, product data, and marketing assets." },
  { n: "04", title: "Order", desc: "Place orders directly through your account manager with agreed pricing and lead times." },
];

export default function TradePortal() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    country: "", businessType: "", annualVolume: "", message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ghlTradeApplication({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        country: form.country,
        businessType: form.businessType,
        annualVolume: form.annualVolume,
      });
    } catch (_) { /* fail silently */ }
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.875rem", boxSizing: "border-box",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: CREAM, fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem",
    outline: "none", borderRadius: "6px",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontFamily: "Montserrat, sans-serif",
    fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em",
    textTransform: "uppercase", color: "rgba(250,248,245,0.45)", marginBottom: "0.4rem",
  };

  return (
    <div style={{ background: DARK, minHeight: "100vh", color: CREAM }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: "9rem", paddingBottom: "5rem", textAlign: "center", background: "linear-gradient(180deg, rgba(201,169,97,0.06) 0%, transparent 100%)" }}>
        <div className="container" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", background: "rgba(201,169,97,0.08)", border: "1px solid rgba(201,169,97,0.25)", borderRadius: "9999px", marginBottom: "1.5rem" }}>
            <Lock size={12} style={{ color: G }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: G }}>Approved Trade Accounts Only</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.04em", color: CREAM, marginBottom: "1rem", lineHeight: 1.1 }}>
            OCEANEX TRADE PORTAL
          </h1>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1rem", color: "rgba(250,248,245,0.6)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Wholesale pricing, volume discounts, and exclusive trade terms are available to approved trade accounts. Apply below to access the full programme.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#apply">
              <button style={{ padding: "0.875rem 2rem", background: G, color: INK, fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Apply for Trade Account <ArrowRight size={14} />
              </button>
            </a>
            <Link href="/contact">
              <button style={{ padding: "0.875rem 2rem", background: "transparent", color: CREAM, fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(250,248,245,0.15)", borderRadius: "6px", cursor: "pointer" }}>
                Speak to Our Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.04em", color: CREAM, textAlign: "center", marginBottom: "0.5rem" }}>TRADE PROGRAMME BENEFITS</h2>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem", color: "rgba(250,248,245,0.5)", textAlign: "center", marginBottom: "3rem" }}>Everything approved trade partners receive from day one.</p>
          <div className="tp-benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.75rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", background: "rgba(201,169,97,0.08)", border: "1px solid rgba(201,169,97,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <Icon size={16} style={{ color: G }} />
                </div>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: CREAM, marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: "rgba(250,248,245,0.5)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers — no pricing shown */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem", background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.04em", color: CREAM, textAlign: "center", marginBottom: "0.5rem" }}>TRADE TIERS</h2>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem", color: "rgba(250,248,245,0.5)", textAlign: "center", marginBottom: "3rem" }}>Pricing and discount rates are shared with approved accounts only.</p>
          <div className="tp-tiers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {TIERS.map(tier => (
              <div key={tier.name} style={{ background: tier.featured ? "rgba(201,169,97,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${tier.featured ? "rgba(201,169,97,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: "12px", padding: "2rem", position: "relative" }}>
                {tier.featured && (
                  <div style={{ position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)", padding: "0.25rem 0.875rem", background: G, color: INK, fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "9999px", whiteSpace: "nowrap" }}>Most Popular</div>
                )}
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.04em", color: tier.featured ? G : CREAM, marginBottom: "0.25rem" }}>{tier.name}</h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", color: "rgba(250,248,245,0.45)", marginBottom: "1.25rem" }}>{tier.units}</p>
                <div style={{ marginBottom: "1.5rem" }}>
                  {tier.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                      <Check size={12} style={{ color: G, flexShrink: 0 }} />
                      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: "rgba(250,248,245,0.65)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "0.75rem", background: "rgba(201,169,97,0.06)", border: "1px solid rgba(201,169,97,0.15)", borderRadius: "6px" }}>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", color: "rgba(250,248,245,0.4)", textAlign: "center" }}>Pricing available to approved accounts</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.04em", color: CREAM, textAlign: "center", marginBottom: "3rem" }}>HOW IT WORKS</h2>
          <div className="tp-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
            {STEPS.map(step => (
              <div key={step.n} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "rgba(201,169,97,0.2)", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "0.75rem" }}>{step.n}</div>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: CREAM, marginBottom: "0.5rem" }}>{step.title}</h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: "rgba(250,248,245,0.5)", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gated Notice */}
      <section style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ background: "rgba(201,169,97,0.06)", border: "1px solid rgba(201,169,97,0.2)", borderRadius: "12px", padding: "2rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
            <Lock size={20} style={{ color: G, flexShrink: 0, marginTop: "0.1rem" }} />
            <div>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: CREAM, marginBottom: "0.5rem" }}>Wholesale Pricing Is Private</h3>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", color: "rgba(250,248,245,0.5)", lineHeight: 1.7 }}>
                All wholesale pricing, trade discounts, and volume terms are shared exclusively with approved trade accounts. This protects the integrity of our pricing structure and ensures fair terms for all partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.04em", color: CREAM, marginBottom: "0.5rem" }}>TRADE ACCOUNT APPLICATION</h2>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem", color: "rgba(250,248,245,0.5)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Complete the form below. Our trade team reviews all applications within 24–48 hours and will contact you to discuss pricing, terms, and your territory.
          </p>

          {submitted ? (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "3rem", textAlign: "center" }}>
              <div style={{ width: "3.5rem", height: "3.5rem", background: "rgba(201,169,97,0.08)", border: "1px solid rgba(201,169,97,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <CheckCircle size={20} style={{ color: G }} />
              </div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.04em", color: CREAM, marginBottom: "0.75rem" }}>APPLICATION RECEIVED</h3>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem", color: "rgba(250,248,245,0.55)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
                Thank you for your interest in a trade account. Our team will review your application and be in touch within 24–48 hours with pricing and next steps.
              </p>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: "rgba(250,248,245,0.4)", marginBottom: "2rem" }}>
                In the meantime, explore our full product range to familiarise yourself with the collection.
              </p>
              <Link href="/products">
                <button style={{ padding: "0.875rem 2rem", background: G, color: INK, fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  View Products
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[{ label: "Full Name", key: "name", type: "text" }, { label: "Company Name", key: "company", type: "text" }].map(({ label, key, type }) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input type={type} required value={(form as Record<string, string>)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[{ label: "Email Address", key: "email", type: "email" }, { label: "Phone Number", key: "phone", type: "tel" }].map(({ label, key, type }) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input type={type} required value={(form as Record<string, string>)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>Country / Region</label>
                  <input type="text" required placeholder="e.g. United Kingdom, UAE, USA..." value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Business Type</label>
                  <input type="text" required placeholder="e.g. Distributor, Retailer, Resort Group..." value={form.businessType} onChange={e => setForm(f => ({ ...f, businessType: e.target.value }))} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Estimated Annual Volume</label>
                <input type="text" placeholder="e.g. 10–20 units per year, 1 container..." value={form.annualVolume} onChange={e => setForm(f => ({ ...f, annualVolume: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <label style={labelStyle}>Additional Notes (optional)</label>
                <textarea rows={3} placeholder="Target markets, existing distribution network, specific products of interest..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ background: "rgba(201,169,97,0.06)", border: "1px solid rgba(201,169,97,0.15)", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", color: "rgba(250,248,245,0.4)", lineHeight: 1.6 }}>
                  By submitting this application you agree that your information will be used to assess your suitability for the Oceanex trade programme. All pricing and terms are shared only with approved accounts.
                </p>
              </div>
              <button type="submit" disabled={loading} style={{ width: "100%", padding: "1rem", background: G, color: INK, fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", borderRadius: "6px", cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Submitting..." : "Submit Trade Application"} <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact */}
      <section style={{ paddingTop: "3rem", paddingBottom: "4rem", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.04em", color: CREAM, marginBottom: "0.75rem" }}>HAVE QUESTIONS?</h3>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem", color: "rgba(250,248,245,0.5)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Our trade team is happy to discuss the programme before you apply.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:trade@oceanex.group" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", textDecoration: "none", color: CREAM, fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", fontWeight: 600 }}>
              <Mail size={14} style={{ color: G }} /> trade@oceanex.group
            </a>
            <Link href="/contact">
              <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", cursor: "pointer", color: CREAM, fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", fontWeight: 600 }}>
                <Phone size={14} style={{ color: G }} /> Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 1024px) {
          .tp-benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tp-steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .tp-benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tp-tiers-grid { grid-template-columns: 1fr !important; }
          .tp-steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .tp-benefits-grid { grid-template-columns: 1fr !important; }
          .tp-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
