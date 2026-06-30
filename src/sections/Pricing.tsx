import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, X, Building2 } from 'lucide-react';

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
    savings: 'Save ₦21,000',
    features: [
      'Everything included',
      'Founding Member Badge',
      'Early access to future programs',
      'Private annual strategy session',
    ],
    extraFeatures: [],
    cta: 'Join Annually',
    highlighted: true,
  },
];

// YOUR DETAILS
const BANK_DETAILS = {
  bank: 'Opay MFB',
  accountNumber: '8051344074',
  accountName: 'Paul Jackson',
  whatsapp: '2348051344074', // international format, no "+"
};

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.pricing-animate'),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handlePaidConfirm = () => {
    if (!selectedPlan) return;
    const message = `Hello! I just made a payment of ${selectedPlan.price} for the *${selectedPlan.name} Plan*. Attached is my payment screenshot confirmation.`;
    const whatsappUrl = `https://wa.me/${BANK_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSelectedPlan(null);
  };

  return (
    <section id="pricing" ref={sectionRef} className="tft-section">
      <div className="tft-container">
        <div
          className="pricing-animate"
          style={{ textAlign: 'center', maxWidth: '52ch', margin: '0 auto', opacity: 0 }}
        >
          <span className="tft-eyebrow">Membership Plans</span>
          <h2
            className="tft-heading"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 0.98, marginTop: '1rem' }}
          >
            Choose Your Path
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              marginTop: '1rem',
            }}
          >
            Join 10 founding members. Lock in your rate forever.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '860px',
            margin: '3.5rem auto 0',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className="pricing-animate tft-card"
              style={{
                position: 'relative',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                opacity: 0,
                borderColor: plan.highlighted
                  ? 'var(--color-border-hover)'
                  : 'var(--color-card-border)',
                background: plan.highlighted
                  ? 'linear-gradient(180deg, rgba(76,141,255,0.10), rgba(255,255,255,0.04))'
                  : 'var(--color-card-bg)',
                boxShadow: plan.highlighted
                  ? '0 24px 60px rgba(76,141,255,0.16)'
                  : undefined,
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '1.75rem',
                    background: 'var(--color-accent)',
                    color: '#061226',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '8px',
                    boxShadow: '0 6px 18px rgba(76,141,255,0.35)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-2)',
                  margin: 0,
                }}
              >
                {plan.name}
              </h3>

              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontWeight: 400,
                    fontSize: '4rem',
                    letterSpacing: '0.01em',
                    lineHeight: 0.9,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {plan.period}
                </span>
              </div>

              {plan.subprice && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-secondary)',
                    margin: '0.5rem 0 0 0',
                  }}
                >
                  {plan.subprice}
                </p>
              )}

              {plan.savings && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    color: 'var(--color-accent-2)',
                    background: 'rgba(76,141,255,0.12)',
                    border: '1px solid rgba(76,141,255,0.25)',
                    borderRadius: '8px',
                    padding: '0.3rem 0.6rem',
                    marginTop: '0.875rem',
                  }}
                >
                  {plan.savings}
                </span>
              )}

              <div
                style={{
                  height: '1px',
                  background: 'var(--color-border)',
                  margin: '1.75rem 0',
                }}
              />

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.875rem',
                  flex: 1,
                }}
              >
                {plan.features.map((feature, fi) => (
                  <li
                    key={fi}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9375rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <Check
                      size={18}
                      strokeWidth={2.25}
                      color="var(--color-accent)"
                      style={{ minWidth: '18px', marginTop: '2px' }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`tft-btn ${plan.highlighted ? 'tft-btn-primary' : 'tft-btn-ghost'}`}
                onClick={() => setSelectedPlan(plan)}
                style={{ width: '100%', marginTop: '2rem' }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment modal — bank transfer + WhatsApp confirmation */}
      {selectedPlan && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 12, 20, 0.7)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '1.5rem',
          }}
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="tft-card"
            style={{
              padding: '2.5rem',
              maxWidth: '440px',
              width: '100%',
              textAlign: 'center',
              background: 'rgba(18, 27, 45, 0.92)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPlan(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                display: 'inline-flex',
              }}
            >
              <X size={20} />
            </button>

            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(76,141,255,0.12)',
                border: '1px solid rgba(76,141,255,0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Building2 size={24} strokeWidth={1.75} color="var(--color-accent-2)" />
            </div>

            <h3
              className="tft-heading"
              style={{ fontSize: '2rem', lineHeight: 1, margin: 0 }}
            >
              Complete Your Payment
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--color-text-secondary)',
                fontSize: '0.9375rem',
                margin: '0.75rem 0 1.5rem',
              }}
            >
              Transfer{' '}
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                {selectedPlan.price}
              </span>{' '}
              for your {selectedPlan.name} membership.
            </p>

            <div
              style={{
                background: 'var(--color-bg-primary)',
                padding: '1.25rem 1.5rem',
                borderRadius: '14px',
                textAlign: 'left',
                border: '1px solid var(--color-border)',
              }}
            >
              <Row label="BANK" value={BANK_DETAILS.bank} />
              <Row label="ACCOUNT NAME" value={BANK_DETAILS.accountName} />
              <div style={{ marginTop: '0.875rem' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
                  ACCOUNT NUMBER
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.75rem',
                      letterSpacing: '0.06em',
                      color: 'var(--color-accent-2)',
                    }}
                  >
                    {BANK_DETAILS.accountNumber}
                  </span>
                  <button
                    onClick={copyAccountNumber}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      color: 'var(--color-accent)',
                      background: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '0.3rem 0.6rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <button
              className="tft-btn tft-btn-primary"
              onClick={handlePaidConfirm}
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              I&apos;ve Paid — Send Receipt
            </button>
            <button
              onClick={() => setSelectedPlan(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                marginTop: '0.875rem',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: '0.875rem' }}>
      <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
        {label}
      </span>
      <div style={{ color: 'var(--color-text-primary)', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
        {value}
      </div>
    </div>
  );
}
