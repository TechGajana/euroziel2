'use client';

import { useEffect, useRef, CSSProperties, MouseEvent } from 'react';
import * as THREE from 'three';
import VANTA from 'vanta/dist/vanta.clouds.min';

interface VantaEffect {
  destroy: () => void;
}

export default function Hero() {
  const vantaRef = useRef<HTMLElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    if (!vantaRef.current || vantaEffect.current) return;

    vantaEffect.current = VANTA({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200,
      minWidth: 200,
      scale: 1.0,

      // Aligned to your brand: --primary: #4a90d9, --background dark: #0f172a
      skyColor: 0x4a90d9,        // matches your --primary exactly
      cloudColor: 0xffffff,      // white clouds
      cloudShadowColor: 0x0f172a, // matches your dark --background
      sunColor: 0xff9f00,
      sunGlareColor: 0xffd97d,
      sunlightColor: 0xffeebb,

      speed: 0.8,
      quantity: 3,
      texturePath: 'https://www.vantajs.com/gallery/noise.png',
    });

    return () => {
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  // ── All styles now use your globals.css CSS variables ──────────────────

  const gradientStyle: CSSProperties = {
    height: '45%',
    background:
      'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.4) 55%, transparent 100%)',
    // rgba values match your --background: #0f172a (15,23,42)
  };

  const buildingWrapStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    maxWidth: '100vw',
  };

  const buildingImgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    objectPosition: 'bottom',
  };

  const eyebrowStyle: CSSProperties = {
    background: 'rgba(74,144,217,0.2)',   // --primary at 20% opacity
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(74,144,217,0.4)', // --primary at 40% opacity
    letterSpacing: '0.15em',
    color: '#ffffff',
  };

  const headingStyle: CSSProperties = {
    textShadow: '0 2px 20px rgba(15,23,42,0.6)',
  };

  const accentStyle: CSSProperties = {
    color: 'var(--primary)',   // your --primary: #4a90d9
  };

  const subtitleStyle: CSSProperties = {
    color: 'rgba(248,250,252,0.82)', // --foreground dark at 82% opacity
    textShadow: '0 1px 8px rgba(15,23,42,0.4)',
  };

  const primaryBtnStyle: CSSProperties = {
    background: 'var(--primary)',             // #4a90d9
    color: 'var(--primary-foreground)',       // #ffffff
    boxShadow: '0 4px 24px rgba(74,144,217,0.45)',
  };

  const secondaryBtnStyle: CSSProperties = {
    background: 'rgba(255,255,255,0.12)',
    color: 'var(--primary-foreground)',       // #ffffff
    border: '1px solid rgba(255,255,255,0.35)',
    backdropFilter: 'blur(8px)',
  };

  const handlePrimaryEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--primary-hover)'; // #357abd
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 8px 32px rgba(74,144,217,0.6)';
  };

  const handlePrimaryLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--primary)';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 24px rgba(74,144,217,0.45)';
  };

  const handleSecondaryEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
  };

  const handleSecondaryLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
  };

  return (
    <section className="relative h-screen flex items-end justify-center overflow-hidden">
      <section ref={vantaRef} className="absolute top-[-200px] inset-0 z-0 h-[100%]" />

      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={gradientStyle}
      />

      <div
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none"
        style={buildingWrapStyle}
      >
        <img
          src="/images/home/hero/university1.png"
          alt=""
          aria-hidden="true"
          style={buildingImgStyle}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-yellow backdrop-blur-sm bg-opacity-30 pointer-events-none" />

      <div className="relative z-30 text-center text-white px-6 pb-20 max-w-4xl mx-auto">
        <span
          className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full"
          style={eyebrowStyle}
        >
          India → Germany
        </span>

        <h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={headingStyle}
        >
          Your bridge from India to Germany,{' '}
          <span style={accentStyle}>built by people already there.</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={subtitleStyle}>
          Personalised guidance, real experiences, zero gatekeeping.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <a
            href="#get-started"
            className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-full transition-all duration-300"
            style={primaryBtnStyle}
            onMouseEnter={handlePrimaryEnter}
            onMouseLeave={handlePrimaryLeave}
          >
            Get Started Now →
          </a>

          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-full transition-all duration-300"
            style={secondaryBtnStyle}
            onMouseEnter={handleSecondaryEnter}
            onMouseLeave={handleSecondaryLeave}
          >
            See How It Works
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60"
        aria-hidden="true"
      >
        <span className="text-white uppercase tracking-widest" style={{ fontSize: '10px' }}>
          Scroll
        </span>
        <span className="text-white animate-bounce" style={{ fontSize: '18px' }}>↓</span>
      </div>
    </section>
  );
}