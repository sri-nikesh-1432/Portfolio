import React, { useEffect, useState } from 'react';
import { BadgeCheck, ShieldCheck, X } from 'lucide-react';
import { submitEndorsement, EndorsementError } from '../../lib/endorsementsApi';
import { PERSONAL } from '../../data/portfolioData';

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
  'w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-[13.5px] text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/15';

export const EndorsementModal: React.FC<EndorsementModalProps> = ({
  open,
  skill,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [compliment, setCompliment] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      setName('');
      setRole('');
      setEmail('');
      setCompliment('');
      setConsent(false);
      setErrors({});
      setSubmitting(false);
      setSuccessCount(null);
    }
  }, [open, skill]);

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
    if (!name.trim()) next.name = 'Please enter your full name.';
    if (!role.trim()) next.role = 'Please enter your role or position.';
    if (!email.trim()) next.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email address.';
    if (!consent) next.consent = 'Please agree to display your name and role.';
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
        compliment: compliment.trim() || undefined,
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Endorse ${skill}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-white/80 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-teal text-white">
              <BadgeCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Endorse Skill
              </p>
              <p className="font-display text-[15px] font-semibold text-ink">
                Endorsing: <span className="text-accent-blue">{skill.toUpperCase()}</span>
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

        {/* Body */}
        {successCount !== null ? (
          <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-status-green/10 text-status-green">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">Endorsement Received</p>
              <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
                Thank you for endorsing {PERSONAL.firstName}'s {skill} skills.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-status-green/25 bg-status-green/10 px-4 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-status-green">
                <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-status-green" />
                Endorsed by {successCount} {successCount === 1 ? 'person' : 'people'}
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
          <form onSubmit={handleSubmit} noValidate className="term-scroll overflow-y-auto px-6 py-5">
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
                  className={`mt-1.5 ${inputClass} ${errors.name ? 'border-accent-red/50' : ''}`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-[12px] text-accent-red">{errors.name}</p>
                )}
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
                  className={`mt-1.5 ${inputClass} ${errors.role ? 'border-accent-red/50' : ''}`}
                />
                {errors.role && (
                  <p className="mt-1.5 text-[12px] text-accent-red">{errors.role}</p>
                )}
              </div>

              <div>
                <label htmlFor="end-email" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                  Email <span className="text-accent-red">*</span>
                </label>
                <input
                  id="end-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="name@example.com"
                  className={`mt-1.5 ${inputClass} ${errors.email ? 'border-accent-red/50' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-[12px] text-accent-red">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="end-compliment" className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                  Compliments or Suggestions (Optional)
                </label>
                <textarea
                  id="end-compliment"
                  value={compliment}
                  onChange={(e) => setCompliment(e.target.value)}
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
                    I agree to have my name and professional role displayed as an endorsement.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1.5 text-[12px] text-accent-red">{errors.consent}</p>
                )}
                <p className="mt-3 flex items-start gap-2 text-[11.5px] leading-relaxed text-muted">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-green" />
                  Your name, role, and email will be used only to record this professional
                  endorsement. Your email is never shown publicly.
                </p>
              </div>

              {errors.form && (
                <p className="rounded-xl bg-accent-red/8 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-accent-red">
                  {errors.form}
                </p>
              )}
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
                disabled={submitting}
                className="holo-sheen inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {submitting ? 'Submitting...' : 'Submit Endorsement'}
                <BadgeCheck className="h-3.5 w-3.5 text-accent-teal" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
