import React from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, className = '', color }) => {
  const clamp = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</span>
          <span className="font-mono text-[11px] font-semibold text-ink">{clamp}%</span>
        </div>
      )}
      <div className="relative h-1.5 overflow-hidden rounded-full bg-ink/8">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color ?? 'bg-gradient-to-r from-accent-blue to-accent-teal'}`}
          style={{ width: `${clamp}%` }}
        />
      </div>
    </div>
  );
};
