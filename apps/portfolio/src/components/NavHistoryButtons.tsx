'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export function NavHistoryButtons() {
  return (
    <>
      <button
        className="ds-cs-nav__icon-btn"
        onClick={() => window.history.back()}
        aria-label="Back"
        type="button"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        className="ds-cs-nav__icon-btn"
        onClick={() => window.history.forward()}
        aria-label="Forward"
        type="button"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </>
  );
}
