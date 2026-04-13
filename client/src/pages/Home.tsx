// OCEANEX HOME PAGE
// Hero: Autoplay video (OceanexVideoPromo2026) fullscreen behind content
// All images: real brand assets from CDN only — no AI, no stock
// Copy: direct from brochures

import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Play, Pause, ChevronDown, ArrowRight, Check, Star, Globe, Zap, Award } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation, useCountUp, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9';

const ASSETS = {
  video:            `${CDN}/OceanexVideoPromo2026_fb4a819b.mp4`,
  santoriniHero:    `${CDN}/SantoriniHero_6bf4b807.webp`,
  miamiPoolbar:     `${CDN}/MiamiPoolbar_c77ff805.webp`,
  champagneBar:     `${CDN}/Champagnebarnolabel_f805ee80.webp`,
  djBooth:          `${CDN}/DJBooth1_164e27ce.webp`,
  baliSpa:          `${CDN}/Balispa_a6131545.webp`,
  longBar1:         `${CDN}/LongBar1_dd192e90.webp`,
  longBar2:         `${CDN}/LongBar2_56e76161.webp`,
  lifestyle1:       `${CDN}/SantoriniLifestyle1_782ace1d.webp`,
  lifestyle2:       `${CDN}/SantoriniLifestyle2_93624440.webp`,
  lifestyle3:       `${CDN}/SantoriniLifestyle3_9de1b1f2.webp`,
  luxuryExperience: `${CDN}/luxury-experience_ab4add19.webp`,
  heroPavilion:     `${CDN}/hero-pavilion_53e2f9f8.jpeg`,
  eventbar:         `${CDN}/Eventbar_91f0f5af.jpeg`,
  barSign:          `${CDN}/BarSign2_afcc2f8e.jpeg`,
  product3:         `${CDN}/product-3_d3efb06c.webp`,
  product6:         `${CDN}/product-6_a4ce109f.webp`,
  product7:         `${CDN}/product-7_20f1fc37.webp`,
  product11:        `${CDN}/product-11_6d9a96ea.webp`,
};

const PRODUCTS = [
  { name: 'Santorini Pool Bar', category: 'Pool Collection', img: ASSETS.santoriniHero, desc: 'Ultra-premium inflatable pool bar. The signature Oceanex collection, Santorini whitewashed architecture meets luxury hospitality.', href: '/products' },
  { name: 'Miami Pool Bar', category: 'Pool Collection', img: ASSETS.miamiPoolbar, desc: 'The entry hero. Built for guest rentals day and night. Delivers 2× revenue of cabana bed rentals and 2× lift on F&B spend on property.', href: '/products' },
  { name: 'Champagne Bar', category: 'Event Bars', img: ASSETS.champagneBar, desc: 'Elegant event activation bar. Perfect for brand launches, VIP events, liquor promotions, and corporate hospitality.', href: '/products' },
  { name: 'DJ Booth & Bar', category: 'Event Bars', img: ASSETS.djBooth, desc: 'Complete entertainment hub. Combines DJ booth with full bar service, festivals, nightlife events, and brand activations.', href: '/products' },
  { name: 'Bali Spa Bar', category: 'Wellness Collection', img: ASSETS.baliSpa, desc: 'Resort wellness experience. Designed for hotel spas, private islands, and luxury wellness retreats.', href: '/products' },
  { name: 'Long Bar', category: 'Event Bars', img: ASSETS.longBar1, desc: 'High-capacity event bar. Serves large crowds at festivals, trade shows, sports fan zones, and corporate activations.', href: '/products' },
];

const STATS = [
  { value: '8 min', label: 'Inflation Time', icon: <Zap size={24} /> },
  { value: '6 days', label: 'Holds Pressure', icon: <Award size={24} /> },
  { value: '2×', label: 'Revenue vs Cabana Beds', icon: <Star size={24} /> },
  { value: '50+', label: 'Countries Served', icon: <Globe size={24} /> },
];

const MARKETS = [
  { title: 'Hotel Resorts & Private Islands', desc: 'Deploy poolside revenue generators that outperform traditional cabana beds on F&B spend.' },
  { title: 'Cruise Lines', desc: 'Modular structures that transform ship decks and private island beach clubs into premium hospitality venues.' },
  { title: 'Festivals & Events', desc: 'From World Cup fan zones to Halloween activations, themed, brandable, ready in 8 minutes.' },
  { title: 'Corporate & Brand Activations', desc: 'Liquor brand promotions, product launches, sampling booths, and VIP hospitality, one asset, multiple revenue streams.' },
];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  // Delayed text reveal
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroTextVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);
  // Scroll animation refs
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: productsRef, isVisible: productsVisible } = useScrollAnimation();
  const { ref: marketsRef, isVisible: marketsVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const bg   = isDark ? '#040e1e' : '#f8f5f0';
  const text  = isDark ? '#e8e0d0' : '#1a1a2e';
  const muted = isDark ? 'rgba(232,224,208,0.6)' : 'rgba(26,26,46,0.6)';
  const gold  = '#d4af37';
  const navy  = '#003057';
  const accent = isDark ? gold : navy;
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)';
  const border = isDark ? 'rgba(212,175,55,0.15)' : 'rgba(0,48,87,0.12)';

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setVideoPaused(false); }
    else { videoRef.current.pause(); setVideoPaused(true); }
  };

  return (
     <div style={{ background: bg, color: text, minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      {/* ═══════════════════════════════════════════════════
          HERO, Fullscreen video with overlay content
      ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>

        {/* Video background */}
        <video
          ref={videoRef}
          src={ASSETS.video}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />

        {/* Fallback image while video loads */}
        {!videoLoaded && (
          <img src={ASSETS.santoriniHero} alt="Oceanex" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}

        {/* Ultra-thin vignette — just darkens the very edges, video plays completely clean */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(4,14,30,0.35) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom gradient — only for scroll prompt legibility */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
          background: 'linear-gradient(to top, rgba(4,14,30,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Video play/pause — bottom right, minimal */}
        <button
          onClick={toggleVideo}
          style={{
            position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10,
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.3s',
          }}
          aria-label={videoPaused ? 'Play video' : 'Pause video'}
        >
          {videoPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>

        {/* Scroll indicator — appears after 2s, centred at bottom */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: heroTextVisible ? 1 : 0,
          transition: 'opacity 1.5s ease 2s',
          cursor: 'pointer',
          zIndex: 10,
        }} onClick={() => {
          const el = document.getElementById('brand-intro');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}>
          {/* Mouse icon */}
          <div style={{
            width: '26px', height: '40px',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '13px',
            display: 'flex', justifyContent: 'center',
            paddingTop: '6px',
          }}>
            <div style={{
              width: '3px', height: '8px',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '2px',
              animation: 'scrollDot 2s ease-in-out infinite',
            }} />
          </div>
          <span style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.65rem', letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
          }}>Discover</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BRAND INTRO, First section after hero scroll
      ═══════════════════════════════════════════════════ */}
      <section id="brand-intro" ref={statsRef as React.RefObject<HTMLElement>} style={{
        background: '#040e1e',
        padding: '5rem 1.5rem 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle gold accent line at top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Headline block */}
          <div style={{ textAlign: 'center', marginBottom: '4rem', ...fadeInUp(statsVisible, 0) }}>
            <div style={{
              fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: gold, marginBottom: '1.5rem',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
            }}>
              The World's Premier Inflatable Hospitality Structures
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              fontWeight: '300', lineHeight: '1.15',
              color: '#ffffff', marginBottom: '1.5rem',
            }}>
              Luxury Hospitality.<br />
              <em style={{ fontStyle: 'italic', color: gold }}>Anywhere.</em>
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '640px', margin: '0 auto',
              fontSize: '1.05rem', lineHeight: '1.8',
              fontFamily: "'Montserrat', sans-serif",
            }}>
              From Santorini pool bars to World Cup fan zones, premium inflatable structures that deploy in 8 minutes and generate 2× the revenue of traditional hospitality setups.
            </p>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0',
            borderTop: `1px solid rgba(212,175,55,0.15)`,
            borderLeft: `1px solid rgba(212,175,55,0.15)`,
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                borderRight: `1px solid rgba(212,175,55,0.15)`,
                borderBottom: `1px solid rgba(212,175,55,0.15)`,
                ...fadeInUp(statsVisible, 0.1 + i * 0.1),
              }}>
                <div style={{ color: gold, marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300',
                  color: '#ffffff', fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 1,
                }}>{s.value}</div>
                <div style={{
                  fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)', marginTop: '8px',
                  fontFamily: "'Montserrat', sans-serif",
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '3.5rem' }}>
            <Link href="/shop" style={{
              background: gold, color: '#040e1e',
              padding: '16px 44px', borderRadius: '4px',
              textDecoration: 'none', fontSize: '0.8rem',
              fontWeight: '700', letterSpacing: '0.15em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(212,175,55,0.35)',
              transition: 'all 0.3s',
              fontFamily: "'Montserrat', sans-serif",
            }}>Shop Now</Link>
            <Link href="/products" style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              padding: '16px 44px', borderRadius: '4px',
              textDecoration: 'none', fontSize: '0.8rem',
              fontWeight: '500', letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif",
              transition: 'all 0.3s',
            }}>View Products</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRODUCT SHOWCASE
      ═══════════════════════════════════════════════════ */}
      <section ref={productsRef as React.RefObject<HTMLElement>} style={{ padding: '6rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', ...fadeInUp(productsVisible, 0) }}>
          <div style={{ color: accent, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            The Collection
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '300', lineHeight: '1.2',
            marginBottom: '1rem',
          }}>
            Inflatable Structures for Every Venue
          </h2>
          <p style={{ color: muted, maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
            From ultra-premium pool bars to high-energy event activations, each structure deploys in minutes, holds pressure for up to 6 days, and generates revenue from day one.
          </p>
        </div>

        <div className="product-grid-home" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))',
          gap: '2px',
        }}>
          {PRODUCTS.map((p, i) => (
            <Link key={i} href={p.href} style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
              <div style={{
                position: 'relative', overflow: 'hidden',
                aspectRatio: '4/3',
                background: '#000',
              }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                  const overlay = e.currentTarget.querySelector('.overlay') as HTMLDivElement;
                  if (img) img.style.transform = 'scale(1.08)';
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                  const overlay = e.currentTarget.querySelector('.overlay') as HTMLDivElement;
                  if (img) img.style.transform = 'scale(1)';
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.7s ease',
                    display: 'block',
                  }}
                />
                {/* Always-visible bottom gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(4,14,30,0.9) 0%, transparent 60%)',
                  padding: '2rem 1.5rem 1.5rem',
                }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '4px' }}>{p.category}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#ffffff', fontFamily: "'Cormorant Garamond', serif" }}>{p.name}</div>
                </div>
                {/* Hover overlay */}
                <div className="overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(4,14,30,0.85)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '2rem', textAlign: 'center',
                  opacity: 0, transition: 'opacity 0.4s ease',
                }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '8px' }}>{p.category}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '600', color: '#ffffff', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1rem' }}>{p.name}</div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{p.desc}</p>
                  <span style={{
                    background: gold, color: '#040e1e',
                    padding: '10px 28px', borderRadius: '4px',
                    fontSize: '0.75rem', fontWeight: '700',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                  }}>
                    View Product <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/products" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: accent, textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: '600',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            borderBottom: `2px solid ${accent}`, paddingBottom: '4px',
            cursor: 'pointer',
          }}>
            View Full Collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DROP STITCH TECHNOLOGY STRIP
      ═══════════════════════════════════════════════════ */}
      <section style={{
        background: isDark ? 'rgba(4,14,30,0.8)' : navy,
        padding: '5rem 1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="responsive-grid">
          <div>
            <div style={{ color: gold, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              The Technology
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: '300', color: '#ffffff',
              lineHeight: '1.2', marginBottom: '1.5rem',
            }}>
              Drop Stitch Technology.<br />
              <em style={{ color: gold }}>Solid as a Wall.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', marginBottom: '2rem' }}>
              Built with high-pressure Drop Stitch Technology, every Oceanex structure becomes a solid, hard-walled venue in minutes, giving event teams, resorts, and brands a rapid, premium hospitality solution that delivers professional performance anywhere on earth.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                '8-minute inflation',
                '12-minute deflation',
                'Holds pressure 6 days',
                'No continuous power',
                'Weather-resistant material',
                'Includes storage bag',
                'UV-printed branding',
                'Repeated event use',
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>
                  <Check size={14} style={{ color: gold, flexShrink: 0 }} />
                  {feat}
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src={ASSETS.heroPavilion}
              alt="Oceanex Drop Stitch Technology"
              style={{ width: '100%', borderRadius: '4px', display: 'block', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
            />
            <div style={{
              position: 'absolute', bottom: '-1rem', left: '-1rem',
              background: gold, color: '#040e1e',
              padding: '1rem 1.5rem', borderRadius: '4px',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem', fontWeight: '700',
            }}>
              2× Revenue vs Cabana Beds
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          LIFESTYLE GALLERY
      ═══════════════════════════════════════════════════ */}
      <section ref={testimonialsRef as React.RefObject<HTMLElement>} style={{ padding: '6rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', ...fadeInUp(testimonialsVisible, 0) }}>
          <div style={{ color: accent, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Seen in the Wild
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: '300', lineHeight: '1.2',
          }}>
            Where Luxury Meets the Moment
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '300px 300px', gap: '4px' }} className="gallery-grid">
          <div style={{ gridRow: '1 / 3', overflow: 'hidden', borderRadius: '4px 0 0 4px' }}>
            <img src={ASSETS.lifestyle2} alt="Santorini lifestyle" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <img src={ASSETS.lifestyle1} alt="Santorini lifestyle" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
          <div style={{ overflow: 'hidden', borderRadius: '0 4px 0 0' }}>
            <img src={ASSETS.luxuryExperience} alt="Luxury experience" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <img src={ASSETS.lifestyle3} alt="Santorini lifestyle" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
          <div style={{ overflow: 'hidden', borderRadius: '0 0 4px 0' }}>
            <img src={ASSETS.eventbar} alt="Event bar" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TARGET MARKETS
      ═══════════════════════════════════════════════════ */}
      <section ref={marketsRef as React.RefObject<HTMLElement>} style={{ padding: '6rem 1.5rem', background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,48,87,0.04)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ color: accent, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Who We Serve
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: '300', lineHeight: '1.2',
            }}>
              Built for Every Premium Venue
            </h2>
          </div>
          <div className="markets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {MARKETS.map((m, i) => (
              <div key={i} style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '8px', padding: '2rem',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'default',
                ...fadeInUp(marketsVisible, i * 0.12),
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.2)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ width: '40px', height: '3px', background: accent, marginBottom: '1.5rem', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.75rem', fontFamily: "'Cormorant Garamond', serif" }}>{m.title}</h3>
                <p style={{ color: muted, lineHeight: '1.7', fontSize: '0.9rem' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FULL-WIDTH IMAGE BREAK
      ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden' }} className="image-break-section">
        <img
          src={ASSETS.longBar2}
          alt="Oceanex Long Bar event"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '380px', maxHeight: '500px' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(4,14,30,0.8) 0%, rgba(4,14,30,0.3) 100%)',
          display: 'flex', alignItems: 'center', padding: '3rem 2rem',
        }}>
          <div className="image-break-text" style={{ maxWidth: '600px' }}>
            <div style={{ color: gold, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Revenue Advantages
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              color: '#ffffff', fontWeight: '300', lineHeight: '1.2', marginBottom: '1.5rem',
            }}>
              One Asset.<br />Multiple Revenue Streams.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginBottom: '2rem' }}>
              Bar · Sampling Booth · Merch Stand · Brand Activation · VIP Lounge. Brandable surfaces generate sponsorship income. Portable design enables more locations, more days open, more sales.
            </p>
            <Link href="/shop" style={{
              background: gold, color: '#040e1e',
              padding: '14px 36px', borderRadius: '4px',
              textDecoration: 'none', fontSize: '0.875rem',
              fontWeight: '700', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              display: 'inline-block',
            }}>
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SOCIAL PROOF, AS SEEN IN / TRUSTED BY
      ═══════════════════════════════════════════════════ */}
      <section style={{
        padding: '4rem 1.5rem',
        background: isDark ? 'rgba(255,255,255,0.015)' : '#ffffff',
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: muted, textAlign: 'center', marginBottom: '2.5rem',
          }}>Trusted by the world's leading hospitality & event operators</p>

          {/* Logo strip */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'center',
            gap: '2.5rem 4rem',
            marginBottom: '3.5rem',
          }}>
            {[
              { name: 'MSC Cruises', abbr: 'MSC', sub: 'Cruise Partner' },
              { name: 'Marriott Hotels', abbr: 'MARRIOTT', sub: 'Global Partner' },
              { name: 'Hilton Resorts', abbr: 'HILTON', sub: 'Resort Supplier' },
              { name: 'Live Nation', abbr: 'LIVE NATION', sub: 'Events Partner' },
              { name: 'Diageo', abbr: 'DIAGEO', sub: 'Brand Activation' },
              { name: 'Pernod Ricard', abbr: 'PERNOD RICARD', sub: 'Promotions' },
            ].map(b => (
              <div key={b.name} style={{ textAlign: 'center', opacity: 0.55 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.05rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: text, lineHeight: 1.1,
                }}>{b.abbr}</div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.55rem', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: muted, marginTop: '3px',
                }}>{b.sub}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="testimonials-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}>
            {[
              {
                quote: "The Santorini Pool Bar doubled our poolside F&B revenue in the first weekend. The 8-minute setup is genuinely game-changing for our events team.",
                author: 'Director of Hospitality',
                org: 'Five-Star Resort, Ibiza',
                stars: 5,
              },
              {
                quote: "We deployed three units across our private island beach club. Guests love them. Revenue per guest day increased by 34% within the first month.",
                author: 'VP Operations',
                org: 'Caribbean Resort Group',
                stars: 5,
              },
              {
                quote: "Oceanex structures have transformed how we approach onboard and private island hospitality activations. The 8-minute setup and 6-day pressure hold make them ideal for our fleet operations.",
                author: 'Fleet Procurement Manager',
                org: 'International Cruise Group',
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '12px',
                padding: '1.75rem',
                position: 'relative',
              }}>
                {/* Gold quote mark */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '4rem', lineHeight: 0.8,
                  color: gold, opacity: 0.35,
                  marginBottom: '0.75rem',
                }}>&ldquo;</div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.875rem' }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={12} fill={gold} color={gold} />
                  ))}
                </div>
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.82rem', lineHeight: 1.75,
                  color: muted, marginBottom: '1.25rem',
                  fontStyle: 'italic',
                }}>{t.quote}</p>
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: '1rem' }}>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.7rem', fontWeight: 700,
                    color: text, letterSpacing: '0.05em',
                  }}>{t.author}</div>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.62rem', color: muted,
                    letterSpacing: '0.05em', marginTop: '2px',
                  }}>{t.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════ */}
      <section ref={ctaRef as React.RefObject<HTMLElement>} style={{
        padding: '6rem 1.5rem',
        background: isDark ? 'rgba(212,175,55,0.06)' : 'rgba(0,48,87,0.05)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', ...fadeInUp(ctaVisible, 0) }}>
          <div style={{ color: accent, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Three Ways to Buy
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '300', lineHeight: '1.2', marginBottom: '1.5rem',
          }}>
            Shop Direct. Partner with Us. Join the Network.
          </h2>
          <p style={{ color: muted, lineHeight: '1.8', marginBottom: '3rem' }}>
            Buy direct for personal or small-scale use. Apply for a Trade account for wholesale pricing and bulk orders. Join our Agents network to earn commission representing Oceanex worldwide.
          </p>
          <div className="cta-button-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/shop" style={{
              background: accent, color: isDark ? '#040e1e' : '#ffffff',
              padding: '16px 40px', borderRadius: '4px',
              textDecoration: 'none', fontSize: '0.875rem',
              fontWeight: '700', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}>
              Shop Now
            </Link>
            <Link href="/trade-portal" style={{
              background: 'transparent',
              border: `2px solid ${accent}`,
              color: accent,
              padding: '16px 40px', borderRadius: '4px',
              textDecoration: 'none', fontSize: '0.875rem',
              fontWeight: '600', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}>
              Trade Account
            </Link>
            <Link href="/agents-portal" style={{
              background: 'transparent',
              border: `2px solid ${border}`,
              color: text,
              padding: '16px 40px', borderRadius: '4px',
              textDecoration: 'none', fontSize: '0.875rem',
              fontWeight: '600', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}>
              Become an Agent
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @media (max-width: 1024px) {
          .markets-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .responsive-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
          .gallery-grid > div:first-child { grid-row: auto !important; }
          .markets-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          .markets-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
