/**
 * Portfolio types for /solutions/debt-collection. Hero chips and the
 * "By portfolio" cards preselect the booking form's "What do you collect?"
 * field through a window CustomEvent, so server-rendered links and the
 * client-only form stay decoupled (no shared React context needed).
 */
export type PortfolioValue =
  | "bnpl"
  | "card"
  | "medical"
  | "bhph"
  | "insurance"
  | "banks"
  | "agency"
  | "software"
  | "other";

/** Chips shown in the hero, in the client's order. */
export const HERO_PORTFOLIOS: { value: PortfolioValue; label: string }[] = [
  { value: "bnpl", label: "BNPL" },
  { value: "card", label: "Credit card" },
  { value: "medical", label: "Medical" },
  { value: "bhph", label: "Buy here pay here" },
  { value: "insurance", label: "Insurance" },
  { value: "banks", label: "Banks & lending" },
  { value: "agency", label: "Collection agency" },
];

/** Full option list for the booking form. */
export const PORTFOLIO_OPTIONS: { value: PortfolioValue; label: string }[] = [
  { value: "bnpl", label: "BNPL and installment loans" },
  { value: "card", label: "Credit card" },
  { value: "medical", label: "Medical and healthcare" },
  { value: "bhph", label: "Buy here pay here" },
  { value: "insurance", label: "Insurance" },
  { value: "banks", label: "Banks and lending" },
  { value: "agency", label: "We are a collection agency" },
  { value: "software", label: "We build collections software" },
  { value: "other", label: "Something else" },
];

export const PORTFOLIO_EVENT = "vodex:select-portfolio";

export function selectPortfolio(value: PortfolioValue): void {
  window.dispatchEvent(new CustomEvent<PortfolioValue>(PORTFOLIO_EVENT, { detail: value }));
}
