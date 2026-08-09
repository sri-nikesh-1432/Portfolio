import React from 'react';
import { Minus, Plus, Volume2 } from 'lucide-react';
import type { PianoSound } from '../../hooks/usePianoAudio';

interface PianoControlsProps {
  octave: number;
  onOctaveChange: (o: number) => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  sustain: boolean;
  onSustainChange: (on: boolean) => void;
  sound: PianoSound;
  onSoundChange: (s: PianoSound) => void;
}

export const PianoControls: React.FC<PianoControlsProps> = ({
  octave,
  onOctaveChange,
  volume,
  onVolumeChange,
  sustain,
  onSustainChange,
  sound,
  onSoundChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Octave */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">Octave</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOctaveChange(Math.max(-2, octave - 1))}
            disabled={octave <= -2}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white/70 text-muted transition-all duration-200 hover:-translate-y-px hover:border-accent-blue/40 hover:text-accent-blue disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Lower octave"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center font-mono text-[12px] font-semibold text-ink">
            {octave >= 0 ? `+${octave}` : octave}
          </span>
          <button
            type="button"
            onClick={() => onOctaveChange(Math.min(3, octave + 1))}
            disabled={octave >= 3}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white/70 text-muted transition-all duration-200 hover:-translate-y-px hover:border-accent-blue/40 hover:text-accent-blue disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Raise octave"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <Volume2 className="h-4 w-4 shrink-0 text-muted" />
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
          className="h-1.5 w-full cursor-pointer accent-[#B0893F]"
          aria-label="Volume"
        />
        <span className="w-9 text-right font-mono text-[10.5px] text-muted">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Sustain toggle */}
      <button
        type="button"
        onClick={() => onSustainChange(!sustain)}
        aria-pressed={sustain}
        className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all duration-200 ${
          sustain
            ? 'border-accent-gold/50 bg-accent-gold/12 text-accent-gold'
            : 'border-line bg-white/60 text-muted hover:border-accent-gold/35'
        }`}
      >
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em]">Sustain</span>
        <span
          className={`relative h-4 w-8 rounded-full transition-colors duration-200 ${
            sustain ? 'bg-accent-gold' : 'bg-ink/15'
          }`}
        >
          <span
            className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-all duration-200 ${
              sustain ? 'left-[18px]' : 'left-0.5'
            }`}
          />
        </span>
      </button>

      {/* Sound */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">Sound</span>
        <select
          value={sound}
          onChange={(e) => onSoundChange(e.target.value as PianoSound)}
          className="rounded-lg border border-line bg-white/80 px-3 py-2 font-mono text-[11px] text-ink outline-none transition-colors focus:border-accent-blue/60"
          aria-label="Sound"
        >
          <option value="piano">Piano</option>
          <option value="epiano">E-Piano</option>
          <option value="strings">Strings</option>
        </select>
      </div>
    </div>
  );
};
