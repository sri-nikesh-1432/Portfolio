import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, TerminalSquare } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { StatusChip } from '../components/StatusChip';
import { COMPLETED_SYSTEMS } from '../data/portfolioData';

export const Projects: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Projects"
        title={<>Completed projects — ready to demonstrate.</>}
        description="These are the two projects I have built end-to-end and shipped. Each has a dedicated page with the full engineering story, and a live demo you can open."
      />

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
                    <span
                      key={t}
                      className="rounded-md border border-line bg-white/70 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted"
                    >
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
                      Live Demo <ArrowUpRight className="h-4 w-4" />
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

      {/* Honest count */}
      <Reveal>
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-white/60 py-10 text-center">
          <TerminalSquare className="h-8 w-8 text-accent-blue" />
          <p className="font-display text-3xl font-medium text-ink">
            {String(COMPLETED_SYSTEMS.length).padStart(2, '0')} COMPLETED PROJECTS
          </p>
          <p className="max-w-md text-[13.5px] text-muted">
            No inflated numbers here — this is exactly what is finished and demo-ready today.
          </p>
          <Link
            to="/building"
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-blue underline-offset-4 hover:underline"
          >
            See what I'm currently building →
          </Link>
        </div>
      </Reveal>
    </div>
  );
};
