/** Decorative fallback — shown when a sample has no precomputed heights (see
 * lib/call-sample-waveforms.ts). */
const FALLBACK_HEIGHTS = [
  10, 18, 26, 14, 30, 20, 8, 24, 32, 16, 10, 22, 28, 12, 20, 30, 18, 8, 26,
  14, 32, 20, 10, 24, 16, 28, 12, 22, 8, 18,
];

type AudioWaveformProps = {
  className?: string;
  /** Real per-bar pixel heights (0–32, from lib/call-sample-waveforms.ts). Falls back to
   * the decorative shape above when omitted/still decoding. */
  heights?: number[];
};

export function AudioWaveform({ className, heights }: AudioWaveformProps) {
  const bars = heights && heights.length > 0 ? heights : FALLBACK_HEIGHTS;
  return (
    <svg
      className={className}
      viewBox="0 0 232 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 8}
          y={16 - h / 2}
          width={3}
          height={h}
          rx={1.5}
          fill="currentColor"
          /* Exposes each bar's index as a custom property so CSS can stagger
             a per-bar animation-delay (see .waveformProgress.playing rect in
             CallCard.module.css) without hand-writing an :nth-child rule per
             bar. No visual effect on its own. */
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}
