'use client';

import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/work',  label: 'Work'  },
  { href: '/about', label: 'About' },
  { href: '/craft', label: 'Craft' },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="ds-nav">
      <a href="/" className="ds-nav__logo">Zoe Zhai</a>

      <div className="ds-nav__links">
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href || pathname?.startsWith(href + '/');
          return (
            <a
              key={href}
              href={href}
              className={`ds-nav__link${active ? ' ds-nav__link--active' : ''}`}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
