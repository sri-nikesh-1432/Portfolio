import React from 'react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { SKILLS } from '../data/portfolioData';

const starCount = (level: number) => level;

export const Skills: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Skills"
        title={<>The stack I build intelligent systems with.</>}
        description="Categorized across programming, AI & ML, frameworks, and cloud — each with an honest self-assessed proficiency."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {SKILLS.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 80}>
            <section className="glass glass-hover holo-border h-full rounded-3xl p-7">
              <p className="eyebrow text-accent-blue">{cat.category}</p>
              <div className="mt-5 space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[13.5px] font-medium text-ink">{skill.name}</p>
                      <span className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className={`h-1.5 w-3 rounded-sm ${
                              n <= starCount(skill.level ?? 0)
                                ? 'bg-gradient-to-r from-accent-blue to-accent-teal'
                                : 'bg-ink/8'
                            }`}
                          />
                        ))}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-muted">{skill.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
