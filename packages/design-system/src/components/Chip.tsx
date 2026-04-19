import type { ReactNode } from 'react';

export interface ChipProps {
  label: string;
  icon?: ReactNode;
}

export function Chip({ label, icon }: ChipProps) {
  return (
    <span className="ds-chip">
      {icon && <span className="ds-chip__icon">{icon}</span>}
      {label}
    </span>
  );
}
