import React, { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { SkillCard } from '../components/skills/SkillCard';
import { SKILLS } from '../data/portfolioData';
import { fetchAllEndorsementCounts } from '../lib/endorsementsApi';

export const Skills: React.FC = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetchAllEndorsementCounts()
      .then((data) => {
        if (!cancelled) setCounts(data);
      })
      .catch(() => {
        /* endorsement counts are optional decoration */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Skills"
        title={<>The technologies I work with — endorsed by peers.</>}
        description="Click any skill to see the associated experience. Know one of them? Endorse it and it becomes real social proof."
      />

      <Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {SKILLS.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              initialCount={counts[skill.name] ?? 0}
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
};
