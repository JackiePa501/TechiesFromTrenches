export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        background: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-border)',
        padding: '2rem var(--page-margin)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            color: 'var(--color-text-muted)',
          }}
        >
          &copy; 2026 Techies From Trenches. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            color: 'var(--color-text-muted)',
          }}
        >
          Global Talent Circle
        </span>
      </div>
    </footer>
  );
}