import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import finalCtaBg from "@/public/assets/final-cta-bg.jpg";
import { QualificationCard } from "./QualificationCard";
import shared from "./DcSection.module.css";
import styles from "./DcBooking.module.css";

const POINTS = [
  "20 minutes, no commitment",
  "Pilot plan for your portfolio and your systems",
  "Compliance questions answered by people who know the rules",
  "Talk to an expert, not a script",
];

export function DcBooking() {
  return (
    <section id="book" className={styles.section} aria-labelledby="dc-book-title">
      <div className={styles.backdrop} aria-hidden="true">
        <Image src={finalCtaBg} alt="" fill placeholder="blur" sizes="100vw" />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Entrance>
            <p className={`${shared.eyebrow} ${styles.eyebrow}`}>Book a demo</p>
            <h2 id="dc-book-title" className={styles.title}>
              See Vodex on <span className="accent">your</span> portfolio.
            </h2>
            <p className={styles.lead}>
              Bring a sample of your accounts and your current process. We will show you what a
              pilot would look like.
            </p>
          </Entrance>
          <ul className={styles.points}>
            {POINTS.map((point, i) => (
              <Entrance key={point} as="li" delay={80 + i * 70} className={styles.point}>
                {point}
              </Entrance>
            ))}
          </ul>
        </div>

        {/* Plain wrapper owns the reveal so the card's Select popovers aren't
            trapped under later content by the Entrance stacking context. */}
        <Entrance delay={120} className={styles.cardSlot}>
          <QualificationCard />
        </Entrance>
      </div>
    </section>
  );
}
