import React from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { StatusChip } from '../components/StatusChip';
import { EXPERIENCE, PERSONAL } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Experience"
        title={<>Internships and education that shaped how I build.</>}
        description="Real engineering exposure — from voice AI at Venixa to AI development at VISWAM.AI / IIIT Hyderabad, grounded in a B.Tech in AI & Machine Learning."
      />

      <div className="relative">
        <span className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-blue via-accent-lavender to-accent-gold sm:left-[23px]" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 100}>
              <div className="relative flex gap-5 sm:gap-7">
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white shadow-card sm:h-12 sm:w-12 ${
                    exp.type === 'education' ? 'text-accent-gold' : 'text-accent-blue'
                  }`}
                >
                  {exp.type === 'education' ? (
                    <GraduationCap className="h-5 w-5" />
                  ) : (
                    <Briefcase className="h-5 w-5" />
                  )}
                </span>

                <article className="glass glass-hover flex-1 rounded-2xl p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-medium text-ink">{exp.role}</h3>
                      <p className="mt-0.5 text-[13.5px] font-medium text-accent-blue">{exp.company}</p>
                    </div>
                    <StatusChip
                      label={
                        exp.current
                          ? 'Current'
                          : exp.type === 'internship'
                            ? 'Internship'
                            : exp.type === 'education'
                              ? 'Education'
                              : 'Work'
                      }
                      tone={exp.current ? 'green' : exp.type === 'internship' ? 'blue' : 'amber'}
                      pulse={exp.current}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    <span>{exp.period}</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> {exp.location}
                    </span>
                    {exp.orgUnit && <span className="text-faint">· {exp.orgUnit}</span>}
                  </div>

                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-inkSoft">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-white/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Education summary card */}
      <Reveal>
        <div className="glass holo-border grid gap-6 rounded-3xl p-7 md:grid-cols-3 md:p-9">
          <div>
            <p className="eyebrow text-accent-gold">Education</p>
            <h3 className="mt-3 font-display text-xl font-medium leading-snug text-ink">
              {PERSONAL.education.degree}
            </h3>
          </div>
          <div className="space-y-3">
            <p className="text-[14px] text-inkSoft">{PERSONAL.education.college}</p>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              {PERSONAL.education.period}
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 md:items-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Current CGPA</p>
            <p className="font-display text-4xl font-medium text-ink">
              <span className="holo-text">{PERSONAL.education.cgpa}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
