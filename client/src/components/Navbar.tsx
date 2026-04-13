// OCEANEX NAVBAR
// Design: Deep navy dark mode, cream light mode
// Logo: White (dark mode) | Blue original (light mode)
// Progressive reveal: desktop = mousemove trigger | mobile/tablet = first scroll trigger
// Portals: Subtle trade/agent links, prominent DTC CTAs

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Menu, X, Sun, Moon, ChevronDown, Briefcase, Users, Compass, Wind, ChevronLeft, LayoutDashboard, Globe, Anchor, Palmtree } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage, LANGUAGES } from '@/contexts/LanguageContext';

const WHITE_LOGO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/logooceanexwhite_570fc119.png';
const BLUE_LOGO  = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/oceanex-logo-4k_55ba7efe.png';

const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Shop', href: '/shop' },
  { label: 'How It Works', href: '/how-it-works', badge: '▶ Video' },
  { label: '360° Tours', href: '/virtual-tours', badge: '360°' },
  { label: 'Blog', href: '/blog' },
  { label: 'Press', href: '/press' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navRevealed, setNavRevealed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, currentLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { count: totalItems } = useCart();
  const [location] = useLocation();
  const isDark = theme === 'dark';
  const revealedRef = useRef(false);

  const isHome = location === '/';
  const isTransparent = isHome && !scrolled;

  // Page label map for breadcrumb back-nav
  const PAGE_LABELS: Record<string, string> = {
    '/products': 'Products',
    '/shop': 'Shop',
    '/how-it-works': 'How It Works',
    '/virtual-tours': '360° Virtual Tours',
    '/blog': 'Blog',
    '/about': 'About',
    '/contact': 'Contact',
    '/trade-portal': 'Trade Portal',
    '/agents-portal': 'Agents Portal',
    '/checkout': 'Checkout',
    '/portals': 'Portals',
  };
  const pageLabel = PAGE_LABELS[location] || (location.startsWith('/blog/') ? 'Article' : null);
  const showBreadcrumb = !isHome && !!pageLabel;

  useEffect(() => {
    // On inner pages: always revealed immediately
    if (!isHome) {
      setNavRevealed(true);
      revealedRef.current = true;
      return;
    }

    // Reset when returning to homepage — hide nav until user scrolls
    revealedRef.current = false;
    setNavRevealed(false);
    setScrolled(false);

    const reveal = () => {
      if (!revealedRef.current) {
        revealedRef.current = true;
        setNavRevealed(true);
      }
    };

    // Reveal threshold: 80% of viewport height (past the hero)
    const REVEAL_THRESHOLD = window.innerHeight * 0.8;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Reveal nav once user has scrolled past the hero on ALL devices
      if (y > REVEAL_THRESHOLD) reveal();
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Set initial state in case page is already scrolled (e.g. refresh mid-page)
    if (window.scrollY > REVEAL_THRESHOLD) {
      setScrolled(window.scrollY > 60);
      reveal();
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHome]);

  useEffect(() => { setMobileOpen(false); setPortalOpen(false); setSolutionsOpen(false); setLangOpen(false); }, [location]);

  // Transparent on homepage hero, solid when scrolled or on other pages
  const navBg = isTransparent
    ? 'transparent'
    : isDark
      ? 'rgba(4,14,30,0.97)'
      : 'rgba(255,255,255,0.97)';

  const borderColor = isTransparent
    ? 'rgba(255,255,255,0.1)'
    : isDark ? 'rgba(212,175,55,0.15)' : 'rgba(0,48,87,0.12)';

  const linkColor = isTransparent
    ? 'rgba(255,255,255,0.92)'
    : isDark ? '#e8e0d0' : '#003057';

  const logoSrc = isTransparent ? WHITE_LOGO : isDark ? WHITE_LOGO : BLUE_LOGO;

  // Shared reveal style for nav groups
  const revealStyle = {
    opacity: navRevealed ? 1 : 0,
    transform: navRevealed ? 'translateY(0)' : 'translateY(-6px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
    pointerEvents: (navRevealed ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
  };

  return (
    <>
      <nav
        className={navRevealed ? 'nav-revealed' : undefined}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: navBg,
          backdropFilter: isTransparent ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(20px)',
          borderBottom: `1px solid ${borderColor}`,
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
          padding: '0 0',
        }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '72px',
        }}>

          {/* Logo — always visible */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}>
            <img
              src={logoSrc}
              alt="Oceanex"
              style={{ height: '44px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          {/* Desktop Nav Links — revealed on mousemove or scroll */}
          <div
            className="desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', ...revealStyle }}
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: location === link.href ? '#d4af37' : linkColor,
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: location === link.href ? '600' : '400',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  borderBottom: location === link.href ? '2px solid #d4af37' : '2px solid transparent',
                  paddingBottom: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  position: 'relative',
                }}
              >
                {link.href === '/virtual-tours' && <Compass size={13} style={{ color: '#d4af37', flexShrink: 0 }} />}
                {link.href === '/how-it-works' && <Wind size={13} style={{ color: '#d4af37', flexShrink: 0 }} />}
                {link.label}
                {link.badge && (
                  <span style={{
                    fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.05em',
                    padding: '2px 5px', borderRadius: '3px',
                    background: link.href === '/virtual-tours'
                      ? (isDark ? 'rgba(212,175,55,0.2)' : 'rgba(0,48,87,0.12)')
                      : 'rgba(201,169,97,0.15)',
                    color: isDark ? '#d4af37' : '#003057',
                    border: `1px solid ${isDark ? 'rgba(212,175,55,0.35)' : 'rgba(0,48,87,0.2)'}`,
                    lineHeight: 1, textTransform: 'uppercase',
                  }}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Solutions dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setSolutionsOpen(!solutionsOpen); setPortalOpen(false); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: linkColor, fontSize: '0.75rem', fontWeight: '400',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '4px 0', transition: 'color 0.3s',
                }}
              >
                Solutions <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: solutionsOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              {solutionsOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, marginTop: '8px',
                  background: isDark ? '#040e1e' : '#ffffff',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px', overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  minWidth: '220px', zIndex: 100,
                }}>
                  <Link href="/lp/cruise" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 20px', textDecoration: 'none',
                    color: linkColor, fontSize: '0.875rem',
                    borderBottom: `1px solid ${borderColor}`, cursor: 'pointer',
                  }} onClick={() => setSolutionsOpen(false)}>
                    <Anchor size={16} style={{ color: isDark ? '#d4af37' : '#003057' }} />
                    Cruise Lines
                  </Link>
                  <Link href="/lp/resort-pro" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 20px', textDecoration: 'none',
                    color: linkColor, fontSize: '0.875rem', cursor: 'pointer',
                  }} onClick={() => setSolutionsOpen(false)}>
                    <Palmtree size={16} style={{ color: isDark ? '#d4af37' : '#003057' }} />
                    Resort Operators
                  </Link>
                </div>
              )}
            </div>

            {/* Portals dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setPortalOpen(!portalOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: linkColor, fontSize: '0.75rem', fontWeight: '400',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '4px 0', transition: 'color 0.3s',
                }}
              >
                Portals <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: portalOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              {portalOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                  background: isDark ? '#040e1e' : '#ffffff',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px', overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  minWidth: '200px', zIndex: 100,
                }}>
                  <Link href="/trade-portal" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 20px', textDecoration: 'none',
                    color: linkColor, fontSize: '0.875rem',
                    borderBottom: `1px solid ${borderColor}`, cursor: 'pointer',
                  }} onClick={() => setPortalOpen(false)}>
                    <Briefcase size={16} style={{ color: isDark ? '#d4af37' : '#003057' }} />
                    Trade Portal
                  </Link>
                  <Link href="/agents-portal" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 20px', textDecoration: 'none',
                    color: linkColor, fontSize: '0.875rem', cursor: 'pointer',
                    borderBottom: `1px solid ${borderColor}`,
                  }} onClick={() => setPortalOpen(false)}>
                    <Users size={16} style={{ color: isDark ? '#d4af37' : '#003057' }} />
                    Agents Portal
                  </Link>
                  <Link href="/dashboard" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 20px', textDecoration: 'none',
                    color: isDark ? '#d4af37' : '#003057', fontSize: '0.875rem', cursor: 'pointer',
                    fontWeight: 700,
                  }} onClick={() => setPortalOpen(false)}>
                    <LayoutDashboard size={16} style={{ color: isDark ? '#d4af37' : '#003057' }} />
                    Operator Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right CTAs — revealed with slight delay for stagger feel */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              opacity: navRevealed ? 1 : 0,
              transform: navRevealed ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 0.4s ease 0.06s, transform 0.4s ease 0.06s',
              pointerEvents: navRevealed ? 'auto' : 'none',
            }}
          >
            {/* Language switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: linkColor, padding: '6px 8px', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em',
                  transition: 'background 0.2s',
                }}
                aria-label="Change language"
              >
                <Globe size={15} />
                <span style={{ fontSize: '0.85rem' }}>{currentLang.flag}</span>
              </button>
              {langOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                  background: isDark ? '#040e1e' : '#ffffff',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px', overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  minWidth: '160px', zIndex: 200,
                  maxHeight: '320px', overflowY: 'auto',
                }}>
                  {LANGUAGES.map((l, i) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        width: '100%', padding: '11px 16px',
                        background: lang === l.code ? (isDark ? 'rgba(212,175,55,0.12)' : 'rgba(0,48,87,0.07)') : 'transparent',
                        border: 'none',
                        borderBottom: i < LANGUAGES.length - 1 ? `1px solid ${borderColor}` : 'none',
                        color: lang === l.code ? (isDark ? '#d4af37' : '#003057') : linkColor,
                        fontSize: '0.82rem', fontWeight: lang === l.code ? 700 : 400,
                        cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{l.flag}</span>
                      {l.nativeLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggleTheme}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: linkColor, padding: '6px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', transition: 'background 0.2s',
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/shop" style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <ShoppingCart size={20} style={{ color: linkColor }} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: isDark ? '#d4af37' : '#003057',
                  color: isDark ? '#040e1e' : '#ffffff',
                  borderRadius: '50%', width: '18px', height: '18px',
                  fontSize: '10px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {totalItems}
                </span>
              )}
            </Link>

            <a href="https://calendly.com/hello-oceanex/30min" target="_blank" rel="noopener noreferrer" style={{
              position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg, #c9a961 0%, #f0d080 40%, #e8c96a 60%, #c9a961 100%)',
              backgroundSize: '300% 300%',
              color: '#0a0c14',
              border: 'none',
              padding: '10px 22px', borderRadius: '4px',
              textDecoration: 'none', fontSize: '0.7rem',
              fontWeight: '800', letterSpacing: '0.14em',
              textTransform: 'uppercase', cursor: 'pointer',
              whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '7px',
              boxShadow: '0 4px 22px rgba(201,169,97,0.55), 0 1px 0 rgba(255,255,255,0.3) inset',
              animation: 'navCtaShimmer 3s ease-in-out infinite, navCtaPulse 2.5s ease-in-out infinite',
            }}>
              <span style={{ position: 'relative', zIndex: 1 }}>Book a Trade Call</span>
              <span style={{ position: 'relative', zIndex: 1, fontSize: '1rem', lineHeight: 1 }}>&#8594;</span>
            </a>
          </div>

          {/* Mobile/tablet: icons + hamburger — revealed on first scroll */}
          <div
            className="mobile-nav"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: navRevealed ? 1 : 0,
              transform: navRevealed ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              pointerEvents: navRevealed ? 'auto' : 'none',
            }}
          >
            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: linkColor, padding: '6px', display: 'flex' }}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/shop" style={{ position: 'relative', display: 'flex', cursor: 'pointer' }}>
              <ShoppingCart size={20} style={{ color: linkColor }} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: isDark ? '#d4af37' : '#003057',
                  color: isDark ? '#040e1e' : '#ffffff',
                  borderRadius: '50%', width: '16px', height: '16px',
                  fontSize: '9px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: linkColor, padding: '6px', display: 'flex' }}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay-enter"
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: isDark ? '#040e1e' : '#ffffff',
            display: 'flex', flexDirection: 'column',
            paddingTop: '80px', paddingLeft: '2rem', paddingRight: '2rem',
            overflowY: 'auto',
          }}>
          {/* Mobile overlay header: logo + close */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <img src={logoSrc} alt="Oceanex" style={{ height: '36px', width: 'auto' }} />
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${borderColor}`,
                borderRadius: '50%',
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: linkColor,
              }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} style={{
              color: linkColor, textDecoration: 'none',
              fontSize: '1.4rem', fontWeight: '300', letterSpacing: '0.05em',
              padding: '1rem 0',
              borderBottom: `1px solid ${borderColor}`,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              {link.href === '/virtual-tours' && <Compass size={20} style={{ color: isDark ? '#d4af37' : '#003057', flexShrink: 0 }} />}
              {link.href === '/how-it-works' && <Wind size={20} style={{ color: isDark ? '#d4af37' : '#003057', flexShrink: 0 }} />}
              {link.label}
              {link.badge && (
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700,
                  padding: '2px 7px', borderRadius: '3px',
                  background: isDark ? 'rgba(212,175,55,0.2)' : 'rgba(0,48,87,0.1)',
                  color: isDark ? '#d4af37' : '#003057',
                  border: `1px solid ${isDark ? 'rgba(212,175,55,0.3)' : 'rgba(0,48,87,0.2)'}`,
                  letterSpacing: '0.05em',
                }}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <Link href="/lp/cruise" style={{
            color: linkColor, textDecoration: 'none',
            fontSize: '1.4rem', fontWeight: '300', letterSpacing: '0.05em',
            padding: '1rem 0', borderBottom: `1px solid ${borderColor}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <Anchor size={20} style={{ color: isDark ? '#d4af37' : '#003057' }} /> Cruise Lines
          </Link>
          <Link href="/lp/resort-pro" style={{
            color: linkColor, textDecoration: 'none',
            fontSize: '1.4rem', fontWeight: '300', letterSpacing: '0.05em',
            padding: '1rem 0', borderBottom: `1px solid ${borderColor}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <Palmtree size={20} style={{ color: isDark ? '#d4af37' : '#003057' }} /> Resort Operators
          </Link>
          <Link href="/trade-portal" style={{
            color: linkColor, textDecoration: 'none',
            fontSize: '1.4rem', fontWeight: '300', letterSpacing: '0.05em',
            padding: '1rem 0', borderBottom: `1px solid ${borderColor}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <Briefcase size={20} style={{ color: isDark ? '#d4af37' : '#003057' }} /> Trade Portal
          </Link>
          <Link href="/agents-portal" style={{
            color: linkColor, textDecoration: 'none',
            fontSize: '1.4rem', fontWeight: '300', letterSpacing: '0.05em',
            padding: '1rem 0', borderBottom: `1px solid ${borderColor}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <Users size={20} style={{ color: isDark ? '#d4af37' : '#003057' }} /> Agents Portal
          </Link>
          <Link href="/dashboard" style={{
            color: isDark ? '#d4af37' : '#003057', textDecoration: 'none',
            fontSize: '1.4rem', fontWeight: '700', letterSpacing: '0.05em',
            padding: '1rem 0', borderBottom: `1px solid ${borderColor}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <LayoutDashboard size={20} style={{ color: isDark ? '#d4af37' : '#003057' }} /> Operator Dashboard
          </Link>
          <a href="https://calendly.com/hello-oceanex/30min" target="_blank" rel="noopener noreferrer" style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg, #c9a961 0%, #f0d080 40%, #e8c96a 60%, #c9a961 100%)',
            backgroundSize: '300% 300%',
            color: '#0a0c14',
            padding: '18px 32px', borderRadius: '4px',
            textDecoration: 'none', fontSize: '1rem',
            fontWeight: '800', letterSpacing: '0.12em',
            textTransform: 'uppercase', cursor: 'pointer',
            textAlign: 'center', display: 'block',
            boxShadow: '0 6px 30px rgba(201,169,97,0.5)',
            animation: 'navCtaShimmer 3s ease-in-out infinite',
          }}>
            Book a Trade Call &#8594;
          </a>
        </div>
      )}

      {/* Breadcrumb back-nav bar — shown on all inner pages */}
      {showBreadcrumb && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          zIndex: 999,
          background: isDark ? 'rgba(4,14,30,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '0 1.5rem',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            textDecoration: 'none',
            color: isDark ? 'rgba(212,175,55,0.8)' : '#003057',
            fontSize: '0.68rem',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}>
            <ChevronLeft size={13} />
            Home
          </Link>
          <span style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', fontSize: '0.65rem' }}>/</span>
          <span style={{
            color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,48,87,0.5)',
            fontSize: '0.68rem',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>{pageLabel}</span>
        </div>
      )}

      <style>{`
        @keyframes navCtaShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes navCtaPulse {
          0%, 100% { box-shadow: 0 4px 22px rgba(201,169,97,0.55), 0 1px 0 rgba(255,255,255,0.3) inset; }
          50% { box-shadow: 0 6px 36px rgba(201,169,97,0.8), 0 0 0 3px rgba(201,169,97,0.2), 0 1px 0 rgba(255,255,255,0.3) inset; }
        }
        @keyframes navSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes mobileOverlayIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .nav-revealed {
          animation: navSlideDown 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .mobile-overlay-enter {
          animation: mobileOverlayIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (max-width: 1280px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
        @media (min-width: 1281px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
