import type { CSSProperties } from 'react';

type WaveformVisualizerProps = {
  active: boolean;
  bars?: number;
};

export function WaveformVisualizer({ active, bars = 34 }: WaveformVisualizerProps) {
  return (
    <div className="waveform" aria-hidden="true" data-active={active}>
      {Array.from({ length: bars }, (_, index) => (
        <span
          key={index}
          className="waveform__bar"
          style={
            {
              '--bar-scale': 0.28 + ((index * 7) % 10) / 18,
              '--bar-delay': `${(index % 8) * 80}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
