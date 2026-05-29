'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  // Navbar bg: dark = navy, light = white
  const navBg = isDark ? '15,23,42' : '255,255,255';
  const shadowRgb = isDark ? '15,23,42' : '74,144,217';

  return (
    <>
      {/* ── Desktop ───────────────────────────────────────── */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300"
        style={{
          background: scrolled
            ? `rgba(${navBg}, 0.94)`
            : `rgba(${navBg}, 0.78)`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(74,144,217,0.18)',
          boxShadow: scrolled
            ? `0 8px 32px rgba(${shadowRgb}, 0.12)`
            : `0 4px 16px rgba(${shadowRgb}, 0.08)`,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        {/* <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 mr-2 font-bold text-base rounded-full"
          style={{ color: 'var(--primary)', fontFamily: 'var(--font-serif)' }}
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'var(--primary)' }}
          >
            E
          </span>
          EuroZiel
        </Link>

        <span className="w-px h-5 mr-2" style={{ background: 'var(--border)' }} aria-hidden="true" /> */}

        {/* Nav links */}
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
              style={{
                color: isActive ? 'var(--accent-gold-foreground)' : 'var(--muted-foreground)',
                background: isActive ? 'var(--accent-gold)' : 'transparent',
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (isActive) return;
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.background = 'rgba(74,144,217,0.08)';
              }}
              onMouseLeave={(e) => {
                if (isActive) return;
                e.currentTarget.style.color = 'var(--muted-foreground)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {label}
            </Link>
          );
        })}

        {/* CTA */}
        <Link
          href="#get-started"
          className="ml-2 px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
          style={{
            background: 'var(--accent-gold)',
            color: 'var(--accent-gold-foreground)',
            boxShadow: '0 2px 12px rgba(255,217,125,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-gold-hover)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,217,125,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent-gold)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,217,125,0.4)';
          }}
        >
          Get Started
        </Link>
      </nav>

      {/* ── Mobile navbar ─────────────────────────────────── */}
      <nav
        className="fixed top-4 left-4 right-4 z-50 flex md:hidden items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-300"
        style={{
          background: `rgba(${navBg}, 0.94)`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(74,144,217,0.18)',
          boxShadow: `0 4px 16px rgba(${shadowRgb}, 0.1)`,
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base"
          style={{ color: 'var(--primary)', fontFamily: 'var(--font-serif)' }}
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'var(--primary)' }}
          >
            E
          </span>
          EuroZiel
        </Link>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-1.5 rounded-lg"
        >
          {[
            menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            'none',
            menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
          ].map((transform, i) => (
            <span
              key={i}
              className="block h-0.5 w-5 rounded-full transition-all duration-300"
              style={{
                background: 'var(--foreground)',
                transform,
                opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: `rgba(${navBg}, 0.97)`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(74,144,217,0.18)',
          boxShadow: `0 8px 32px rgba(${shadowRgb}, 0.12)`,
          maxHeight: menuOpen ? '400px' : '0px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col p-3 gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.background = 'rgba(74,144,217,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted-foreground)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#get-started"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center"
            style={{
              background: 'var(--accent-gold)',
              color: 'var(--accent-gold-foreground)',
            }}
          >
            Get Started →
          </Link>
        </div>
      </div>
    </>
  );
}