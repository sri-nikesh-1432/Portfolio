import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BarChart3, CheckCircle2, ExternalLink, Github, TerminalSquare } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { StatusChip } from '../components/StatusChip';
import { COMPLETED_SYSTEMS, MINI_PROJECTS } from '../data/portfolioData';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import type { MiniProject } from '../types';

export const Projects: React.FC = () => {
  const [selectedMini, setSelectedMini] = useState<MiniProject | null>(null);

  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Projects"
        title={<>Completed projects — systems and experiments.</>}
        description="End-to-end AI systems and ML data science projects. Each has been built, tested and documented."
      />

      {/* ---- Completed Systems ---- */}
      <div className="space-y-8">
        {COMPLETED_SYSTEMS.map((sys, i) => (
          <Reveal key={sys.id} delay={i * 100}>
            <article className="glass glass-hover holo-border grid gap-8 rounded-3xl p-7 md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusChip label={sys.badge} tone="green" pulse />
                  <StatusChip label={sys.secondaryBadge} tone="slate" />
                </div>

                <h2 className="mt-5 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
                  {sys.name}
                </h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-blue">
                  {sys.tagline}
                </p>

                <p className="mt-5 text-[15px] leading-relaxed text-muted">{sys.longDescription}</p>

                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Capabilities</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {sys.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-[13px] text-inkSoft">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-status-green" />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {sys.technology.map((t) => (
                    <span key={t} className="rounded-md border border-line bg-white/70 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={`/projects/${sys.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    Open Project <ArrowUpRight className="h-4 w-4 text-accent-teal" />
                  </Link>
                  {sys.demoUrl && (
                    <a
                      href={sys.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:text-accent-blue"
                    >
                      Live Demo <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Architecture pipeline */}
              <div className="rounded-2xl border border-line bg-white/60 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Project pipeline</p>
                <div className="mt-4 space-y-0">
                  {sys.architecture.map((step, idx) => (
                    <div key={step.stage} className="relative flex gap-4 pb-5 last:pb-0">
                      {idx < sys.architecture.length - 1 && (
                        <span className="absolute left-[13px] top-7 h-full w-px bg-line" />
                      )}
                      <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent-blue/25 bg-white font-mono text-[10px] font-semibold text-accent-blue">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-[13px] font-medium text-ink">{step.stage}</p>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-muted">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* ---- Data Science & ML Projects ---- */}
      <Reveal>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-accent-gold" />
            <h2 className="font-display text-2xl font-medium text-ink">Data Science & ML Projects</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {MINI_PROJECTS.map((proj, i) => (
              <Reveal key={proj.id} delay={i * 60}>
                <button
                  onClick={() => setSelectedMini(proj)}
                  className="glass glass-hover group flex h-full w-full flex-col rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[16px] font-medium leading-snug text-ink transition-colors group-hover:text-accent-gold">
                      {proj.title}
                    </h3>
                    <span className="shrink-0 rounded-lg bg-accent-gold/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-gold">
                      {proj.date}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{proj.overview}</p>

                  {/* Skills */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {proj.skills.map((s) => (
                      <span key={s} className="rounded-md bg-accent-gold/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-gold/80">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Tech + action */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line/50 pt-3">
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md border border-line bg-white/60 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-muted">
                          {t}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="font-mono text-[8.5px] text-muted">+{proj.technologies.length - 3}</span>
                      )}
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-gold/60 transition-colors group-hover:text-accent-gold">
                      View details →
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Project count */}
      <Reveal>
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-white/60 py-10 text-center">
          <TerminalSquare className="h-8 w-8 text-accent-blue" />
          <p className="font-display text-3xl font-medium text-ink">
            {String(COMPLETED_SYSTEMS.length + MINI_PROJECTS.length).padStart(2, '0')} COMPLETED PROJECTS
          </p>
          <p className="max-w-md text-[13.5px] text-muted">
            Six projects across AI systems and data science — every one built, tested and documented.
          </p>
          <Link
            to="/building"
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-blue underline-offset-4 hover:underline"
          >
            See what I'm currently building →
          </Link>
        </div>
      </Reveal>

      <ProjectDetailModal project={selectedMini!} open={!!selectedMini} onClose={() => setSelectedMini(null)} />
    </div>
  );
};