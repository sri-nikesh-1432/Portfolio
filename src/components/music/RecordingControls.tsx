import React from 'react';
import { Play, Square } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  isPlaying: boolean;
  elapsed: number;
  hasRecording: boolean;
  onToggleRecord: () => void;
  onPlay: () => void;
  onStopPlayback: () => void;
  onClear: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  isPlaying,
  elapsed,
  hasRecording,
  onToggleRecord,
  onPlay,
  onStopPlayback,
  onClear,
}) => {
  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={onToggleRecord}
        className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
          isRecording
            ? 'border-accent-red/50 bg-accent-red/10 text-accent-red'
            : 'border-line bg-white/70 text-muted hover:-translate-y-px hover:border-accent-red/40 hover:text-accent-red'
        }`}
        aria-label={isRecording ? 'Stop recording' : 'Record'}
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          {isRecording && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-red/60" />
          )}
          <span
            className={`relative h-2 w-2 rounded-full ${isRecording ? 'bg-accent-red' : 'bg-accent-red/60'}`}
          />
        </span>
        {isRecording ? 'Recording' : 'Record'}
      </button>

      {isRecording && (
        <span className="font-mono text-[12px] font-semibold tabular-nums text-accent-red">
          {formatTime(elapsed)}
        </span>
      )}

      <button
        type="button"
        onClick={isPlaying ? onStopPlayback : onPlay}
        disabled={!hasRecording || isRecording}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-3.5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted transition-all duration-200 hover:-translate-y-px hover:border-accent-blue/40 hover:text-accent-blue disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={isPlaying ? 'Stop playback' : 'Play recording'}
      >
        {isPlaying ? <Square className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        {isPlaying ? 'Playing' : 'Play'}
      </button>

      {hasRecording && !isRecording && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl px-2.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-accent-red"
        >
          Clear
        </button>
      )}
    </div>
  );
};
