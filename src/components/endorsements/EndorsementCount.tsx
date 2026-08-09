import React, { useRef, useState } from 'react';
import { BadgeCheck, ChevronRight } from 'lucide-react';
import type { PublicEndorsement } from '../../lib/endorsementsApi';

interface EndorsementCountProps {
  skill: string;
  count: number;
  endorsements: PublicEndorsement[];
  onEndorse: () => void;
  onViewAll: () => void;
}

export const EndorsementCount: React.FC<EndorsementCountProps> = ({
  skill,
  count,
  endorsements,
  onEndorse,
  onViewAll,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const openPreview = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPreviewOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setPreviewOpen(false), 180);
  };

  const recent = endorsements.slice(0, 3);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2.5">
      {count > 0 && (
        <div
          className="relative"
          onMouseEnter={openPreview}
          onMouseLeave={scheduleClose}
        >
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-status-green/25 bg-status-green/10 px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-status-green transition-colors hover:bg-status-green/15"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-status-green" />
            Endorsed by {count} {count === 1 ? 'person' : 'people'}
          </button>

          {/* Hover preview popup */}
          {previewOpen && endorsements.length > 0 && (
            <div className="absolute left-0 top-full z-30 mt-2 w-72">
              <div className="glass rounded-xl border border-line p-4 shadow-lift">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                  Recent endorsers
                </p>
                <div className="mt-2 space-y-3">
                  {recent.map((e) => (
                    <div key={e.id} className="border-l-2 border-accent-gold/40 pl-3">
                      <p className="text-[12.5px] font-semibold text-ink">{e.name}</p>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
                        {e.role}
                      </p>
                      {e.compliment && (
                        <p className="mt-0.5 text-[11.5px] italic leading-snug text-inkSoft">
                          "{e.compliment}"
                        </p>
                      )}
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
      )}

      <button
        onClick={onEndorse}
        className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue/25 bg-accent-blue/8 px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-accent-blue transition-all duration-200 hover:-translate-y-px hover:border-accent-blue/50 hover:bg-accent-blue/15"
      >
        <BadgeCheck className="h-3 w-3" />
        Endorse {skill}
      </button>
    </div>
  );
};
