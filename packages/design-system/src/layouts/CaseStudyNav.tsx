export interface CaseStudyNavProps {
  onBack?: () => void;
  onForward?: () => void;
  searchPlaceholder?: string;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
}

export function CaseStudyNav({
  onBack,
  onForward,
  searchPlaceholder = 'Search…',
  primaryAction,
  secondaryAction,
}: CaseStudyNavProps) {
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

      <div className="ds-cs-nav__search">
        <input
          className="ds-cs-nav__input"
          type="search"
          placeholder={searchPlaceholder}
        />
      </div>

      <div className="ds-cs-nav__actions">
        {primaryAction && (
          <button className="ds-cs-nav__btn ds-cs-nav__btn--primary" onClick={primaryAction.onClick} type="button">
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button className="ds-cs-nav__btn ds-cs-nav__btn--secondary" onClick={secondaryAction.onClick} type="button">
            {secondaryAction.label}
          </button>
        )}
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
