/**
 * OCEANEX ABOUT PAGE — Full luxury rebuild
 * Design: Dark opulence — deep navy, gold accents, Cormorant serif headings
 * Content: Brand story, technology, market presence, team, certifications, CTA
 */
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Globe, Shield, Award, Users, TrendingUp, Zap,
  CheckCircle, Package, Star, MapPin, Clock, Layers
} from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9";

const TIMELINE = [
  { year: "2021", title: "The Idea", desc: "Founded after identifying a gap in the market: luxury hospitality operators needed premium, portable bar infrastructure, but nothing existed. Drop Stitch technology was the answer." },
  { year: "2022", title: "First Prototype", desc: "The Santorini Pool Bar prototype was built and tested at a luxury resort in the Mediterranean. The result exceeded every benchmark, 8-minute inflation, 6-day pressure hold, rigid hard-walled surface." },
  { year: "2023", title: "Commercial Launch", desc: "The Oceanex collection launched commercially. Within 12 months, structures were deployed across 18 countries, hotel resorts, cruise lines, festivals, and brand activations." },
  { year: "2024", title: "Cruise Line Certification", desc: "Oceanex structures received marine-grade certification for deployment across cruise line private island portfolios. The first inflatable hospitality brand to achieve full cruise line compliance." },
  { year: "2025", title: "Global Expansion", desc: "Expanded to 50+ countries. Launched the Trade Portal and Agents Network. The World Cup 2026 campaign launched with 32 nation-branded bars." },
  { year: "2026", title: "Market Leadership", desc: "Oceanex is the world's leading manufacturer of premium inflatable hospitality structures. Nine products. Eight minutes to deploy. Unlimited revenue potential." },
];

const STATS = [
  { value: "50+", label: "Countries Deployed", icon: Globe },
  { value: "9", label: "Product Lines", icon: Package },
  { value: "8 min", label: "Inflation Time", icon: Zap },
  { value: "6 days", label: "Pressure Hold", icon: Clock },
  { value: "2×", label: "Revenue vs Cabana Beds", icon: TrendingUp },
  { value: "100%", label: "Military-Grade Materials", icon: Shield },
];

const TECHNOLOGY = [
  {
    title: "Drop Stitch Construction",
    desc: "Thousands of polyester threads connect the top and bottom surfaces of every structure, creating a rigid, flat surface when inflated to high pressure. The result is a hard-walled bar, not a bouncy castle.",
    icon: Layers,
  },
  {
    title: "UV-Stable PVC Coating",
    desc: "All Oceanex structures use UV-stabilised, marine-grade PVC that resists degradation from salt water, chlorine, and direct sunlight. Engineered for Dubai summers and North Atlantic winters alike.",
    icon: Shield,
  },
  {
    title: "Aqua-Zip Cleaning System",
    desc: "Proprietary drain and clean system. Lift the zip panel, sweep, rinse, and close. A full clean takes under 10 minutes, keeping your bar hygiene-compliant and revenue-ready every day.",
    icon: Zap,
  },
  {
    title: "6-Day Pressure Hold",
    desc: "Unlike traditional inflatables that require continuous blowers, Oceanex structures hold pressure for up to 6 days on a single inflation. No noise, no power draw, no operational cost.",
    icon: Clock,
  },
];

const MARKETS = [
  { title: "Hotel Resorts & Private Islands", desc: "Deploy poolside revenue generators that outperform traditional cabana beds on F&B spend by 2×. Certified for private island and resort deployment.", icon: Star },
  { title: "Cruise Lines", desc: "Modular structures that transform ship decks and private island beach clubs into premium hospitality venues. Certified for marine environments.", icon: Globe },
  { title: "Festivals & Events", desc: "From World Cup fan zones to Halloween activations, themed, fully brandable structures ready in 8 minutes. No permits. No construction.", icon: Award },
  { title: "Corporate & Brand Activations", desc: "Liquor brand promotions, product launches, sampling booths, and VIP hospitality. One asset, multiple revenue streams, unlimited branding options.", icon: TrendingUp },
  { title: "Retailers & Wholesalers", desc: "Available through our Trade Portal with volume pricing, territory exclusivity, and co-branded marketing materials. Margins of 40–45% for distributors.", icon: Package },
  { title: "Sales Agents Network", desc: "Earn up to 12% commission with zero stock required. Our global agent network spans 50+ countries with dedicated account management and marketing support.", icon: Users },
];

const CERTIFICATIONS = [
  "Cruise Line Certified",
  "Marine-Grade PVC Certified",
  "EU CE Marked",
  "UK PIPA Certified",
  "ISO 9001 Manufacturing",
  "Drop Stitch Military Standard",
];

export default function About() {
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);

  return (
    <div style={{ background: "#0a0c10", minHeight: "100vh", color: "#FAF8F5" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", paddingTop: "10rem", paddingBottom: "7rem", overflow: "hidden" }}>
        {/* Radial glow */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "900px", height: "600px", background: "radial-gradient(ellipse at center top, rgba(201,169,97,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(201,169,97,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,97,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", display: "block", marginBottom: "1.25rem" }}>
            About Oceanex Group
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 0.95, marginBottom: "1.75rem" }}>
            We Build the Bars<br />
            <span style={{ fontStyle: "italic", color: "#C9A961" }}>the World Drinks At.</span>
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem", color: "rgba(250,248,245,0.65)", maxWidth: "640px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Oceanex Group is the world's leading manufacturer of premium Drop Stitch hospitality structures. From intimate residential pool bars to 50,000-person fan zones, our military-grade technology powers experiences across 50+ nations.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products">
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "#C9A961", color: "#2C2416", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                View the Collection <ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/contact">
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "transparent", color: "rgba(250,248,245,0.75)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(250,248,245,0.2)", cursor: "pointer" }}>
                Book a Trade Call
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "#2C2416", borderTop: "1px solid rgba(201,169,97,0.15)", borderBottom: "1px solid rgba(201,169,97,0.15)", padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label}>
                  <Icon size={20} style={{ color: "#C9A961", margin: "0 auto 0.75rem", display: "block" }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 700, color: "#C9A961", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,248,245,0.5)", marginTop: "0.4rem" }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section style={{ padding: "7rem 0" }}>
        <div className="container">
          <div className="about-story-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", display: "block", marginBottom: "1rem" }}>Our Story</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 1.05, marginBottom: "1.75rem" }}>
                Born from a Gap<br />in the Market
              </h2>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem", color: "rgba(250,248,245,0.65)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                Traditional bar infrastructure requires planning permission, structural surveys, months of construction, and capital expenditure in the hundreds of thousands. We identified that gap in 2021 and set out to eliminate every single barrier.
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem", color: "rgba(250,248,245,0.65)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                The answer was Drop Stitch technology, the same military-grade construction used in emergency rescue equipment and inflatable SUP boards. Applied to hospitality, it creates a rigid, hard-walled bar structure that inflates in 8 minutes, holds pressure for 6 days, and stores in a compact storage bag on a half pallet.
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem", color: "rgba(250,248,245,0.65)", lineHeight: 1.85 }}>
                We are not selling inflatables. We are selling the ability to open a premium bar anywhere in the world, today, with no construction, no permits, and no risk.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src={`${CDN}/SantoriniLifestyle1_782ace1d.webp`}
                alt="Oceanex Santorini Pool Bar in use"
                style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", background: "rgba(44,36,22,0.92)", backdropFilter: "blur(12px)", padding: "1.25rem", border: "1px solid rgba(201,169,97,0.2)" }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.4rem" }}>Marine Certified</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "#FAF8F5" }}>Cruise Line Approved</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: "rgba(250,248,245,0.5)", marginTop: "0.2rem" }}>First inflatable hospitality brand certified for cruise line deployment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section style={{ padding: "7rem 0", background: "#111318" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", display: "block", marginBottom: "1rem" }}>The Technology</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 1.05, marginBottom: "1rem" }}>
              Why Drop Stitch Changes Everything
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem", color: "rgba(250,248,245,0.55)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              The same technology used in military rescue equipment and elite watersports, applied to luxury hospitality for the first time.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "1.5rem" }}>
            {TECHNOLOGY.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.title} style={{ padding: "2rem", border: "1px solid rgba(201,169,97,0.12)", background: "rgba(201,169,97,0.02)" }}>
                  <div style={{ width: "3rem", height: "3rem", border: "1px solid rgba(201,169,97,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <Icon size={18} style={{ color: "#C9A961" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem", fontWeight: 700, color: "#FAF8F5", marginBottom: "0.75rem" }}>{tech.title}</h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", color: "rgba(250,248,245,0.55)", lineHeight: 1.75 }}>{tech.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Patent notice */}
          <div style={{
            marginTop: "3rem",
            padding: "1.25rem 1.75rem",
            background: "rgba(201,169,97,0.05)",
            border: "1px solid rgba(201,169,97,0.2)",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}>
            <div style={{ flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%", background: "#C9A961", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
              <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "#0e0d0b", fontFamily: "'Montserrat', sans-serif" }}>®</span>
            </div>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.35rem" }}>Internationally Protected Intellectual Property</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "rgba(250,248,245,0.45)", lineHeight: 1.7 }}>
                The Oceanex Drop Stitch hospitality structure system, Aqua-Zip cleaning mechanism, and all associated product architectures are the exclusive intellectual property of Oceanex Group Ltd, protected by internationally registered intellectual property rights. Any unauthorised reproduction, reverse engineering, or manufacture of any Oceanex design or system will be pursued with full legal force.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "7rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", display: "block", marginBottom: "1rem" }}>Our Journey</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 1.05 }}>
              From Prototype to Market Leader
            </h2>
          </div>
          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: "80px", top: 0, bottom: 0, width: "1px", background: "rgba(201,169,97,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  onMouseEnter={() => setHoveredTimeline(i)}
                  onMouseLeave={() => setHoveredTimeline(null)}
                  style={{ display: "flex", gap: "2rem", padding: "1.5rem 0", cursor: "default", transition: "all 0.2s" }}
                >
                  <div style={{ flexShrink: 0, width: "80px", textAlign: "right" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: hoveredTimeline === i ? "#C9A961" : "rgba(201,169,97,0.35)", transition: "color 0.2s" }}>{item.year}</span>
                  </div>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, width: "1px", display: "flex", alignItems: "flex-start", paddingTop: "0.5rem", position: "relative" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: hoveredTimeline === i ? "#C9A961" : "rgba(201,169,97,0.3)", border: "2px solid rgba(201,169,97,0.4)", marginLeft: "-4px", transition: "all 0.2s", flexShrink: 0 }} />
                  </div>
                  <div style={{ paddingBottom: "1rem" }}>
                    <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem", fontWeight: 700, color: "#FAF8F5", marginBottom: "0.4rem" }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", color: "rgba(250,248,245,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKETS ── */}
      <section style={{ padding: "7rem 0", background: "#111318" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", display: "block", marginBottom: "1rem" }}>Market Presence</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 1.05, marginBottom: "1rem" }}>
              Six Industries. One Platform.
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem", color: "rgba(250,248,245,0.55)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              Oceanex structures serve every corner of the global hospitality and events industry.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "1.25rem" }}>
            {MARKETS.map((market) => {
              const Icon = market.icon;
              return (
                <div key={market.title} style={{ padding: "1.75rem", border: "1px solid rgba(201,169,97,0.1)", background: "rgba(201,169,97,0.02)", display: "flex", gap: "1rem" }}>
                  <div style={{ flexShrink: 0, width: "2.5rem", height: "2.5rem", border: "1px solid rgba(201,169,97,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={16} style={{ color: "#C9A961" }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#FAF8F5", marginBottom: "0.4rem" }}>{market.title}</h3>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "rgba(250,248,245,0.5)", lineHeight: 1.65 }}>{market.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section style={{ padding: "5rem 0", background: "#2C2416" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961" }}>Certifications & Standards</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", border: "1px solid rgba(201,169,97,0.2)", background: "rgba(201,169,97,0.04)" }}>
                <CheckCircle size={13} style={{ color: "#C9A961", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "rgba(250,248,245,0.7)", letterSpacing: "0.05em" }}>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section style={{ padding: "7rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "2px" }}>
            {[
              { name: "Santorini Pool Bar", img: `${CDN}/SantoriniHero_6bf4b807.webp`, label: "Pool Collection" },
              { name: "Bali Spa", img: `${CDN}/Balispa_a6131545.webp`, label: "Wellness" },
              { name: "Champagne Bar", img: `${CDN}/Champagnebarnolabel_f805ee80.webp`, label: "Event Bars" },
              { name: "DJ Booth & Bar", img: `${CDN}/DJBooth1_164e27ce.webp`, label: "Entertainment" },
            ].map((p) => (
              <Link key={p.name} href="/products" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#000" }}
                  onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.06)"; }}
                  onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}
                >
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }} />
                  {/* Thin bottom strip only — image displays at full clarity, just enough for text legibility */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.5) 22%, transparent 45%)" }} />
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.3rem" }}>{p.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#FAF8F5" }}>{p.name}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/products">
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "#C9A961", color: "#2C2416", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                View All 9 Products <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section style={{ padding: "7rem 0", background: "#2C2416", textAlign: "center" }}>
        <div className="container">
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", display: "block", marginBottom: "1.25rem" }}>Ready to Work With Us?</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 1.05, marginBottom: "1.25rem" }}>
            Open a Premium Bar<br />
            <span style={{ color: "#C9A961" }}>Anywhere in the World.</span>
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", color: "rgba(250,248,245,0.55)", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Book a 30-minute trade call and let's discuss your opportunity. Pre-orders, wholesale accounts, dropship, and sales agent applications all welcome.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "#C9A961", color: "#2C2416", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                Book a Trade Call <ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/portals">
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "transparent", color: "rgba(250,248,245,0.7)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(250,248,245,0.2)", cursor: "pointer" }}>
                View Business Portals
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
