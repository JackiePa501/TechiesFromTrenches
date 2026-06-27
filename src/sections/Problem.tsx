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
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginTop: '1rem',
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
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              Most people spend years learning random skills, collecting certificates,
              applying to hundreds of opportunities, and getting rejected without
              knowing why.
            </p>
            <p
              className="problem-animate"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
                marginTop: '1rem',
              }}
            >
              The difference between those who stay stuck and those who get global
              opportunities is often positioning, accountability, and consistency.
            </p>
            <div
              className="problem-animate"
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                background: 'rgba(224, 122, 95, 0.05)',
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
                className="problem-animate"
                style={{
                  padding: 'var(--card-padding)',
                  borderRadius: 'var(--card-radius)',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--color-border-hover)';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--color-border)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '2.5rem',
                    color: 'var(--color-accent-gold)',
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