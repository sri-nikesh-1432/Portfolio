import React from 'react';
import { Piano, Star } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { MUSIC } from '../data/portfolioData';

const PIANO_IMAGE =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1600&q=80';

export const Music: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Editorial band — warm palette isolated to the Music section */}
      <div className="rounded-[2rem] border border-[#E8DED0] bg-[#FAF8F3] p-6 shadow-[0_20px_60px_-30px_rgba(25,25,25,0.25)] sm:p-10 lg:p-14">
        {/* Quote 1 — first thing the visitor sees */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[2rem] italic leading-[1.25] text-[#191919] md:text-[3rem]">
              "Without music, life would be a mistake."
            </p>
            <p className="mt-4 font-display text-[15px] italic text-[#77736D]">— Friedrich Nietzsche</p>
          </div>
        </Reveal>

        {/* Hero — quote & intro left, cinematic piano right */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal delay={80}>
              <p className="eyebrow text-[#B89B5E]">Music</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-[#191919] md:text-5xl">
                Piano / Keyboard
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-[#77736D]">
                Music has always been a part of my journey alongside technology — building
                discipline, patience, timing, and an appreciation for patterns and harmony.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#F3EEE5] p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B89B5E]/15 text-[#B89B5E]">
                  <Piano className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-[#191919]">{MUSIC.instrument}</p>
                  <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#77736D]">
                    {MUSIC.qualification}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Piano visual */}
          <Reveal delay={120} className="relative">
            <div className="group relative overflow-hidden rounded-3xl border border-[#E8DED0] bg-[#F3EEE5] shadow-[0_30px_60px_-20px_rgba(25,25,25,0.35)]">
              <img
                src={PIANO_IMAGE}
                alt="A grand piano in a warm, sunlit room"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#191919]/15 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Trinity College London achievements */}
        <div className="mt-16 text-center md:mt-24">
          <Reveal>
            <p className="eyebrow text-[#B89B5E]">Achievements</p>
            <h3 className="mt-3 font-display text-3xl font-medium text-[#191919] md:text-4xl">
              Trinity College London
            </h3>
            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#77736D]">
              Piano / Keyboard
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
              {MUSIC.grades.map((g) => (
                <div
                  key={g.name}
                  className="flex items-center gap-2.5 rounded-full border border-[#E8DED0] bg-[#F3EEE5] px-5 py-3"
                >
                  <Star className="h-4 w-4 text-[#B89B5E]" />
                  <span className="font-medium text-[#191919]">{g.name}</span>
                  <span className="rounded-full bg-[#B89B5E]/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8a7440]">
                    {g.status}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 08 certification ring */}
          <Reveal delay={160}>
            <div className="mx-auto mt-12 flex max-w-sm flex-col items-center md:mt-16">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <span className="absolute -inset-4 rounded-full bg-[#B89B5E]/10 blur-2xl" />
                <span className="absolute inset-0 rounded-full border-2 border-[#B89B5E]/40" />
                <span className="absolute inset-3 rounded-full border border-[#B89B5E]/25" />
                <span className="relative font-display text-7xl font-medium text-[#191919]">
                  {String(MUSIC.totalCertifications).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-6 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[#191919]">
                Trinity Certifications
              </p>
              <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-[#77736D]">
                Internationally accredited Trinity College London music certifications
              </p>
            </div>
          </Reveal>
        </div>

        {/* Quote 2 */}
        <Reveal delay={100}>
          <div className="mx-auto mt-16 max-w-2xl border-t border-[#E8DED0] pt-12 text-center md:mt-24">
            <p className="font-display text-[1.6rem] italic leading-[1.3] text-[#191919] md:text-[2.2rem]">
              "Where words fail, music speaks."
            </p>
            <p className="mt-4 font-display text-[14px] italic text-[#77736D]">
              — Hans Christian Andersen
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
