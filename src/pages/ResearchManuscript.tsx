import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Printer } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { RubberStamp } from '../components/RubberStamp';
import { RESEARCH, RESEARCH_SECTIONS } from '../data/portfolioData';

export const ResearchManuscript: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/research"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent-red"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Research Lab
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-lg border border-line bg-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:flex">
            <BookOpen className="h-3.5 w-3.5" /> IEEE-style manuscript
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent-red/40"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
      </div>

      {/* Manuscript paper */}
      <Reveal>
        <article className="relative overflow-hidden rounded-2xl border border-line bg-paper shadow-lift">
          {/* Red stamp overlay */}
          <div className="pointer-events-none absolute right-6 top-6 z-20 hidden md:block">
            <div className="rotate-[-8deg]">
              <RubberStamp text="YET TO BE PUBLISHED" heavy />
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 md:px-14 md:py-14">
            {/* Header block */}
            <header className="border-b-2 border-ink/80 pb-8 text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink/50">
                {RESEARCH.statusLine}
              </p>
              <h1 className="mx-auto mt-4 max-w-3xl font-display text-[1.6rem] font-semibold leading-snug text-ink md:text-[2rem]">
                {RESEARCH.title}
              </h1>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/55">
                {RESEARCH.field} · {RESEARCH.date}
              </p>
              <p className="mt-4 text-[12.5px] text-ink/70">
                Datta Srinikesh Chinta — R.M.D Engineering College · Department of AI & Machine Learning
              </p>
              <div className="mx-auto mt-4 inline-block">
                <RubberStamp text="YET TO BE PUBLISHED" />
              </div>
            </header>

            {/* Two-column body */}
            <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {/* Abstract */}
              <section className="md:col-span-2">
                <h2 className="font-display text-[15px] font-semibold uppercase tracking-wide text-ink">
                  Abstract
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/80 text-balance">
                  {RESEARCH.abstract}
                </p>
                <p className="mt-3 flex items-center gap-2 font-display text-[12px] italic text-ink/60">
                  <span className="h-3 w-3 rounded-full border border-ink/30 bg-accent-gold/30" />
                  smart perfumery · counterfeit detection · fragrance generation
                </p>
              </section>

              {RESEARCH_SECTIONS.map((sec, i) => (
                <section
                  key={sec.id}
                  className={
                    sec.blocks.some((b) => b.type === 'table') ? 'md:col-span-2' : undefined
                  }
                >
                  <h2 className="flex items-center gap-2 font-display text-[14px] font-semibold uppercase tracking-wide text-ink">
                    <span className="font-mono text-[10px] text-accent-red">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {sec.title}
                  </h2>

                  <div className="mt-2">
                    {sec.blocks.map((b, j) => {
                      switch (b.type) {
                        case 'p':
                          return (
                            <p key={j} className="mt-2.5 text-[12.5px] leading-relaxed text-ink/80">
                              {b.text}
                            </p>
                          );
                        case 'list':
                          return (
                            <div key={j} className="mt-3">
                              {b.heading && (
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                                  {b.heading}
                                </p>
                              )}
                              <ul className="mt-2 space-y-1.5">
                                {b.items.map((it) => (
                                  <li
                                    key={it}
                                    className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink/80"
                                  >
                                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full border border-ink/30 bg-accent-gold/40" />
                                    {it}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        case 'table':
                          return (
                            <div key={j} className="mt-4 overflow-hidden rounded-lg border border-ink/15">
                              <p className="border-b border-ink/15 bg-ink/4 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/55">
                                {b.caption}
                              </p>
                              <table className="w-full text-left font-mono text-[11px]">
                                <thead>
                                  <tr className="border-b border-ink/15 bg-ink/4 text-[10px] uppercase tracking-[0.12em] text-ink/60">
                                    {b.headers.map((h) => (
                                      <th key={h} className="px-3 py-2">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {b.rows.map((row, r) => (
                                    <tr key={r} className="border-b border-ink/8 last:border-0">
                                      {row.map((cell, c) => (
                                        <td key={c} className="px-3 py-2 text-ink/80">
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
                              className="mt-4 rounded-lg border border-ink/15 bg-white/60 p-3 font-mono text-[11px] leading-relaxed text-ink/75"
                            >
                              {b.items.map((eq) => (
                                <p
                                  key={eq.label}
                                  className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"
                                >
                                  <span className="text-[9.5px] uppercase tracking-[0.14em] text-ink/50">
                                    {eq.label}
                                  </span>
                                  <span className="font-display text-[15px] italic text-ink">
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
                </section>
              ))}
            </div>

            {/* Fragrance families */}
            <section className="mt-10 border-t border-ink/15 pt-6">
              <h2 className="font-display text-[14px] font-semibold uppercase tracking-wide text-ink">
                Fragrance Classification Families
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {RESEARCH.families.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-ink/20 bg-white/60 px-4 py-1.5 font-mono text-[11px] text-ink/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-ink/15 bg-white/60 p-4">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/50">
                  Note structure
                </p>
                <div className="mt-2 flex items-center gap-3 font-display text-[12.5px] italic text-ink/75">
                  <span>Top note</span>
                  <span className="h-px flex-1 bg-ink/20" />
                  <span>Middle note</span>
                  <span className="h-px flex-1 bg-ink/20" />
                  <span>Base note</span>
                </div>
              </div>
            </section>

            {/* References */}
            <section className="mt-10 border-t border-ink/15 pt-6">
              <h2 className="font-display text-[14px] font-semibold uppercase tracking-wide text-ink">
                References
              </h2>
              <ol className="mt-3 space-y-2 font-mono text-[10.5px] leading-relaxed text-ink/65">
                {RESEARCH.references.map((ref, i) => (
                  <li key={i}>
                    [{i + 1}] {ref}
                  </li>
                ))}
              </ol>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45">
                Manuscript status: {RESEARCH.status} · Not peer-reviewed · Not published
              </p>
            </section>

            {/* Acknowledgments */}
            <section className="mt-10 border-t border-ink/15 pt-6">
              <h2 className="font-display text-[14px] font-semibold uppercase tracking-wide text-ink">
                References and Support
              </h2>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ink/80">
                {RESEARCH.acknowledgments.intro}
              </p>
              <ul className="mt-3 space-y-1.5">
                {RESEARCH.acknowledgments.people.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 font-mono text-[11px] leading-relaxed text-ink/65"
                  >
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full border border-ink/30 bg-accent-gold/40" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </Reveal>

      <div className="text-center">
        <Link
          to="/research"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-red"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Research Lab
        </Link>
      </div>
    </div>
  );
};
