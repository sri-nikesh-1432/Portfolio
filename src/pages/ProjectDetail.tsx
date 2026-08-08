import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  Rocket,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { StatusChip } from '../components/StatusChip';
import { COMPLETED_SYSTEMS } from '../data/portfolioData';
import { NotFound } from './NotFound';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const sys = COMPLETED_SYSTEMS.find((s) => s.slug === slug);

  if (!sys) return <NotFound />;

  return (
    <div className="space-y-14">
      <div>
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent-blue"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All projects
        </Link>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusChip label={sys.badge} tone="green" pulse />
            <StatusChip label={sys.secondaryBadge} tone="slate" />
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-5xl">
            {sys.name}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-blue">
            {sys.tagline}
          </p>
        </Reveal>
      </div>

      {/* Hero actions */}
      <Reveal delay={120}>
        <div className="flex flex-wrap gap-3">
          {sys.demoUrl && (
            <a
              href={sys.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <Rocket className="h-4 w-4 text-accent-teal" /> Open Live Demo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <a
            href={sys.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:text-accent-blue"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </Reveal>

      {/* Overview */}
      <Reveal>
        <div className="glass holo-border rounded-3xl p-7 md:p-9">
          <p className="eyebrow text-accent-blue">Overview</p>
          <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-inkSoft text-balance">
            {sys.longDescription}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Capabilities */}
        <Reveal>
          <div className="glass rounded-3xl p-7">
            <p className="eyebrow text-accent-blue">Capabilities</p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {sys.capabilities.map((cap) => (
                <div
                  key={cap}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-white/60 px-3.5 py-3 text-[13.5px] text-inkSoft"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-status-green" />
                  {cap}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Highlights */}
        <Reveal delay={100}>
          <div className="glass rounded-3xl p-7">
            <p className="eyebrow text-accent-blue">Highlights</p>
            <div className="mt-5 space-y-3">
              {sys.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-inkSoft">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-accent-lavender" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Architecture */}
      <Reveal>
        <div className="glass holo-border rounded-3xl p-7 md:p-9">
          <p className="eyebrow text-accent-blue">Architecture</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sys.architecture.map((step, idx) => (
              <div key={step.stage} className="relative rounded-2xl border border-line bg-white/70 p-5">
                <span className="font-mono text-[10px] font-semibold text-accent-blue">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-[14px] font-medium text-ink">{step.stage}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Technology */}
      <Reveal>
        <div className="glass rounded-3xl p-7 md:p-9">
          <p className="eyebrow text-accent-blue">Technology</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {sys.technology.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-line bg-white/70 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ArrowUpRight className="h-4 w-4 text-accent-blue" />
            {sys.demoUrl && (
              <a
                href={sys.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] text-accent-blue underline-offset-4 hover:underline"
              >
                {sys.demoUrl}
              </a>
            )}
          </div>
        </div>
      </Reveal>

      {/* Bottom nav */}
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-white/60 p-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Continue exploring
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/building"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-blue underline-offset-4 hover:underline"
            >
              Currently building →
            </Link>
            <Link
              to="/research"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-red underline-offset-4 hover:underline"
            >
              Research lab →
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
