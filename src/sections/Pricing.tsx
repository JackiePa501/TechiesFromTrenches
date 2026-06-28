import { /*useEffect*/useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  name: string;
  price: string;
  period: string;
  badge: string | null;
  badgeColor?: string;
  badgeTextColor?: string;
  savings: string | null;
  subprice?: string;
  features: string[];
  extraFeatures: string[];
  cta: string;
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    name: 'Monthly',
    price: '₦3,000',
    period: '/month',
    badge: null,
    savings: null,
    features: [
      'Full community access',
      'Monthly strategy session',
      'Career check-in',
      'CV review',
      'LinkedIn review',
      'Opportunity updates',
    ],
    extraFeatures: [],
    cta: 'Start Monthly',
    highlighted: false,
  },
  {
    name: 'Annual',
    price: '₦15,000',
    period: '/year',
    subprice: "That's only ₦1,250/month",
    badge: 'BEST VALUE',
    badgeColor: 'var(--color-accent-gold)',
    badgeTextColor: 'var(--color-bg-primary)',
    savings: 'Save ₦21,000',
    features: [
      'Everything included',
      'Founding Member Badge',
      'Early access to future programs',
      'Private annual strategy session',
    ],
    extraFeatures: [],
    cta: 'Join Annually',
    highlighted: true, // Set to true to highlight the annual plan
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // State for payment modal
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // YOUR DETAILS - Change these!
  const BANK_DETAILS = {
    bank: 'Opay MFB',
    accountNumber: '8051344074',
    accountName: 'Paul Jackson',
    whatsapp: '2348051344074', // Use international format without the "+" sign
  };

  const handleCtaClick = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handlePaidConfirm = () => {
    if (!selectedPlan) return;
    
    // Create pre-filled WhatsApp text URL encoded
    const message = `Hello! I just made a payment of ${selectedPlan.price} for the *${selectedPlan.name} Plan*. Attached is my payment screenshot confirmation.`;
    const whatsappUrl = `https://wa.me/${BANK_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSelectedPlan(null); // Close modal
  };

  /*useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.pricing-header'),
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

      // 3D Card flip animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: true,
        },
      });

      if (cardsRef.current[0]) {
        tl.from(
          cardsRef.current[0],
          { rotateX: 90, z: -1000, opacity: 0, duration: 1, ease: 'power1.out' },
          0
        );
      }
      if (cardsRef.current[1]) {
        tl.from(
          cardsRef.current[1],
          { rotateX: 90, z: -1000, opacity: 0, duration: 1.2, ease: 'power1.out' },
          0.3
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []); */

  return (
    <section
      id="pricing"
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
        <div style={{ textAlign: 'center' }}>
          <span
            className="pricing-header"
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
            Membership Plans
          </span>
          <h2
            className="pricing-header"
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
            Choose Your Path
          </h2>
          <p
            className="pricing-header"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              marginTop: '1rem',
              opacity: 0,
            }}
          >
            Join 10 founding members. Lock in your rate forever.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '4rem',
            perspective: '1000px',
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                position: 'relative',
                padding: '2.5rem',
                borderRadius: 'var(--card-radius)',
                background: 'var(--color-bg-secondary)',
                border: plan.highlighted
                  ? '1px solid rgba(212, 168, 83, 0.5)'
                  : '1px solid var(--color-border)',
                boxShadow: plan.highlighted
                  ? '0 0 40px rgba(212, 168, 83, 0.08)'
                  : 'none',
                transformStyle: 'preserve-3d',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = 'var(--color-border-hover)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = plan.highlighted
                  ? 'rgba(212, 168, 83, 0.5)'
                  : 'var(--color-border)';
              }}
            >
              <div>
                {plan.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '1.5rem',
                      background: plan.badgeColor,
                      color: plan.badgeTextColor || 'var(--color-text-primary)',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.375rem 0.875rem',
                      borderRadius: 'var(--button-radius, 4px)',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

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
                  {plan.name}
                </h3>

                <div style={{ marginTop: '1.5rem' }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '2.5rem',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {plan.period}
                  </span>
                  {plan.subprice && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                      {plan.subprice}
                    </div>
                  )}
                  {plan.savings && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-accent-gold)', marginTop: '0.25rem' }}>
                      {plan.savings}
                    </div>
                  )}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{ fontFamily: "'Inter', sans-serif", color: 'var(--color-text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-accent-gold)' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button at the bottom of each card */}
              <button
                onClick={() => handleCtaClick(plan)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '2rem',
                  borderRadius: 'var(--button-radius, 4px)',
                  background: plan.highlighted ? 'var(--color-accent-gold)' : 'transparent',
                  color: plan.highlighted ? 'var(--color-bg-primary)' : 'var(--color-text-primary)',
                  border: '1px solid var(--color-accent-gold)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Information Modal Overlay */}
      {selectedPlan && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={() => setSelectedPlan(null)}
        >
          <div
            style={{
              background: 'var(--color-bg-secondary, #1a1a1a)',
              padding: '2.5rem',
              borderRadius: 'var(--card-radius, 12px)',
              maxWidth: '450px',
              width: '90%',
              border: '1px solid var(--color-border, #333)',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()} // Keeps modal open when clicking inside
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--color-text-primary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Make Payment
            </h3>
            
            <p style={{ fontFamily: "'Inter', sans-serif", color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Transfer {selectedPlan.price} for your {selectedPlan.name} access.
            </p>

            {/* Account Details Box */}
            <div
              style={{
                background: 'var(--color-bg-primary, #111)',
                padding: '1.5rem',
                borderRadius: '8px',
                margin: '1.5rem 0',
                textAlign: 'left',
                border: '1px dashed var(--color-accent-gold)',
              }}
            >
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>BANK</span>
                <div style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{BANK_DETAILS.bank}</div>
              </div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ACCOUNT NUMBER</span>
                <div style={{ color: 'var(--color-accent-gold)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '1px' }}>
                  {BANK_DETAILS.accountNumber}
                </div>
              </div>
              
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ACCOUNT NAME</span>
                <div style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{BANK_DETAILS.accountName}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handlePaidConfirm}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--color-accent-gold)',
                color: 'var(--color-bg-primary)',
                border: 'none',
                borderRadius: 'var(--button-radius, 4px)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              I Have Paid (Send Receipt)
            </button>

            <button
              onClick={() => setSelectedPlan(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                marginTop: '1rem',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                display: 'block',
                width: '100%',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
