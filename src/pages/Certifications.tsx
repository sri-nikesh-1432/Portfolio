import React from 'react';
import { Award, BadgeCheck } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { CERTIFICATIONS } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Certifications"
        title={<>Credentials from the AI ecosystem.</>}
        description="Verified certifications across Oracle, MongoDB, Anthropic, Google Cloud, Databricks, HackerRank and Scaler."
      />

      <Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <article
              key={cert.id}
              className="glass glass-hover group flex items-start gap-3.5 rounded-2xl p-5"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-card"
                style={{ backgroundColor: cert.issuerColor }}
              >
                <Award className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] opacity-80" style={{ color: cert.issuerColor }}>
                  {cert.issuer} · {cert.date}
                </p>
                <h3 className="mt-1 text-[14px] font-medium leading-snug text-ink">{cert.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">{cert.description}</p>
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-status-green">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified credential
                </p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-3xl border border-line bg-white/60 p-7 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {CERTIFICATIONS.length} certifications · Oracle · MongoDB · Anthropic · Google · Databricks · HackerRank · Scaler
          </p>
        </div>
      </Reveal>
    </div>
  );
};
