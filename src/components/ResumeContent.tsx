import React from 'react';
import {
  BUILDING_PROJECTS,
  CERTIFICATIONS,
  COMPLETED_SYSTEMS,
  EXPERIENCE,
  MUSIC,
  PERSONAL,
  RESEARCH,
  SKILLS,
} from '../data/portfolioData';

/* ------------------------------------------------------------------ */
/*  ATS-friendly, LaTeX-style resume body (single column, selectable)  */
/* ------------------------------------------------------------------ */

const SKILL_SECTIONS: { heading: string; category: string }[] = [
  { heading: 'Programming', category: 'Programming' },
  { heading: 'AI / ML', category: 'AI & ML' },
  { heading: 'Frameworks', category: 'Frameworks & Stack' },
  { heading: 'Tools / Platforms', category: 'Cloud, Models & Tools' },
];

const skillLineFor = (category: string): string => {
  const match =
    SKILLS.find((c) => c.category === category) ??
    SKILLS.find((c) => c.category.toLowerCase().includes(category.toLowerCase()));
  return match ? match.skills.map((s) => s.name).join(', ') : '';
};

const shortUrl = (url: string): string => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="mt-7 border-b-2 border-ink pb-1 text-[12.5px] font-bold uppercase tracking-[0.14em] text-ink">
    {children}
  </h2>
);

export const ResumeContent: React.FC = () => {
  const education = EXPERIENCE.find((e) => e.type === 'education');
  const workExperience = EXPERIENCE.filter((e) => e.type !== 'education');

  return (
    <div className="resume-doc bg-white px-8 py-10 text-ink md:px-12 md:py-12">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-[26px] font-bold tracking-tight text-ink">DATTA SRINIKESH CHINTA</h1>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#3B6FE0]">
          AI / ML Engineer
        </p>
        <p className="mt-2 text-[11.5px] text-inkSoft">
          {PERSONAL.location} &nbsp;·&nbsp; {PERSONAL.email} &nbsp;·&nbsp; {PERSONAL.phone}
        </p>
        <p className="text-[11.5px] text-inkSoft">
          GitHub: {shortUrl(PERSONAL.links.github)} &nbsp;·&nbsp; LinkedIn: {shortUrl(PERSONAL.links.linkedin)}
          &nbsp;·&nbsp; Portfolio: {shortUrl(PERSONAL.links.portfolio)}
        </p>
      </header>

      {/* Summary */}
      <section>
        <SectionTitle>Summary</SectionTitle>
        <p className="mt-2 text-[12px] leading-relaxed text-ink">
          AI / ML engineer focused on building production-oriented intelligent systems — voice AI,
          retrieval-augmented generation (RAG), AI agents and full-stack AI products. Experience across
          SaaS product development, conversational AI, multilingual voice systems and machine learning.
          Two completed projects shipped and deployed; several projects in active development; pre-publication
          research in spectroscopic AI.
        </p>
      </section>

      {/* Experience */}
      <section>
        <SectionTitle>Experience</SectionTitle>
        <div className="mt-3 space-y-5">
          {workExperience.map((exp) => (
            <div key={exp.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[13px] font-bold text-ink">
                  {exp.role} — {exp.company}
                </h3>
                <p className="whitespace-nowrap font-mono text-[10.5px] text-inkSoft">{exp.period}</p>
              </div>
              <p className="mt-0.5 text-[10.5px] text-muted">
                {exp.location}
                {exp.orgUnit ? ` · ${exp.orgUnit}` : ''}
                {exp.current ? ' · Current' : ''}
              </p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                {exp.highlights.map((h) => (
                  <li key={h} className="text-[11.5px] leading-relaxed text-ink">
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-[10.5px] text-muted">
                <span className="font-semibold text-inkSoft">Tech:</span> {exp.technologies.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <SectionTitle>Projects</SectionTitle>
        <div className="mt-3 space-y-4">
          {COMPLETED_SYSTEMS.map((sys) => (
            <div key={sys.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[13px] font-bold text-ink">
                  {sys.name}
                  {sys.venue ? ` — ${sys.venue}` : ''}
                </h3>
                <p className="whitespace-nowrap font-mono text-[10.5px] text-status-green">Completed</p>
              </div>
              <p className="text-[11.5px] leading-relaxed text-ink">{sys.description}</p>
              <p className="mt-0.5 text-[10.5px] text-muted">
                <span className="font-semibold text-inkSoft">Tech:</span> {sys.technology.join(', ')}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-[12px] font-bold text-ink">Additional Projects — In Development</h3>
          <p className="mt-1 text-[11.5px] leading-relaxed text-ink">
            {BUILDING_PROJECTS.map((p) => `${p.name} (${p.status.toLowerCase()})`).join(' · ')}
          </p>
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionTitle>Education</SectionTitle>
        {education && (
          <div className="mt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[13px] font-bold text-ink">{education.role}</h3>
              <p className="whitespace-nowrap font-mono text-[10.5px] text-inkSoft">{education.period}</p>
            </div>
            <p className="mt-0.5 text-[11.5px] text-ink">
              {education.company} · {education.location}
            </p>
            <p className="text-[11.5px] text-ink">CGPA: {PERSONAL.education.cgpa}</p>
          </div>
        )}
      </section>

      {/* Skills */}
      <section>
        <SectionTitle>Technical Skills</SectionTitle>
        <div className="mt-3 space-y-2">
          {SKILL_SECTIONS.map((sec) => (
            <p key={sec.heading} className="text-[11.5px] leading-relaxed text-ink">
              <span className="font-bold">{sec.heading}:</span> {skillLineFor(sec.category)}
            </p>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <SectionTitle>Certifications</SectionTitle>
        <ul className="mt-2 space-y-1">
          {CERTIFICATIONS.map((c) => (
            <li key={c.id} className="text-[11.5px] leading-relaxed text-ink">
              {c.title} — {c.issuer} ({c.date})
            </li>
          ))}
        </ul>
      </section>

      {/* Research */}
      <section>
        <SectionTitle>Research</SectionTitle>
        <p className="mt-2 text-[12px] font-semibold text-ink">{RESEARCH.title}</p>
        <p className="text-[11.5px] text-inkSoft">Status: Pre-Publication Research — Yet to be Published</p>
      </section>

      {/* Achievements */}
      <section>
        <SectionTitle>Achievements</SectionTitle>
        <p className="mt-2 text-[11.5px] text-ink">
          {MUSIC.institution} — {MUSIC.qualification} — {MUSIC.instrument}: Grade 4 Practical &amp; Grade 4 Theory (
          {MUSIC.totalCertifications} certifications)
        </p>
      </section>
    </div>
  );
};
