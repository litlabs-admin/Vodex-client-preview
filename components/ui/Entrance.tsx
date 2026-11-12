import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

type EntranceProps = {
  children: ReactNode;
  /** Stagger, in ms. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Animate on page load (time-based, honouring `delay`) rather than as it
   * scrolls into view. For above-the-fold content — page heroes/headers. */
  immediate?: boolean;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

/**
 * Fades + lifts its children. Pure CSS, so it works without JavaScript and
 * never leaves content stranded at opacity 0. Where the browser supports
 * scroll-driven animations, non-`immediate` entrances play as they scroll
 * into view instead of all at once on load (see `.enter` in globals.css);
 * elsewhere they fall back to the on-load animation. Any extra props (e.g.
 * `data-*`, `aria-*`) pass through to the rendered element.
 */
export function Entrance({
  children,
  delay = 0,
  as,
  className,
  immediate = false,
  ...rest
}: EntranceProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={["enter", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      data-immediate={immediate || undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
