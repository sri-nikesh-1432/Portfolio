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
        title={<>The stack I build intelligent systems with.</>}
        description="Categorized across programming, AI & ML, frameworks, and cloud — the technologies behind every system on this portfolio. Know one of them? Endorse it and it becomes real social proof."
      />

      {SKILLS.map((cat, i) => (
        <Reveal key={cat.id} delay={(i % 2) * 90}>
          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/50" />
              <p className="eyebrow text-[#8A5A2B]">{cat.category}</p>
              <span className="inline-block h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/50" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {cat.skills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  initialCount={counts[skill.name] ?? 0}
                />
              ))}
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
};
