import React, { useEffect } from 'react';
import { ExternalLink, Github, CheckCircle2, X } from 'lucide-react';
import type { MiniProject } from '../../types';

interface Props {
  project: MiniProject;
  open: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<Props> = ({ project, open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-2 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[calc(100dvh-16px)] w-[calc(100vw-16px)] max-w-[560px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-48px)] sm:w-[min(560px,calc(100vw-32px))]"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mac-style controls */}
        <div className="flex shrink-0 items-center gap-2 border-b border-line bg-gradient-to-r from-[#F6F1E7] to-white px-4 py-3">
          <div className="flex items-center gap-1.5">
            <button onClick={onClose} className="h-3.5 w-3.5 rounded-full bg-[#E05555] transition-colors hover:bg-[#C33B3B]" aria-label="Close" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#E0B04A]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#5EC45E]" />
          </div>
          <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            {project.title}
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-semibold leading-tight text-ink">{project.title}</h2>
            {project.organization && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{project.organization}</span>
            )}
          </div>
          <p className="mt-1 font-mono text-[10px] text-muted">{project.date}</p>

          {/* Overview */}
          <p className="mt-5 text-[14px] leading-relaxed text-inkSoft">{project.overview}</p>

          {/* Features */}
          <div className="mt-6">
            <h3 className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">Key Features</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-[13px] text-inkSoft">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-green" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-6">
            <h3 className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">Technologies</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-md border border-line bg-white/70 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ML Concepts */}
          {project.concepts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">ML Concepts</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.concepts.map((c) => (
                  <span key={c} className="rounded-md border border-accent-gold/25 bg-accent-gold/10 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-accent-gold">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-gold/40 hover:text-accent-gold"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};