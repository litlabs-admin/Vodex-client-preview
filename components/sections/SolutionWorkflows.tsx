import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import { PortfolioLink } from "@/components/ui/PortfolioLink";
import type { PortfolioValue } from "@/lib/portfolio";
import styles from "./SolutionWorkflows.module.css";

type Workflow = {
  title: string;
  description: string;
  src: string;
  /** Scrim variant only: turns the whole card into a link to the on-page
   * booking form that preselects this portfolio. */
  cta?: { label: string; portfolio: PortfolioValue };
};

type Closing = {
  text: string;
  linkText: string;
  href: string;
};

type SolutionWorkflowsProps = {
  eyebrow?: string;
  heading?: ReactNode;
  lead: string;
  workflows: Workflow[];
  /** "scrim" (default) overlays title/description on the photo, matching
   * every existing usage. "panel" renders a separate light body below the
   * photo (title + description), no icon — the card
   * shape "Four core workflows" on the Collection Software page needs. */
  variant?: "scrim" | "panel";
  columns?: number;
  closing?: Closing;
  /** Override when the section appears on a page that already uses the
   * default "workflows-title" id. */
  headingId?: string;
};

export function SolutionWorkflows({
  eyebrow = "Workflows",
  heading = (
    <>
      Actions you can <span className="accent">streamline</span>
    </>
  ),
  lead,
  workflows,
  variant = "scrim",
  columns = 3,
  closing,
  headingId = "workflows-title",
}: SolutionWorkflowsProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId} className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.band}>
          <div
            className={variant === "panel" ? styles.gridPanel : styles.grid}
            style={{ "--cols": columns } as CSSProperties}
          >
            {workflows.map(({ title, description, src, cta }, i) =>
              variant !== "panel" && cta ? (
                <Entrance key={title} delay={i * 60} as="article" className={styles.card}>
                  <PortfolioLink portfolio={cta.portfolio} className={styles.cardLink}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, (max-width: 1327px) 33vw, 436px"
                      className={styles.cardImage}
                    />
                    <span className={styles.scrim} />
                    <span className={styles.copy}>
                      <span className={styles.cardTitle}>{title}</span>
                      <span className={styles.cardDescription}>{description}</span>
                      <span className={styles.cardCta}>
                        {cta.label}
                        <ArrowRight className={styles.cardCtaArrow} aria-hidden="true" />
                      </span>
                    </span>
                  </PortfolioLink>
                </Entrance>
              ) : variant === "panel" ? (
                <Entrance key={title} delay={i * 60} as="article" className={styles.panelCard}>
                  <div className={styles.panelThumb}>
                    <Image
                      src={src}
                      alt={`${title} — photo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, (max-width: 1327px) 25vw, 322px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.panelBody}>
                    <h3 className={styles.panelTitle}>{title}</h3>
                    <p className={styles.panelDescription}>{description}</p>
                  </div>
                </Entrance>
              ) : (
                <Entrance key={title} delay={i * 60} as="article" className={styles.card}>
                  <Image
                    src={src}
                    alt={`${title} — photo`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, (max-width: 1327px) 33vw, 436px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.scrim} />
                  <div className={styles.copy}>
                    <p className={styles.cardTitle}>
                      {title}
                    </p>
                    <p className={styles.cardDescription}>{description}</p>
                  </div>
                </Entrance>
              )
            )}
          </div>

          {closing && (
            <Entrance className={styles.closing}>
              <p>
                {closing.text}{" "}
                <Link href={closing.href} className={styles.closingLink}>
                  {closing.linkText}
                </Link>
              </p>
            </Entrance>
          )}
        </div>
      </div>
    </section>
  );
}
