import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useEndorsements } from '../../hooks/useEndorsements';
import { EndorsementCount } from './EndorsementCount';
import { EndorsementModal } from './EndorsementModal';
import { EndorsementListModal } from './EndorsementListModal';

interface SkillEndorsementProps {
  skillName: string;
  initialCount?: number;
}

export const SkillEndorsement: React.FC<SkillEndorsementProps> = ({ skillName, initialCount = 0 }) => {
  const { count, endorsements, error, refresh } = useEndorsements(skillName, initialCount);
  const [modalOpen, setModalOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  return (
    <>
      <EndorsementCount
        skill={skillName}
        count={count}
        endorsements={endorsements}
        onEndorse={() => setModalOpen(true)}
        onViewAll={() => setListOpen(true)}
      />
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
            Endorsements unavailable
          </p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-blue transition-colors hover:text-accent-gold"
          >
            <RefreshCw className="h-2.5 w-2.5" />
            Retry
          </button>
        </div>
      )}
      <EndorsementModal
        open={modalOpen}
        skill={skillName}
        onClose={() => setModalOpen(false)}
        onSuccess={() => void refresh()}
      />
      <EndorsementListModal
        open={listOpen}
        skill={skillName}
        endorsements={endorsements}
        onClose={() => setListOpen(false)}
      />
    </>
  );
};
