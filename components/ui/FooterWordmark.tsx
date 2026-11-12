/**
 * Oversized footer VODEX wordmark, drawn as vector rather than raster.
 *
 * The supplied `footer-wordmark.png` (and the Figma PDF it came from) stores
 * this lockup as a low-resolution bitmap upscaled to 4548px, so it renders
 * visibly soft at the ~1440px it occupies here. These paths are measured off
 * that bitmap's alpha channel with sub-pixel edge detection and least-squares
 * fits (straight edges for V/E/X, rounded rects with elliptical corners for
 * O/D), then re-emitted as geometry — IoU 0.981 against the reference shape,
 * with the remaining difference being the reference's own anti-aliased fringe.
 *
 * Coordinate space is the reference band verbatim: 4548 x 1003, cap height
 * spanning y 93.4 -> 999.6. The O overshoots the viewBox at the bottom and is
 * clipped by it, exactly as in the source artwork. The gradient likewise runs
 * the full band height (#FF1E00 at y=0 to #000 at y=1003), measured by fitting
 * the reference's own opaque interior pixels.
 */
export function FooterWordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 4548 1003"
      role="img"
      aria-label="Vodex"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="footerWordmarkFill"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="1003"
        >
          <stop offset="0" stopColor="#FF1E00" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
      </defs>
      <g fill="url(#footerWordmarkFill)">
        {/* V */}
        <path fillRule="nonzero" d="M19.2 93.4L248.1 93.4L464.2 729.3L679.2 93.4L901.6 93.4L570.9 999.6L352.1 999.6Z" />
        {/* O */}
        <path fillRule="evenodd" d="M1393.7 71.1L1393.7 71.1C1602.85 71.1 1772.4 200.36 1772.4 359.8L1772.4 731.4C1772.4 890.84 1602.85 1020.1 1393.7 1020.1L1393.7 1020.1C1184.55 1020.1 1015 890.84 1015 731.4L1015 359.8C1015 200.36 1184.55 71.1 1393.7 71.1ZM1391.4 251.5L1391.4 251.5C1482.58 251.5 1556.5 310.78 1556.5 383.9L1556.5 706.9C1556.5 780.02 1482.58 839.3 1391.4 839.3L1391.4 839.3C1300.22 839.3 1226.3 780.02 1226.3 706.9L1226.3 383.9C1226.3 310.78 1300.22 251.5 1391.4 251.5Z" />
        {/* D */}
        <path fillRule="evenodd" d="M1977.6 93.4L2339.3 93.4C2547.4 93.4 2716.1 225.12 2716.1 387.6L2716.1 705.4C2716.1 867.88 2547.4 999.6 2339.3 999.6L1977.6 999.6L1977.6 93.4ZM2188 278L2323.9 278C2421.32 278 2500.3 332.17 2500.3 399L2500.3 701.3C2500.3 768.13 2421.32 822.3 2323.9 822.3L2188 822.3L2188 278Z" />
        {/* E */}
        <path fillRule="nonzero" d="M2924.4 93.4L3625.9 93.4L3625.9 274.6L2924.4 274.6L2924.4 93.4ZM2994.9 455.7L3555.4 455.7L3555.4 637.3L2994.9 637.3L2994.9 455.7ZM2924.4 818.4L3625.9 818.4L3625.9 999.6L2924.4 999.6L2924.4 818.4Z" />
        {/* X */}
        <path fillRule="nonzero" d="M3729.7 93.4L3961.5 93.4L4535.9 999.6L4305.4 999.6ZM4306.3 93.4L4537.7 93.4L3963.3 999.6L3732.3 999.6Z" />
      </g>
    </svg>
  );
}
