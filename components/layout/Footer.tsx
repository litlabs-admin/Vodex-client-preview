import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { FooterWordmark } from "@/components/ui/FooterWordmark";
import { SOCIAL_PROFILES } from "@/lib/structured-data";
import styles from "./Footer.module.css";

const COLUMNS: Array<{
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: "Product",
    links: [
      { label: "Voice Agents", href: "/products" },
      { label: "Pricing", href: "/pricing" },
      { label: "Call Samples", href: "/resources/call-samples" },
      { label: "Compliance", href: "/resources/compliance" },
      { label: "Docs", href: "https://docs.vodex.ai", external: true },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Payment Reminders", href: "/solutions/payment-reminders" },
      { label: "Promise-to-Pay Capture", href: "/solutions/promise-to-pay" },
      { label: "Lead Qualification", href: "/solutions/lead-qualification" },
      { label: "Debt Collection", href: "/solutions/debt-collection" },
      { label: "Collection Software", href: "/solutions/collection-software" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Videos", href: "/resources/videos" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Research", href: "/resources/research" },
      { label: "FAQ", href: "/resources/faq" },
      { label: "Help Center", href: "https://vodexhelpcenter.featurebase.app/help", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "News", href: "/company/news" },
      { label: "Investors & Partners", href: "/company/investors" },
      { label: "Careers", href: "https://careers.vodex.ai/", external: true },
      { label: "Contact Us", href: "/company/contact" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-management" },
];

const SOCIAL_LABELS = ["LinkedIn", "X", "YouTube", "Instagram"];

const CERTIFICATIONS = [
  { label: "ISO 27001", src: "/assets/footer-cert-iso.png", width: 420, height: 420 },
  { label: "AICPA SOC 2", src: "/assets/footer-cert-soc2.png", width: 420, height: 420 },
  { label: "HIPAA Compliant", src: "/assets/footer-cert-hipaa.png", width: 420, height: 420 },
  { label: "FDCPA", src: "/assets/footer-cert-fdcpa.png", width: 420, height: 420 },
  { label: "Reg F", src: "/assets/footer-cert-regf.png", width: 420, height: 420 },
  { label: "TCPA", src: "/assets/footer-cert-tcpa.png", width: 420, height: 420 },
  { label: "DebtLink Premier Member", src: "/assets/footer-cert-debtlink.png", width: 450, height: 450 },
  { label: "RMAi — Receivables Management Association International", src: "/assets/footer-cert-rmai.png", width: 1045, height: 370 },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Logo height={32} className={styles.logo} />
            <p className={styles.description}>
              Recover more revenue on every account — AI voice agents that
              make the calls, follow up, and close the loop while your team
              focuses on the conversations that matter.
            </p>

            <p className={styles.updatesLabel}>Get Updates</p>
            <form className={styles.newsletter}>
              <input type="email" placeholder="Enter email address" required />
              <button type="submit">Join</button>
            </form>
          </div>

          {COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <p className={styles.columnTitle}>{title}</p>
              <ul className={styles.columnLinks}>
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    <Link href={href}>
                      {label}
                      {external && <ExternalLinkIcon aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className={styles.divider} />
        <p className={styles.sectionLabel}>Certified, compliant &amp; member of</p>
        <div className={styles.badgeRow}>
          {CERTIFICATIONS.slice(0, 6).map(({ label, src, width, height }) => (
            <Image
              key={label}
              src={src}
              alt={label}
              width={width}
              height={height}
              className={styles.certBadge}
            />
          ))}
          <span className={styles.badgeDivider} aria-hidden="true" />
          {CERTIFICATIONS.slice(6).map(({ label, src, width, height }) => (
            <Image
              key={label}
              src={src}
              alt={label}
              width={width}
              height={height}
              className={styles.certBadge}
            />
          ))}
        </div>

        <hr className={styles.divider} />
        <p className={styles.sectionLabel}>Backed By</p>
        <div className={styles.badgeRow}>
          <Image
            src="/assets/footer-backers.png"
            alt="Backed by Unicorn India Ventures, Pentathlon Ventures, and 100X"
            width={1880}
            height={250}
            className={styles.backersImg}
          />
        </div>

        <hr className={styles.divider} />
        <div className={styles.bottom}>
          <nav aria-label="Legal" className={styles.bottomLinks}>
            <span>&copy; {new Date().getFullYear()} Vodex</span>
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Social" className={styles.bottomLinks}>
            {SOCIAL_PROFILES.map((href, i) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                {SOCIAL_LABELS[i]}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.wordmarkWrap}>
          <FooterWordmark className={styles.wordmark} />
        </div>
      </div>
    </footer>
  );
}
