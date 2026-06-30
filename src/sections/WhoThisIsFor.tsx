import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const personas = [
  'Students',
  'Career Switchers',
  'Early Career Professionals',
  'Product Managers',
  'Cloud Engineers',
  'Developers',
  'Designers',
  'Data Analysts',
];

export default function WhoThisIsFor() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.persona-animate'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
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

  return (
    <section
      id="who"
      ref={sectionRef}
      style={{
        width: '100%',
        background: 'var(--color-bg-secondary)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--page-margin)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span
            className="persona-animate"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-coral)',
              opacity: 0,
            }}
          >
            Who This Is For
          </span>
          <h2
            className="persona-animate tft-heading"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              lineHeight: 0.98,
              marginTop: '1rem',
              opacity: 0,
            }}
          >
            Ambitious African Tech Talents
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '3rem',
          }}
        >
          {personas.map((persona, i) => (
            <div
              key={i}
              className="persona-animate tft-card"
              style={{
                padding: '1.5rem',
                cursor: 'default',
                opacity: 0,
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9px',
                  background: 'rgba(76, 141, 255, 0.12)',
                  border: '1px solid rgba(76, 141, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.875rem',
                }}
              >
                <Check size={16} strokeWidth={2.25} color="var(--color-accent-2)" />
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.0625rem',
                  lineHeight: 1.3,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {persona}
              </h3>
            </div>
          ))}
        </div>

        <p
          className="persona-animate"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            marginTop: '2rem',
            fontStyle: 'italic',
            opacity: 0,
          }}
        >
          Anyone serious about building a global career in tech.
        </p>
      </div>
    </section>
  );
}