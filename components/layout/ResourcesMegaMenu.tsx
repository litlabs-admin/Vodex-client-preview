"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import styles from "./ResourcesMegaMenu.module.css";

/* Two labeled columns, matching SolutionsMegaMenu's treatment: title + a
   one-line description per item, no icon boxes. The "Company" sub-group
   this menu used to carry (About/News/Investors & Partners/Contact Us)
   moved out into its own CompanyMegaMenu once "Company" got a real navbar
   entry of its own, so it isn't duplicated across two menus. */
type ResourceItem = { label: string; href: string; description: string };
type ResourceGroup = { label: string; items: ResourceItem[] };

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    label: "Learn",
    items: [
      {
        label: "Blog",
        href: "/resources/blog",
        description: "Playbooks and product thinking from the team",
      },
      {
        label: "Videos",
        href: "/resources/videos",
        description: "Product demos, customer stories and podcasts",
      },
      {
        label: "Research",
        href: "/resources/research",
        description: "How we built our own voice and TTS stack",
      },
    ],
  },
  {
    label: "Evaluate",
    items: [
      {
        label: "Case Studies",
        href: "/resources/case-studies",
        description: "Real recovery and connect-rate results",
      },
      {
        label: "Call Samples",
        href: "/resources/call-samples",
        description: "Hear real conversations our agents run",
      },
      {
        label: "FAQ",
        href: "/resources/faq",
        description: "Answers on platform, compliance and pricing",
      },
      {
        label: "Compliance",
        href: "/resources/compliance",
        description: "Certifications and security practices",
      },
    ],
  },
];

// Flat list kept for Navbar.tsx's mobile accordion, which renders labels
// only (no columns, no descriptions) — derived so the two can't drift.
export const RESOURCES_ITEMS = RESOURCE_GROUPS.flatMap((group) => group.items);

// There is no "/resources" hub page and none is planned — the trigger is a
// non-navigating button, not a Link. On desktop the mega-menu panel below is
// reachable by hover/focus alone; the equivalent tap-to-expand affordance for
// touch/mobile lives in Navbar.tsx's own accordion (no hover there).
export function ResourcesMegaMenu() {
  const itemRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // The trigger has nowhere to navigate to, so a click just blurs itself
  // (see the button's onClick below) — otherwise a stray click leaves this
  // panel stuck open (:focus-within, independent of mouse position) even
  // after the mouse moves on to hover a sibling menu. Same fix as
  // SolutionsMegaMenu/CompanyMegaMenu.
  //
  // Dropping focus on Escape closes the panel (removes :focus-within),
  // assuming the mouse isn't also hovering it. Same mechanism as
  // SolutionsMegaMenu.
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
    <li className={styles.resourcesItem} ref={itemRef}>
      <button
        type="button"
        className={styles.link}
        aria-haspopup="true"
        onClick={(event) => event.currentTarget.blur()}
      >
        Resources
        <ChevronDownIcon className={styles.chevron} />
      </button>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          {RESOURCE_GROUPS.map((group) => (
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
