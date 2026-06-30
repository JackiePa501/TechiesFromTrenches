import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target,
  FileText,
  Linkedin,
  ClipboardCheck,
  Compass,
  Users,
  MessagesSquare,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Monthly Career Strategy Session',
    description: 'One live implementation session focused on real career progress — not theory.',
    icon: Target,
  },
  {
    title: 'Professional CV Review',
    description: 'Personalized feedback to make your CV stand out for recruiters, scholarships, and global opportunities.',
    icon: FileText,
  },
  {
    title: 'LinkedIn Optimization',
    description: 'Improve your profile so recruiters and hiring managers can find and trust you.',
    icon: Linkedin,
  },
  {
    title: 'Monthly Career Check-in',
    description: 'Set goals, review progress, identify blockers, and leave with a clear action plan.',
    icon: ClipboardCheck,
  },
  {
    title: 'Exclusive Opportunity Roundup',
    description: 'Curated scholarships, internships, externships, fellowships, remote jobs, and competitions.',
    icon: Compass,
  },
  {
    title: 'Private Community',
    description: 'Connect with ambitious African tech talents building global careers.',
    icon: Users,
  },
  {
    title: 'Priority Q&A',
    description: 'Ask career questions anytime inside the community.',
    icon: MessagesSquare,
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.benefit-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
      id="benefits"
      ref={sectionRef}
      className="tft-section"
      style={{
        background:
          'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
      }}
    >
      <div className="tft-container">
        <div style={{ textAlign: 'center', maxWidth: '52ch', margin: '0 auto' }}>
          <span className="tft-eyebrow">What You Get</span>
          <h2
            className="tft-heading"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              lineHeight: 0.98,
              marginTop: '1rem',
            }}
          >
            A System for Global Career Growth
          </h2>
        </div>

        <div
          style={{
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="benefit-card tft-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    minWidth: '52px',
                    borderRadius: '14px',
                    background: 'rgba(76, 141, 255, 0.12)',
                    border: '1px solid rgba(76, 141, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={24} strokeWidth={1.75} color="var(--color-accent-2)" />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1875rem',
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
                      lineHeight: 1.65,
                      color: 'var(--color-text-muted)',
                      margin: '0.625rem 0 0 0',
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
