'use client';

export function NavHistoryButtons() {
  return (
    <>
      <button
        className="ds-cs-nav__icon-btn"
        onClick={() => window.history.back()}
        aria-label="Back"
        type="button"
      >
        <ArrowLeft />
      </button>
      <button
        className="ds-cs-nav__icon-btn"
        onClick={() => window.history.forward()}
        aria-label="Forward"
        type="button"
      >
        <ArrowRight />
      </button>
    </>
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
