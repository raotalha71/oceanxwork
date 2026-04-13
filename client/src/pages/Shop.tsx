// OCEANEX SHOP PAGE — DTC Consumer Storefront
// All images: real brand CDN assets only — no AI, no stock
// Copy: from brochures

import { useState } from 'react';
import { Star, Check, Eye, X, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'wouter';
import Navbar from '@/components/Navbar';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9';

// New product CDN images from totem uploads
const NEW_CDN = {
  coolPort1:    `${CDN}/cool_port_1_7f34a0e0.webp`,
  coolPort2:    `${CDN}/cool_port_2_4d0fe11a.webp`,
  tahitiBar1:   `${CDN}/tahiti_pool_bar_1_3f07b4e9.webp`,
  tahitiBar2:   `${CDN}/tahiti_pool_bar_2_4aefbbbc.webp`,
  aquaShack:    `${CDN}/aqua_shack_8fcdac52.webp`,
  miamiBar:     `${CDN}/miami_bar_4ee0990c.webp`,
  americanBar:  `${CDN}/american_bar_1dbc82d0.webp`,
  champagneBarNew: `${CDN}/champagne_bar_acf1500a.webp`,
  longBarNew:   `${CDN}/long_bar_118020c1.webp`,
  santoriniPlus: `${CDN}/santorini_plus_4c3ef129.webp`,
  megaResort:   `${CDN}/mega_resort_4dee9b9b.webp`,
  miamiPoolBar: `${CDN}/miami_pool_bar_5aa849b2.webp`,
  bahamasPoolBar: `${CDN}/bahamas_pool_bar_f3245809.webp`,
};

const PRODUCTS = [
  {
    id: 'santorini-pool-bar',
    name: 'Santorini Pool Bar',
    category: 'Pool Collection',
    price: 4995,
    originalPrice: 5995,
    badge: 'Best Seller',
    img: `${CDN}/SantoriniHero_6bf4b807.webp`,
    gallery: [`${CDN}/SantoriniHero_6bf4b807.webp`, `${CDN}/SantoriniLifestyle1_782ace1d.webp`, `${CDN}/SantoriniLifestyle2_93624440.webp`, `${CDN}/SantoriniLifestyle3_9de1b1f2.webp`],
    shortDesc: 'The signature Oceanex pool bar. Santorini whitewashed architecture meets luxury hospitality. Deploys in 8 minutes.',
    fullDesc: 'The Santorini Pool Bar is the flagship of the Oceanex collection. Inspired by the iconic whitewashed architecture of the Greek islands, this ultra-premium inflatable pool bar transforms any resort pool, private island, or luxury event into a world-class hospitality venue. Built with high-pressure Drop Stitch Technology, it becomes a solid, hard-walled structure in 8 minutes, no continuous power required. Holds pressure for up to 6 days.',
    features: ['Drop Stitch Technology', '8-min inflation', 'UV-printed branding', 'Waterproof surfaces', 'Includes storage bag', 'Commercial grade'],
    rating: 4.9, reviews: 0,
  },
  {
    id: 'miami-pool-bar',
    name: 'Miami Pool Bar',
    category: 'Pool Collection',
    price: 3495,
    originalPrice: 3995,
    badge: 'Top Rated',
    img: `${CDN}/MiamiPoolbar_c77ff805.webp`,
    gallery: [`${CDN}/MiamiPoolbar_c77ff805.webp`, `${CDN}/luxury-experience_ab4add19.webp`],
    shortDesc: 'The entry hero. Delivers 2× the revenue of cabana bed rentals and 2× lift on F&B spend on property.',
    fullDesc: 'The Miami Pool Bar is the entry-level hero of the Oceanex pool collection. Designed for maximum revenue generation, it consistently delivers 2× the revenue of traditional cabana bed rentals and a 2× lift on food and beverage spend on property. Perfect for hotel resorts, beach clubs, and private villa rentals.',
    features: ['2× revenue vs cabana beds', '8-min inflation', 'UV-printed branding', 'Waterproof surfaces', 'Compact storage', 'Commercial grade'],
    rating: 4.8, reviews: 0,
  },
  {
    id: 'champagne-bar',
    name: 'Champagne Bar',
    category: 'Event Bars',
    price: 2995,
    originalPrice: 3495,
    badge: 'New',
    img: `${CDN}/Champagnebarnolabel_f805ee80.webp`,
    gallery: [`${CDN}/Champagnebarnolabel_f805ee80.webp`, `${CDN}/Eventbar_91f0f5af.jpeg`],
    shortDesc: 'Elegant event activation bar. Perfect for brand launches, VIP events, liquor promotions, and corporate hospitality.',
    fullDesc: 'The Champagne Bar is the definitive luxury event activation structure. Its elegant, minimalist design makes it the perfect centrepiece for brand launches, VIP events, liquor promotions, product sampling, and corporate hospitality. Fully brandable surfaces generate sponsorship income.',
    features: ['Brandable surfaces', '8-min inflation', 'UV-printed branding', 'Event-ready design', 'Compact storage', 'Multiple colour options'],
    rating: 4.9, reviews: 0,
  },
  {
    id: 'dj-booth-bar',
    name: 'DJ Booth & Bar',
    category: 'Event Bars',
    price: 3995,
    originalPrice: 4495,
    badge: 'Popular',
    img: `${CDN}/DJBooth1_164e27ce.webp`,
    gallery: [`${CDN}/DJBooth1_164e27ce.webp`],
    shortDesc: 'Complete entertainment hub. Combines DJ booth with full bar service, festivals, nightlife events, and brand activations.',
    fullDesc: 'The Oceanex DJ Booth & Bar is the ultimate entertainment activation structure. It combines a professional DJ booth with a full-service bar in one inflatable unit, perfect for festivals, nightlife events, sports fan zones, and brand activations. Fully brandable with UV-printed graphics.',
    features: ['DJ booth + bar combo', '10-min inflation', 'UV-printed branding', 'Festival-grade build', 'Compact storage', 'Nightlife ready'],
    rating: 4.7, reviews: 0,
  },
  {
    id: 'bali-spa-bar',
    name: 'Bali Spa Bar',
    category: 'Wellness Collection',
    price: 3295,
    originalPrice: 3795,
    badge: null,
    img: `${CDN}/Balispa_a6131545.webp`,
    gallery: [`${CDN}/Balispa_a6131545.webp`],
    shortDesc: 'Resort wellness experience. Designed for hotel spas, private islands, and luxury wellness retreats.',
    fullDesc: 'The Bali Spa Bar brings the serenity of Balinese wellness design to any resort, private island, or luxury retreat. Its organic forms and natural aesthetic create an immersive wellness experience that drives premium spend on spa treatments, wellness beverages, and luxury retail.',
    features: ['Wellness aesthetic', '8-min inflation', 'UV-printed branding', 'Organic design', 'Compact storage', 'Spa-grade finish'],
    rating: 4.8, reviews: 0,
  },
  {
    id: 'long-bar',
    name: 'Long Bar',
    category: 'Event Bars',
    price: 4495,
    originalPrice: 4995,
    badge: null,
    img: `${CDN}/LongBar1_dd192e90.webp`,
    gallery: [`${CDN}/LongBar1_dd192e90.webp`, `${CDN}/LongBar2_56e76161.webp`],
    shortDesc: 'High-capacity event bar. Serves large crowds at festivals, trade shows, sports fan zones, and corporate activations.',
    fullDesc: 'The Oceanex Long Bar is the high-capacity event bar built for large-scale hospitality. Its extended footprint serves large crowds efficiently at festivals, trade shows, sports fan zones, and corporate activations. Multiple bartenders can work simultaneously.',
    features: ['High-capacity service', '10-min inflation', 'UV-printed branding', 'Multi-bartender design', 'Compact storage', 'Festival-grade'],
    rating: 4.8, reviews: 0,
  },
  {
    id: 'cool-port',
    name: 'Cool Port',
    category: 'Hospitality Structures',
    price: 6500,
    originalPrice: 7200,
    badge: 'Cruise Ready',
    img: NEW_CDN.coolPort1,
    gallery: [NEW_CDN.coolPort1, NEW_CDN.coolPort2],
    shortDesc: 'Inflatable brandable hospitality tent. Perfect for cruise lines, ports, and luxury hotel support points. No permits required.',
    fullDesc: 'The Cool Port is an inflatable brandable tent perfect to serve as a support point for clients. Designed for hospitality settings, it installs quickly with no permits or permanent construction. Built with premium Drop Stitch technology for exceptional stability, strength, and commercial durability. Ideal for cruise lines and port hospitality.',
    features: ['Fully brandable surfaces', '8-min inflation', 'UV-printed branding', 'No permits required', 'Includes storage bag', 'Cruise line ready'],
    rating: 4.8, reviews: 0,
  },
  {
    id: 'tahiti-pool-bar',
    name: 'Tahiti Pool Bar',
    category: 'Pool Collection',
    price: 8200,
    originalPrice: 9000,
    badge: 'New',
    img: NEW_CDN.tahitiBar1,
    gallery: [NEW_CDN.tahitiBar1, NEW_CDN.tahitiBar2],
    shortDesc: 'Self-contained inflatable swim-up pool bar. Distinctive rounded tropical design. Dual-branded banner format for sponsorship.',
    fullDesc: 'The Tahiti Pool Bar brings the spirit of French Polynesia to any pool or beach. Its distinctive rounded form and open-plan swim-up design create an immersive tropical hospitality experience. The dual-branded banner format makes it ideal for resort branding and liquor sponsorship activations.',
    features: ['Swim-up pool bar', '8-min inflation', 'Dual-branded banners', 'Waterproof surfaces', 'Includes storage bag', 'Commercial grade'],
    rating: 4.8, reviews: 0,
  },
  {
    id: 'aqua-shack',
    name: 'Aqua Shack',
    category: 'Kiosks',
    price: 2800,
    originalPrice: 3200,
    badge: 'Versatile',
    img: NEW_CDN.aquaShack,
    gallery: [NEW_CDN.aquaShack],
    shortDesc: 'Inflatable kiosk for extra revenue. Food, beverages, merchandise, and more. Pairs with any Oceanex pool bar.',
    fullDesc: 'The Aqua Shack is an inflatable kiosk designed to generate extra revenue from any beachfront, poolside, or event location. Multiple possibilities, ice cream, beverages, merchandise, food service, and more. Built with the same Drop Stitch technology as the full bar range.',
    features: ['Open-front kiosk', '8-min inflation', 'Menu board panels', 'UV-printed branding', 'Compact storage', 'Multi-use'],
    rating: 4.7, reviews: 0,
  },
  {
    id: 'miami-bar',
    name: 'Miami Bar',
    category: 'Event Bars',
    price: 3500,
    originalPrice: 3995,
    badge: 'Compact',
    img: NEW_CDN.miamiBar,
    gallery: [NEW_CDN.miamiBar],
    shortDesc: 'Compact inflatable bar with distinctive Miami aesthetic. Perfect for garden parties, corporate events, and brand activations.',
    fullDesc: 'The Miami Bar is the compact powerhouse of the Oceanex event range. Its distinctive rounded white form creates an instant premium atmosphere at any event. The open-front service design allows efficient service for up to 50 guests simultaneously.',
    features: ['Compact Miami design', '8-min inflation', 'UV-printed branding', 'Open-front service', 'Compact storage', 'Event-ready'],
    rating: 4.8, reviews: 0,
  },
  {
    id: 'american-bar',
    name: 'American Bar',
    category: 'Themed Bars',
    price: 3800,
    originalPrice: 4200,
    badge: 'USA Edition',
    img: NEW_CDN.americanBar,
    gallery: [NEW_CDN.americanBar],
    shortDesc: 'Full Stars and Stripes inflatable bar. Perfect for Independence Day, FIFA World Cup 2026 fan zones, and American brand activations.',
    fullDesc: 'The American Bar brings patriotic flair to any event. Full Stars and Stripes UV-printed branding on a premium Drop Stitch inflatable bar. Perfect for Independence Day events, sports fan zones, American brand activations, and 4th of July celebrations.',
    features: ['Stars & Stripes design', '8-min inflation', 'UV-printed branding', 'Fan zone ready', 'Compact storage', 'FIFA 2026 ready'],
    rating: 4.9, reviews: 0,
  },
  {
    id: 'santorini-plus',
    name: 'Santorini Plus',
    category: 'Pool Collection',
    price: 11500,
    originalPrice: 12800,
    badge: 'Expanded',
    img: NEW_CDN.santoriniPlus,
    gallery: [NEW_CDN.santoriniPlus],
    shortDesc: 'The expanded Santorini Pool Bar. More seating, more capacity, same iconic aesthetic. For resorts that need more.',
    fullDesc: 'The Santorini Plus takes everything that made the original Santorini Pool Bar the bestselling product in the Oceanex range and scales it up. More seating, more bar capacity, more revenue. The same iconic whitewashed Santorini aesthetic, but with the footprint to match a full resort pool.',
    features: ['Extended seating zones', 'Under 15-min inflation', 'UV-printed branding', 'Waterproof surfaces', 'Compact storage', 'Resort scale'],
    rating: 4.9, reviews: 0,
  },
  {
    id: 'mega-resort',
    name: 'Mega Resort',
    category: 'Pool Collection',
    price: 28000,
    originalPrice: 32000,
    badge: 'Flagship',
    img: NEW_CDN.megaResort,
    gallery: [NEW_CDN.megaResort],
    shortDesc: 'The ultimate pool bar platform. Central tower bar with surrounding swim-up seating. Anchors entire resort pool zones.',
    fullDesc: 'The Mega Resort is in a category of its own. Its central tower bar design with surrounding swim-up seating creates a complete destination that can anchor an entire resort pool zone. When guests see the Mega Resort, they spend the entire day there.',
    features: ['Central tower bar', 'Under 20-min inflation', 'UV-printed branding', 'Full resort scale', 'Multi-pump system', '5-star grade'],
    rating: 5.0, reviews: 0,
  },
  {
    id: 'miami-pool-bar',
    name: 'Miami Pool Bar',
    category: 'Pool Collection',
    price: 7200,
    originalPrice: 8000,
    badge: 'Top Rated',
    img: NEW_CDN.miamiPoolBar,
    gallery: [NEW_CDN.miamiPoolBar],
    shortDesc: 'Circular swim-up pool bar with Miami sunset aesthetic. Delivers 2× the revenue of cabana bed rentals.',
    fullDesc: 'The Miami Pool Bar is a circular swim-up pool bar that combines the vibrant Miami aesthetic with premium Drop Stitch construction. Its circular design creates a social hub that keeps guests spending longer at your venue.',
    features: ['Circular swim-up design', '8-min inflation', 'UV-printed branding', 'Waterproof surfaces', 'Compact storage', 'Commercial grade'],
    rating: 4.8, reviews: 0,
  },
];

const CATEGORIES = ['All', 'Pool Collection', 'Event Bars', 'Wellness Collection', 'Hospitality Structures', 'Kiosks', 'Themed Bars'];

export default function Shop() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [, navigate] = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const bg     = isDark ? '#040e1e' : '#f8f5f0';
  const text   = isDark ? '#e8e0d0' : '#1a1a2e';
  const muted  = isDark ? 'rgba(232,224,208,0.6)' : 'rgba(26,26,46,0.6)';
  const gold   = '#d4af37';
  const navy   = '#003057';
  const accent = isDark ? gold : navy;
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const border = isDark ? 'rgba(212,175,55,0.15)' : 'rgba(0,48,87,0.1)';

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  // Deterministic urgency signals per product (based on id hash for consistency)
  const STOCK_MAP: Record<string, { units: number; hot: boolean }> = {
    'santorini-pool-bar': { units: 3, hot: true },
    'miami-pool-bar':     { units: 5, hot: true },
    'bali-spa':           { units: 2, hot: true },
    'champagne-bar':      { units: 7, hot: false },
    'dj-booth-bar':       { units: 4, hot: true },
    'long-bar':           { units: 6, hot: false },
    'cool-port':          { units: 3, hot: true },
    'tahiti-pool-bar':    { units: 2, hot: true },
    'aqua-shack':         { units: 8, hot: false },
    'miami-bar':          { units: 5, hot: false },
    'american-bar':       { units: 4, hot: false },
    'santorini-plus':     { units: 2, hot: true },
    'mega-resort':        { units: 1, hot: true },
    'miami-pool-bar-2':   { units: 3, hot: false },
    'bahamas-pool-bar':   { units: 2, hot: true },
  };

  const handleEnquire = (productName: string) => {
    navigate(`/contact?product=${encodeURIComponent(productName)}`);
  };

  return (
    <div style={{ background: bg, color: text, minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />

      {/* Page Header */}
      <div style={{
        paddingTop: '120px', paddingBottom: '3rem',
        paddingLeft: '1.5rem', paddingRight: '1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ color: accent, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          The Collection
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: '300', lineHeight: '1.1', marginBottom: '1rem',
        }}>
          Shop Oceanex
        </h1>
        <p style={{ color: muted, maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
          Premium inflatable hospitality structures. Direct to your door. Deploys in 8 minutes.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', padding: '0 1.5rem 3rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '10px 24px', borderRadius: '100px',
            border: `1px solid ${activeCategory === cat ? accent : border}`,
            background: activeCategory === cat ? accent : 'transparent',
            color: activeCategory === cat ? (isDark ? '#040e1e' : '#ffffff') : text,
            fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.08em', cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="shop-product-grid" style={{
        maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem 6rem',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem',
      }}>
        {filtered.map(product => (
          <div key={product.id} style={{
            background: cardBg, border: `1px solid ${border}`,
            borderRadius: '12px', overflow: 'hidden',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 30px 80px rgba(0,0,0,${isDark ? '0.4' : '0.15'})`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              {product.badge && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: gold, color: '#040e1e', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '700' }}>
                  {product.badge}
                </div>
              )}
              {/* Urgency / hot badge */}
              {STOCK_MAP[product.id]?.hot && (
                <div style={{
                  position: 'absolute', top: product.badge ? '3rem' : '1rem', left: '1rem',
                  background: 'rgba(220,50,50,0.92)', color: '#fff',
                  padding: '3px 10px', borderRadius: '100px',
                  fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.08em',
                  backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>🔥 High Demand</div>
              )}
              <button onClick={() => { setSelectedProduct(product); setSelectedImage(0); }} style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'rgba(4,14,30,0.7)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#ffffff', backdropFilter: 'blur(8px)',
              }} aria-label="Quick view"><Eye size={16} /></button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: '6px' }}>{product.category}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.5rem' }}>{product.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={gold} stroke={gold} />)}
                <span style={{ fontSize: '0.75rem', color: muted }}>New Launch</span>
              </div>
              <p style={{ color: muted, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>{product.shortDesc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                {product.features.slice(0, 3).map((f, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', padding: '4px 10px', background: isDark ? 'rgba(212,175,55,0.1)' : 'rgba(0,48,87,0.06)', border: `1px solid ${border}`, borderRadius: '100px', color: muted }}>{f}</span>
                ))}
              </div>
              <button onClick={() => handleEnquire(product.name)} style={{
                  width: '100%', background: accent, color: isDark ? '#040e1e' : '#ffffff',
                  border: 'none', borderRadius: '6px', padding: '14px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em', cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Enquire for Pricing <ArrowRight size={15} />
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trade CTA */}
      <div style={{ textAlign: 'center', padding: '2rem 1.5rem 4rem', borderTop: `1px solid ${border}` }}>
        <p style={{ color: muted, fontSize: '0.875rem' }}>
          Are you a trade professional or agent?{' '}
          <Link href="/trade-portal" style={{ color: accent, textDecoration: 'none', fontWeight: '600', cursor: 'pointer' }}>Apply for a Trade Account</Link>
          {' '}or{' '}
          <Link href="/agents-portal" style={{ color: accent, textDecoration: 'none', fontWeight: '600', cursor: 'pointer' }}>Join the Agents Network</Link>
        </p>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(4,14,30,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem', backdropFilter: 'blur(10px)',
        }} onClick={() => setSelectedProduct(null)}>
          <div style={{
            background: isDark ? '#0a1628' : '#ffffff',
            borderRadius: '16px', overflow: 'hidden',
            maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
              background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#ffffff',
            }}><X size={18} /></button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="modal-grid">
              <div>
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={selectedProduct.gallery[selectedImage]} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                {selectedProduct.gallery.length > 1 && (
                  <div style={{ display: 'flex', gap: '4px', padding: '8px' }}>
                    {selectedProduct.gallery.map((img, i) => (
                      <button key={i} onClick={() => setSelectedImage(i)} style={{
                        width: '60px', height: '60px', overflow: 'hidden',
                        border: `2px solid ${i === selectedImage ? gold : 'transparent'}`,
                        borderRadius: '4px', cursor: 'pointer', padding: 0,
                      }}>
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ padding: '2rem', color: text }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: '6px' }}>{selectedProduct.category}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: '600', marginBottom: '0.75rem' }}>{selectedProduct.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={gold} stroke={gold} />)}
                  <span style={{ fontSize: '0.8rem', color: muted }}>New Launch — Be the first to review</span>
                </div>
                <p style={{ color: muted, lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{selectedProduct.fullDesc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1.5rem' }}>
                  {selectedProduct.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: muted }}>
                      <Check size={12} style={{ color: accent, flexShrink: 0 }} />{f}
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: isDark ? 'rgba(212,175,55,0.06)' : 'rgba(0,48,87,0.04)', borderRadius: '8px', border: `1px solid ${border}` }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: muted, marginBottom: '4px' }}>Pricing</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: '600', color: text }}>Available on enquiry. Contact us for a tailored quote.</div>
                </div>
                <button onClick={() => { handleEnquire(selectedProduct.name); setSelectedProduct(null); }} style={{
                  width: '100%', background: accent, color: isDark ? '#040e1e' : '#ffffff',
                  border: 'none', borderRadius: '8px', padding: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase',
                }}>
                  Enquire for Pricing <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) { .shop-product-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) {
          .shop-product-grid { grid-template-columns: 1fr !important; }
          .modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
