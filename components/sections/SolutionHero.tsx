import Image from "next/image";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { Waveform } from "@/components/ui/icons";
import styles from "./SolutionHero.module.css";

type Cta = {
  label: string;
  href: string;
  withArrow?: boolean;
};

type SolutionHeroProps = {
  headingId: string;
  badgeLabel: string;
  badgeIcon?: ComponentType<{ className?: string }>;
  /** Full H1 content — a line break plus the `.accent` span both vary per page. */
  titleLines: ReactNode;
  lead: string;
  primaryCta: Cta;
  /** Outlined second button. Optional. */
  secondaryCta?: Cta;
  /** Extra content between the lead and the CTAs (e.g. portfolio chips). */
  children?: ReactNode;
  /** Small reassurance line under the CTAs. */
  footnote?: string;
  /** Tighter type + spacing so a content-heavy hero (chips, footnote) still
   * fits in one viewport. */
  compact?: boolean;
  /** Omit for a flat `--ink`-toned hero (the section's own background) — no photo backdrop. */
  bgImage?: Parameters<typeof Image>[0]["src"];
  bgAlt?: string;
  bgObjectPosition?: string;
};

/**
 * Reusable hero for the Solutions page family — landing/product heroes are
 * each a one-off, but Footer.tsx already declares 5 solutions routes that
 * all need this exact structure with different copy/art per page.
 */
export function SolutionHero({
  headingId,
  badgeLabel,
  badgeIcon: BadgeIcon = Waveform,
  titleLines,
  lead,
  primaryCta,
  secondaryCta,
  children,
  footnote,
  compact = false,
  bgImage,
  bgAlt = "",
  bgObjectPosition = "center",
}: SolutionHeroProps) {
  return (
    <section
      className={`${styles.hero} ${compact ? styles.compact : ""}`}
      aria-labelledby={headingId}
    >
      {bgImage && (
        <div className={styles.backdrop} style={{ "--bg-pos": bgObjectPosition } as CSSProperties}>
          <Image
            src={bgImage}
            alt={bgAlt}
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
          />
        </div>
      )}

      <div className={`container ${styles.content}`}>
        <Entrance immediate delay={0}>
          <p className={styles.badge}>
            <span className={styles.badgeIcon}>
              <BadgeIcon />
            </span>
            {badgeLabel}
          </p>
        </Entrance>

        <Entrance immediate delay={90}>
          <h1 id={headingId} className={styles.title}>
            {titleLines}
          </h1>
        </Entrance>

        <Entrance immediate delay={180}>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        {children ? (
          <Entrance immediate delay={220} className={styles.extra}>
            {children}
          </Entrance>
        ) : null}

        <Entrance immediate delay={260} className={styles.actions}>
          <Button href={primaryCta.href} variant="primary" withArrow={primaryCta.withArrow ?? true}>
            {primaryCta.label}
          </Button>
          {secondaryCta ? (
            <Button href={secondaryCta.href} variant="secondary" withArrow={secondaryCta.withArrow ?? false}>
              {secondaryCta.label}
            </Button>
          ) : null}
        </Entrance>

        {footnote ? (
          <Entrance immediate delay={320}>
            <p className={styles.footnote}>{footnote}</p>
          </Entrance>
        ) : null}
      </div>
    </section>
  );
}
