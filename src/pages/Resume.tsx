import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Printer } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { ResumeContent } from '../components/ResumeContent';

export const Resume: React.FC = () => {
  const handleDownload = async () => {
    const { downloadResumePdf } = await import('../lib/resumePdf');
    downloadResumePdf();
  };

  return (
    <div className="space-y-8">
      {/* Action bar */}
      <div className="no-print flex flex-wrap items-end justify-between gap-5">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-accent-blue">
            <FileText className="h-3.5 w-3.5" />
            Document
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
            Resume
          </h1>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted">
            A clean, ATS-friendly version of my professional profile — the same data as the Experience
            section, formatted for recruiters and machines alike.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <Download className="h-4 w-4 text-accent-teal" />
              Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:text-accent-blue"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:text-accent-blue"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Resume sheet (rendered live — text stays selectable) */}
      <div
        id="resume-print"
        className="resume-print-area mx-auto max-w-[860px] overflow-hidden rounded-2xl border border-line bg-white shadow-lift"
      >
        <ResumeContent />
      </div>
    </div>
  );
};
