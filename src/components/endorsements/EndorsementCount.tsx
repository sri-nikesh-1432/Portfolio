import React, { useRef, useState } from 'react';
import { BadgeCheck, ChevronRight, Users } from 'lucide-react';
import type { PublicEndorsement } from '../../lib/endorsementsApi';

interface EndorsementCountProps {
  skill: string;
  count: number;
  endorsements: PublicEndorsement[];
  onViewAll: () => void;
}

export const EndorsementCount: React.FC<EndorsementCountProps> = ({
  skill,
  count,
  endorsements,
  onViewAll,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const openPreview = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPreviewOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setPreviewOpen(false), 200);
  };

  if (count <= 0) return null;

  const recent = endorsements.slice(0, 3);

  return (
    <div className="relative" onMouseEnter={openPreview} onMouseLeave={scheduleClose}>
      <button
        onClick={onViewAll}
        className="inline-flex items-center gap-1.5 rounded-full border border-status-green/30 bg-status-green/10 px-3 py-1.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-status-green transition-all duration-200 hover:-translate-y-px hover:border-status-green/50 hover:bg-status-green/15"
        aria-label={`View endorsements for ${skill}`}
      >
        <Users className="h-3 w-3" />
        Endorsed by {count} {count === 1 ? 'person' : 'people'}
      </button>

      {/* Premium hover tooltip — name, role and endorsed skill only.
          Emails and suggestions stay private. */}
      {previewOpen && endorsements.length > 0 && (
        <div className="absolute bottom-full left-1/2 z-30 mb-3 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2">
          <div className="glass rounded-xl border border-accent-gold/30 p-4 shadow-lift">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
              Endorsed by
            </p>
            <div className="mt-2 space-y-3">
              {recent.map((e) => (
                <div key={e.id} className="border-l-2 border-accent-gold/45 pl-3">
                  <p className="text-[13px] font-semibold text-ink">{e.name}</p>
                  <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
                    {e.role}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-inkSoft">
                    <BadgeCheck className="h-3 w-3 text-faint" />
                    Endorsed: {skill}
                  </p>
                </div>
              ))}
            </div>
            {endorsements.length > 3 && (
              <button
                onClick={onViewAll}
                className="mt-3 inline-flex items-center gap-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-accent-blue transition-colors hover:text-accent-gold"
              >
                View all endorsements
                <ChevronRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
