"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";

/**
 * Page-level helper for /solutions/debt-collection:
 * - renders the `data-smooth-anchors` marker that opts this page into smooth
 *   in-page scrolling (see app/globals.css);
 * - logs every "Book a demo" click that targets the on-page booking section
 *   (navbar, hero, workflow cards…) as `vodex_dc_cta_click`, tagged with the
 *   section it came from. One delegated listener instead of threading
 *   onClick through shared server components like Button.
 */
export function DcCtaTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href="#book"]');
      if (!link || link.closest("[data-portfolio-link]")) return;
      const from = link.closest("section[id], section[aria-labelledby], nav, header");
      const where =
        from?.id ||
        from?.getAttribute("aria-labelledby") ||
        from?.tagName.toLowerCase() ||
        "page";
      pushDataLayer("vodex_dc_cta_click", { where });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <span data-smooth-anchors hidden />;
}
