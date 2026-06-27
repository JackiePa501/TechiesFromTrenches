import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleCanvas from '@/components/ParticleCanvas';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('.hero-animate');
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3,
      }
    );
  }, []);

  const scrollTo = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id);
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)',
      }}
    >
      <ParticleCanvas />

      {/* Radial gradient overlay for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0.5) 50%, transparent 100%)',
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 var(--page-margin)',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow Badge */}
        <div
          className="hero-animate"
          style={{
            border: '1px solid rgba(212, 168, 83, 0.4)',
            borderRadius: 'var(--button-radius)',
            padding: '0.5rem 1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: 'var(--color-accent-gold)',
            boxShadow: '0 0 20px rgba(212,168,83,0.15)',
            marginBottom: '2rem',
            opacity: 0,
          }}
        >
          Limited to 10 Founding Members
        </div>

        {/* Headline */}
        <h1
          className="hero-animate"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-primary)',
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            maxWidth: '800px',
            margin: 0,
            opacity: 0,
          }}
        >
          Build a Global Career With a System That Works
        </h1>

        {/* Subheadline */}
        <p
          className="hero-animate"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            maxWidth: '560px',
            marginTop: '1.5rem',
            opacity: 0,
          }}
        >
          Stop collecting certificates. Start building systems, accountability, and
          consistency — the real difference between staying stuck and landing global
          opportunities.
        </p>

        {/* CTA Group */}
        <div
          className="hero-animate"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '2.5rem',
            justifyContent: 'center',
            opacity: 0,
          }}
        >
          <button
            onClick={() => scrollTo('#pricing')}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.02em',
              background: 'var(--color-accent-gold)',
              color: 'var(--color-bg-primary)',
              border: 'none',
              borderRadius: 'var(--button-radius)',
              padding: '1rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'var(--color-accent-gold-light)';
              el.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'var(--color-accent-gold)';
              el.style.transform = 'scale(1)';
            }}
          >
            Join Now — ₦5,000/month
          </button>
          <button
            onClick={() => scrollTo('#benefits')}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.02em',
              background: 'transparent',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-text-secondary)',
              borderRadius: 'var(--button-radius)',
              padding: '1rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--color-text-primary)';
              el.style.background = 'rgba(245,240,235,0.05)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--color-text-secondary)';
              el.style.background = 'transparent';
            }}
          >
            See Benefits
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollLineRef}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '24px',
            background: 'var(--color-text-muted)',
            borderRadius: '1px',
            animation: 'scrollPulse 2s ease infinite',
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(4px); }
          }
        `}</style>
      </div>
    </section>
  );
}