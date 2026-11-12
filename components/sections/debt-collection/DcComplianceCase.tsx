import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import caseStudyBg from "@/public/assets/case-study-bg.jpg";
import shared from "./DcSection.module.css";
import styles from "./DcComplianceCase.module.css";

const CASE_STUDY_HREF =
  "/resources/case-studies/this-debt-collection-firm-increased-connectivity-rate-by-3x";

const GUARDRAILS = [
  "Call windows, frequency limits and disclosures set before launch",
  "Consent tracked, opt-outs honored on the spot",
  "Every call recorded and transcribed, exportable when you need it",
  "Encrypted end to end, SOC 2 and ISO 27001, HIPAA for medical portfolios",
];

export function DcComplianceCase() {
  return (
    <section className={shared.section} aria-labelledby="dc-compliance-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <Entrance>
            <p className={shared.eyebrow}>Compliance and security</p>
            <h2 id="dc-compliance-title" className={`${shared.title} ${styles.title}`}>
              Collections rules, enforced <span className="accent">before</span> the call.
            </h2>
            <p className={`${shared.lead} ${styles.lead}`}>
              Built around FDCPA, Reg F and TCPA guardrails, with the evidence to show it.
            </p>
          </Entrance>

          <ul className={styles.ticks}>
            {GUARDRAILS.map((item, i) => (
              <Entrance key={item} as="li" delay={80 + i * 70} className={styles.tick}>
                {item}
              </Entrance>
            ))}
          </ul>

          <Entrance delay={380} className={styles.cta}>
            <Button href="/resources/compliance" size="sm" withArrow>
              Read the compliance overview
            </Button>
          </Entrance>
        </div>

        <Entrance delay={120} className={styles.caseSlot}>
          <article className={styles.case}>
            <Image
              src={caseStudyBg}
              alt=""
              fill
              placeholder="blur"
              sizes="(max-width: 1023px) 100vw, 560px"
              className={styles.caseBg}
            />
            <div className={styles.caseScrim} aria-hidden="true" />
            <div className={styles.caseBody}>
              <p className={styles.caseEyebrow}>Case study</p>
              <h3 className={styles.caseTitle}>
                A debt recovery firm moved from manual outreach to voice agents with automated
                redial.
              </h3>
              <p className={styles.caseText}>
                Fewer unanswered calls, no extra staffing and more conversations with the people
                who owe. See the full numbers and the setup.
              </p>
              <Button href={CASE_STUDY_HREF} variant="light" size="sm" withArrow>
                Read the case study
              </Button>
            </div>
          </article>
        </Entrance>
      </div>
    </section>
  );
}
