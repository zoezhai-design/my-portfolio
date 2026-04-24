'use client';
import { Avatar } from '../components/Avatar';

export interface CaseStudyNavProps {
  avatarSrc?: string;
  avatarAlt?: string;
}

export function CaseStudyNav({ avatarSrc, avatarAlt = 'Zoe Zhai' }: CaseStudyNavProps) {
  return (
    <nav className="ds-cs-nav">
      {/* Left — avatar + history buttons */}
      <div className="ds-cs-nav__left">
        <a href="/" className="ds-cs-nav__avatar-link" aria-label="Home">
          <Avatar src={avatarSrc} alt={avatarAlt} size="medium" initials="ZZ" />
        </a>
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
      </div>

      {/* Right — nav links */}
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
