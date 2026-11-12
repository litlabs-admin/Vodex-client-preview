import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

// No `weight` list: Inter is a variable font, so next/font ships one file
// covering 400–700 instead of four static ones.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Self-hosted rather than next/font/google: for this newer family Google
// Fonts sometimes serves extensionless font URLs, which crashes the
// next/font Google loader at build time ("Cannot read properties of null
// (reading '1')"). The file is Google's latin italic variable woff2, so one
// file covers the 400–600 range we use. (Font is SIL OFL.)
const ancizar = localFont({
  src: "./fonts/AncizarSerif-Italic-latin.woff2",
  weight: "400 600",
  style: "italic",
  display: "swap",
  variable: "--font-ancizar",
  // No fallback metric overrides wanted for this accent face.
  adjustFontFallback: false,
  fallback: ["Iowan Old Style", "Georgia", "serif"],
  // Accent-only face (a word or two per heading) — don't let its preload
  // compete with Inter and the hero image for the critical path.
  preload: false,
});

const HOME_TITLE = "Voice AI for Debt Collection & Automated Outreach | Vodex";
const HOME_DESCRIPTION =
  "Boost recovery with enterprise Voice AI for debt collection. Automate right-party contact, payment reminders, and promise-to-pay capture with fully compliant, 24/7 conversational agents.";

// Site-wide fallbacks only. Canonical/og:url are deliberately absent here —
// inherited by every route they'd all point at "/"; pages set their own via
// pageMetadata() in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Client preview — not for search engines.
  robots: { index: false, follow: false },
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vodexsocial",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ancizar.variable}`}
      // The inline script below sets data-announcement-dismissed on this
      // element before hydration ever runs — React's hydration otherwise
      // (correctly) flags that as a mismatch, since this JSX itself never
      // declares that attribute. Standard, sanctioned escape hatch for
      // exactly this "an external script may have already modified this
      // element's attributes before React hydrates it" case (the same
      // pattern dark-mode/theme toggles use). Scoped to just this element,
      // not deep/recursive.
      suppressHydrationWarning
    >
      <body>
        {/* Reads the same key/attribute AnnouncementBar.tsx uses
            (vodex-announcement-dismissed / data-announcement-dismissed) —
            duplicated here on purpose, not imported, since this must stay a
            plain string literal reachable before any client JS runs (that
            file is a "use client" component). Keep both in sync by hand if
            either ever changes.

            Deliberately a hand-written <script>, not next/script's
            beforeInteractive strategy: that strategy defers the actual
            <script> tag to just before the trailing webpack chunk loader
            (verified via curl against both `next dev` and a `next build`
            output — Next streams it in via a `self.__next_s.push(...)`
            call near the end of <body>, not literally in <head>), which
            still executes before hydration but not necessarily before the
            browser paints everything above it — under dev-mode's extra
            HMR/DevTools scripts specifically, that gap was wide enough for
            an actual (if brief) visible flash + CSS transition to run.
            Placed as the literal first child of <body> instead, a plain,
            parser-blocking inline script always executes synchronously at
            that exact point — genuinely before the browser can parse/paint
            anything after it, including the announcement bar itself,
            regardless of whatever else Next.js injects elsewhere in the
            document and regardless of dev vs. prod. Runs once per full
            document load only (a browser never re-executes an inline
            script it already ran, and this isn't re-parsed on a
            client-side route change) — soft navigation is instead covered
            by AnnouncementBar's own layout effect. This is what lets a
            returning, already-dismissed visitor see the bar already gone
            (and --header-h already shrunk, see globals.css) on the very
            first painted frame, instead of a flash-then-collapse. */}
        <script
          id="announcement-dismissed-init"
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('vodex-announcement-dismissed')){document.documentElement.setAttribute('data-announcement-dismissed','true');}}catch(e){}",
          }}
        />
        {children}

        {/* Preview build: Google Analytics, the Ketch consent banner and the
            Chatbase widget are intentionally left out, so client-preview
            visits never reach production analytics or support chat. */}
      </body>
    </html>
  );
}
