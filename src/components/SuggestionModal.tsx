import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Lightbulb, Mail, Send, X } from 'lucide-react';
import { submitSuggestion, SuggestionError } from '../lib/suggestionsApi';

interface SuggestionModalProps {
  open: boolean;
  projectName: string;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  idea?: string;
  form?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  'w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-[13.5px] text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/15';

export const SuggestionModal: React.FC<SuggestionModalProps> = ({ open, projectName, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [idea, setIdea] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setName('');
      setEmail('');
      setRole('');
      setIdea('');
      setErrors({});
      setSubmitting(false);
      setSent(false);
    }
  }, [open, projectName]);

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

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!email.trim()) next.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email address.';
    if (!idea.trim()) next.idea = 'Please describe your idea or suggestion.';
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    try {
      await submitSuggestion({
        name: name.trim(),
        email: email.trim(),
        idea: idea.trim(),
        role: role.trim() || undefined,
        project: projectName,
      });
      setSent(true);
    } catch (err) {
      if (err instanceof SuggestionError && err.fields) {
        setErrors((prev) => ({
          ...prev,
          name: err.fields?.name,
          email: err.fields?.email,
          idea: err.fields?.idea,
          form: err.message,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: err instanceof Error ? err.message : 'Unable to send your suggestion right now. Please try again.',
        }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="animate-modalBackdrop fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      style={{ backgroundColor: 'rgba(20, 15, 10, 0.45)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="animate-modalPop flex max-h-[92vh] w-[calc(100%-24px)] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl sm:max-h-[90vh] sm:w-[calc(100%-40px)] sm:max-w-[680px]"
        role="dialog"
        aria-modal="true"
        aria-label="Suggestion form"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-line bg-white/80 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-gold to-accent-red text-white">
              <Lightbulb className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Suggest an idea
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

        {/* Body */}
        {sent ? (
          <div
            aria-live="polite"
            className="flex min-h-0 flex-1 flex-col items-center gap-4 overflow-y-auto px-8 py-12 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-status-green/30 bg-status-green/10 text-status-green shadow-[0_10px_30px_-10px_rgba(94,140,74,0.5)]">
              <Mail className="h-7 w-7" />
            </span>
            <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
              Suggestion sent successfully
            </p>
            <p className="mx-auto max-w-sm text-[13.5px] leading-relaxed text-muted">
              Thank you for helping shape what I build next.
            </p>
            <button
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-wooddark px-6 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
            {/* Scrollable form content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                <div>
                  <label htmlFor="sug-name" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Full name <span className="text-accent-red">*</span>
                  </label>
                  <input
                    id="sug-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Your name"
                    maxLength={80}
                    className={`mt-1.5 ${inputClass} ${errors.name ? 'border-accent-red/50' : ''}`}
                  />
                  {errors.name && <p className="mt-1.5 text-[12px] text-accent-red">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="sug-email" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Email <span className="text-accent-red">*</span>
                  </label>
                  <input
                    id="sug-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    maxLength={254}
                    className={`mt-1.5 ${inputClass} ${errors.email ? 'border-accent-red/50' : ''}`}
                  />
                  {errors.email && <p className="mt-1.5 text-[12px] text-accent-red">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="sug-role" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Company / Role{' '}
                    <span className="rounded-full border border-faint/40 bg-faint/10 px-1.5 py-0.5 text-[8.5px] tracking-[0.14em] text-faint">
                      Optional
                    </span>
                  </label>
                  <input
                    id="sug-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Software Engineer"
                    maxLength={100}
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="sug-idea" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Your idea / suggestion <span className="text-accent-red">*</span>
                  </label>
                  <textarea
                    id="sug-idea"
                    value={idea}
                    onChange={(e) => {
                      setIdea(e.target.value);
                      if (errors.idea) setErrors((prev) => ({ ...prev, idea: undefined }));
                    }}
                    rows={4}
                    maxLength={2000}
                    placeholder={`What would you add, fix or build in ${projectName}?`}
                    className={`mt-1.5 resize-none ${inputClass} ${errors.idea ? 'border-accent-red/50' : ''}`}
                  />
                  {errors.idea && <p className="mt-1.5 text-[12px] text-accent-red">{errors.idea}</p>}
                </div>

                <p className="flex items-start gap-2 rounded-xl bg-accent-blue/6 px-3.5 py-2.5 text-[12px] leading-relaxed text-inkSoft">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" />
                  Your suggestion is sent directly to the site owner. Your email is used only so
                  they can reply to you — it is never shown publicly.
                </p>

                {errors.form && (
                  <p className="rounded-xl bg-accent-red/8 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-accent-red">
                    {errors.form}
                  </p>
                )}
              </div>
            </div>

            {/* Footer — always visible */}
            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-line bg-white/80 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-line bg-white/70 px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-wooddark px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {submitting ? 'Submitting...' : 'Send Suggestion'}
                <Send className="h-3.5 w-3.5 text-accent-teal" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
