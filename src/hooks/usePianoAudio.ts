import { useCallback, useRef } from 'react';

export type PianoSound = 'piano' | 'epiano' | 'strings';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const midiToNote = (midi: number): string =>
  `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;

export const midiToFreq = (midi: number): number => 440 * Math.pow(2, (midi - 69) / 12);

interface ActiveNote {
  nodes: { osc: OscillatorNode; gain: GainNode }[];
  gain: GainNode;
}

export function usePianoAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const volumeRef = useRef(0.7);
  const sustainRef = useRef(false);
  const soundRef = useRef<PianoSound>('piano');
  const activeRef = useRef<Map<number, ActiveNote>>(new Map());

  const ensureCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.value = volumeRef.current;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      master.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
      analyserRef.current = analyser;
    }
    if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const getAnalyser = useCallback((): AnalyserNode | null => analyserRef.current, []);

  const playNote = useCallback(
    (midi: number, velocity = 1) => {
      if (activeRef.current.has(midi)) return;
      const ctx = ensureCtx();
      const now = ctx.currentTime;
      const freq = midiToFreq(midi);
      const sound = soundRef.current;

      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 1;
      filter.frequency.value = sound === 'piano' ? 2600 : sound === 'epiano' ? 1800 : 1100;

      const partials: [number, number, OscillatorType][] =
        sound === 'piano'
          ? [
              [1, 1, 'sine'],
              [2, 0.5, 'sine'],
              [3, 0.3, 'sine'],
              [4, 0.15, 'sine'],
              [5, 0.08, 'sine'],
            ]
          : sound === 'epiano'
            ? [
                [1, 1, 'triangle'],
                [2, 0.6, 'sine'],
                [4, 0.2, 'sine'],
              ]
            : [
                [1, 1, 'sawtooth'],
                [2, 0.5, 'sawtooth'],
                [3, 0.25, 'sawtooth'],
              ];

      const nodes = partials.map(([mult, amp, type]) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = freq * mult;
        osc.detune.value = (Math.random() - 0.5) * 6;
        const g = ctx.createGain();
        g.gain.value = amp;
        osc.connect(g);
        g.connect(filter);
        osc.start(now);
        return { osc, gain: g };
      });
      filter.connect(noteGain);
      noteGain.connect(masterRef.current ?? ctx.destination);

      // Attack
      noteGain.gain.exponentialRampToValueAtTime(0.55 * velocity, now + 0.01);
      // Natural decay tail
      const decayTime = sound === 'piano' ? 2.2 : sound === 'epiano' ? 1.8 : 2.8;
      noteGain.gain.setTargetAtTime(0.001, now + 0.03, decayTime / 4);

      activeRef.current.set(midi, { nodes, gain: noteGain });
    },
    [ensureCtx]
  );

  const releaseNote = useCallback((midi: number) => {
    const entry = activeRef.current.get(midi);
    if (!entry) return;
    activeRef.current.delete(midi);
    const ctx = ctxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const { gain } = entry;
    gain.gain.cancelScheduledValues(now);
    // Sustain lets the tone ring out gently; otherwise a clean release.
    gain.gain.setTargetAtTime(0.0001, now, sustainRef.current ? 0.6 : 0.06);
    entry.nodes.forEach(({ osc }) => osc.stop(now + 1.8));
  }, []);

  const setVolume = useCallback((v: number) => {
    volumeRef.current = v;
    if (masterRef.current) masterRef.current.gain.value = v;
  }, []);

  const setSustain = useCallback((on: boolean) => {
    sustainRef.current = on;
  }, []);

  const setSound = useCallback((s: PianoSound) => {
    soundRef.current = s;
  }, []);

  const stopAll = useCallback(() => {
    [...activeRef.current.keys()].forEach((m) => releaseNote(m));
  }, [releaseNote]);

  return { playNote, releaseNote, setVolume, setSustain, setSound, stopAll, getAnalyser };
}
