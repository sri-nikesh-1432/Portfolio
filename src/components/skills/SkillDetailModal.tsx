import React, { useEffect } from 'react';
import { BadgeCheck } from 'lucide-react';
import type { SkillItem } from '../../types';
import { SkillLogo } from './SkillLogo';
import { EndorsementModal } from '../endorsements/EndorsementModal';
import { EndorsementCount } from '../endorsements/EndorsementCount';
import { useEndorsements } from '../../hooks/useEndorsements';

interface Props {
  skill: SkillItem;
  open: boolean;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<Props> = ({ skill, open, onClose }) => {
  const { count, endorsements, refresh } = useEndorsements(skill.name, 0);
  const [endorseOpen, setEndorseOpen] = React.useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-2 backdrop-blur-sm sm:p-4"
        onClick={onClose}
      >
        <div
          className="flex h-[calc(100dvh-16px)] w-[calc(100vw-16px)] max-w-[640px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-48px)] sm:w-[min(640px,calc(100vw-32px))]"
          role="dialog"
          aria-modal="true"
          aria-label={skill.fullName}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-line bg-gradient-to-r from-[#F6F1E7] to-white px-4 py-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="h-3.5 w-3.5 rounded-full bg-[#E05555] transition-colors hover:bg-[#C33B3B]"
                aria-label="Close"
              />
              <span className="h-3.5 w-3.5 rounded-full bg-[#E0B04A]" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#5EC45E]" />
            </div>
            <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              {skill.fullName}
            </span>
          </div>

          <div className="endorse-scroll min-h-0 flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center text-center">
              <SkillLogo skill={skill.name} />
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
                {skill.fullName}
              </h2>
              <div className="mt-3">
                <EndorsementCount
                  skill={skill.name}
                  count={count}
                  endorsements={endorsements}
                  onViewAll={() => {}}
                />
              </div>
              <button
                onClick={() => setEndorseOpen(true)}
                className="holo-sheen mt-4 inline-flex items-center gap-2 rounded-xl bg-wooddark px-6 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Endorse Skill
                <BadgeCheck className="h-3.5 w-3.5 text-accent-gold" />
              </button>
            </div>

            <div className="mt-8">
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                Associated Experience
              </h3>
              {skill.experience.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {skill.experience.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-line bg-white/70 p-4 transition-colors hover:border-accent-gold/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-gold to-accent-copper font-mono text-[10px] font-semibold text-white">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[13.5px] leading-relaxed text-ink">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-[13.5px] italic text-muted">
                  No specific experience listed for this skill yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <EndorsementModal
        open={endorseOpen}
        skill={skill.name}
        onClose={() => setEndorseOpen(false)}
        onSuccess={() => void refresh()}
      />
    </>
  );
};
