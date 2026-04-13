import { useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { BLOG_POSTS } from '../lib/blogData';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const post = BLOG_POSTS.find(p => p.slug === slug);
  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const bg = isDark ? 'var(--theme-bg)' : '#f8f6f0';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const text = isDark ? 'var(--theme-text)' : '#1a1a2e';
  const muted = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)';
  const gold = isDark ? '#c9a84c' : '#1a3a5c';

  if (!post) {
    return (
      <div style={{ background: bg, minHeight: '100vh', paddingTop: '120px', textAlign: 'center', color: text, fontFamily: 'Montserrat, sans-serif' }}>
        <h1>Article not found</h1>
        <Link href="/blog" style={{ color: gold }}>← Back to Blog</Link>
      </div>
    );
  }

  // Convert markdown-style content to HTML-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: text,
            marginTop: '48px',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: text,
            marginTop: '32px',
            marginBottom: '12px',
          }}>
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('| ')) {
        // Table row
        const cells = line.split('|').filter(c => c.trim() !== '');
        const isHeader = lines[i + 1]?.startsWith('|---');
        const isSeparator = line.includes('---');
        if (isSeparator) return null;
        return (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
            borderBottom: `1px solid ${border}`,
            background: isHeader ? (isDark ? 'rgba(201,168,76,0.08)' : 'rgba(26,58,92,0.06)') : 'transparent',
          }}>
            {cells.map((cell, j) => (
              <div key={j} style={{
                padding: '10px 14px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                color: isHeader ? gold : text,
                fontWeight: isHeader ? 700 : 400,
                borderRight: j < cells.length - 1 ? `1px solid ${border}` : 'none',
              }}>
                {cell.trim().replace(/\*\*(.*?)\*\*/g, '$1')}
              </div>
            ))}
          </div>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={i} style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '15px',
            color: muted,
            lineHeight: 1.8,
            marginBottom: '6px',
            paddingLeft: '8px',
          }}>
            {line.replace(/^[-*] /, '').replace(/\*\*(.*?)\*\*/g, '$1')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={i} style={{ height: '12px' }} />;
      }
      // Bold text replacement
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Link replacement [text](/url)
      const linkedLine = boldLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color:${gold};text-decoration:underline;">$1</a>`);
      return (
        <p key={i} style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '15px',
          color: muted,
          lineHeight: 1.9,
          marginBottom: '16px',
        }} dangerouslySetInnerHTML={{ __html: linkedLine }} />
      );
    });
  };

  return (
    <div style={{ background: bg, minHeight: '100vh', paddingTop: '90px' }}>
      <Navbar />
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        image: post.heroImage,
        datePublished: post.publishDate,
        author: { '@type': 'Organization', name: 'Oceanex' },
        publisher: { '@type': 'Organization', name: 'Oceanex', logo: { '@type': 'ImageObject', url: 'https://oceanex.com/logo.png' } },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      })}} />

      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(300px, 50vw, 520px)', overflow: 'hidden' }}>
        <img src={post.heroImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', padding: '0 24px', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: '#c9a84c',
            color: '#0a0a14',
            padding: '4px 16px',
            borderRadius: '20px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            {post.category}
          </span>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Meta */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: gold, fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 600, textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: muted }}>
            <Calendar size={13} /> {new Date(post.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: muted }}>
            <Clock size={13} /> {post.readTime}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px', marginTop: '16px' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '4px 12px',
              background: isDark ? 'rgba(201,168,76,0.1)' : 'rgba(26,58,92,0.07)',
              borderRadius: '20px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              color: gold,
              fontWeight: 600,
            }}>
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        {/* Article Content */}
        <div style={{ borderTop: `1px solid ${border}`, paddingTop: '40px' }}>
          {/* First table wrapper */}
          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <div style={{ border: `1px solid ${border}`, borderRadius: '8px', overflow: 'hidden' }}>
              {renderContent(post.content)}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section style={{ marginTop: '60px', marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: text,
            marginBottom: '32px',
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {post.faqs.map((faq, i) => (
              <div key={i} style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 600, color: text, lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <ChevronDown size={18} style={{ color: gold, flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: muted, lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        {post.relatedProduct && (
          <div style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)'
              : 'linear-gradient(135deg, rgba(26,58,92,0.08) 0%, rgba(26,58,92,0.02) 100%)',
            border: `1px solid ${isDark ? 'rgba(201,168,76,0.2)' : 'rgba(26,58,92,0.15)'}`,
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            marginBottom: '60px',
          }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: gold, marginBottom: '12px', fontWeight: 600 }}>
              Ready to Get Started?
            </p>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 700, color: text, marginBottom: '16px' }}>
              Explore the Oceanex Collection
            </h3>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: muted, marginBottom: '28px', lineHeight: 1.7 }}>
              Deploy in 8 minutes. Built to commercial standards. Ships worldwide in 5–7 days.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/shop">
                <button style={{
                  padding: '14px 32px',
                  background: gold,
                  color: isDark ? '#0a0a14' : '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  Shop Now <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/trade-portal">
                <button style={{
                  padding: '14px 32px',
                  background: 'transparent',
                  color: gold,
                  border: `1px solid ${gold}`,
                  borderRadius: '6px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}>
                  Trade Account
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Related Articles */}
      <section style={{ padding: '0 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ borderTop: `1px solid ${border}`, paddingTop: '60px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: text, marginBottom: '32px', textAlign: 'center' }}>
            More Articles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {related.map(rp => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                <article style={{
                  background: cardBg,
                  border: `1px solid ${border}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
                >
                  <img src={rp.heroImage} alt={rp.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: gold }}>
                      {rp.category}
                    </span>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 700, color: text, marginTop: '8px', marginBottom: '8px', lineHeight: 1.3 }}>
                      {rp.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: gold, fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700 }}>
                      Read <ArrowRight size={12} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
