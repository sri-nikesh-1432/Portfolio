import React from 'react';
import { PianoKey } from './PianoKey';
import { KEY_TO_PC } from '../../hooks/useKeyboardMapping';
import { midiToNote } from '../../hooks/usePianoAudio';

const BLACK_PCS = new Set([1, 3, 6, 8, 10]);
const WHITE_PCS = [0, 2, 4, 5, 7, 9, 11];

interface PianoKeyboardProps {
  baseMidi: number;
  octaves: number;
  activeMidis: ReadonlySet<number>;
  onNoteOn: (midi: number) => void;
  onNoteOff: (midi: number) => void;
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  baseMidi,
  octaves,
  activeMidis,
  onNoteOn,
  onNoteOff,
}) => {
  const start = baseMidi;
  const end = baseMidi + octaves * 12 - 1;

  const whites: number[] = [];
  const blacks: number[] = [];
  for (let m = start; m <= end; m++) {
    const pc = ((m % 12) + 12) % 12;
    if (BLACK_PCS.has(pc)) blacks.push(m);
    else whites.push(m);
  }

  const whitePct = 100 / whites.length;
  const blackWidth = whitePct * 0.62;

  // Hint letters for keys that have a computer-keyboard mapping
  const hintFor = (midi: number): string | undefined => {
    const pc = ((midi % 12) + 12) % 12;
    return Object.keys(KEY_TO_PC).find((k) => KEY_TO_PC[k] === pc);
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative h-44 w-full min-w-[560px] rounded-b-[8px] border border-[#5c4a33] bg-[#3d2e1d] p-[3px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] sm:h-52">
        {/* White keys */}
        <div className="flex h-full w-full gap-[1px]">
          {whites.map((m) => (
            <PianoKey
              key={m}
              midi={m}
              black={false}
              label={midiToNote(m)}
              hint={hintFor(m)}
              pressed={activeMidis.has(m)}
              onPress={onNoteOn}
              onRelease={onNoteOff}
            />
          ))}
        </div>

        {/* Black keys — positioned at the boundary of the white key to their left */}
        {blacks.map((m) => {
          const leftWhiteIndex = whites.indexOf(m - 1);
          const boundary = leftWhiteIndex + 1;
          const left = boundary * whitePct - blackWidth / 2;
          return (
            <PianoKey
              key={m}
              midi={m}
              black
              leftPercent={left}
              hint={hintFor(m)}
              pressed={activeMidis.has(m)}
              onPress={onNoteOn}
              onRelease={onNoteOff}
            />
          );
        })}
      </div>
    </div>
  );
};
