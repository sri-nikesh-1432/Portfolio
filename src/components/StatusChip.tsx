import React from 'react';

type StatusTone = 'green' | 'amber' | 'red' | 'blue' | 'violet' | 'slate';

const tones: Record<StatusTone, { text: string; bg: string; dot: string }> = {
  green: { text: 'text-status-green', bg: 'bg-status-green/10 border-status-green/25', dot: 'bg-status-green' },
  amber: { text: 'text-status-amber', bg: 'bg-status-amber/10 border-status-amber/25', dot: 'bg-status-amber' },
  red: { text: 'text-status-red', bg: 'bg-status-red/10 border-status-red/25', dot: 'bg-status-red' },
  blue: { text: 'text-accent-blue', bg: 'bg-accent-blue/10 border-accent-blue/25', dot: 'bg-accent-blue' },
  violet: { text: 'text-accent-lavender', bg: 'bg-accent-lavender/10 border-accent-lavender/25', dot: 'bg-accent-lavender' },
  slate: { text: 'text-muted', bg: 'bg-ink/5 border-ink/10', dot: 'bg-muted' },
};

interface StatusChipProps {
  label: string;
  tone?: StatusTone;
  pulse?: boolean;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ label, tone = 'slate', pulse = false, className = '' }) => {
  const t = tones[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${t.text} ${t.bg} ${className}`}
    >
      <span className={`relative flex h-1.5 w-1.5`}>
        {pulse && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${t.dot}`} />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${t.dot}`} />
      </span>
      {label}
    </span>
  );
};

export const toneForStatus = (status: string): StatusTone => {
  const s = status.toUpperCase();
  if (s.includes('COMPLETED')) return 'green';
  if (s.includes('RESEARCH')) return 'red';
  if (s.includes('EXPERIMENT')) return 'violet';
  if (s.includes('PLANNED')) return 'slate';
  return 'amber';
};
