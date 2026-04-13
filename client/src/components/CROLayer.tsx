/**
 * OCEANEX CRO LAYER — LUXURY EDITION
 * Design Philosophy: Dark glass morphism · Gold accents · Cormorant serif headings
 * Inspired by: Rolls-Royce, Aman Resorts, Net-A-Porter
 * Components:
 *  1. SocialProofTicker  — live activity feed (bottom-left)
 *  2. ExitIntentPopup    — exit capture modal
 *  3. StickyShopBar      — persistent bottom CTA
 *  4. TrustRibbon        — top trust signals
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { X, ShoppingBag, ArrowRight, Star, Zap, Users, Lock, CheckCircle2, MapPin, Clock } from "lucide-react";
import { ghlExitIntentCaptured, ghlExitIntentShown } from "@/lib/ghl";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const G  = "#C9A961";           // Oceanex gold
const G2 = "#E8C97A";           // Gold highlight
const INK   = "#0E0C09";        // Deep ink black
const INK2  = "#1A1610";        // Card background
const INK3  = "#252018";        // Slightly lighter
const CREAM = "#FAF8F5";        // Off-white text
const MUTED = "rgba(250,248,245,0.45)"; // Muted text on dark

// ─── SOCIAL PROOF TICKER ──────────────────────────────────────────────────────
const ACTIVITIES = [
  { name: "James R.",    location: "Ibiza",     action: "ordered",       product: "Santorini Pool Bar",  time: "2 min ago" },
  { name: "Sarah M.",    location: "London",    action: "added",         product: "Champagne Bar",       time: "5 min ago" },
  { name: "Marcus T.",   location: "Marbella",  action: "purchased",     product: "Bali Spa",            time: "8 min ago" },
  { name: "Priya K.",    location: "Dubai",     action: "requested",     product: "Trade Account",       time: "12 min ago" },
  { name: "Resort",      location: "Mykonos",   action: "placed",        product: "Bulk Order × 6",      time: "18 min ago" },
  { name: "Tom B.",      location: "Sydney",    action: "ordered",       product: "World Cup Bar",       time: "22 min ago" },
  { name: "Emma L.",     location: "Paris",     action: "enquired about",product: "Mega Resort",         time: "31 min ago" },
  { name: "Cruise Line", location: "Miami",     action: "requested",     product: "Container Quote",     time: "45 min ago" },
];

export function SocialProofTicker() {
  const [idx, setIdx]       = useState(0);
  const [phase, setPhase]   = useState<"in" | "out">("in");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const cycle = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setIdx(i => (i + 1) % ACTIVITIES.length);
        setPhase("in");
      }, 500);
    }, 5000);
    return () => clearInterval(cycle);
  }, []);

  if (dismissed) return null;

  const a = ACTIVITIES[idx];
  const isIn = phase === "in";

  return (
    <div style={{
      position: "fixed",
      bottom: "4.5rem",
      left: "1.25rem",
      zIndex: 8000,
      maxWidth: "240px",
      width: "calc(100vw - 2.5rem)",
      // Dark glass card
      background: `linear-gradient(135deg, ${INK2} 0%, ${INK3} 100%)`,
      border: `1px solid rgba(201,169,97,0.22)`,
      borderRadius: "10px",
      boxShadow: `0 6px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,97,0.06), inset 0 1px 0 rgba(201,169,97,0.1)`,
      overflow: "hidden",
      opacity: isIn ? 1 : 0,
      transform: isIn ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
      transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
      pointerEvents: "auto",
    }}>
      {/* Gold top line */}
      <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />

      <div style={{ padding: "0.6rem 0.75rem 0.6rem 0.7rem", display: "flex", alignItems: "center", gap: "0.55rem" }}>
        {/* Avatar */}
        <div style={{
          width: "1.75rem", height: "1.75rem", borderRadius: "50%",
          background: `linear-gradient(135deg, ${G}30, ${G}10)`,
          border: `1px solid ${G}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Users size={11} style={{ color: G }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 500,
            color: CREAM,
            lineHeight: 1.4,
            marginBottom: "0.2rem",
          }}>
            <strong style={{ color: G, fontWeight: 700 }}>{a.name}</strong>
            {" "}<span style={{ color: MUTED }}>{a.action}</span>{" "}
            <strong style={{ color: CREAM, fontWeight: 600 }}>{a.product}</strong>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", color: MUTED }}>
              <MapPin size={8} style={{ color: G, opacity: 0.7 }} />
              {a.location}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", color: MUTED }}>
              <Clock size={8} style={{ color: MUTED, opacity: 0.6 }} />
              {a.time}
            </span>
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(250,248,245,0.2)", padding: "0.1rem", flexShrink: 0, lineHeight: 1, marginLeft: "auto" }}
        >
          <X size={10} />
        </button>
      </div>

      {/* Verified badge */}
      <div style={{
        padding: "0.28rem 0.75rem",
        background: "rgba(201,169,97,0.05)",
        borderTop: "1px solid rgba(201,169,97,0.1)",
        display: "flex", alignItems: "center", gap: "0.35rem",
      }}>
        <CheckCircle2 size={9} style={{ color: G }} />
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: G, opacity: 0.8 }}>
          Verified Activity
        </span>
      </div>
    </div>
  );
}

// ─── EXIT INTENT POPUP ────────────────────────────────────────────────────────
// Countdown: 47 hours 59 minutes from first load, stored in sessionStorage
function getCountdownTarget(): number {
  const stored = sessionStorage.getItem("oceanex_offer_expires");
  if (stored) return parseInt(stored, 10);
  const target = Date.now() + 47 * 60 * 60 * 1000 + 59 * 60 * 1000;
  sessionStorage.setItem("oceanex_offer_expires", String(target));
  return target;
}

function formatCountdown(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export function ExitIntentPopup() {
  const [show, setShow]           = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const triggered = useRef(false);
  const targetRef = useRef(0);

  // Countdown tick
  useEffect(() => {
    targetRef.current = getCountdownTarget();
    setRemaining(Math.max(0, targetRef.current - Date.now()));
    const tick = setInterval(() => {
      const r = Math.max(0, targetRef.current - Date.now());
      setRemaining(r);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("oceanex_exit_dismissed")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered.current) {
        triggered.current = true;
        setTimeout(() => setShow(true), 300);
      }
    };
    const mobileTimer = setTimeout(() => {
      if (!triggered.current) { triggered.current = true; setShow(true); }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => { document.removeEventListener("mouseleave", handleMouseLeave); clearTimeout(mobileTimer); };
  }, []);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("oceanex_exit_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await ghlExitIntentCaptured(email);
    }
    setSubmitted(true);
    setTimeout(dismiss, 3000);
  };

  if (!show || dismissed) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed", inset: 0, zIndex: 9500,
        background: "rgba(8,6,4,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .exit-popup-inner { animation: slideUp 0.45s cubic-bezier(0.16,1,0.3,1); }
        .exit-email-input:focus { outline: none; border-color: ${G} !important; box-shadow: 0 0 0 3px rgba(201,169,97,0.12); }
        .exit-submit-btn:hover { background: ${G2} !important; }
        .exit-dismiss-btn:hover { background: rgba(250,248,245,0.08) !important; }
      `}</style>

      <div
        className="exit-popup-inner"
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "500px",
          background: `linear-gradient(160deg, ${INK2} 0%, ${INK} 100%)`,
          border: `1px solid rgba(201,169,97,0.3)`,
          borderRadius: "16px",
          boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,169,97,0.1), inset 0 1px 0 rgba(201,169,97,0.15)`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Gold top accent */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, transparent 0%, ${G} 30%, ${G2} 50%, ${G} 70%, transparent 100%)` }} />

        {/* Close button */}
        <button
          className="exit-dismiss-btn"
          onClick={dismiss}
          style={{
            position: "absolute", top: "1.25rem", right: "1.25rem",
            width: "2rem", height: "2rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(250,248,245,0.05)",
            border: "1px solid rgba(250,248,245,0.1)",
            borderRadius: "50%",
            cursor: "pointer",
            color: "rgba(250,248,245,0.4)",
            transition: "background 0.2s",
          }}
        >
          <X size={13} />
        </button>

        <div style={{ padding: "2.5rem 2.5rem 2.25rem" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{
                width: "4rem", height: "4rem", borderRadius: "50%",
                background: `linear-gradient(135deg, ${G}25, ${G}10)`,
                border: `1px solid ${G}50`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}>
                <CheckCircle2 size={22} style={{ color: G }} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: CREAM, marginBottom: "0.75rem", lineHeight: 1.1 }}>
                You're on the list
              </h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: MUTED, lineHeight: 1.7 }}>
                Your exclusive 10% discount code will arrive within the hour. Welcome to the Oceanex family.
              </p>
            </div>
          ) : (
            <>
              {/* Countdown timer */}
              {(() => {
                const cd = formatCountdown(remaining);
                return (
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
                    {[{ label: "HRS", val: cd.h }, { label: "MIN", val: cd.m }, { label: "SEC", val: cd.s }].map(({ label, val }, i) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        {i > 0 && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 700, color: `${G}60`, lineHeight: 1 }}>:</span>}
                        <div style={{ textAlign: "center" }}>
                          <div style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "2.5rem",
                            fontWeight: 700,
                            color: G,
                            lineHeight: 1,
                            background: `linear-gradient(135deg, ${INK3} 0%, ${INK2} 100%)`,
                            border: `1px solid rgba(201,169,97,0.25)`,
                            borderRadius: "8px",
                            padding: "0.5rem 0.875rem",
                            minWidth: "3.5rem",
                            boxShadow: `inset 0 1px 0 rgba(201,169,97,0.1)`,
                          }}>{val}</div>
                          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.18em", color: MUTED, marginTop: "0.3rem" }}>{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: "1.5rem", height: "1px", background: G, opacity: 0.6 }} />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: G }}>
                  Exclusive Offer
                </span>
                <div style={{ width: "1.5rem", height: "1px", background: G, opacity: 0.6 }} />
              </div>

              {/* Headline */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                color: CREAM,
                lineHeight: 1.05,
                marginBottom: "0.5rem",
              }}>
                10% Off Your<br />
                <span style={{ color: G, fontStyle: "italic" }}>First Order</span>
              </h2>

              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: MUTED, lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Join 2,400+ resort owners, event professionals, and hospitality operators who receive exclusive offers, new product launches, and early access to limited runs.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "0", marginBottom: "0.75rem", border: `1px solid rgba(201,169,97,0.25)`, borderRadius: "8px", overflow: "hidden" }}>
                  <input
                    className="exit-email-input"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      flex: 1,
                      padding: "0.9rem 1rem",
                      background: "rgba(250,248,245,0.04)",
                      border: "none",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.85rem",
                      color: CREAM,
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />
                  <button
                    className="exit-submit-btn"
                    type="submit"
                    style={{
                      padding: "0.9rem 1.5rem",
                      background: G,
                      color: INK,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "background 0.2s",
                    }}
                  >
                    Claim 10%
                  </button>
                </div>
              </form>

              {/* Trust signals */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem" }}>
                {["No spam", "Unsubscribe anytime", "48-hour offer"].map((t, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", color: "rgba(250,248,245,0.3)", letterSpacing: "0.05em" }}>
                    {i > 0 && <span style={{ color: "rgba(201,169,97,0.3)", marginRight: "0.25rem" }}>·</span>}
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── STICKY BOTTOM CTA BAR ────────────────────────────────────────────────────
export function StickyShopBar() {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 7999,
      background: `linear-gradient(90deg, ${INK} 0%, ${INK2} 50%, ${INK} 100%)`,
      borderTop: `1px solid rgba(201,169,97,0.25)`,
      boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
      padding: "0.875rem 1.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
      flexWrap: "wrap",
      transform: visible ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Gold top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />

      {/* Left: Stars + rating */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div style={{ display: "flex", gap: "2px" }}>
          {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={G} style={{ color: G }} />)}
        </div>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: MUTED }}>
          <strong style={{ color: CREAM }}>4.9/5</strong> · 127 verified customers
        </span>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", color: "rgba(250,248,245,0.25)", display: "none" }} className="sticky-bar-detail">
          · Free UK Delivery · 2-Year Warranty · 30-Day Returns
        </span>
      </div>

      {/* Right: CTAs */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <Link href="/trade-portal">
          <button style={{
            padding: "0.55rem 1rem",
            background: "transparent",
            border: `1px solid rgba(201,169,97,0.3)`,
            borderRadius: "6px",
            color: G,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: "0.35rem",
            transition: "border-color 0.2s, background 0.2s",
          }}>
            <Lock size={10} /> Trade
          </button>
        </Link>
        <Link href="/shop">
          <button style={{
            padding: "0.6rem 1.5rem",
            background: `linear-gradient(135deg, ${G} 0%, ${G2} 100%)`,
            color: INK,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: "0.4rem",
            boxShadow: `0 4px 16px rgba(201,169,97,0.3)`,
            transition: "box-shadow 0.2s, transform 0.2s",
          }}>
            <ShoppingBag size={13} /> Shop Now <ArrowRight size={12} />
          </button>
        </Link>
        <button
          onClick={() => setDismissed(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(250,248,245,0.2)", padding: "0.25rem" }}
        >
          <X size={14} />
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) { .sticky-bar-detail { display: inline !important; } }
      `}</style>
    </div>
  );
}

// ─── TRUST RIBBON ─────────────────────────────────────────────────────────────
export function TrustRibbon() {
  const items = [
    "Free UK Delivery", "2-Year Commercial Warranty", "Military-Grade Drop Stitch",
    "Inflates in 8 Minutes", "No Permits Required", "30-Day Returns",
    "127+ Happy Customers", "32 Countries Served", "Custom Branding Available",
    "Free UK Delivery", "2-Year Commercial Warranty", "Military-Grade Drop Stitch",
    "Inflates in 8 Minutes", "No Permits Required", "30-Day Returns",
  ];

  return (
    <div style={{ background: G, padding: "0.5rem 0", overflow: "hidden" }}>
      <div style={{
        display: "flex", gap: "3.5rem", alignItems: "center",
        animation: "ribbon-scroll 32s linear infinite",
        whiteSpace: "nowrap",
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK,
            flexShrink: 0,
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: `rgba(14,12,9,0.3)`, display: "inline-block" }} />
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ribbon-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── WHATSAPP FLOATING BUTTON ─────────────────────────────────────────────────
export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse]     = useState(true);

  // Stop pulsing after 8 seconds so it doesn't become annoying
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const WA_NUMBER = "447541609734"; // Update this number when ready
  const WA_MSG    = encodeURIComponent("Hello Oceanex, I'm interested in learning more about your hospitality structures.");
  const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes wa-tooltip-in {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wa-btn:hover { transform: scale(1.08) !important; }
      `}</style>

      <div style={{
        position: "fixed",
        bottom: "5.5rem",   /* sits above the sticky shop bar */
        right: "1.5rem",
        zIndex: 8500,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexDirection: "row-reverse",
      }}>
        {/* Tooltip label */}
        {hovered && (
          <div style={{
            background: `linear-gradient(135deg, ${INK2} 0%, ${INK} 100%)`,
            border: `1px solid rgba(201,169,97,0.3)`,
            borderRadius: "8px",
            padding: "0.6rem 1rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            animation: "wa-tooltip-in 0.2s ease",
            whiteSpace: "nowrap",
          }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: CREAM, marginBottom: "0.1rem" }}>
              Chat with us on WhatsApp
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", color: MUTED }}>
              Typically replies within minutes
            </p>
          </div>
        )}

        {/* Button */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "3.25rem",
            height: "3.25rem",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: pulse
              ? "0 4px 20px rgba(37,211,102,0.45)"
              : "0 4px 20px rgba(0,0,0,0.35)",
            animation: pulse ? "wa-pulse 2s ease-out infinite" : "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            flexShrink: 0,
            textDecoration: "none",
          }}
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp SVG icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
