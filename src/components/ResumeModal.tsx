import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Download, FileText, X } from 'lucide-react';
import { ResumeContent } from './ResumeContent';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    const { downloadResumePdf } = await import('../lib/resumePdf');
    downloadResumePdf();
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex h-[min(680px,90vh)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Resume preview"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-white/80 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-lavender text-white">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Document
              </p>
              <p className="font-display text-[15px] font-semibold text-ink">Resume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close resume preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Live resume preview (real selectable HTML) */}
        <div className="term-scroll flex-1 overflow-y-auto bg-white">
          <ResumeContent />
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line bg-white/80 px-5 py-4">
          <button
            onClick={handleDownload}
            className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Download className="h-4 w-4 text-accent-teal" />
            Download PDF
          </button>
          <button
            onClick={() => navigate('/resume')}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:text-accent-blue"
          >
            Open Full Resume
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
