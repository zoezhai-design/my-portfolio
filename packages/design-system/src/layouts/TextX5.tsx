export interface TextX5Section {
  subtitle?: string;
  body?: string;
}

export interface TextX5Props {
  title?: string;
  sections: [TextX5Section, TextX5Section, TextX5Section, TextX5Section, TextX5Section];
}

export function TextX5({ title, sections }: TextX5Props) {
  return (
    <section className="ds-text ds-text--x5">
      {title && <p className="ds-text__title">{title}</p>}
      {sections.map((s, i) => (
        <div key={i} className="ds-text__section">
          {s.subtitle && <p className="ds-text__subtitle">{s.subtitle}</p>}
          {s.body     && <p className="ds-text__body">{s.body}</p>}
        </div>
      ))}
    </section>
  );
}
