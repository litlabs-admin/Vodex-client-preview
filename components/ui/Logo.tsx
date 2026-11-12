/**
 * Vodex logo — traced from the reference PDF (mark + wordmark rendered at 8x
 * and measured). No logo asset was supplied, so it is rebuilt as vector paths.
 * Coordinates live in the traced 8x space; `viewBox` scales them to any size.
 */

/* Rounded so the server and client serialise identical SVG attributes. */
const round = (n: number) => Math.round(n * 100) / 100;

const RING_DOTS = Array.from({ length: 20 }, (_, i) => {
  const angle = ((90 + i * 18) * Math.PI) / 180;
  return {
    cx: round(158 + 146 * Math.cos(angle)),
    cy: round(153 - 146 * Math.sin(angle)),
  };
});

/** [x-centre, height] of the five waveform bars, all vertically centred. */
const BARS: Array<[number, number]> = [
  [68, 85],
  [113, 149],
  [158, 215],
  [203, 107],
  [248, 41],
];

type LogoProps = {
  /** Rendered height in px; width follows the intrinsic 1135:306 ratio. */
  height?: number;
  className?: string;
};

/** Just the "VODEX" wordmark paths, reused standalone by the footer's
 * oversized bleeding wordmark as well as inside the full `Logo`. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <g className={className} transform="translate(389 75)">
      {/* V */}
      <path d="M0 3h36l35.7 100L107.6 3H143L89 152H54Z" />
      {/* O */}
      <path
        fillRule="evenodd"
        d="M226.5 0A62 62 0 0 1 289 62v31a62 62 0 0 1-125 0V62A62 62 0 0 1 226.5 0Zm0 36A26.5 26.5 0 0 0 200 62.5v30A26.5 26.5 0 0 0 253 92.5v-30A26.5 26.5 0 0 0 226.5 36Z"
      />
      {/* D */}
      <path
        fillRule="evenodd"
        d="M324 3h60a62 62 0 0 1 62 62v25a62 62 0 0 1-62 62h-60Zm35 36v78h25a26 26 0 0 0 26-26V65a26 26 0 0 0-26-26Z"
      />
      {/* E — three bars */}
      <path d="M482 3h117v36H482Zm11 57h93v36h-93Zm-11 56h117v36H482Z" />
      {/* X */}
      <path d="M618 3h36l92 149h-36Zm92 0h36l-92 149h-36Z" />
    </g>
  );
}

export function Logo({ height = 38, className }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1135 306"
      height={height}
      width={round((height * 1135) / 306)}
      fill="currentColor"
      role="img"
      aria-label="Vodex"
      focusable="false"
    >
      <g>
        {RING_DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={7.5} />
        ))}
        {BARS.map(([cx, h], i) => (
          <rect key={i} x={cx - 10} y={153 - h / 2} width={20} height={h} rx={10} />
        ))}
      </g>
      <Wordmark />
    </svg>
  );
}
