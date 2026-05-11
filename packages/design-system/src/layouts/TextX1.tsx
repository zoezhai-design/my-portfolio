export interface TextX1Props {
  title?: string;
  body?: string;
}

export function TextX1({ title, body }: TextX1Props) {
  return (
    <section className="ds-text ds-text--x1">
      {title && <p className="ds-text__title">{title}</p>}
      {body  && <p className="ds-text__body">{body}</p>}
    </section>
  );
}
