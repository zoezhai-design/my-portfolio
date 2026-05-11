export interface TextX4Column {
  subtitle?: string;
  body?: string;
}

export interface TextX4Props {
  title?: string;
  columns: [TextX4Column, TextX4Column, TextX4Column, TextX4Column];
}

export function TextX4({ title, columns }: TextX4Props) {
  return (
    <section className="ds-text ds-text--x4">
      {title && <p className="ds-text__title">{title}</p>}
      <div className="ds-text__row">
        {columns.map((col, i) =>
          col.subtitle
            ? <p key={i} className="ds-text__subtitle">{col.subtitle}</p>
            : <span key={i} />
        )}
      </div>
      <div className="ds-text__row">
        {columns.map((col, i) =>
          col.body
            ? <p key={i} className="ds-text__body">{col.body}</p>
            : <span key={i} />
        )}
      </div>
    </section>
  );
}
