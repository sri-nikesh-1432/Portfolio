import React from 'react';
import { Music2, Piano, Star } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { MUSIC } from '../data/portfolioData';

export const Music: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Music"
        title={<>Engineer by day, pianist by training.</>}
        description="Trinity College London certified piano training — the discipline, pattern recognition and structure that quietly shows up in everything I build."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Institution card */}
        <Reveal>
          <div className="glass holo-border relative h-full overflow-hidden rounded-3xl p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-gold/12 blur-3xl" />
            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-gold to-accent-red text-white shadow-lift">
                <Music2 className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium text-ink">{MUSIC.institution}</h3>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent-gold">
                {MUSIC.qualification}
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{MUSIC.description}</p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-white/60 p-4">
                <Piano className="h-5 w-5 text-accent-gold" />
                <div>
                  <p className="text-[13.5px] font-medium text-ink">{MUSIC.instrument}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {MUSIC.totalCertifications} certifications completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Grades */}
        <Reveal delay={120}>
          <div className="grid gap-4 sm:grid-cols-2">
            {MUSIC.grades.map((g) => (
              <div key={g.name} className="glass glass-hover flex flex-col justify-between rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-lavender text-white">
                    <Star className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-status-green/10 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-status-green">
                    {g.status}
                  </span>
                </div>
                <div className="mt-6">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">{g.level}</p>
                  <p className="mt-1 font-display text-xl font-medium text-ink">{g.name}</p>
                  <p className="mt-1 text-[12.5px] text-muted">Trinity College London · OFQUAL</p>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="glass holo-border flex flex-col items-center justify-center rounded-3xl p-6 text-center sm:col-span-2">
              <p className="font-display text-5xl font-medium text-ink">
                <span className="holo-text">{String(MUSIC.totalCertifications).padStart(2, '0')}</span>
              </p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                Trinity Music Certifications
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
