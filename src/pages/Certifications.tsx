import React, { useState } from 'react';
import { Award, BadgeCheck, ExternalLink, X } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { CERTIFICATIONS } from '../data/portfolioData';

/* Every VIEW CREDENTIAL button opens this profile in a new tab. */
const LINKEDIN_URL = 'https://www.linkedin.com/in/datta-srinikesh-chinta-986064333';

/* Issuer config: name → display properties */
const ISSUER_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  MongoDB: { label: 'MongoDB', icon: 'MDB', color: '#00ED64' },
  Anthropic: { label: 'Anthropic', icon: 'AN', color: '#D97706' },
  Google: { label: 'Google', icon: 'G', color: '#4285F4' },
  Oracle: { label: 'Oracle', icon: 'O', color: '#E02A2A' },
  Scaler: { label: 'Scaler', icon: 'SC', color: '#F27A18' },
  HackerRank: { label: 'HackerRank', icon: 'HR', color: '#2EC4B6' },
  Databricks: { label: 'Databricks', icon: 'DB', color: '#FF3621' },
};

/** Group certifications by issuer while preserving original order within each group. */
const grouped = (() => {
  const map = new Map<string, typeof CERTIFICATIONS>();
  for (const c of CERTIFICATIONS) {
    if (!map.has(c.issuer)) map.set(c.issuer, []);
    map.get(c.issuer)!.push(c);
  }
  // Deterministic: order by first appearance
  const order: string[] = [];
  for (const c of CERTIFICATIONS) {
    if (!order.includes(c.issuer)) order.push(c.issuer);
  }
  return order.map((issuer) => ({ issuer, certs: map.get(issuer)! }));
})();

export const Certifications: React.FC = () => {
  const [selected, setSelected] = React.useState<typeof CERTIFICATIONS[number] | null>(null);

  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Certifications"
        title={<>Credentials from the AI ecosystem.</>}
        description="Verified certifications across MongoDB, Anthropic, Google Cloud, Oracle, Databricks, HackerRank and Scaler."
      />

      <Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {grouped.map(({ issuer, certs }) => {
            const cfg = ISSUER_CONFIG[issuer] ?? { label: issuer, icon: issuer.slice(0, 2).toUpperCase(), color: '#8B7355' };
            return (
              <div
                key={issuer}
                className="glass holo-border group flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Issuer header */}
                <div className="flex items-center gap-3 border-b border-line/50 px-5 py-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-[13px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: cfg.color }}
                  >
                    {cfg.icon}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-ink">{cfg.label}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      {certs.length} {certs.length === 1 ? 'certification' : 'certifications'}
                    </p>
                  </div>
                </div>

                {/* Cert list */}
                <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                  {certs.map((cert) => (
                    <div
                      key={cert.id}
                      className="group/cert flex w-full items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-accent-gold/10"
                    >
                      <button
                        onClick={() => setSelected(cert)}
                        aria-label={`View details for ${cert.title}`}
                        className="flex min-w-0 flex-1 items-start gap-3 text-left"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/20">
                          <BadgeCheck className="h-3.5 w-3.5 text-accent-gold" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium leading-snug text-ink transition-colors group-hover/cert:text-accent-gold">
                            {cert.title}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-muted">{cert.date}</p>
                        </div>
                      </button>
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View credential for ${cert.title}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-wooddark px-3 py-2 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Credential
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Total count bar */}
      <Reveal>
        <div className="rounded-3xl border border-line bg-white/60 p-7 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {CERTIFICATIONS.length} verified certifications · Oracle · MongoDB · Anthropic · Google · Databricks · HackerRank · Scaler
          </p>
        </div>
      </Reveal>

      {/* Detail popup */}
      {selected && <CertDetailModal cert={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

/* ---------- Detail popup ---------- */

const CertDetailModal: React.FC<{ cert: typeof CERTIFICATIONS[number]; onClose: () => void }> = ({ cert, onClose }) => {
  const cfg = ISSUER_CONFIG[cert.issuer] ?? { label: cert.issuer, icon: cert.issuer.slice(0, 2).toUpperCase(), color: '#8B7355' };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-line bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mac-style controls */}
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <button onClick={onClose} className="h-3 w-3 rounded-full bg-[#E05555] transition-colors hover:bg-[#C33B3B]" aria-label="Close" />
          <span className="h-3 w-3 rounded-full bg-[#E0B04A]" />
          <span className="h-3 w-3 rounded-full bg-[#5EC45E]" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-white shadow-md"
              style={{ backgroundColor: cfg.color }}
            >
              {cfg.icon}
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{cert.issuer}</p>
              <h3 className="mt-1 font-display text-[17px] font-semibold leading-snug text-ink">{cert.title}</h3>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <InfoRow label="Issued" value={cert.date} />
            <InfoRow label="Issuer" value={cert.issuer} />
            {cert.credentialId && <InfoRow label="Credential ID" value={cert.credentialId} />}
          </div>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-wooddark px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <ExternalLink className="h-4 w-4" />
            View Credential
          </a>
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl bg-ink/5 px-4 py-3">
    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{label}</span>
    <span className="text-[13px] font-medium text-ink">{value}</span>
  </div>
);