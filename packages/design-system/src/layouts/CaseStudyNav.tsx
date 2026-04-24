'use client';

export interface CaseStudyNavProps {
  addressLabel?: string;
}

export function CaseStudyNav({ addressLabel = 'ZoeZhai.com @ 2026' }: CaseStudyNavProps) {
  return (
    <nav className="ds-cs-nav">
      {/* Back / Forward */}
      <div className="ds-cs-nav__history">
        <button
          className="ds-cs-nav__icon-btn"
          onClick={() => history.back()}
          aria-label="Back"
          type="button"
        >
          <ArrowLeft />
        </button>
        <button
          className="ds-cs-nav__icon-btn"
          onClick={() => history.forward()}
          aria-label="Forward"
          type="button"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Address bar */}
      <div className="ds-cs-nav__address" aria-label="Site address">
        <LockIcon />
        <span className="ds-cs-nav__address-text">{addressLabel}</span>
      </div>

      {/* Nav links */}
      <div className="ds-cs-nav__links">
        <a href="/work" className="ds-cs-nav__link">Artifacts</a>
        <a href="/about" className="ds-cs-nav__link">About</a>
      </div>
    </nav>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
