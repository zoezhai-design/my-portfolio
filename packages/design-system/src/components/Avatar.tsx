export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  initials?: string;
}

const SIZE_PX: Record<NonNullable<AvatarProps['size']>, number> = {
  small:  24,
  medium: 32,
  large:  40,
  xl:     48,
};

export function Avatar({ src, alt = '', size = 'medium', initials }: AvatarProps) {
  const px = SIZE_PX[size];
  return (
    <div
      className={`ds-avatar ds-avatar--${size}`}
      style={{ width: px, height: px }}
      aria-label={alt || initials}
    >
      {src ? (
        <img src={src} alt={alt} className="ds-avatar__img" />
      ) : (
        <span className="ds-avatar__initials">{initials ?? ''}</span>
      )}
    </div>
  );
}
