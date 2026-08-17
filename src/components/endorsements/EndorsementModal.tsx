import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BadgeCheck, ShieldCheck, X } from 'lucide-react';
import { submitEndorsement, EndorsementError } from '../../lib/endorsementsApi';
import { SkillLogo } from '../skills/SkillLogo';

interface EndorsementModalProps {
  open: boolean;
  skill: string;
  onClose: () => void;
  onSuccess: (count: number) => void;
}

interface FormErrors {
  name?: string;
  role?: string;
  email?: string;
  consent?: string;
  form?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  'w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-[13.5px] text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-accent-gold/60 focus:ring-2 focus:ring-accent-gold/15';

export const EndorsementModal: React.FC<EndorsementModalProps> = ({
  open,
  skill,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successCount, setSuccessCount] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const successCloseRef = useRef<HTMLButtonElement>(null);

  // When the form resolves to the success panel, move focus there so keyboard
  // users land on the confirmation instead of a now-removed submit button.
  useEffect(() => {
    if (successCount !== null) {
      successCloseRef.current?.focus();
    }
  }, [successCount]);

  useEffect(() => {
    if (open) {
      setName('');
      setRole('');
      setEmail('');
      setSuggestion('');
      setConsent(false);
      setErrors({});
      setSubmitting(false);
      setSuccessCount(null);
    }
  }, [open, skill]);

  // Body scroll lock + focus trap + Escape to close. The page behind never
  // scrolls while the modal is open; only the modal's own area scrolls, so
  // every field and the submit button stay reachable on small screens.
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const modal = modalRef.current;
    const focusables = () =>
      modal
        ? Array.from(
            modal.querySelectorAll<HTMLElement>(
              'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]'
            )
          )
        : [];

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !modal?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !modal?.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    const focusTimer = window.setTimeout(() => {
      modal?.querySelector<HTMLElement>('#end-name')?.focus();
    }, 60);

    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!role.trim()) next.role = 'Please enter your role or position.';
    if (!email.trim()) next.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email address.';
    if (!consent) next.consent = 'Please agree to display your name, role and email.';
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    try {
      const result = await submitEndorsement({
        skill,
        name: name.trim(),
        role: role.trim(),
        email: email.trim(),
        suggestion: suggestion.trim() || undefined,
        consent,
      });
      setSuccessCount(result.count);
      onSuccess(result.count);
    } catch (err) {
      if (err instanceof EndorsementError && err.fields) {
        setErrors((prev) => ({
          ...prev,
          name: err.fields?.name,
          role: err.fields?.role,
          email: err.fields?.email,
          consent: err.fields?.consent,
          form: err.message,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  // The modal is rendered through a portal into document.body so it is fully
  // independent of the Skills grid layout and any stacking context — it never
  // occupies a grid/card position.
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
        aria-label={`Endorse ${skill}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — always visible */}
        <div className="flex shrink-0 items-center justify-between border-b border-line bg-white/80 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-gold to-accent-copper text-white">
              <BadgeCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Endorse Skill
              </p>
              <p className="font-display text-[15px] font-semibold text-ink">
                Endorsing: <span className="text-accent-gold">{skill.toUpperCase()}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close endorsement form"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — the only scrollable region */}
        {successCount !== null ? (
          <div
            aria-live="polite"
            className="endorse-scroll flex min-h-0 flex-1 flex-col items-center gap-4 overflow-y-auto px-8 py-12 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-status-green/30 bg-status-green/10 text-status-green shadow-[0_10px_30px_-10px_rgba(94,140,74,0.5)]">
              <BadgeCheck className="h-8 w-8" />
            </span>
            <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
              Endorsement Received
            </p>
            <p className="mx-auto max-w-sm text-[13.5px] leading-relaxed text-muted">
              Thank you, {name}. Your endorsement for {skill} has been recorded successfully.
            </p>
            <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-status-green/25 bg-status-green/10 px-4 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-status-green">
              <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-status-green" />
              Endorsed by {successCount} {successCount === 1 ? 'person' : 'people'}
            </p>
            <button
              ref={successCloseRef}
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-wooddark px-6 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EBDC] shadow-brass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
            {/* Scrollable form content */}
            <div className="endorse-scroll min-h-0 flex-1 overflow-y-auto px-6 py-5">
              {/* Skill banner */}
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-accent-gold/25 bg-gradient-to-r from-white/70 to-[#F6EBD3] p-4">
                <SkillLogo skill={skill} size="md" />
                <div className="text-left">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    You are endorsing
                  </p>
                  <p className="font-display text-[17px] font-semibold tracking-tight text-ink">
                    {skill.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="end-name" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Full name <span className="text-accent-red">*</span>
                  </label>
                  <input
                    id="end-name"
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
                  <label htmlFor="end-role" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Role / Position <span className="text-accent-red">*</span>
                  </label>
                  <input
                    id="end-role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }));
                    }}
                    placeholder="Software Engineer"
                    maxLength={100}
                    className={`mt-1.5 ${inputClass} ${errors.role ? 'border-accent-red/50' : ''}`}
                  />
                  {errors.role && <p className="mt-1.5 text-[12px] text-accent-red">{errors.role}</p>}
                </div>

                <div>
                  <label htmlFor="end-email" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Email address <span className="text-accent-red">*</span>
                  </label>
                  <input
                    id="end-email"
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
                  <label htmlFor="end-suggestion" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    Compliment / Suggestion{' '}
                    <span className="rounded-full border border-faint/40 bg-faint/10 px-1.5 py-0.5 text-[8.5px] tracking-[0.14em] text-faint">
                      Optional
                    </span>
                  </label>
                  <textarea
                    id="end-suggestion"
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    rows={3}
                    maxLength={500}
                    placeholder="Share a short compliment, feedback, or suggestion..."
                    className={`mt-1.5 resize-none ${inputClass}`}
                  />
                </div>

                {/* Consent + privacy notice */}
                <div className="rounded-xl border border-line bg-white/70 p-4">
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#B0893F]"
                    />
                    <span className="text-[12.5px] leading-relaxed text-inkSoft">
                      I agree to have my name and role displayed publicly as an endorsement.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1.5 text-[12px] text-accent-red">{errors.consent}</p>
                  )}
                  <p className="mt-3 flex items-start gap-2 text-[11.5px] leading-relaxed text-muted">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-green" />
                    Your name and role appear publicly as social proof. Your email and suggestion
                    are private — they are sent only to the site owner.
                  </p>
                </div>

                {errors.form && (
                  <p className="rounded-xl bg-accent-red/8 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-accent-red">
                    {errors.form}
                  </p>
                )}
              </div>
            </div>

            {/* Footer — always visible, outside the scroll area */}
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
                {submitting ? 'Submitting...' : `Endorse ${skill}`}
                <BadgeCheck className="h-3.5 w-3.5 text-accent-gold" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
