import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '80%', label: 'of tech talents struggle with positioning, not skill' },
  { value: '200+', label: 'average applications before a breakthrough' },
  { value: '3-5x', label: 'faster growth with accountability systems' },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.problem-animate'),
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

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{
        width: '100%',
        background: 'var(--color-bg-primary)',
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
        <div className="problem-animate">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-coral)',
            }}
          >
            The Problem
          </span>
          <h2
            className="tft-heading"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              lineHeight: 0.98,
              marginTop: '1rem',
              maxWidth: '16ch',
            }}
          >
            You Don&apos;t Need Another Course
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-component)',
            marginTop: '3rem',
          }}
        >
          {/* Left Column */}
          <div>
            <p
              className="problem-animate"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.25rem',
                lineHeight: 1.65,
                color: 'var(--color-text-secondary)',
              }}
            >
              Most people spend years learning random skills, collecting certificates,
              applying to hundreds of opportunities, and{' '}
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                getting rejected without knowing why.
              </span>
            </p>
            <p
              className="problem-animate"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.25rem',
                lineHeight: 1.65,
                color: 'var(--color-text-secondary)',
                marginTop: '1.25rem',
              }}
            >
              The difference between those who stay stuck and those who get global
              opportunities is often{' '}
              <span style={{ color: 'var(--color-accent-2)', fontWeight: 600 }}>
                positioning, accountability, and consistency.
              </span>
            </p>
            <div
              className="problem-animate tft-card"
              style={{
                marginTop: '2rem',
                padding: '1.75rem',
                background:
                  'linear-gradient(180deg, rgba(76,141,255,0.10), rgba(76,141,255,0.03))',
                borderColor: 'var(--color-border-hover)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  lineHeight: 1.3,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                That&apos;s exactly what this community is built to provide.
              </p>
            </div>
          </div>

          {/* Right Column - Stat Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="problem-animate tft-card"
                style={{
                  padding: 'var(--card-padding)',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontWeight: 400,
                    fontSize: '3.25rem',
                    letterSpacing: '0.01em',
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    marginTop: '0.75rem',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}