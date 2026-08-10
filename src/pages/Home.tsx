import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Ear,
  Eye,
  FileText,
  FlaskConical,
  Languages,
  Lightbulb,
  Mic,
  Sparkles,
  TerminalSquare,
  Workflow,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { StatusChip, toneForStatus } from '../components/StatusChip';
import { ProgressBar } from '../components/ProgressBar';
import { RubberStamp } from '../components/RubberStamp';
import { ResumeModal } from '../components/ResumeModal';
import { SuggestionModal } from '../components/SuggestionModal';
import {
  BUILDING_PROJECTS,
  COMPLETED_SYSTEMS,
  METRICS,
  PERSONAL,
  RESEARCH,
} from '../data/portfolioData';

const HERO_MODULES = [
  { icon: Mic, label: 'Voice AI', detail: 'STT → LLM → TTS' },
  { icon: Workflow, label: 'RAG', detail: 'Chunk · Embed · Retrieve' },
  { icon: Cpu, label: 'AI Agents', detail: 'Orchestration & automation' },
  { icon: Eye, label: 'Vision', detail: 'Detection & classification' },
];

export const Home: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [suggestFor, setSuggestFor] = useState<string | null>(null);

  return (
    <div className="space-y-28 md:space-y-36">


      {/* ---------------- HERO ---------------- */}
      <section className="relative pt-6 md:pt-12">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2 text-[#8A5A2B]">
                <span className="inline-block h-1.5 w-1.5 animate-pulseSoft rounded-full bg-status-green" />
                AI Systems Engineer · Hyderabad, India
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-6 font-display text-[2.9rem] font-medium leading-[1.04] tracking-tight text-ink md:text-[4.2rem]">
                I build intelligent systems that can{' '}
                <span className="holo-text">see, speak, reason</span> and{' '}
                <span className="relative inline-block">
                  act
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 10" fill="none">
                    <path d="M2 8C30 3 60 2 118 5" stroke="#C9A24B" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 flex max-w-2xl flex-wrap gap-x-2 gap-y-1.5 text-[13.5px] leading-relaxed text-inkSoft">
                {PERSONAL.proHeadline.split('|').map((part, i) => (
                  <span key={i} className="inline-flex items-center gap-x-2">
                    {i > 0 && <span className="text-accent-gold/70">|</span>}
                    <span className={i === 0 ? 'font-semibold text-ink' : ''}>{part.trim()}</span>
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 max-w-xl border-t border-accent-gold/25 pt-6">
                <h2 className="font-display text-[22px] font-medium leading-snug text-ink">
                  Building intelligence, not just software.
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-inkSoft">
                  <p>
                    I'm <span className="font-medium text-ink">{PERSONAL.name}</span> — an AI/ML engineer
                    and builder focused on creating intelligent systems that combine machine learning,
                    generative AI, voice interfaces, retrieval-augmented generation, computer vision and
                    autonomous agents.
                  </p>
                  <p>
                    My work spans multilingual conversational systems, AI telecalling, RAG platforms,
                    agent orchestration, biomimetic research and full-stack AI products. I'm currently a{' '}
                    <span className="font-medium text-ink">B.Tech AI & ML student at R.M.D Engineering College</span>{' '}
                    ({PERSONAL.education.period}, CGPA {PERSONAL.education.cgpa}), pursuing the goal of
                    becoming an AI Systems Engineer who ships complete products.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {PERSONAL.interests.map((i) => (
                    <span
                      key={i}
                      className="wood-chip inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] text-inkSoft"
                    >
                      <Sparkles className="h-3 w-3 text-accent-gold" />
                      {i}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper text-white">
                    <Languages className="h-4 w-4" />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-copper to-accent-rosewood text-white">
                    <Ear className="h-4 w-4" />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold to-accent-red text-white">
                    <TerminalSquare className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    voice · agents · systems
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="holo-sheen group inline-flex items-center gap-2 rounded-xl bg-wooddark px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 text-accent-gold transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/building"
                  className="wood-chip inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-gold/70 hover:text-accent-gold"
                >
                  Currently Building
                </Link>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent-red/30 bg-accent-red/10 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent-red transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-red/15"
                >
                  <FlaskConical className="h-4 w-4" />
                  Research Lab
                </Link>
                <button
                  onClick={() => setResumeOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-accent-gold/45 bg-accent-gold/10 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-gold/15"
                >
                  <FileText className="h-4 w-4" />
                  View Resume
                </button>
              </div>
            </Reveal>

            <Reveal delay={520}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {HERO_MODULES.map((m) => (
                  <div key={m.label} className="flex items-center gap-2.5">
                    <span className="wood-chip flex h-8 w-8 items-center justify-center rounded-lg">
                      <m.icon className="h-4 w-4 text-accent-gold" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[12px] font-medium text-ink">{m.label}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{m.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Portrait in wooden frame */}
          <Reveal delay={260} className="relative">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-5 rounded-[32px] bg-gradient-to-br from-accent-gold/25 via-accent-copper/15 to-accent-rosewood/20 blur-2xl" />
              <div className="wood-frame relative overflow-hidden rounded-3xl p-3">
                <span className="brass-stud absolute left-2 top-2 z-10" />
                <span className="brass-stud absolute right-2 top-2 z-10" />
                <span className="brass-stud absolute bottom-2 left-2 z-10" />
                <span className="brass-stud absolute bottom-2 right-2 z-10" />
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/mypic.png"
                    alt="Portrait of Datta Srinikesh Chinta"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wooddark/40 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#F4EBDC]/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-status-green backdrop-blur">
                    <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-status-green" />
                    Building in public
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-wooddark/60 px-3 py-2.5">
                  <div>
                    <p className="font-display text-[16px] font-semibold leading-tight text-[#F4EBDC]">
                      {PERSONAL.firstName}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold">
                      {PERSONAL.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#D9C3A0]">$ whoami</p>
                    <p className="mt-0.5 max-w-[160px] truncate text-[10px] font-medium text-[#F2E4C9]">
                      {PERSONAL.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Honest counters — wooden plaques */}
        <Reveal delay={200}>
          <div className="mt-20 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="wood-card wood-card-hover relative rounded-2xl p-5 text-center"
              >
                <span className="brass-stud absolute left-1.5 top-1.5" />
                <span className="brass-stud absolute right-1.5 top-1.5" />
                <span className="brass-stud absolute bottom-1.5 left-1.5" />
                <span className="brass-stud absolute bottom-1.5 right-1.5" />
                <p className="brass-text font-display text-4xl font-medium tracking-tight">{m.value}</p>
                <p className="mt-1.5 text-[12px] font-medium text-inkSoft">{m.label}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{m.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- FEATURED SYSTEMS ---------------- */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Projects"
            title={<>Two projects currently completed and ready to demonstrate.</>}
            description="Everything below is finished, deployed and open to explore. Everything else I'm building is honestly labelled as in development."
          />
          <Reveal delay={100}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-gold"
            >
              All projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {COMPLETED_SYSTEMS.map((sys, i) => (
            <Reveal key={sys.id} delay={i * 120}>
              <article className="wood-card wood-card-hover group relative flex h-full flex-col rounded-3xl p-7">
                <span className="brass-stud absolute left-3 top-3" />
                <span className="brass-stud absolute right-3 top-3" />
                <span className="brass-stud absolute bottom-3 left-3" />
                <span className="brass-stud absolute bottom-3 right-3" />

                <div className="flex items-center justify-between gap-3">
                  <StatusChip label={sys.badge} tone="green" pulse />
                  <StatusChip label={sys.secondaryBadge} tone="slate" />
                </div>

                <h3 className="mt-5 font-display text-2xl font-medium leading-snug text-ink">
                  {sys.name}
                </h3>
                <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent-gold">
                  {sys.tagline}
                </p>

                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted">{sys.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {sys.technology.map((t) => (
                    <span
                      key={t}
                      className="wood-chip rounded-md px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-inkSoft"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/projects/${sys.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-wooddark px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    Open Project
                    <ArrowUpRight className="h-3.5 w-3.5 text-accent-gold" />
                  </Link>
                  {sys.demoUrl && (
                    <a
                      href={sys.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="wood-chip inline-flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-gold/70 hover:text-accent-gold"
                    >
                      Live Demo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CURRENTLY BUILDING ---------------- */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Currently Building"
            title={<>Ideas, experiments and projects under active development.</>}
            description="These are not finished. Each card shows honest progress — what stage it's at and what comes next."
          />
          <Reveal delay={100}>
            <Link
              to="/building"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-gold"
            >
              Open the building workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUILDING_PROJECTS.filter((p) => p.progress < 100)
            .slice(0, 6)
            .map((proj, i) => (
              <Reveal key={proj.id} delay={i * 80}>
                <article className="wood-card wood-card-hover flex h-full flex-col rounded-2xl p-6 opacity-90">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-medium text-ink">{proj.name}</h3>
                    <StatusChip label={proj.status} tone={toneForStatus(proj.status)} />
                  </div>
                  <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                    {proj.category}
                  </p>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                    {proj.shortDescription}
                  </p>
                  <div className="mt-5">
                    <ProgressBar value={proj.progress} label="Complete" />
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-muted">
                    <span className="text-inkSoft">Next:</span> {proj.nextMilestone}
                  </p>
                  <button
                    onClick={() => setSuggestFor(proj.name)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent-gold/40 bg-accent-gold/10 px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-gold/15"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    Suggest an idea
                  </button>
                </article>
              </Reveal>
            ))}
        </div>
      </section>

      {/* ---------------- RESEARCH TEASER ---------------- */}
      <section>
        <Reveal>
          <div className="wood-plank relative overflow-hidden rounded-3xl p-8 md:p-12">
            <span className="brass-stud absolute left-3 top-3" />
            <span className="brass-stud absolute right-3 top-3" />
            <span className="brass-stud absolute bottom-3 left-3" />
            <span className="brass-stud absolute bottom-3 right-3" />

            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-rosewood/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-gold/15 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="flex items-center gap-4">
                  <RubberStamp text="YET TO BE PUBLISHED" heavy />
                  <StatusChip label="Pre-Publication Research" tone="red" />
                </div>
                <p className="eyebrow mt-6 text-accent-gold">Research Lab</p>
                <h3 className="mt-3 font-display text-2xl font-medium leading-snug text-[#F4EBDC] md:text-3xl">
                  {RESEARCH.shortTitle}
                </h3>
                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#D9C3A0]">
                  {RESEARCH.field}
                </p>
                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#E8D9BD]">
                  AI-IoT fragrance detection, analysis & generation using spectroscopic learning —
                  an active research manuscript with results in hand, prepared for publication.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/research"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-red px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <FlaskConical className="h-4 w-4" /> Open Research Lab
                  </Link>
                  <Link
                    to="/research/manuscript"
                    className="wood-chip inline-flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-gold/70 hover:text-accent-gold"
                  >
                    View Manuscript
                  </Link>
                </div>
              </div>

              {/* Notebook mini-preview */}
              <div className="notebook-paper relative mx-auto w-full max-w-sm rounded-xl p-6 shadow-lift">
                <div className="absolute right-3 top-3">
                  <RubberStamp text="YET TO BE PUBLISHED" />
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">manuscript v0.9</p>
                <h4 className="mt-2 font-display text-[15px] font-medium leading-snug text-ink/90">
                  AI-IoT Based Fragrance Detection, Analysis & Generation System
                </h4>
                <div className="mt-4 space-y-2">
                  <p className="font-mono text-[9.5px] text-ink/60">E = hν &nbsp;·&nbsp; A = εcl</p>
                  <p className="font-mono text-[9.5px] text-ink/60">S_total = Σ wᵢSᵢ</p>
                </div>
                <div className="mt-4 border-t border-ink/10 pt-3">
                  {RESEARCH.samples.slice(0, 3).map((s) => (
                    <div key={s.sample} className="flex items-center justify-between py-0.5 font-mono text-[9.5px] text-ink/70">
                      <span>{s.sample}</span>
                      <span className="font-semibold text-ink/80">{s.predicted} · {s.confidence}</span>
                    </div>
                  ))}
                  <p className="mt-2 font-display text-[10px] italic text-ink/50">"need more independent samples"</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <SuggestionModal
        open={suggestFor !== null}
        projectName={suggestFor ?? ''}
        onClose={() => setSuggestFor(null)}
      />
    </div>
  );
};
