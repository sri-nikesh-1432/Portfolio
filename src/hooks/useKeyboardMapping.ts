import { useEffect } from 'react';

/* Computer keyboard -> pitch class within one octave (A = C, W = C#, ...) */
export const KEY_TO_PC: Record<string, number> = {
  a: 0,
  w: 1,
  s: 2,
  e: 3,
  d: 4,
  f: 5,
  t: 6,
  g: 7,
  y: 8,
  h: 9,
  u: 10,
  j: 11,
};

export const KEY_LABELS: { key: string; pc: number }[] = Object.entries(KEY_TO_PC).map(
  ([key, pc]) => ({ key, pc })
);

export function useKeyboardMapping(
  baseMidi: number,
  onNoteOn: (midi: number) => void,
  onNoteOff: (midi: number) => void
) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const pc = KEY_TO_PC[e.key.toLowerCase()];
      if (pc === undefined) return;
      if (e.repeat) return;
      e.preventDefault();
      onNoteOn(baseMidi + pc);
    };
    const up = (e: KeyboardEvent) => {
      const pc = KEY_TO_PC[e.key.toLowerCase()];
      if (pc === undefined) return;
      e.preventDefault();
      onNoteOff(baseMidi + pc);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [baseMidi, onNoteOn, onNoteOff]);
}
