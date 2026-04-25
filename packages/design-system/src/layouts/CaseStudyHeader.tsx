import { Image } from '../components/Image';

export interface CaseStudyHeaderTeam {
  role?: string;
  collaboration?: string[];
  org?: string;
}

export interface CaseStudyHeaderProps {
  projectNumber?: string;
  title: string;
  description?: string;
  projectType?: string;
  date?: string;
  client?: string;
  impactText?: string;
  team?: CaseStudyHeaderTeam;
  imageSrc?: string;
  imageAlt?: string;
}

export function CaseStudyHeader({
  projectNumber,
  title,
  description,
  projectType,
  date,
  client,
  impactText,
  team,
  imageSrc,
  imageAlt = '',
}: CaseStudyHeaderProps) {
  return (
    <section className="ds-cs-header">
      {/* Title row — border-top */}
      <div className="ds-cs-header__title-row">
        <div className="ds-cs-header__title-body">
          {projectNumber && <span className="ds-cs-header__project-number">{projectNumber}</span>}
          <h1 className="ds-cs-header__title">{title}</h1>
        </div>
        {description && <p className="ds-cs-header__description">{description}</p>}
      </div>

      {/* Content — 4-col label header + body */}
      <div className="ds-cs-header__content">
        {/* 4-column label row */}
        <div className="ds-cs-header__label-row">
          <div className="ds-cs-header__label-col">
            <span className="ds-cs-header__label-name">Project Type</span>
          </div>
          <div className="ds-cs-header__label-col">
            <span className="ds-cs-header__label-name">Date</span>
          </div>
          <div className="ds-cs-header__label-col">
            <span className="ds-cs-header__label-name">Impact</span>
          </div>
          <div className="ds-cs-header__label-col">
            <span className="ds-cs-header__label-name">Team</span>
          </div>
        </div>

        {/* Body — left: client/date + image, right: impact + team */}
        <div className="ds-cs-header__body">
          {/* Left half */}
          <div className="ds-cs-header__body-left">
            <div className="ds-cs-header__meta-row">
              <div className="ds-cs-header__meta-col">
                <span className="ds-cs-header__meta-value">{client ?? projectType}</span>
              </div>
              <div className="ds-cs-header__meta-col">
                <span className="ds-cs-header__meta-value">{date}</span>
              </div>
            </div>
            <div className="ds-cs-header__image">
              <Image src={imageSrc} alt={imageAlt} />
            </div>
          </div>

          {/* Right half */}
          <div className="ds-cs-header__body-right">
            {impactText && (
              <div className="ds-cs-header__impact">
                <p className="ds-cs-header__impact-text">{impactText}</p>
              </div>
            )}
            {team && (
              <div className="ds-cs-header__team">
                {team.role && (
                  <div className="ds-cs-header__team-section">
                    <span className="ds-cs-header__label-name">Role</span>
                    <span className="ds-cs-header__meta-value">{team.role}</span>
                  </div>
                )}
                {team.collaboration && team.collaboration.length > 0 && (
                  <div className="ds-cs-header__team-section">
                    <span className="ds-cs-header__label-name">Collaboration</span>
                    {team.collaboration.map((name) => (
                      <span key={name} className="ds-cs-header__meta-value">{name}</span>
                    ))}
                  </div>
                )}
                {team.org && (
                  <div className="ds-cs-header__team-section">
                    <span className="ds-cs-header__label-name">Org</span>
                    <span className="ds-cs-header__meta-value">{team.org}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
