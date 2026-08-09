import { useCallback, useEffect, useRef, useState } from 'react';

interface RecordedEvent {
  midi: number;
  time: number; // seconds since recording start
  on: boolean;
}

export function usePianoRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const eventsRef = useRef<RecordedEvent[]>([]);
  const startTimeRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const isRecordingRef = useRef(false);

  const start = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    eventsRef.current = [];
    startTimeRef.current = performance.now();
    setElapsed(0);
    isRecordingRef.current = true;
    setIsRecording(true);
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    isRecordingRef.current = false;
    setIsRecording(false);
  }, []);

  useEffect(() => {
    if (!isRecording) return;
    const id = window.setInterval(() => {
      setElapsed((performance.now() - startTimeRef.current) / 1000);
    }, 100);
    return () => window.clearInterval(id);
  }, [isRecording]);

  const capture = useCallback((midi: number, on: boolean) => {
    if (!isRecordingRef.current) return;
    eventsRef.current.push({
      midi,
      time: (performance.now() - startTimeRef.current) / 1000,
      on,
    });
  }, []);

  const play = useCallback(
    (playNote: (m: number) => void, releaseNote: (m: number) => void) => {
      if (isPlaying || isRecording) return;
      const events = [...eventsRef.current];
      if (events.length === 0) return;
      setIsPlaying(true);
      const timers: number[] = [];
      for (const ev of events) {
        const t = window.setTimeout(() => {
          if (ev.on) playNote(ev.midi);
          else releaseNote(ev.midi);
        }, ev.time * 1000);
        timers.push(t);
      }
      const last = events[events.length - 1].time;
      const done = window.setTimeout(() => setIsPlaying(false), last * 1000 + 1500);
      timers.push(done);
      timersRef.current = timers;
    },
    [isPlaying, isRecording]
  );

  const stopPlayback = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    setIsPlaying(false);
  }, []);

  const clear = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    eventsRef.current = [];
    isRecordingRef.current = false;
    setIsPlaying(false);
    setIsRecording(false);
    setElapsed(0);
  }, []);

  const hasRecording = eventsRef.current.length > 0;

  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    },
    []
  );

  return {
    isRecording,
    isPlaying,
    elapsed,
    hasRecording,
    start,
    stop,
    capture,
    play,
    stopPlayback,
    clear,
  };
}
