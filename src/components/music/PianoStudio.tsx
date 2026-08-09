import React, { useCallback, useEffect, useState } from 'react';
import { Music2, Piano } from 'lucide-react';
import { MUSIC } from '../../data/portfolioData';
import { usePianoAudio, midiToNote } from '../../hooks/usePianoAudio';
import { useKeyboardMapping } from '../../hooks/useKeyboardMapping';
import { usePianoRecording } from '../../hooks/usePianoRecording';
import { PianoKeyboard } from './PianoKeyboard';
import { PianoControls } from './PianoControls';
import { NoteVisualizer } from './NoteVisualizer';
import { ChordDetector } from './ChordDetector';
import { RecordingControls } from './RecordingControls';
import { Reveal } from '../Reveal';
import type { PianoSound } from '../../hooks/usePianoAudio';

const OCTAVES = 2;

export const PianoStudio: React.FC = () => {
  const { playNote, releaseNote, setVolume, setSustain, setSound, stopAll, getAnalyser } =
    usePianoAudio();
  const recording = usePianoRecording();

  const [status, setStatus] = useState<'initializing' | 'ready'>('initializing');
  const [octave, setOctave] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [sustain, setSustainState] = useState(false);
  const [sound, setSoundState] = useState<PianoSound>('piano');
  const [activeMidis, setActiveMidis] = useState<Set<number>>(new Set());
  const [lastNotes, setLastNotes] = useState<number[]>([]);

  const baseMidi = 48 + octave * 12;

  useEffect(() => {
    const t = window.setTimeout(() => setStatus('ready'), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  // Release any stuck notes if the window loses focus mid-press
  useEffect(() => {
    const blur = () => {
      stopAll();
      setActiveMidis(new Set());
    };
    window.addEventListener('blur', blur);
    return () => window.removeEventListener('blur', blur);
  }, [stopAll]);

  const noteOn = useCallback(
    (midi: number) => {
      playNote(midi);
      recording.capture(midi, true);
      setActiveMidis((prev) => {
        const next = new Set(prev);
        next.add(midi);
        return next;
      });
      setLastNotes((prev) => [midi, ...prev.filter((m) => m !== midi)].slice(0, 6));
    },
    [playNote, recording.capture]
  );

  const noteOff = useCallback(
    (midi: number) => {
      releaseNote(midi);
      recording.capture(midi, false);
      setActiveMidis((prev) => {
        const next = new Set(prev);
        next.delete(midi);
        return next;
      });
    },
    [releaseNote, recording.capture]
  );

  useKeyboardMapping(baseMidi, noteOn, noteOff);

  const handleVolume = (v: number) => {
    setVolumeState(v);
    setVolume(v);
  };
  const handleSustain = (on: boolean) => {
    setSustainState(on);
    setSustain(on);
  };
  const handleSound = (s: PianoSound) => {
    setSoundState(s);
    setSound(s);
  };
  const handleToggleRecord = () => {
    if (recording.isRecording) {
      recording.stop();
    } else {
      if (recording.isPlaying) recording.stopPlayback();
      recording.start();
    }
  };
  const handlePlay = () => {
    if (recording.isRecording || recording.isPlaying) return;
    recording.play(playNote, releaseNote);
  };

  const activeList = [...activeMidis].sort((a, b) => a - b);

  return (
    <div>
      {/* Init status line */}
      <div className="mb-6 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em]">
        {status === 'initializing' ? (
          <>
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-accent-gold" />
            <span className="text-muted">Initializing Piano Studio</span>
          </>
        ) : (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-status-green" />
            <span className="text-status-green">Piano Ready</span>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.55fr_0.95fr]">
        {/* ------- Music profile (left) ------- */}
        <RevealPanel>
          <div className="glass holo-border relative h-full overflow-hidden rounded-3xl p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-gold/12 blur-3xl" />
            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-gold to-accent-red text-white shadow-lift">
                <Music2 className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                {MUSIC.institution}
              </h3>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent-gold">
                {MUSIC.qualification}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-muted">{MUSIC.description}</p>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-white/60 p-3.5">
                <Piano className="h-5 w-5 text-accent-gold" />
                <div>
                  <p className="text-[13px] font-medium text-ink">{MUSIC.instrument}</p>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
                    {MUSIC.totalCertifications} certifications completed
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {MUSIC.grades.map((g) => (
                  <div
                    key={g.name}
                    className="flex items-center justify-between rounded-xl border border-line bg-white/40 px-3.5 py-2.5"
                  >
                    <div>
                      <p className="text-[12.5px] font-medium text-ink">{g.name}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        {g.level}
                      </p>
                    </div>
                    <span className="rounded-full bg-status-green/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-status-green">
                      {g.status}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 border-l-2 border-accent-gold/40 pl-3 font-display text-[13px] italic leading-relaxed text-inkSoft">
                Music develops discipline, timing, pattern recognition and harmonic thinking.
              </p>

              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-ink/4 p-4">
                <p className="brass-text font-display text-5xl font-medium">
                  {String(MUSIC.totalCertifications).padStart(2, '0')}
                </p>
                <p className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.18em] text-muted">
                  Trinity
                  <br />
                  Certifications
                </p>
              </div>
            </div>
          </div>
        </RevealPanel>

        {/* ------- Piano (middle) ------- */}
        <div className="order-3 lg:order-2">
          <div className="glass holo-border rounded-3xl p-5 sm:p-6">
            <NoteVisualizer getAnalyser={getAnalyser} />
            <div className="mt-3">
              <PianoKeyboard
                baseMidi={baseMidi}
                octaves={OCTAVES}
                activeMidis={activeMidis}
                onNoteOn={noteOn}
                onNoteOff={noteOff}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                Notes
              </p>
              <p className="font-display text-[15px] text-ink">
                {lastNotes.length > 0 ? (
                  lastNotes.map((m) => (
                    <span key={m} className="mr-2 text-accent-gold">
                      {midiToNote(m)}
                    </span>
                  ))
                ) : (
                  <span className="text-faint">Play a key</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ------- Controls (right) ------- */}
        <div className="order-2 lg:order-3">
          <div className="glass holo-border space-y-5 rounded-3xl p-6">
            <PianoControls
              octave={octave}
              onOctaveChange={setOctave}
              volume={volume}
              onVolumeChange={handleVolume}
              sustain={sustain}
              onSustainChange={handleSustain}
              sound={sound}
              onSoundChange={handleSound}
            />

            <div className="border-t border-line pt-5">
              <ChordDetector activeMidis={activeList} />
            </div>

            <div className="border-t border-line pt-5">
              <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                Recording
              </p>
              <RecordingControls
                isRecording={recording.isRecording}
                isPlaying={recording.isPlaying}
                elapsed={recording.elapsed}
                hasRecording={recording.hasRecording}
                onToggleRecord={handleToggleRecord}
                onPlay={handlePlay}
                onStopPlayback={recording.stopPlayback}
                onClear={recording.clear}
              />
            </div>

            <p className="border-t border-line pt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-faint">
              Keys · A W S E D F T G Y H U J
              <br />
              Play with mouse, touch or keyboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Simple Reveal wrapper for the profile column (kept local) */
const RevealPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="order-1">
    <Reveal delay={80}>{children}</Reveal>
  </div>
);
