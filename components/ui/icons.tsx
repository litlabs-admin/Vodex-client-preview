import type { LucideProps } from "lucide-react";
import {
  ArrowRight as LucideArrowRight,
  LogIn,
  Gauge,
  ShieldCheck,
  AudioLines,
  Layers,
  Orbit,
  Workflow,
  MessageCircle,
  ExternalLink,
  Check,
  X,
  Play,
  Pause,
  Landmark,
  PhoneCall,
  ShieldPlus,
  RadioTower,
  Sparkle,
  Lock,
  Search,
  Briefcase,
  Mail,
  ChartColumn,
  Megaphone,
  Handshake,
  ShieldLock,
  ChevronDown,
  User,
  Phone,
} from "lucide-react";

/**
 * Icons in this project are almost entirely real, downloaded glyphs from
 * Lucide (lucide-react, MIT licensed) — chosen for its currentColor/round-
 * stroke convention, which is close enough to this site's own established
 * look (see `WEIGHT` below) that the swap reads as a level-up, not a style
 * clash. Every export here is a thin wrapper: same name, same
 * `SVGProps<SVGSVGElement>`-compatible signature as before, so none of the
 * ~55 files that `import { XIcon } from "@/components/ui/icons"` needed to
 * change. Two exceptions, both deliberate:
 *
 * - `Waveform` is still 100% hand-drawn — it's the literal Vodex brand mark
 *   (its 5-bar geometry matches `Logo.tsx`'s `BARS` array and `app/icon.svg`
 *   exactly), not a generic UI icon, so there's no "downloading" a
 *   replacement for it.
 * - `SyncIcon` (the old hand-drawn sync/exchange glyph) was dropped — a
 *   repo-wide grep confirmed it had zero usages anywhere outside this file,
 *   so there was nothing to map it onto.
 *
 * A few of the 39 replaced icons don't have a literal 1:1 Lucide match —
 * flagged individually below with the reasoning, rather than silently
 * picking whatever looked closest.
 */

const WEIGHT = 3; // matches the old hand-drawn icons' shared strokeWidth (Lucide's own default is 2, which reads visibly thinner)

/** Long right arrow used on every CTA in the design. */
export const ArrowRight = (props: LucideProps) => (
  <LucideArrowRight strokeWidth={2} {...props} />
);

/** "Log in" glyph. */
export const LoginIcon = (props: LucideProps) => <LogIn strokeWidth={1.9} {...props} />;

/** Five-bar audio waveform — the Vodex mark's inner glyph. Hand-drawn,
 * deliberately not swapped: this is brand identity (matches `Logo.tsx`'s
 * `BARS` array), not a generic icon. */
export function Waveform({ className }: { className?: string }) {
  const bars: Array<[number, number]> = [
    [4, 8],
    [9, 14],
    [14, 20],
    [19, 10],
    [24, 4],
  ];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 28 28"
      fill="currentColor"
    >
      {bars.map(([cx, h], i) => (
        <rect key={i} x={cx - 1.1} y={14 - h / 2} width={2.2} height={h} rx={1.1} />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Trust-strip icons                                                          */
/* -------------------------------------------------------------------------- */

/** Gauge / speedometer — SOC 2. */
export const GaugeIcon = (props: LucideProps) => <Gauge strokeWidth={WEIGHT} {...props} />;

/** Shield with a check — ISO 27001. */
export const ShieldCheckIcon = (props: LucideProps) => <ShieldCheck strokeWidth={WEIGHT} {...props} />;

/** Voice waveform bars — conversations automated. No literal "handset +
 * call-log lines" composite exists in Lucide; a voice-waveform glyph fits a
 * voice-AI product and avoids duplicating PhoneCallIcon's glyph below. */
export const PhoneLinesIcon = (props: LucideProps) => <AudioLines strokeWidth={WEIGHT} {...props} />;

/* -------------------------------------------------------------------------- */
/* Introducing-DROS feature icons                                             */
/* -------------------------------------------------------------------------- */

/** Three stacked layers — end-to-end engagement operations. */
export const LayersIcon = (props: LucideProps) => <Layers strokeWidth={WEIGHT} {...props} />;

/** Ring with an orbiting point — context-aware AI agents. No literal
 * "dotted ring + swirl" exists in Lucide; this is the closest conceptual +
 * visual match for "context." */
export const ContextIcon = (props: LucideProps) => <Orbit strokeWidth={WEIGHT} {...props} />;

/** AI-powered workflows. */
export const WorkflowIcon = (props: LucideProps) => <Workflow strokeWidth={WEIGHT} {...props} />;

/** Speech-bubble — "have more questions?" side card (FAQ). Lucide ships
 * every icon stroke-only by default, so this needs an explicit fill
 * override to reproduce the old glyph's solid look. */
export const ChatIcon = (props: LucideProps) => (
  <MessageCircle fill="currentColor" stroke="none" {...props} />
);

/** Small external-link arrow — footer links / overlay cards that leave the
 * page. */
export const ExternalLinkIcon = (props: LucideProps) => <ExternalLink strokeWidth={WEIGHT} {...props} />;

/** Plain checkmark. */
export const CheckIcon = (props: LucideProps) => <Check strokeWidth={WEIGHT} {...props} />;

/** Plain X / cross. */
export const XIcon = (props: LucideProps) => <X strokeWidth={WEIGHT} {...props} />;

/* -------------------------------------------------------------------------- */
/* Call Samples player                                                        */
/* -------------------------------------------------------------------------- */

/** Filled play triangle — needs the same fill override as ChatIcon. */
export const PlayIcon = (props: LucideProps) => <Play fill="currentColor" stroke="none" {...props} />;

/** Two rounded pause bars — same fill override. */
export const PauseIcon = (props: LucideProps) => <Pause fill="currentColor" stroke="none" {...props} />;

/* -------------------------------------------------------------------------- */
/* Solutions page icons                                                       */
/* -------------------------------------------------------------------------- */

/** Bank / institution building. */
export const BankIcon = (props: LucideProps) => <Landmark strokeWidth={WEIGHT} {...props} />;

/** Ringing handset — distinct from PhoneLinesIcon's voice-waveform glyph. */
export const PhoneCallIcon = (props: LucideProps) => <PhoneCall strokeWidth={WEIGHT} {...props} />;

/** Shield with a medical plus. */
export const ShieldPlusIcon = (props: LucideProps) => <ShieldPlus strokeWidth={WEIGHT} {...props} />;

/** Broadcast mast — utilities & telecom. */
export const SignalTowerIcon = (props: LucideProps) => <RadioTower strokeWidth={WEIGHT} {...props} />;

/** Four-pointed sparkle — effortless / automated compliance. Lucide's
 * `Sparkle` (singular) is the one-point glyph — the old icon was one
 * sparkle, not a multi-star cluster, so this is `Sparkle`, not `Sparkles`. */
export const SparkleIcon = (props: LucideProps) => <Sparkle strokeWidth={WEIGHT} {...props} />;

/** Padlock — script locking / compliance controls. */
export const LockIcon = (props: LucideProps) => <Lock strokeWidth={WEIGHT} {...props} />;

/* -------------------------------------------------------------------------- */
/* Blog / resources                                                           */
/* -------------------------------------------------------------------------- */

/** Magnifying glass — search inputs (blog/video/news listings, the dial-code
 * country picker). */
export const SearchIcon = (props: LucideProps) => <Search strokeWidth={WEIGHT} {...props} />;

/* -------------------------------------------------------------------------- */
/* Resources mega menu icons                                                  */
/* -------------------------------------------------------------------------- */

/** Briefcase — case studies. */
export const CaseStudyIcon = (props: LucideProps) => <Briefcase strokeWidth={WEIGHT} {...props} />;

/** Envelope — Contact Us. */
export const MailIcon = (props: LucideProps) => <Mail strokeWidth={WEIGHT} {...props} />;

/* -------------------------------------------------------------------------- */
/* Contact page icons                                                         */
/* -------------------------------------------------------------------------- */

/** Small bar/column chart — Sales. */
export const ChartBarIcon = (props: LucideProps) => <ChartColumn strokeWidth={WEIGHT} {...props} />;

/** Megaphone — Marketing. */
export const MegaphoneIcon = (props: LucideProps) => <Megaphone strokeWidth={WEIGHT} {...props} />;

/** Clasped hands — Partnership. Lucide's literal `Handshake` is a stronger
 * semantic fit than the old stylized "linked heart" glyph it replaces. */
export const HandshakeIcon = (props: LucideProps) => <Handshake strokeWidth={WEIGHT} {...props} />;

/** Shield with a lock — Data Protection Officer. No literal "cloud + lock"
 * composite exists in Lucide; `ShieldLock` ("protection" + "security") is a
 * stronger semantic fit for a DPO contact card than either a bare `Lock` or
 * a plain `Cloud` would be, and keeps this icon visually distinct from
 * `LockIcon`/`ShieldCheckIcon`/`ShieldPlusIcon` elsewhere (never shown on
 * the same view as any of them). */
export const CloudLockIcon = (props: LucideProps) => <ShieldLock strokeWidth={WEIGHT} {...props} />;

/** Chevron down — dropdown/select triggers. */
export const ChevronDownIcon = (props: LucideProps) => <ChevronDown strokeWidth={WEIGHT} {...props} />;

/* -------------------------------------------------------------------------- */
/* Initiate Call form                                                         */
/* -------------------------------------------------------------------------- */

/** Person outline — the "Your Name" field. */
export const UserIcon = (props: LucideProps) => <User strokeWidth={WEIGHT} {...props} />;

/** Handset — the phone number field. */
export const PhoneIcon = (props: LucideProps) => <Phone strokeWidth={WEIGHT} {...props} />;
