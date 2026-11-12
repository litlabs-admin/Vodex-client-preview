"use client";

import { useRef, useState } from "react";
import { ArrowRight, XIcon } from "@/components/ui/icons";
import { useIsomorphicLayoutEffect } from "@/components/ui/useIsomorphicLayoutEffect";
import { DROS_URL } from "@/lib/links";
import styles from "./AnnouncementBar.module.css";

const DISMISSED_KEY = "vodex-announcement-dismissed";
const HEADER_ATTR = "data-announcement-dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    try {
      if (localStorage.getItem(DISMISSED_KEY)) {
        // Runs synchronously before this mount's first paint, so React
        // commits the dismissed state before the browser ever paints the
        // undismissed one — no flash, and no CSS transition plays (there's
        // no prior painted frame to animate from). This is what covers a
        // client-side route change: the root-layout beforeInteractive
        // script (app/layout.tsx) only runs once per full document load,
        // not on soft navigation. Since no transition plays here,
        // handleTransitionEnd below never fires for this path either, so
        // --header-h has to be set directly, right here.
        setDismissed(true);
        document.documentElement.setAttribute(HEADER_ATTR, "true");
      }
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — leave visible
    }

    return () => {
      // Unmounting (route change unmounts this per-page instance) — the next
      // page's own AnnouncementBar re-derives the attribute itself, but drop
      // it now so a page with no AnnouncementBar at all never inherits a
      // stale shrunk --header-h.
      document.documentElement.removeAttribute(HEADER_ATTR);
    };
  }, []);

  function handleDismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore write failures — dismissal still applies for this page view
    }
  }

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.target !== barRef.current || e.propertyName !== "max-height") return;
    // Only reached for a real, animated click-to-dismiss — the pre-paint
    // localStorage-restore path above never triggers a transition, so it
    // never lands here. Flips --header-h once the collapse has visually
    // finished, so full-viewport sections below (Hero/SolutionHero/etc.)
    // don't resize while the bar is still mid-collapse.
    if (dismissed) {
      document.documentElement.setAttribute(HEADER_ATTR, "true");
    } else {
      document.documentElement.removeAttribute(HEADER_ATTR);
    }
  }

  return (
    <div
      ref={barRef}
      className={`${styles.bar} js-announcement-bar ${dismissed ? styles.dismissed : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={`container ${styles.inner}`}>
        <span className={styles.tag}>New</span>
        <p className={styles.message}>
          We&rsquo;ve built DROS &mdash; an Engagement Operating System for modern
          collections teams.
        </p>
        <a
          href={DROS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Learn More
          <ArrowRight />
        </a>
      </div>
      <button
        type="button"
        className={styles.close}
        aria-label="Dismiss announcement"
        onClick={handleDismiss}
      >
        <XIcon />
      </button>
    </div>
  );
}
