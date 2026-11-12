"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import styles from "./CompanyMegaMenu.module.css";

// Two labeled columns, matching SolutionsMegaMenu's treatment: title + a
// one-line description per item, no icon boxes.
type CompanyItem = { label: string; href: string; description: string };
type CompanyGroup = { label: string; items: CompanyItem[] };

export const COMPANY_GROUPS: CompanyGroup[] = [
  {
    label: "Who we are",
    items: [
      {
        label: "About Us",
        href: "/company/about",
        description: "The team, mission and story behind the voice",
      },
      {
        label: "News",
        href: "/company/news",
        description: "Funding, launches and press coverage",
      },
      {
        label: "Careers",
        href: "https://careers.vodex.ai/",
        description: "Open roles across engineering and go-to-market",
      },
    ],
  },
  {
    label: "Work with us",
    items: [
      {
        label: "Investors & Partners",
        href: "/company/investors",
        description: "Our backers and technology partners",
      },
      {
        label: "Contact Us",
        href: "/company/contact",
        description: "Reach the right team directly",
      },
    ],
  },
];

// Flat list kept for Navbar.tsx's mobile accordion, which renders labels
// only (no columns, no descriptions) — derived so the two can't drift.
export const COMPANY_ITEMS = COMPANY_GROUPS.flatMap((group) => group.items);

// There is no "/company" hub page and none is planned — the trigger is a
// non-navigating button, not a Link. On desktop the mega-menu panel below is
// reachable by hover/focus alone; the equivalent tap-to-expand affordance for
// touch/mobile lives in Navbar.tsx's own accordion (no hover there).
export function CompanyMegaMenu() {
  const itemRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // The trigger has nowhere to navigate to, so a click just blurs itself
  // (see the button's onClick below) — otherwise a stray click leaves this
  // panel stuck open (:focus-within, independent of mouse position) even
  // after the mouse moves on to hover a sibling menu. Same fix as
  // SolutionsMegaMenu/ResourcesMegaMenu.
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
    <li className={styles.companyItem} ref={itemRef}>
      <button
        type="button"
        className={styles.link}
        aria-haspopup="true"
        onClick={(event) => event.currentTarget.blur()}
      >
        Company
        <ChevronDownIcon className={styles.chevron} />
      </button>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          {COMPANY_GROUPS.map((group) => (
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
