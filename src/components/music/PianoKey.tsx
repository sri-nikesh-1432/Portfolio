import React from 'react';

interface PianoKeyProps {
  midi: number;
  black: boolean;
  leftPercent?: number;
  label?: string;
  hint?: string;
  pressed: boolean;
  onPress: (midi: number) => void;
  onRelease: (midi: number) => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({
  midi,
  black,
  leftPercent,
  label,
  hint,
  pressed,
  onPress,
  onRelease,
}) => {
  const release = () => onRelease(midi);
  const press = (e: React.PointerEvent) => {
    e.preventDefault();
    onPress(midi);
  };

  if (black) {
    return (
      <button
        type="button"
        aria-label={label ?? `Note ${midi}`}
        onPointerDown={press}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        className={`absolute top-0 z-10 h-[60%] touch-none rounded-b-[4px] border-x border-b border-black/60 transition-all duration-75 ${
          pressed
            ? 'translate-y-[3px] bg-gradient-to-b from-[#3b3228] to-[#1d1812] shadow-[inset_0_2px_4px_rgba(0,0,0,0.75)]'
            : 'bg-gradient-to-b from-[#2e2822] via-[#241f19] to-[#191410] shadow-[0_4px_6px_rgba(0,0,0,0.45),inset_0_-2px_4px_rgba(0,0,0,0.5)]'
        }`}
        style={{ left: `${leftPercent ?? 0}%` }}
      >
        {hint && (
          <span
            className={`pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[7.5px] font-medium uppercase ${
              pressed ? 'text-[#a08040]' : 'text-[#6e6253]'
            }`}
          >
            {hint}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={label ?? `Note ${midi}`}
      onPointerDown={press}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      className={`relative flex-1 touch-none rounded-b-[5px] border-x border-b border-[#c9bda9]/80 transition-all duration-75 ${
        pressed
          ? 'translate-y-[2px] bg-gradient-to-b from-[#e6dcc8] to-[#d2c4ab] shadow-[inset_0_3px_6px_rgba(60,40,15,0.35)]'
          : 'bg-gradient-to-b from-[#fdfaf3] via-[#f5efe2] to-[#e5dac6] shadow-[inset_0_-5px_7px_rgba(90,60,25,0.12),0_2px_3px_rgba(40,25,8,0.25)]'
      }`}
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-1 flex flex-col items-center gap-0.5">
        {label && (
          <span className="font-mono text-[7.5px] uppercase tracking-wide text-[#a08a68]">
            {label}
          </span>
        )}
        {hint && (
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-[4px] border font-mono text-[7.5px] font-semibold uppercase ${
              pressed
                ? 'border-[#b0893f]/60 bg-[#b0893f]/20 text-[#7a5a20]'
                : 'border-[#c9bda9]/80 bg-white/70 text-[#8a6a3a]'
            }`}
          >
            {hint}
          </span>
        )}
      </span>
    </button>
  );
};
