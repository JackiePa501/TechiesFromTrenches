import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: '🎯',
    title: 'Monthly Career Strategy Session',
    description: 'One live implementation session focused on real career progress — not theory.',
  },
  {
    icon: '📄',
    title: 'Professional CV Review',
    description: 'Personalized feedback to make your CV stand out for recruiters, scholarships, and global opportunities.',
  },
  {
    icon: '💼',
    title: 'LinkedIn Optimization',
    description: 'Improve your profile so recruiters and hiring managers can find and trust you.',
  },
  {
    icon: '📈',
    title: 'Monthly Career Check-in',
    description: 'Set goals, review progress, identify blockers, and leave with a clear action plan.',
  },
  {
    icon: '🌍',
    title: 'Exclusive Opportunity Roundup',
    description: 'Curated scholarships, internships, externships, fellowships, remote jobs, and competitions.',
  },
  {
    icon: '🤝',
    title: 'Private Community',
    description: 'Connect with ambitious African tech talents building global careers.',
  },
  {
    icon: '❓',
    title: 'Priority Q&A',
    description: 'Ask career questions anytime inside the community.',
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.benefit-row'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
      id="benefits"
      ref={sectionRef}
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
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
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-gold)',
            }}
          >
            What You Get
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
            A System for Global Career Growth
          </h2>
        </div>

        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-component)',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                opacity: 0,
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  minWidth: '48px',
                  borderRadius: '50%',
                  background: 'rgba(212, 168, 83, 0.1)',
                  border: '1px solid rgba(212, 168, 83, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {benefit.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.3,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    margin: '0.5rem 0 0 0',
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .benefit-row {
            flex-direction: row !important;
          }
        }
      `}</style>
    </section>
  );
}