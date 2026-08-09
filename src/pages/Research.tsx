import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FlaskConical, Microscope } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { StatusChip } from '../components/StatusChip';
import { RubberStamp } from '../components/RubberStamp';
import { RESEARCH, RESEARCH_SECTIONS } from '../data/portfolioData';

export const Research: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Research Lab"
        title={<>Pre-publication research — active and unpublished.</>}
        description="Independent research into AI-IoT spectroscopic learning for fragrance intelligence. The manuscript is complete, results are in hand, and it is honestly labelled: YET TO BE PUBLISHED."
      />

      {/* Hero research card — ivory paper */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ivory shadow-card">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-red/6 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent-gold/10 blur-3xl" />

          <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <RubberStamp text="YET TO BE PUBLISHED" heavy />
                <StatusChip label="Pre-Publication Research" tone="red" />
              </div>

              <p className="eyebrow mt-7 text-accent-red">Primary Research</p>
              <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-ink md:text-[2rem]">
                {RESEARCH.title}
              </h2>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
                {RESEARCH.field} · {RESEARCH.date}
              </p>

              <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-inkSoft">
                {RESEARCH.abstract}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/research/manuscript"
                  className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-accent-red px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <BookOpen className="h-4 w-4" /> View Manuscript
                </Link>
                <a
                  href="#notebook"
                  className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white/70 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Microscope className="h-4 w-4 text-accent-gold" /> Research Notebook
                </a>
              </div>

              {/* Status line */}
              <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-accent-red/20 bg-white/60 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-red">
                {RESEARCH.statusLine}
              </div>
            </div>

            {/* Notebook preview */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 rounded-2xl bg-white/40 blur-xl" />
              <div className="notebook-paper relative rounded-xl p-6 shadow-lift">
                <div className="absolute right-3 top-3">
                  <RubberStamp text="YET TO BE PUBLISHED" />
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">
                  research notebook · 36 × 48" poster draft
                </p>
                <h3 className="mt-3 font-display text-[16px] font-medium leading-snug text-ink/90">
                  AI-IoT Fragrance Detection, Analysis & Generation
                </h3>

                <div className="mt-4 space-y-1.5 font-mono text-[10px] text-ink/70">
                  <p>E = hν · photon energy</p>
                  <p>A = εcl · Beer–Lambert</p>
                  <p>S_total = Σ wᵢSᵢ · spectral mixture</p>
                </div>

                <div className="mt-4 rounded-lg border border-ink/10 bg-white/50 p-3">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/50">
                    sample results
                  </p>
                  {RESEARCH.samples.map((s) => (
                    <div
                      key={s.sample}
                      className="flex items-center justify-between py-1 font-mono text-[9.5px] text-ink/75"
                    >
                      <span>{s.sample}</span>
                      <span className="font-semibold text-ink/85">
                        {s.predicted} · {s.confidence}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 font-display text-[10.5px] italic text-ink/55">
                  "need more independent samples"
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Pipeline */}
      <section>
        <SectionHeading
          eyebrow="System Pipeline"
          title={<>From fragrance droplet to classified intelligence.</>}
          description="The end-to-end spectroscopic learning pipeline behind the research."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {RESEARCH.pipeline.map((step, i) => (
            <Reveal key={step.stage} delay={i * 60}>
              <div className="glass glass-hover relative h-full rounded-2xl p-4 text-center">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-accent-red/25 bg-white font-mono text-[11px] font-semibold text-accent-red">
                  {i + 1}
                </span>
                <p className="mt-3 text-[12.5px] font-medium text-ink">{step.stage}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The research paper */}
      <section>
        <SectionHeading
          eyebrow="The Research Paper"
          title={<>The complete manuscript, section by section.</>}
          description="Every section of the paper — abstract, methodology, physics and chemistry, machine learning approach, IoT integration, results, discussion and conclusion — with its tables and equations."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {RESEARCH_SECTIONS.map((sec, i) => (
            <Reveal
              key={sec.id}
              delay={i * 40}
              className={sec.blocks.some((b) => b.type === 'table') ? 'md:col-span-2' : undefined}
            >
              <article className="glass glass-hover h-full rounded-2xl p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-red">
                  {String(i + 1).padStart(2, '0')} · {sec.title}
                </p>

                <div className="mt-3">
                  {sec.blocks.map((b, j) => {
                    switch (b.type) {
                      case 'p':
                        return (
                          <p key={j} className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                            {b.text}
                          </p>
                        );
                      case 'list':
                        return (
                          <div key={j} className="mt-4">
                            {b.heading && (
                              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-inkSoft">
                                {b.heading}
                              </p>
                            )}
                            <ul className="mt-2 space-y-1.5">
                              {b.items.map((it) => (
                                <li
                                  key={it}
                                  className="flex items-start gap-2 text-[13px] leading-relaxed text-muted"
                                >
                                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full border border-accent-gold/50 bg-accent-gold/40" />
                                  {it}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      case 'table':
                        return (
                          <div key={j} className="mt-4 overflow-hidden rounded-xl border border-line bg-white/50">
                            <p className="border-b border-line bg-white/60 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                              {b.caption}
                            </p>
                            <table className="w-full text-left font-mono text-[11px]">
                              <thead>
                                <tr className="border-b border-line bg-white/60 text-[10px] uppercase tracking-[0.12em] text-inkSoft">
                                  {b.headers.map((h) => (
                                    <th key={h} className="px-3 py-2">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {b.rows.map((row, r) => (
                                  <tr key={r} className="border-b border-line/60 last:border-0">
                                    {row.map((cell, c) => (
                                      <td key={c} className="px-3 py-2 text-inkSoft">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      case 'equations':
                        return (
                          <div
                            key={j}
                            className="mt-4 rounded-xl border border-line bg-white/50 p-3 font-mono text-[11px] text-inkSoft"
                          >
                            {b.items.map((eq) => (
                              <p
                                key={eq.label}
                                className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"
                              >
                                <span className="text-[9.5px] uppercase tracking-[0.14em] text-muted">
                                  {eq.label}
                                </span>
                                <span className="font-display text-[16px] italic text-ink">
                                  {eq.equation}
                                </span>
                              </p>
                            ))}
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <div className="mt-8 text-center">
            <Link
              to="/research/manuscript"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-red"
            >
              Read the full manuscript
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Notebook section */}
      <section id="notebook">
        <SectionHeading
          eyebrow="Research Notebook"
          title={<>The working notebook behind the paper.</>}
          description="Physical research material — handwritten notes, annotations and observations that document the journey before publication."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="notebook-paper rounded-2xl p-7 shadow-card">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">margin notes</p>
              <div className="mt-4 space-y-3">
                {RESEARCH.notes.slice(0, 6).map((n) => (
                  <p key={n} className="flex items-center gap-2 font-display text-[14px] italic text-ink/80">
                    <FlaskConical className="h-3.5 w-3.5 shrink-0 text-accent-red/60" />
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="notebook-paper rounded-2xl p-7 shadow-card">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">key equations</p>
              <div className="mt-5 space-y-4">
                {RESEARCH.keyEquations.map((e) => (
                  <div key={e.label} className="rounded-xl border border-ink/10 bg-white/60 px-4 py-3">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/50">
                      {e.label}
                    </p>
                    <p className="mt-1 font-display text-lg font-medium italic text-ink">{e.equation}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 font-display text-[11px] italic text-ink/55">
                "validate experimentally"
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
