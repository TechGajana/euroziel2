// components/FloatingNavbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {/* ── Desktop navbar ─────────────────────────────────── */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(var(--navbar-bg-rgb), 0.92)'
            : 'rgba(var(--navbar-bg-rgb), 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(74,144,217,0.18)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(var(--shadow-color-rgb), 0.12)'
            : '0 4px 16px rgba(var(--shadow-color-rgb), 0.08)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 mr-2 font-bold text-base rounded-full transition-colors duration-200"
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

        {/* Divider */}
        <span
          className="w-px h-5 mr-2"
          style={{ background: 'var(--border)' }}
          aria-hidden="true"
        />

        {/* Nav links */}
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                color: isActive ? 'var(--accent-gold)' : 'var(--muted-foreground)',
                background: isActive ? 'var(--accent-gold-foreground)' : 'transparent',
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

        {/* CTA button — gold instead of primary blue */}
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
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,217,125,0.6)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent-gold)';
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,217,125,0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Get Started
        </Link>
      </nav>

      {/* ── Mobile navbar ──────────────────────────────────── */}
      <nav
        className="fixed top-4 left-4 right-4 z-50 flex md:hidden items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-300"
        style={{
          background: 'rgba(var(--navbar-bg-rgb), 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(74,144,217,0.18)',
          boxShadow: '0 4px 16px rgba(var(--shadow-color-rgb), 0.1)',
        }}
      >
        {/* Mobile logo */}
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

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-1.5 rounded-lg transition-colors duration-200"
          style={{ color: 'var(--foreground)' }}
        >
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{
              background: 'var(--foreground)',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{
              background: 'var(--foreground)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{
              background: 'var(--foreground)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(var(--navbar-bg-rgb), 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(74,144,217,0.18)',
          boxShadow: '0 8px 32px rgba(var(--shadow-color-rgb), 0.12)',
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
            className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200"
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            Get Started →
          </Link>
        </div>
      </div>
    </>
  );
}