import React, { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, Search, X } from 'lucide-react';
import type { PublicEndorsement } from '../../lib/endorsementsApi';

interface EndorsementListModalProps {
  open: boolean;
  skill: string;
  endorsements: PublicEndorsement[];
  onClose: () => void;
}

type SortMode = 'newest' | 'oldest';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export const EndorsementListModal: React.FC<EndorsementListModalProps> = ({
  open,
  skill,
  endorsements,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('newest');

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSort('newest');
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? endorsements.filter(
          (e) => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)
        )
      : [...endorsements];
    return list.sort((a, b) =>
      sort === 'newest' ? (a.date < b.date ? 1 : -1) : a.date < b.date ? -1 : 1
    );
  }, [endorsements, query, sort]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Endorsements for ${skill}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-white/80 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-gold to-accent-copper text-white">
              <BadgeCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Endorsements
              </p>
              <p className="font-display text-[15px] font-semibold text-ink">
                {skill}{' '}
                <span className="text-[12px] font-medium text-muted">
                  · {endorsements.length} {endorsements.length === 1 ? 'person' : 'people'}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close endorsements"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search + sort */}
        <div className="flex flex-wrap items-center gap-3 border-b border-line bg-white/60 px-5 py-3.5">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or role..."
              className="w-full rounded-xl border border-line bg-white/80 py-2.5 pl-9 pr-3 text-[13px] text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-accent-gold/60 focus:ring-2 focus:ring-accent-gold/15"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="rounded-xl border border-line bg-white/80 px-3 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink outline-none transition-colors focus:border-accent-gold/60"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* List */}
        <div className="term-scroll flex-1 overflow-y-auto px-5 py-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <BadgeCheck className="h-8 w-8 text-faint" />
              <p className="text-[13.5px] font-medium text-inkSoft">
                {query ? 'No endorsements match your search.' : 'No endorsements yet.'}
              </p>
              <p className="text-[12.5px] text-muted">Be the first to endorse {skill}.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl border border-line bg-white/70 p-4 transition-colors hover:border-accent-gold/30"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{e.name}</p>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
                      {formatDate(e.date)}
                    </p>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-gold">
                    {e.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="border-t border-line bg-white/80 px-5 py-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
            Public endorsements — names and roles only. Emails and suggestions stay private.
          </p>
        </div>
      </div>
    </div>
  );
};
