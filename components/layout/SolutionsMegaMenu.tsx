"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import styles from "./SolutionsMegaMenu.module.css";

// Two labeled columns, matching the supplied reference: title + one-line
// description per item, no icon boxes (the earlier icon-box treatment is
// gone from this menu — ResourcesMegaMenu/CompanyMegaMenu keep theirs).
type SolutionItem = { label: string; href: string; description: string };
type SolutionGroup = { label: string; items: SolutionItem[] };

export const SOLUTION_GROUPS: SolutionGroup[] = [
  {
    label: "By use case",
    items: [
      {
        label: "Payment Reminders",
        href: "/solutions/payment-reminders",
        description: "Automate outreach before accounts go delinquent",
      },
      {
        label: "Promise-to-Pay Capture",
        href: "/solutions/promise-to-pay",
        description: "Capture and follow up on every PTP commitment",
      },
      {
        label: "Lead Qualification",
        href: "/solutions/lead-qualification",
        description: "Qualify inbound and outbound leads at scale",
      },
    ],
  },
  {
    label: "By industry",
    items: [
      {
        label: "Debt Collection",
        href: "/solutions/debt-collection",
        description: "Compliant voice AI for collections teams",
      },
      {
        label: "Collection Software",
        href: "/solutions/collection-software",
        description: "Add a voice layer to your receivables platform",
      },
    ],
  },
];

// Flat list kept for Navbar.tsx's mobile accordion, which renders labels
// only (no columns, no descriptions) — derived so the two can't drift.
export const MAIN_SOLUTIONS = SOLUTION_GROUPS.flatMap((group) => group.items);

// There is no "/solutions" hub page and none is planned — the trigger is a
// non-navigating button, not a Link. On desktop the mega-menu panel below is
// reachable by hover/focus alone; the equivalent tap-to-expand affordance for
// touch/mobile lives in Navbar.tsx's own accordion (no hover there).
export function SolutionsMegaMenu() {
  const itemRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // The trigger has nowhere to navigate to, so a click just blurs itself
  // (see the button's onClick below) rather than leaving focus parked there
  // — :focus-within keeps a panel open independent of mouse position, and a
  // stray click otherwise leaves this panel stuck open (via lingering
  // focus) even after the mouse moves on to hover a sibling menu, stacking
  // two panels at once.
  //
  // Dropping focus on Escape closes the panel (removes :focus-within),
  // assuming the mouse isn't also hovering it.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const active = document.activeElement as HTMLElement | null;
      if (active && itemRef.current?.contains(active)) {
        active.blur();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Navbar/Footer persist across client-side navigations, so a Link click
  // inside the panel wouldn't otherwise drop :hover/:focus-within once the
  // page swaps underneath it.
  useEffect(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  }, [pathname]);

  return (
    <li className={styles.solutionsItem} ref={itemRef}>
      <button
        type="button"
        className={styles.link}
        aria-haspopup="true"
        onClick={(event) => event.currentTarget.blur()}
      >
        Solutions
        <ChevronDownIcon className={styles.chevron} />
      </button>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          {SOLUTION_GROUPS.map((group) => (
            <div key={group.label} className={styles.col}>
              <p className={styles.colLabel}>{group.label}</p>
              <ul className={styles.colList}>
                {group.items.map(({ label, href, description }) => (
                  <li key={label}>
                    <Link href={href} className={styles.item}>
                      <span className={styles.itemTitle}>{label}</span>
                      <span className={styles.itemDesc}>{description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}
