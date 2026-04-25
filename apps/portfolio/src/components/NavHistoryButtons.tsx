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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
