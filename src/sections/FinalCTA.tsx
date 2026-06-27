import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function FinalCTA({ lenisRef }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.cta-animate'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#pricing');
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 var(--page-margin)',
          textAlign: 'center',
        }}
      >
        <h2
          className="cta-animate"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            opacity: 0,
          }}
        >
          Your Career Won&apos;t Change Because You Learned More
        </h2>
        <p
          className="cta-animate"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            marginTop: '1.5rem',
            opacity: 0,
          }}
        >
          It changes when you consistently implement the right things. Join Techies
          From Trenches — Global Talent Circle today.
        </p>
        <button
          className="cta-animate"
          onClick={scrollToPricing}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0.02em',
            background: 'var(--color-accent-gold)',
            color: 'var(--color-bg-primary)',
            border: 'none',
            borderRadius: 'var(--button-radius)',
            padding: '1rem 2.5rem',
            marginTop: '2.5rem',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = 'var(--color-accent-gold-light)';
            el.style.transform = 'scale(1.03)';
            el.style.boxShadow = '0 8px 32px rgba(212,168,83,0.25)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = 'var(--color-accent-gold)';
            el.style.transform = 'scale(1)';
            el.style.boxShadow = 'none';
          }}
        >
          Become a Founding Member
        </button>
        <p
          className="cta-animate"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-coral)',
            marginTop: '1.5rem',
            opacity: 0,
          }}
        >
          Only 10 founding spots available.
        </p>
      </div>
    </section>
  );
}