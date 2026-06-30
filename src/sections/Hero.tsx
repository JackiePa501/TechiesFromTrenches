import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('.hero-animate');
    gsap.fromTo(
      els,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.2,
      }
    );
  }, []);

  const scrollTo = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Subtle mesh + grid backdrop (replaces particle field) */}
      <div className="tft-mesh-bg" style={{ zIndex: 0 }} />
      <div className="tft-grid-bg" style={{ zIndex: 0 }} />

      <div
        ref={contentRef}
        className="tft-container"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          paddingTop: '8rem',
          paddingBottom: '5rem',
        }}
      >
        {/* Copy */}
        <div
          className="hero-copy"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            className="hero-animate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card-bg)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderRadius: 'var(--button-radius)',
              padding: '0.5rem 0.9rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-2)',
              opacity: 0,
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                boxShadow: '0 0 10px var(--color-accent)',
              }}
            />
            Limited to 10 Founding Members
          </div>

          <h1
            className="hero-animate"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.92,
              letterSpacing: '0.01em',
              color: 'var(--color-text-primary)',
              maxWidth: '14ch',
              margin: '1.75rem 0 0 0',
              opacity: 0,
            }}
          >
            Build a Global Career With a System That Works
          </h1>

          <p
            className="hero-animate"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '52ch',
              marginTop: '1.5rem',
              opacity: 0,
            }}
          >
            Stop collecting certificates. Start building systems, accountability, and
            consistency — the real difference between staying stuck and landing global
            opportunities.
          </p>

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
              className="tft-btn tft-btn-primary"
              onClick={() => scrollTo('#pricing')}
            >
              Join Now — ₦3,000/month
            </button>
            <button
              className="tft-btn tft-btn-ghost"
              onClick={() => scrollTo('#benefits')}
            >
              See Benefits
            </button>
          </div>

          <p
            className="hero-animate"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginTop: '2.5rem',
              lineHeight: 1.8,
              opacity: 0,
            }}
          >
            Built on experience across Google&nbsp;programs · Mastercard&nbsp;Foundation ·
            National&nbsp;Geographic&nbsp;Society
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '2px',
            height: '26px',
            background: 'var(--color-text-muted)',
            borderRadius: '1px',
            animation: 'scrollPulse 2s ease infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}
