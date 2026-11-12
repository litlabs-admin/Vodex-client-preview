import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SolutionStatBand } from "@/components/sections/SolutionStatBand";
import { SolutionCertRow } from "@/components/sections/SolutionCertRow";
import { SolutionWhyUs } from "@/components/sections/SolutionWhyUs";
import { SolutionWorkflows } from "@/components/sections/SolutionWorkflows";
import { Faq } from "@/components/sections/Faq";
import { DcHeroChips } from "@/components/sections/debt-collection/DcHeroChips";
import { DcHowItWorks } from "@/components/sections/debt-collection/DcHowItWorks";
import { DcWorkflowCards } from "@/components/sections/debt-collection/DcWorkflowCards";
import { DcHearIt } from "@/components/sections/debt-collection/DcHearIt";
import { DcComplianceCase } from "@/components/sections/debt-collection/DcComplianceCase";
import { DcBooking } from "@/components/sections/debt-collection/DcBooking";
import { DcCtaTracker } from "@/components/sections/debt-collection/DcCtaTracker";
import { StickyBookCta } from "@/components/sections/debt-collection/StickyBookCta";
import { PhoneCallIcon, ShieldCheckIcon, SignalTowerIcon } from "@/components/ui/icons";
import solutionHeroBg from "@/public/assets/debt-collection-hero-bg.jpg";
import statBandBg from "@/public/assets/case-study-bg.jpg";
import { pageMetadata } from "@/lib/seo";
import { DEBT_COLLECTION_FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";
import type { PortfolioValue } from "@/lib/portfolio";

/* Page copy follows the client's revised version
   (vodex-debt-collection-revised.html): one primary CTA ("Book a demo" →
   on-page #book form), portfolio chips that preselect that form, call
   samples on-page, and only the 7X / 3X numbers from the published case
   study. */

const BOOK_ANCHOR = "#book";
const CASE_STUDY_HREF =
  "/resources/case-studies/this-debt-collection-firm-increased-connectivity-rate-by-3x";

const STATS = [
  { number: "7X", label: "Connect rate improvement" },
  { number: "3X", label: "Debt recovery improvement" },
];

const WHY_CARDS = [
  {
    title: "Every account gets a call",
    description:
      "Agents work the full list, redial missed calls and follow up on a schedule you control.",
    Icon: PhoneCallIcon,
    src: "/assets/feature-1.jpg",
  },
  {
    title: "Volume without hiring",
    description:
      "Add campaigns, not collectors. Capacity grows with your book, not your headcount.",
    Icon: SignalTowerIcon,
    src: "/assets/feature-4.jpg",
  },
  {
    title: "Guardrails on every call",
    description:
      "Time-of-day limits, disclosures and consent rules are set before a campaign goes live.",
    Icon: ShieldCheckIcon,
    src: "/assets/why-vodex-3.jpg",
  },
];

const PORTFOLIO_CARDS: {
  title: string;
  description: string;
  src: string;
  cta: { label: string; portfolio: PortfolioValue };
}[] = [
  {
    title: "Buy now pay later",
    description: "Installment reminders and failed payment follow-ups.",
    src: "/assets/debt-collection-industry-1.png",
    cta: { label: "Book a demo for BNPL", portfolio: "bnpl" },
  },
  {
    title: "Credit card",
    description: "Early and mid-stage delinquency outreach at scale.",
    src: "/assets/action-1.jpg",
    cta: { label: "Book a demo for cards", portfolio: "card" },
  },
  {
    title: "Medical & healthcare",
    description: "HIPAA-aware patient payment reminders and balance questions.",
    src: "/assets/debt-collection-industry-2.jpg",
    cta: { label: "Book a demo for medical", portfolio: "medical" },
  },
  {
    title: "Buy here pay here",
    description: "High-frequency outreach on late and missed payments.",
    src: "/assets/debt-collection-industry-3.jpg",
    cta: { label: "Book a demo for BHPH", portfolio: "bhph" },
  },
  {
    title: "Insurance",
    description: "Lapsed policy reminders and premium follow-ups.",
    src: "/assets/debt-collection-industry-5.jpg",
    cta: { label: "Book a demo for insurance", portfolio: "insurance" },
  },
  {
    title: "Banks & lending",
    description: "Loan repayment follow-ups and early-stage outreach.",
    src: "/assets/industries-banks.jpg",
    cta: { label: "Book a demo for lending", portfolio: "banks" },
  },
];

export const metadata: Metadata = pageMetadata({
  title: "AI Voice Agents for Debt Collection | FDCPA, Reg F, TCPA Compliant | Vodex",
  description:
    "Vodex voice agents call, redial and follow up on past-due accounts, capture promises to pay and sync outcomes to your system, inside FDCPA, Reg F and TCPA guardrails. Book a demo.",
  path: "/solutions/debt-collection",
});

export default function DebtCollectionPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar bookHref={BOOK_ANCHOR} />
      </header>
      <main>
        <SolutionHero
          headingId="debt-collection-hero-title"
          badgeLabel="Debt collection"
          compact
          titleLines={
            <>
              Recover more from every account.{" "}
              <span className="accent">Without more headcount.</span>
            </>
          }
          lead="Vodex voice agents call, redial and follow up on past-due accounts around the clock, capture promises to pay, and write every outcome back to your system, inside FDCPA, Reg F and TCPA guardrails."
          primaryCta={{ label: "Book a demo", href: BOOK_ANCHOR }}
          secondaryCta={{ label: "Hear a sample call", href: "#hear" }}
          footnote="20 minutes. Three quick questions first. No commitment."
          bgImage={solutionHeroBg}
        >
          <DcHeroChips />
        </SolutionHero>

        <SolutionStatBand
          bgImage={statBandBg}
          stats={STATS}
          caption={
            <>
              Results reported by a debt recovery firm using Vodex voice agents with automated
              redial. <a href={CASE_STUDY_HREF}>Read the case study &rarr;</a>
            </>
          }
        />
        <SolutionCertRow />

        <SolutionWhyUs
          eyebrow="Why collections teams switch"
          heading={
            <>
              Most past-due accounts never get a real conversation.{" "}
              <span className="accent">Fix that first.</span>
            </>
          }
          lead="Collectors can only dial so many numbers in a day. Voice agents work the whole list."
          cards={WHY_CARDS}
        />

        <DcHowItWorks />
        <DcWorkflowCards />
        <DcHearIt />

        <SolutionWorkflows
          headingId="dc-portfolios-title"
          eyebrow="By portfolio"
          heading={
            <>
              Built for <span className="accent">your kind</span> of receivable.
            </>
          }
          lead="Pick yours and we will bring the right example to the call."
          workflows={PORTFOLIO_CARDS}
        />

        <DcComplianceCase />

        <Faq
          items={DEBT_COLLECTION_FAQS}
          heading={
            <>
              Before you <span className="accent">book</span>.
            </>
          }
          ctaHref={BOOK_ANCHOR}
        />
        <JsonLd data={faqPageSchema(DEBT_COLLECTION_FAQS)} />

        <DcBooking />
      </main>
      <Footer />
      <StickyBookCta />
      <DcCtaTracker />
    </>
  );
}
