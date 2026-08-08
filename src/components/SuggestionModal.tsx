import React, { useEffect, useState } from 'react';
import { Lightbulb, Mail, Send, X } from 'lucide-react';
import { PERSONAL } from '../data/portfolioData';

interface SuggestionModalProps {
  open: boolean;
  projectName: string;
  onClose: () => void;
}

export const SuggestionModal: React.FC<SuggestionModalProps> = ({ open, projectName, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setName('');
      setContact('');
      setMessage('');
      setSent(false);
    }
  }, [open]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[Portfolio] Suggestion for ${projectName}`;
    const body = [
      'Hi Srinikesh,',
      '',
      `Project: ${projectName}`,
      '',
      `Name: ${name}`,
      `Contact: ${contact}`,
      '',
      'Message:',
      message,
      '',
      '---',
      'Sent from your portfolio',
    ].join('\n');
    const mailto = `mailto:${PERSONAL.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    // A temporary anchor click is more reliable than location.href on iOS/Safari.
    const anchor = document.createElement('a');
    anchor.href = mailto;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setSent(true);
  };

  const inputClass =
    'w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-[13.5px] text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/15';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Suggestion form"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-white/80 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-gold to-accent-red text-white">
              <Lightbulb className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Help build
              </p>
              <p className="truncate font-display text-[15px] font-semibold text-ink">
                {projectName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close suggestion form"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        {sent ? (
          <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-status-green/10 text-status-green">
              <Mail className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">Almost done!</p>
              <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
                Your email app should have opened with everything pre-filled for{' '}
                <span className="font-medium text-ink">{PERSONAL.email}</span>. Just press send —
                it reaches Srinikesh directly.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 rounded-xl bg-ink px-6 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="term-scroll overflow-y-auto px-6 py-5">
            <div className="space-y-4">
              <div>
                <label htmlFor="sug-name" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                  Your name
                </label>
                <input
                  id="sug-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="What should I call you?"
                  className={`mt-1.5 ${inputClass}`}
                />
              </div>
              <div>
                <label htmlFor="sug-contact" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                  Contact details
                </label>
                <input
                  id="sug-contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  placeholder="Email or phone so I can reply"
                  className={`mt-1.5 ${inputClass}`}
                />
              </div>
              <div>
                <label htmlFor="sug-message" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                  Query / suggestion
                </label>
                <textarea
                  id="sug-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder={`What would you add, fix or build in ${projectName}?`}
                  className={`mt-1.5 resize-none ${inputClass}`}
                />
              </div>
              <p className="flex items-start gap-2 rounded-xl bg-accent-blue/6 px-3.5 py-2.5 text-[12px] leading-relaxed text-inkSoft">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" />
                Pressing send opens your email app with everything pre-filled for{' '}
                <span className="font-medium">{PERSONAL.email}</span>. Nothing is stored anywhere.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-line bg-white/70 px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Send to Srinikesh
                <Send className="h-3.5 w-3.5 text-accent-teal" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
