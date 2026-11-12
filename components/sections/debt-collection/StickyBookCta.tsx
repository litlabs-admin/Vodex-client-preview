"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { pushDataLayer } from "@/lib/analytics";
import styles from "./StickyBookCta.module.css";

/**
 * Phone-only (≤767px, see CSS) bottom bar: slides up once the visitor is past
 * the hero and hides again while the booking section itself is on screen.
 */
export function StickyBookCta({ targetId = "book" }: { targetId?: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTargetVisible(entry.isIntersecting),
      // Count the section as "reached" once its top passes 40% up the viewport.
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  const show = pastHero && !targetVisible;

  return (
    <div className={styles.bar} data-show={show} aria-hidden={!show} inert={!show}>
      <a
        href={`#${targetId}`}
        className={styles.button}
        onClick={() => pushDataLayer("vodex_dc_cta_click", { where: "sticky" })}
      >
        Book a demo
        <ArrowRight className={styles.arrow} />
      </a>
    </div>
  );
}
