"use client";

import { useState } from "react";
import styles from "./Faq.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  // -1 = nothing open. All items start collapsed; opening one is a click, not a default.
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className={styles.list}>
      {items.map(({ question, answer }, i) => {
        const open = i === openIndex;
        return (
          <div
            key={question}
            className={`${styles.item} ${open ? styles.itemOpen : ""}`}
          >
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? -1 : i)}
            >
              {question}
              <svg
                className={styles.plus}
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M8 1.5v13M1.5 8h13" />
              </svg>
            </button>
            <div id={`faq-panel-${i}`} className={styles.panel}>
              <div className={styles.panelInner}>
                <p className={styles.answer}>{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
