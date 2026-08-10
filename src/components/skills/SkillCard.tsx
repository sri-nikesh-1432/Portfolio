import React, { useState } from 'react';
import { BadgeCheck, RefreshCw } from 'lucide-react';
import { useEndorsements } from '../../hooks/useEndorsements';
import { EndorsementCount } from '../endorsements/EndorsementCount';
import { EndorsementModal } from '../endorsements/EndorsementModal';
import { EndorsementListModal } from '../endorsements/EndorsementListModal';
import { SkillLogo } from './SkillLogo';

interface SkillCardProps {
  skill: { name: string; level?: number; note: string };
  initialCount?: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, initialCount = 0 }) => {
  const { count, endorsements, error, refresh } = useEndorsements(skill.name, initialCount);
  const [modalOpen, setModalOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  return (
    <div className="skill-card flex h-full flex-col items-center rounded-3xl p-6 text-center">
      <SkillLogo skill={skill.name} />

      <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight text-ink">
        {skill.name}
      </h3>
      {skill.note && (
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted line-clamp-2">{skill.note}</p>
      )}

      <div className="mt-4 flex flex-1 flex-col items-center justify-end gap-3">
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
          onClick={() => setModalOpen(true)}
          className="holo-sheen group inline-flex items-center gap-2 rounded-xl bg-wooddark px-5 py-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
        >
          Endorse Skill
          <BadgeCheck className="h-3.5 w-3.5 text-accent-gold transition-transform group-hover:scale-110" />
        </button>
      </div>

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
  );
};
