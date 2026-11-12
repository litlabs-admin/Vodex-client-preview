"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { pushDataLayer } from "@/lib/analytics";
import { selectPortfolio, type PortfolioValue } from "@/lib/portfolio";

type PortfolioLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  portfolio: PortfolioValue;
  /** Defaults to the on-page booking section. */
  href?: string;
  children: ReactNode;
};

/**
 * Plain in-page anchor (native smooth-scroll + `scroll-margin-top` on the
 * target) that also preselects the booking form's portfolio field. Kept a
 * real <a href> so it still works before hydration / without JS.
 */
export function PortfolioLink({
  portfolio,
  href = "#book",
  onClick,
  children,
  ...rest
}: PortfolioLinkProps) {
  return (
    <a
      href={href}
      data-portfolio-link=""
      onClick={(e) => {
        selectPortfolio(portfolio);
        pushDataLayer("vodex_dc_portfolio_select", { portfolio });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
