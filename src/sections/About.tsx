import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trustLogos = [
  'Google',
  'Mastercard Foundation',
  'Nexford University',
  'National Geographic Society',
  'Beats by Dre',
  'RevRoad',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.about-animate'),
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
      id="about"
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-component)',
            alignItems: 'center',
          }}
        >
          {/* Left Column - Photo */}
          <div className="about-animate" style={{ opacity: 0 }}>
            <img
              src="/images/founder-photo.jpg"
              alt="Paul - Founder of Techies From Trenches"
              style={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: 'var(--card-radius)',
                border: '2px solid var(--color-border)',
                display: 'block',
              }}
            />
          </div>

          {/* Right Column - Bio */}
          <div>
            <span
              className="about-animate"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-gold)',
                opacity: 0,
              }}
            >
              Your Guide
            </span>
            <h2
              className="about-animate"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                marginTop: '1rem',
                opacity: 0,
              }}
            >
              Paul Jackson
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '1.5rem',
              }}
            >
              <p
                className="about-animate"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                  opacity: 0,
                }}
              >
                I wrote JAMB four times. Started as a bricklaying apprentice. Through
                intentional positioning, I went on to earn scholarships, participate in
                international externships, and work with organizations including Google
                programs, the Mastercard Foundation, Nexford University, National
                Geographic Society, Beats by Dre, and RevRoad.
              </p>
              <p
                className="about-animate"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                  opacity: 0,
                }}
              >
                Today, I&apos;m helping African tech talents build systems — not just
                skills — to access global opportunities.
              </p>
            </div>

            <div
              className="about-animate"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginTop: '2rem',
                opacity: 0,
              }}
            >
              {trustLogos.map((logo, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    opacity: 0.5,
                  }}
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}