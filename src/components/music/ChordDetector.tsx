import React, { useMemo } from 'react';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const PATTERNS: [number[], string][] = [
  [[0, 4, 7], 'Major'],
  [[0, 3, 7], 'Minor'],
  [[0, 5, 7], 'Sus4'],
  [[0, 2, 7], 'Sus2'],
  [[0, 4, 8], 'Augmented'],
  [[0, 3, 6], 'Diminished'],
];

export function detectChord(activeMidis: number[]): string | null {
  if (activeMidis.length < 3) return null;
  const pcs = [...new Set(activeMidis.map((m) => ((m % 12) + 12) % 12))];
  for (const root of pcs) {
    for (const [pattern, name] of PATTERNS) {
      if (pattern.every((interval) => pcs.includes((root + interval) % 12))) {
        return `${NOTE_NAMES[root]} ${name}`;
      }
    }
  }
  return 'Unknown Chord';
}

interface ChordDetectorProps {
  activeMidis: number[];
}

export const ChordDetector: React.FC<ChordDetectorProps> = ({ activeMidis }) => {
  const chord = useMemo(() => detectChord(activeMidis), [activeMidis]);

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">Chord</span>
      <span
        className={`rounded-lg border px-3 py-1.5 font-display text-[13px] font-medium transition-all duration-200 ${
          chord
            ? 'border-accent-gold/40 bg-accent-gold/10 text-accent-gold'
            : 'border-line bg-white/50 text-faint'
        }`}
      >
        {chord ?? '—'}
      </span>
    </div>
  );
};
