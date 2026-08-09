import React, { useEffect, useRef } from 'react';

interface NoteVisualizerProps {
  getAnalyser: () => AnalyserNode | null;
}

export const NoteVisualizer: React.FC<NoteVisualizerProps> = ({ getAnalyser }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const data = new Uint8Array(128);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const analyser = getAnalyser();
      let maxAmp = 0;
      if (analyser) {
        analyser.getByteFrequencyData(data);
        for (let i = 0; i < data.length; i++) maxAmp = Math.max(maxAmp, data[i]);
      }

      const mid = h / 2;
      const n = 90;
      const active = maxAmp > 8;

      // soft flowing line
      ctx.beginPath();
      ctx.strokeStyle = active ? 'rgba(176,137,63,0.7)' : 'rgba(176,137,63,0.25)';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      for (let i = 0; i <= n; i++) {
        const x = (i / n) * w;
        const bin = Math.floor((i / n) * (data.length - 1));
        const amp = analyser ? data[bin] / 255 : 0;
        const y = mid - amp * (h * 0.72) * 0.5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // mirrored lower half for a subtle symmetry
      ctx.beginPath();
      ctx.strokeStyle = active ? 'rgba(176,137,63,0.35)' : 'rgba(176,137,63,0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= n; i++) {
        const x = (i / n) * w;
        const bin = Math.floor((i / n) * (data.length - 1));
        const amp = analyser ? data[bin] / 255 : 0;
        const y = mid + amp * (h * 0.72) * 0.5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [getAnalyser]);

  return (
    <div className="h-16 w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
