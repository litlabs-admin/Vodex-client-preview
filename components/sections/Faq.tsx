import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { ChatIcon } from "@/components/ui/icons";
import { Entrance } from "@/components/ui/Entrance";
import { FaqAccordion } from "./FaqAccordion";
import styles from "./Faq.module.css";
import { BOOK_DEMO_URL } from "@/lib/links";

export type FaqItem = { question: string; answer: string };

/**
 * Every page passes its own set from lib/faqs.ts (copy carried over from the
 * old vodex.ai site) — there is deliberately no default.
 */
type FaqProps = {
  items: FaqItem[];
  /** Replaces the default "Frequently asked questions" heading. */
  heading?: ReactNode;
  /** Target of the side card's "Talk to Sales" button. */
  ctaHref?: string;
};

export function Faq({ items, heading, ctaHref = BOOK_DEMO_URL }: FaqProps) {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.grid}>
          <Entrance>
            <h2 id="faq-title" className={styles.heading}>
              {heading ?? (
                <>
                  Frequently asked <span className={styles.serif}>questions</span>
                </>
              )}
            </h2>

            <FaqAccordion items={items} />
          </Entrance>

          <Entrance delay={90} className={styles.sideCol}>
            <p className={styles.sideText}>
              Everything you need to know about putting GenAI voice agents to
              work. Can&rsquo;t find an answer? Talk to our team.
            </p>

            <div className={styles.card}>
              <span className={styles.cardIcon}>
                <ChatIcon width={20} height={20} />
              </span>
              <p className={styles.cardTitle}>Do you have more questions?</p>
              <p className={styles.cardBody}>
                Talk to our team about putting GenAI voice agents to work for
                your collections pipeline.
              </p>
              <Button href={ctaHref} className={styles.cardButton} withArrow>
                Talk to Sales
              </Button>
            </div>
          </Entrance>
        </div>
      </div>
    </section>
  );
}
