import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 var(--page-margin)',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: visible ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
        backdropFilter: visible ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: visible ? 'blur(12px)' : 'none',
        borderBottom: visible ? '1px solid var(--color-border)' : '1px solid transparent',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => scrollTo('#hero')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          Techies From Trenches
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
        className="hidden md:flex"
      >
        {[
          { label: 'Problem', target: '#problem' },
          { label: 'Benefits', target: '#benefits' },
          { label: 'Pricing', target: '#pricing' },
          { label: 'About', target: '#about' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => scrollTo(item.target)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--color-text-secondary)';
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

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
          padding: '0.625rem 1.5rem',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
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
        Join Now
      </button>
    </nav>
  );
}