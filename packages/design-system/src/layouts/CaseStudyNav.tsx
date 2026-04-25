import type { ReactNode } from 'react';
import { Code2, User } from 'lucide-react';
import { Avatar } from '../components/Avatar';

export interface CaseStudyNavProps {
  avatarSrc?: string;
  avatarAlt?: string;
  /** Slot for the client-side back/forward buttons */
  historyButtons?: ReactNode;
}

export function CaseStudyNav({ avatarSrc, avatarAlt = 'Zoe Zhai', historyButtons }: CaseStudyNavProps) {
  return (
    <nav className="ds-cs-nav">
      {/* Left — avatar + history buttons slot */}
      <div className="ds-cs-nav__left">
        <a href="/" className="ds-cs-nav__avatar-link" aria-label="Home">
          <Avatar src={avatarSrc} alt={avatarAlt} size="xl" initials="ZZ" />
        </a>
        {historyButtons && (
          <div className="ds-cs-nav__history">{historyButtons}</div>
        )}
      </div>

      {/* Right — nav links */}
      <div className="ds-cs-nav__links">
        <a href="/work" className="ds-cs-nav__link">
          <Code2 size={16} aria-hidden="true" />
          Artifacts
        </a>
        <a href="/about" className="ds-cs-nav__link">
          <User size={16} aria-hidden="true" />
          About
        </a>
      </div>
    </nav>
  );
}
