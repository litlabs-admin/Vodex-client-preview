import { PortfolioLink } from "@/components/ui/PortfolioLink";
import { HERO_PORTFOLIOS } from "@/lib/portfolio";
import styles from "./DcHeroChips.module.css";

/** "Start with your portfolio" — each chip jumps to the booking form with
 * that portfolio preselected. */
export function DcHeroChips() {
  return (
    <div className={styles.start}>
      <p className={styles.label} id="dc-portfolio-label">
        Start with your portfolio
      </p>
      <ul className={styles.chips} aria-labelledby="dc-portfolio-label">
        {HERO_PORTFOLIOS.map(({ value, label }, i) => (
          <li key={value} className={styles.item} style={{ animationDelay: `${300 + i * 40}ms` }}>
            <PortfolioLink portfolio={value} className={styles.chip}>
              {label}
            </PortfolioLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
