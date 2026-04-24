import type { ReactNode } from 'react';

export interface CaseStudyHeaderLabel {
  name: string;
  value: string;
}

export interface CaseStudyHeaderProps {
  projectNumber?: string;
  title: string;
  description: string;
  labels?: CaseStudyHeaderLabel[];
  children?: ReactNode;
}

export function CaseStudyHeader({
  projectNumber,
  title,
  description,
  labels = [],
  children,
}: CaseStudyHeaderProps) {
  return (
    <section className="ds-cs-header">
      {/* Title row */}
      <div className="ds-cs-header__title-row">
        <div className="ds-cs-header__title-body">
          {projectNumber && (
            <span className="ds-cs-header__project-number">{projectNumber}</span>
          )}
          <h1 className="ds-cs-header__title">{title}</h1>
        </div>
        <p className="ds-cs-header__description">{description}</p>
      </div>

      {/* Content area */}
      <div className="ds-cs-header__content">
        {labels.length > 0 && (
          <div className="ds-cs-header__labels">
            {labels.map((l) => (
              <div key={l.name} className="ds-cs-header__label">
                <span className="ds-cs-header__label-name">{l.name}</span>
                <span className="ds-cs-header__label-value">{l.value}</span>
              </div>
            ))}
          </div>
        )}
        {children && <div className="ds-cs-header__body">{children}</div>}
      </div>
    </section>
  );
}
