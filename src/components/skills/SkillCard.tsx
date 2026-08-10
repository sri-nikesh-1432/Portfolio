import React, { useState } from 'react';
import { BadgeCheck, ChevronRight, RefreshCw } from 'lucide-react';
import type { SkillItem } from '../../types';
import { useEndorsements } from '../../hooks/useEndorsements';
import { EndorsementCount } from '../endorsements/EndorsementCount';
import { EndorsementModal } from '../endorsements/EndorsementModal';
import { EndorsementListModal } from '../endorsements/EndorsementListModal';
import { SkillLogo } from './SkillLogo';
import { SkillDetailModal } from './SkillDetailModal';

interface SkillCardProps {
  skill: SkillItem;
  initialCount?: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, initialCount = 0 }) => {
  const { count, endorsements, error, refresh } = useEndorsements(skill.name, initialCount);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  return (
    <>
      <div
        className="skill-card group flex h-full cursor-pointer flex-col items-center rounded-3xl p-6 text-center"
        onClick={() => setDetailOpen(true)}
      >
        <SkillLogo skill={skill.name} />

        <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-gold">
          {skill.name}
        </h3>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
          {skill.fullName}
        </p>
        <p className="mt-2 flex items-center gap-1 text-[10.5px] font-medium text-accent-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Click for details
          <ChevronRight className="h-3 w-3" />
        </p>

        <div className="mt-3 flex flex-1 flex-col items-center justify-end gap-3">
          {error && (
            <button
              type="button"
              onClick={() => void refresh()}
              className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-blue transition-colors hover:text-accent-gold"
            >
              <RefreshCw className="h-2.5 w-2.5" />
              Endorsements unavailable — retry
            </button>
          )}

          <EndorsementCount
            skill={skill.name}
            count={count}
            endorsements={endorsements}
            onViewAll={() => setListOpen(true)}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-wooddark px-5 py-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Endorse Skill
            <BadgeCheck className="h-3.5 w-3.5 text-accent-gold transition-transform group-hover:scale-110" />
          </button>
        </div>

        <SkillDetailModal skill={skill} open={detailOpen} onClose={() => setDetailOpen(false)} />
        <EndorsementModal
          open={modalOpen}
          skill={skill.name}
          onClose={() => setModalOpen(false)}
          onSuccess={() => void refresh()}
        />
        <EndorsementListModal
          open={listOpen}
          skill={skill.name}
          endorsements={endorsements}
          onClose={() => setListOpen(false)}
        />
      </div>
    </>
  );
};
