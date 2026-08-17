import React, { useMemo, useState } from 'react';
import { FlaskConical, Hammer, Lightbulb } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ProgressBar } from '../components/ProgressBar';
import { StatusChip, toneForStatus } from '../components/StatusChip';
import { SuggestionModal } from '../components/SuggestionModal';
import { BUILDING_PROJECTS } from '../data/portfolioData';

const FILTERS = [
  { id: 'ALL', label: 'All' },
  { id: 'IN DEVELOPMENT', label: 'In Development' },
  { id: 'EXPERIMENT', label: 'Experiments' },
  { id: 'PLANNED', label: 'Planned' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

const iconFor = (status: string) => {
  if (status === 'EXPERIMENT') return <FlaskConical className="h-4 w-4" />;
  if (status === 'PLANNED') return <Lightbulb className="h-4 w-4" />;
  return <Hammer className="h-4 w-4" />;
};

export const Building: React.FC = () => {
  const [filter, setFilter] = useState<FilterId>('ALL');
  const [suggestFor, setSuggestFor] = useState<string | null>(null);

  const inDevelopment = BUILDING_PROJECTS.filter((p) => p.status === 'IN DEVELOPMENT').length;

  const filtered = useMemo(() => {
    if (filter === 'ALL') return BUILDING_PROJECTS;
    return BUILDING_PROJECTS.filter((p) => p.status === filter);
  }, [filter]);

  return (
    <div className="space-y-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Building"
          title={<>Currently building — an honest view of the workspace.</>}
          description="Nothing here is presented as finished. Each project shows its real status, the stage it's at right now, the next milestone, and how far along it actually is."
        />
        <Reveal delay={100}>
          <div className="glass flex items-center gap-3 rounded-2xl px-5 py-4">
            <Lightbulb className="h-4 w-4 text-accent-gold" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                In the workspace
              </p>
              <p className="font-display text-2xl font-medium text-ink">
                {BUILDING_PROJECTS.length}
                <span className="text-base text-muted"> projects</span>
              </p>
            </div>
            <span className="ml-1 hidden rounded-lg border border-line bg-white/70 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:block">
              {inDevelopment} in development
            </span>
          </div>
        </Reveal>
      </div>

      {/* Filters */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-xl px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                filter === f.id
                  ? 'bg-ink text-white shadow-lift'
                  : 'border border-line bg-white/60 text-muted hover:border-accent-blue/40 hover:text-ink'
              }`}
            >
              {f.label}
              <span className="ml-1.5 opacity-60">
                {f.id === 'ALL'
                  ? BUILDING_PROJECTS.length
                  : BUILDING_PROJECTS.filter((p) => p.status === f.id).length}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((proj, i) => (
          <Reveal key={proj.id} delay={i * 70}>
            <article className="glass glass-hover flex h-full flex-col rounded-3xl p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white/70 text-accent-blue">
                    {iconFor(proj.status)}
                  </span>
                  <h3 className="font-display text-xl font-medium text-ink">{proj.name}</h3>
                </div>
                <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <StatusChip label={proj.status} tone={toneForStatus(proj.status)} pulse={proj.status === 'IN DEVELOPMENT'} />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
                  {proj.category}
                </span>
              </div>

              <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-muted">
                {proj.shortDescription}
              </p>

              <div className="mt-5 rounded-2xl border border-line bg-white/60 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                      Current stage
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium leading-snug text-inkSoft">
                      {proj.currentStage}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                      Next milestone
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium leading-snug text-accent-blue">
                      {proj.nextMilestone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <ProgressBar value={proj.progress} label="Completion" />
              </div>

              {proj.notes && (
                <p className="mt-3 rounded-lg bg-accent-gold/8 px-3 py-2 font-mono text-[10px] italic text-inkSoft">
                  {proj.notes}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {proj.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line bg-white/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSuggestFor(proj.name)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent-gold/30 bg-accent-gold/6 px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-gold/12"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                Suggest Idea
              </button>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Honesty note */}
      <Reveal>
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ink/15 bg-white/50 p-8 text-center">
          <p className="font-display text-lg font-medium text-ink">A note on progress</p>
          <p className="max-w-xl text-[13.5px] leading-relaxed text-muted">
            These percentages are honest, self-assessed development estimates — not inflated
            claims. When a project is actually finished, it moves to the{' '}
            <span className="font-medium text-status-green">completed projects</span> section. Until
            then, it stays here with its real status.
          </p>
        </div>
      </Reveal>

      <SuggestionModal
        open={suggestFor !== null}
        projectName={suggestFor ?? ''}
        onClose={() => setSuggestFor(null)}
      />
    </div>
  );
};
