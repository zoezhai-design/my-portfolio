export interface CaseStudyNavProps {
  onBack?: () => void;
  onForward?: () => void;
}

export function CaseStudyNav({ onBack, onForward }: CaseStudyNavProps) {
  return (
    <nav className="ds-cs-nav">
      <div className="ds-cs-nav__history">
        <button
          className="ds-cs-nav__icon-btn"
          onClick={onBack}
          aria-label="Back"
          type="button"
        >
          <ArrowLeft />
        </button>
        <button
          className="ds-cs-nav__icon-btn"
          onClick={onForward}
          aria-label="Forward"
          type="button"
        >
          <ArrowRight />
        </button>
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
