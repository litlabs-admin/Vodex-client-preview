import { Entrance } from "@/components/ui/Entrance";
import { PauseOffscreen } from "@/components/ui/PauseOffscreen";
import { CallSamplesGrid } from "../CallSamplesGrid";
import type { CallCardData } from "../CallCard";
import { InitiateCallForm } from "../InitiateCallForm";
import shared from "./DcSection.module.css";
import styles from "./DcHearIt.module.css";

/**
 * Same three recordings as the homepage CallSamples (call-sample-1/2/3.mp3,
 * waveforms precomputed in lib/call-sample-waveforms.ts), labelled with the
 * client's category / outcome copy. The quote stays the real transcript line.
 */
const CALLS: CallCardData[] = [
  {
    title: "Past-due mortgage",
    agent: "Cameron",
    quote: "Hi there, I'm Cameron with Silver Hall Finance. Am I speaking with Regina George?…",
    status: "Payment plan agreed on the call",
    src: "/assets/call-sample-1.mp3",
  },
  {
    title: "Promise to pay",
    agent: "Cameron",
    quote: "I understand your concern, and that's completely fair. For your security…",
    status: "Full payment date committed",
    src: "/assets/call-sample-2.mp3",
  },
  {
    title: "Hardship escalation",
    agent: "Cameron",
    quote: "I'm so sorry to hear about the medical emergency, Regina…",
    status: "Handed to a live agent",
    src: "/assets/call-sample-3.mp3",
  },
];

export function DcHearIt() {
  return (
    <section
      id="hear"
      className={`${shared.section} ${shared.soft}`}
      aria-labelledby="dc-hear-title"
    >
      <div className="container">
        <Entrance className={shared.header}>
          <p className={shared.eyebrow}>Hear it before you book</p>
          <h2 id="dc-hear-title" className={shared.title}>
            Hear the agent <span className="accent">at work</span>.
          </h2>
          <p className={shared.lead}>Three sample calls handled by the Vodex agent.</p>
        </Entrance>

        <div className={styles.frame}>
          <CallSamplesGrid calls={CALLS} />
        </div>

        {/* Plain wrapper owns the reveal; the card itself must not be a
            transformed Entrance or the dial-code popover's z-index gets
            trapped (see InitiateCall.module.css .barSlot). */}
        <Entrance delay={80} className={styles.testSlot}>
          <div className={styles.test}>
            <PauseOffscreen className={styles.testIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </PauseOffscreen>
            <h3 className={styles.testTitle}>Want the agent to call you?</h3>
            <p className={styles.testLead}>Enter your number and hear it on your own phone.</p>
            {/* Same form as the homepage "Initiate Call" section; its Book a
                Demo button points at this page's own booking section. */}
            <InitiateCallForm bookHref="#book" />
          </div>
        </Entrance>
      </div>
    </section>
  );
}
