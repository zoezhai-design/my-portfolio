export interface TextX2Section {
  subtitle?: string;
  body?: string;
}

export interface TextX2Props {
  title?: string;
  sections: [TextX2Section, TextX2Section];
}

export function TextX2({ title, sections }: TextX2Props) {
  return (
    <section className="ds-text ds-text--x2">
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
