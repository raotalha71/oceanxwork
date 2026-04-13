import { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { BLOG_POSTS } from '../lib/blogData';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CATEGORIES = ['All', 'Buying Guide', 'Hospitality', 'Business', 'Events', 'Inspiration'];

export default function Blog() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const bg = isDark ? 'var(--theme-bg)' : '#f8f6f0';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const text = isDark ? 'var(--theme-text)' : '#1a1a2e';
  const muted = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)';
  const gold = isDark ? '#c9a84c' : '#1a3a5c';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff';

  return (
    <div style={{ background: bg, minHeight: '100vh' }}>
      <Navbar />
      {/* Hero */}
      <section style={{
        padding: '140px 24px 60px',
        textAlign: 'center',
        borderBottom: `1px solid ${border}`,
        background: isDark
          ? 'linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(26,58,92,0.04) 0%, transparent 100%)',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: gold, marginBottom: '16px', fontWeight: 600 }}>
            Knowledge Centre
          </p>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: text,
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            The Oceanex Journal
          </h1>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', color: muted, lineHeight: 1.7, marginBottom: '40px' }}>
            Expert guides on inflatable pool bars, swim-up bar revenue, hospitality trends, and the luxury inflatable industry.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: muted }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                background: inputBg,
                border: `1px solid ${border}`,
                borderRadius: '8px',
                color: text,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                outline: 'none',
                cursor: 'text',
              }}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '32px 24px 0', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '40px',
                border: `1px solid ${activeCategory === cat ? gold : border}`,
                background: activeCategory === cat ? gold : 'transparent',
                color: activeCategory === cat ? (isDark ? '#0a0a14' : '#ffffff') : muted,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: '48px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: muted, fontFamily: 'Montserrat, sans-serif' }}>
            No articles found for "{search}"
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
            {filtered.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  style={{
                    background: cardBg,
                    border: `1px solid ${border}`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Hero Image */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: gold,
                      color: isDark ? '#0a0a14' : '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                    }}>
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: muted }}>
                        <Calendar size={12} /> {new Date(post.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: muted }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    <h2 style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: text,
                      lineHeight: 1.3,
                      marginBottom: '12px',
                    }}>
                      {post.title}
                    </h2>

                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: muted, lineHeight: 1.7, marginBottom: '20px' }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{
                          display: 'flex', alignItems: 'center', gap: '4px',
                          padding: '3px 10px',
                          background: isDark ? 'rgba(201,168,76,0.1)' : 'rgba(26,58,92,0.07)',
                          borderRadius: '20px',
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '10px',
                          color: gold,
                          fontWeight: 600,
                        }}>
                          <Tag size={9} /> {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: gold, fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Read Article <ArrowRight size={14} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* SEO Footer — 79 Domain Keywords */}
      <section style={{
        padding: '60px 24px',
        borderTop: `1px solid ${border}`,
        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: gold, marginBottom: '24px', fontWeight: 600 }}>
            Topics We Cover
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {[
              'Inflatable Pool Bar', 'Swim-Up Bar', 'Floating Pool Bar', 'Inflatable Tiki Bar',
              'Pool Bar Rental', 'Inflatable Bar Rental', 'Hotel Pool Bar', 'Resort Pool Bar',
              'Inflatable Swim-Up Bar', 'Floating Tiki Bar', 'Portable Pool Bar', 'Blow Up Pool Bar',
              'Beach Bar Inflatable', 'Hot Tub Swim-Up Bar', 'Giant Inflatable Bar', 'Poolside Bar Ideas',
              'Fan Zone Bar', 'World Cup Bar', 'Cruise Ship Bar', 'Luxury Pool Bar',
            ].map(tag => (
              <span key={tag} style={{
                padding: '6px 16px',
                border: `1px solid ${border}`,
                borderRadius: '20px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                color: muted,
                cursor: 'pointer',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
