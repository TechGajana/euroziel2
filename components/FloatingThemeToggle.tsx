// components/FloatingThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

export default function FloatingThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read initial theme from <html> on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    setIsDark(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    // Fix: Set the theme directly based on next state
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Avoid hydration flash — render nothing until mounted
  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-6 right-6 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,217,125,0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.2)'
          : '1px solid rgba(255,217,125,0.5)',
        boxShadow: isDark
          ? '0 4px 20px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(255,217,125,0.35)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 8px 28px rgba(0,0,0,0.4)'
          : '0 8px 28px rgba(255,217,125,0.55)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 4px 20px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(255,217,125,0.35)';
      }}
    >
      <span
        className="transition-all duration-500"
        style={{
          fontSize: '20px',
          display: 'block',
          transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      >
        {isDark ? (
          // Moon - shown in dark mode (text is light, background is dark)
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun - shown in light mode (text is dark, background is light)
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffd97d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1"  x2="12" y2="3"  />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1"  y1="12" x2="3"  y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
          </svg>
        )}
      </span>
    </button>
  );
}