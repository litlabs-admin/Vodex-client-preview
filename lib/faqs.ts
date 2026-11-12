import type { FaqItem } from "@/components/sections/Faq";

/*
 * FAQ copy carried over from the previous vodex.ai (Webflow) site, one set
 * per page, in the old site's order. Text is kept word-for-word; only obvious
 * typos were fixed. One deliberate change: on the old promise-to-pay page the
 * second question didn't match its answer, so the question was rewritten to
 * fit the answer.
 */

export const FAQ_PAGE_CATEGORIES = [
  "General Questions",
  "Usage and Capabilities",
  "Performance & Security",
  "Pricing and Support",
] as const;

export type CategorizedFaqItem = FaqItem & {
  category: (typeof FAQ_PAGE_CATEGORIES)[number];
};

/** /resources/faq (old /faq). */
export const FAQ_PAGE_FAQS: CategorizedFaqItem[] = [
  {
    category: "General Questions",
    question: "What is Vodex and how does it help debt collection?",
    answer:
      "Vodex is a Voice AI platform that automates high-volume collection calls such as RPC verification, payment reminders, disputes, and promise-to-pay capture. Agencies use Vodex to reduce manual workload, increase contact rates, and improve compliance consistency.",
  },
  {
    category: "General Questions",
    question: "How does Vodex's Voice AI differ from regular IVR or autodialers?",
    answer:
      "Unlike IVR or recorded systems, Vodex uses conversational AI that understands intent, follows scripts dynamically, handles objections, verifies right-party contact, and captures structured outcomes such as PTPs — all with audit-ready logs.",
  },
  {
    category: "General Questions",
    question: "Is Vodex compliant with FDCPA, TCPA, and Reg F requirements?",
    answer:
      "Yes. Vodex enforces disclosures, calling windows, consent handling, opt-outs, call caps, and audit logging. The platform ensures every call maintains legally required language and produces timestamped transcripts for record-keeping.",
  },
  {
    category: "General Questions",
    question: "Who is Vodex designed for?",
    answer:
      "Vodex is built for debt collection agencies, creditors, lenders, banks, BNPL providers, and collection software platforms needing compliant, high-volume voice automation for outreach and recovery.",
  },
  {
    category: "General Questions",
    question: "Can Vodex work alongside my current dialer or collections software?",
    answer:
      "Yes. Vodex integrates through APIs, webhooks, or secure data uploads. Your team can continue using existing dialers, CRM systems, and workflows while Vodex automates outbound calling and writes outcomes back.",
  },
  {
    category: "General Questions",
    question: "Does Voice AI replace human collectors?",
    answer:
      "No. Vodex handles Tier-1 repetitive calling, while human collectors focus on hardship cases, disputes, escalations, and complex negotiations. AI and agents complement each other to increase overall recovery rates.",
  },
  {
    category: "General Questions",
    question: "How quickly can we launch a pilot?",
    answer:
      "Most agencies can run a CSV-based pilot in 1–3 weeks. Full integrations (dialer + CRM) typically take 4–8 weeks, depending on telephony setup and compliance requirements.",
  },
  {
    category: "Usage and Capabilities",
    question: "What types of collection calls can Vodex automate?",
    answer:
      "Vodex automates pre-delinquency reminders, payment-due alerts, grace-period outreach, past-due reminders, PTP capture, RPC verification, dispute triage, settlement interest checks, and callback scheduling.",
  },
  {
    category: "Usage and Capabilities",
    question: "Can the AI detect intent and differentiate between a wrong number, refusal, or willingness to pay?",
    answer:
      "Yes. Vodex identifies sentiment, intent, and compliance-safe outcomes such as paid, PTP date, will not pay, wrong party, call back later, dispute, and agent transfer, updating CRM fields accordingly.",
  },
  {
    category: "Usage and Capabilities",
    question: "Can we customize scripts, disclosures, and business rules?",
    answer:
      "Fully. Vodex allows you to configure custom rules: disclosures, pacing, escalation paths, dispute language, thresholds for agent handoff, and workflow logic tailored to your compliance team's standards.",
  },
  {
    category: "Usage and Capabilities",
    question: "How does Vodex ensure consistent call quality at scale?",
    answer:
      "The platform provides high-quality voice synthesis, noise filtering, fallback logic, interruption handling, and script locking. Each call follows consistent compliance guidelines and maintains uniform experience across thousands of conversations.",
  },
  {
    category: "Usage and Capabilities",
    question: "Can Vodex transfer live calls to our agents when needed?",
    answer:
      "Yes. Vodex supports warm transfers to your team.",
  },
  {
    category: "Performance & Security",
    question: "What recovery or performance improvements can agencies expect?",
    answer:
      "Most clients see 25–40% improvement in timely payments, 2–3x better contact rates, marked lift in PTP capture, and significant reduction in manual workload, depending on portfolio type and workflows.",
  },
  {
    category: "Performance & Security",
    question: "How accurate is the AI in capturing PTPs, RPCs, or dispute signals?",
    answer:
      "Vodex achieves 90-95% accuracy in structured outcome capture due to reinforced prompting, intent classification, fallback rules, and script-locking — ensuring no required compliance language is skipped.",
  },
  {
    category: "Performance & Security",
    question: "How are call recordings, transcripts, and outcomes stored?",
    answer:
      "All call artifacts are encrypted in transit and at rest. Recordings and transcripts are indexed, searchable, and exportable for audits. Agencies can request compliance packs including logs, disclosures, and event timelines.",
  },
  {
    category: "Performance & Security",
    question: "What security certifications does Vodex hold?",
    answer:
      "Vodex is ISO 27001 and SOC 2 Type II certified. Role-based access control, encrypted storage, MFA, and detailed audit logs ensure safe handling of sensitive borrower information.",
  },
  {
    category: "Performance & Security",
    question: "How do we measure success during a pilot?",
    answer:
      "Key KPIs include: RPC rate, Right-party verification accuracy, PTP capture rate, PTP conversion rate, Cost-per-contact, Escalation rate, Call throughput, and Compliance violations (should be zero).",
  },
  {
    category: "Pricing and Support",
    question: "How much does Vodex cost?",
    answer:
      "Our pricing depends on factors like call volume, features, and integrations. Simply visit our pricing page to view our plans.",
  },
  {
    category: "Pricing and Support",
    question: "What kind of support does Vodex offer?",
    answer:
      "We offer dedicated customer support, including onboarding, technical assistance, and ongoing AI optimization in our enterprise plan to help you get the most out of our platform.",
  },
  {
    category: "Pricing and Support",
    question: "Can I test Vodex before committing?",
    answer:
      "Yes! You can request a demo to experience our AI voice agents in action and see how they fit into your business workflow. You can even try an instant demo on our home page and talk to our AI firsthand. If you're interested in a deeper evaluation, you can try our free plan which gives you 10 calling minutes and platform access, we can also set up a proof of concept (POC) based on your specific needs after a discussion.",
  },
  {
    category: "Pricing and Support",
    question: "What's included in Vodex's onboarding process?",
    answer:
      "Our onboarding covers platform setup, script customization, integration with your existing tools, and training to ensure a smooth start.",
  },
  {
    category: "Pricing and Support",
    question: "How do I get started with Vodex?",
    answer:
      "Getting started is simple! Just reach out to us, and our team will get in touch with you to guide you through the next steps.",
  },
];

/** / (old homepage). */
export const HOME_FAQS: FaqItem[] = [
  {
    question: "What is Vodex, and how does it work?",
    answer:
      "Vodex is a generative AI-powered voice solution that automates calls for collections, customer engagement and more. Our AI voice agents handle conversations in real time and follow up without human intervention.",
  },
  {
    question: "What industries can benefit from Vodex?",
    answer:
      "Vodex is purpose-built to serve debt collection and receivables management industry. If your business handles high-volume payment reminders, right-party contact (RPC), or promise-to-pay (PTP) follow-ups, Vodex's Voice AI agents can automate these workflows end-to-end.",
  },
  {
    question: "Do AI voice agents sound robotic?",
    answer:
      "No. Our AI voice agents use advanced speech synthesis to create lifelike, human-like conversations. They adapt to different accents, tones, and pacing for a natural experience. Want to hear for yourself? Just head to the top of our homepage, enter your details, and request a call.",
  },
  {
    question: "Can I customize the AI voice agent's responses?",
    answer:
      "Absolutely! Vodex allows full customization of conversation flows, tone, and response structures to match your brand's voice and customer needs.",
  },
  {
    question: "How can I see Vodex in action?",
    answer:
      "You can request a live demo where we'll walk you through the platform and show you real-time AI voice interactions tailored to your use case.",
  },
  {
    question: "How is Vodex different from a traditional IVR or chatbot?",
    answer:
      "Unlike IVRs or chatbots that follow rigid scripts, Vodex AI voice agents engage in dynamic, natural conversations. They understand intent, respond contextually, and adapt to the flow of a conversation—just like a human rep.",
  },
  {
    question: "Can Vodex integrate with my existing CRM or tools?",
    answer:
      "Yes! Vodex seamlessly integrates with popular CRMs, dialers, and marketing automation platforms, ensuring a smooth workflow without disrupting your existing systems.",
  },
  {
    question: "Is Vodex compliant with data security and privacy regulations?",
    answer:
      "Yes, Vodex is AICPA SOC 2 & ISO 27001 certified, ensuring the highest standards of data security and privacy. Our AI agents operate within strict compliance frameworks to protect customer information.",
  },
  {
    question: "Will AI voice agents replace human agents?",
    answer:
      "Vodex is designed to enhance human teams, not replace them. Our AI agents handle repetitive, high-volume calls so that your human agents can focus on complex and high-value interactions.",
  },
  {
    question: "How can I get pricing for Vodex?",
    answer:
      "Pricing depends on your specific needs, such as call volume, use cases, and integrations. Visit our pricing page to see our plans.",
  },
];

/** /products (old /product). */
export const PRODUCT_FAQS: FaqItem[] = [
  {
    question: "Do you have Unlimited Agents?",
    answer:
      "You can add unlimited agents to a single account, allowing multiple departments to have their own AI agents within the same platform.",
  },
  {
    question: "Is there a Call Transfer option available?",
    answer:
      "Vodex allows calls to be transferred to human agents as needed. During an AI-driven call, if a situation arises that requires human intervention, the call can be seamlessly transferred to a live agent to ensure effective handling of the customer query.",
  },
  {
    question: "Does Vodex integrate with my existing collections software or CRM?",
    answer:
      "Yes. Vodex connects through APIs, webhooks, SFTP, or CSV workflows. It can write back outcomes like PTP date/amount, disputes, call status, and disposition codes directly into your CRM or collections platform. If your system has a dialer or SIP trunk, Vodex can sit on top of it; otherwise, Vodex can handle outbound calling through its own carrier partners.",
  },
  {
    question: "How quickly can we launch a pilot and measure lift in collections performance?",
    answer:
      "Most teams launch a CSV-based pilot within 1–3 weeks. API pilots take 4–8 weeks depending on mapping and telephony setup. Core KPIs measured include RPC rate, PTP rate, payment conversion, cost per contact, and AHT reduction. Pilots are designed to provide clear before-vs-after comparisons so you can quantify operational lift before scaling.",
  },
  {
    question: "Do you have Call Recordings?",
    answer:
      "Calls can be recorded and stored for quality assurance, training, and compliance purposes. Users can access recorded calls through the Vodex dashboard to review interactions and evaluate performance.",
  },
  {
    question: "Can we send SMS, Emails & Voicemails?",
    answer:
      "Vodex supports sending Email, SMS and WhatsApp messages in addition to making calls. This feature allows for multi-channel communication, enabling businesses to reach their clients through their preferred communication method. A voicemail can be left for the customer as well.",
  },
  {
    question: "What are your Call Charges?",
    answer:
      "Vodex only charges for connected calls. We do not charge for ringing. There is also a slight charge for voicemail as it is considered a connected call.",
  },
];

/** /pricing (old /pricing). */
export const PRICING_FAQS: FaqItem[] = [
  {
    question: "What factors affect the cost of Vodex's AI voice agent solutions?",
    answer:
      "Pricing is based on: Call Volume – The number of AI-powered outbound and inbound calls. Use Case – Lead qualification, debt collection, appointment scheduling, customer support, etc. Integration Requirements – CRM, payment gateways, or third-party systems.",
  },
  {
    question: "Are there any setup costs or hidden fees?",
    answer:
      "Vodex provides transparent pricing with no hidden fees. Depending on the complexity of integrations or specific requirements, a setup cost may apply, which will be outlined during the consultation.",
  },
  {
    question: "How long does it take to set up Vodex's AI voice agents?",
    answer:
      "Setup time depends on the complexity of integrations and customization needed. Most businesses can get started within a few days to a few weeks, depending on the scale of deployment.",
  },
  {
    question: "Will I be charged for unanswered or unconnected calls?",
    answer:
      "Calling minutes only include connected calls. If the call is not connected, you won't be charged. Extra minutes at $0.13/min.",
  },
  {
    question: "Is Vodex's pricing usage-based or subscription-based?",
    answer:
      "Vodex offers flexible pricing models, including pay-per-usage and subscription plans. Our team will recommend the best pricing structure based on your business goals and call volume.",
  },
  {
    question: "How does Vodex compare to traditional call centers in terms of cost?",
    answer:
      "AI voice agents can significantly reduce costs by automating high-volume calls without requiring large human teams. Compared to traditional call centers, Vodex helps businesses save on hiring, training, and operational overhead while improving efficiency.",
  },
  {
    question: "Is Vodex's AI secure and compliant with industry standards?",
    answer:
      "Yes, Vodex is SOC 2, ISO 27001 and HIPAA certified, ensuring the highest standards of information security, data protection, and regulatory compliance. Our AI voice agents are designed to meet strict security protocols while also adhering to industry-specific regulations like FDCPA, TCPA and more.",
  },
];

/** /solutions/debt-collection (old /debt-collection). Client-revised set
 * (vodex-debt-collection-revised.html) — also feeds the page's FAQPage JSON-LD. */
export const DEBT_COLLECTION_FAQS: FaqItem[] = [
  {
    question: "Can a voice agent capture promises to pay and stay compliant?",
    answer:
      "Yes. Vodex agents follow the contact rules you configure, including time-of-day limits, disclosures and consent, and record and transcribe every call. Your compliance team approves the rule set before a campaign goes live.",
  },
  {
    question: "How long does a pilot take?",
    answer:
      "A CSV-based pilot typically takes one to three weeks. A full API and dialer integration typically takes four to eight weeks.",
  },
  {
    question: "Do we need a dialer or telephony stack?",
    answer:
      "No. You can start with Vodex placing the calls from your account list, and add an API or dialer integration later.",
  },
  {
    question: "Will this replace our collectors?",
    answer:
      "No. Vodex handles reminders, redials and promise follow-ups so collectors spend their time on negotiations, hardship cases and disputes, with the full call history attached.",
  },
  {
    question: "Can borrowers pay during the call?",
    answer:
      "Vodex can commit a borrower to a payment date on the call and send a payment link, based on the payment options you connect.",
  },
  {
    question: "How do outcomes get back to our system?",
    answer:
      "Call dispositions, transcripts and promise-to-pay details are returned by API or file, so your collections platform stays the system of record.",
  },
  {
    question: "What should we measure in a pilot?",
    answer:
      "The usual set: connect rate, right party contact rate, promises captured, promises kept and cost per contact, compared against a control group from your own portfolio.",
  },
];

/** /solutions/collection-software (old /collections-software-integration). */
export const COLLECTION_SOFTWARE_FAQS: FaqItem[] = [
  {
    question: "Can Vodex integrate with my collections CRM or platform?",
    answer:
      "Yes. Vodex connects via APIs/webhooks or simple CSV uploads for pilots and can write call outcomes back to your CRM. If your platform already uses a dialer/SIP trunk Vodex can sit on that channel; if not, we can run campaigns from Vodex and sync results into your system.",
  },
  {
    question: "Are AI agents allowed to capture PTPs under FDCPA, TCPA and Reg F?",
    answer:
      "Yes, when flows enforce the same rules as human collectors (disclosures, consent/DNC handling, correct calling windows, and audit logs). Properly configured Voice AI often improves compliance consistency because it never skips required language and creates timestamped transcripts.",
  },
  {
    question: "How long does a pilot or integration usually take?",
    answer:
      "A CSV pilot can run in 1–3 weeks. A standard API + dialer integration typically takes 4–8 weeks depending on telephony setup, CRM mapping, and compliance checks. Pilots are recommended to validate outcomes before full rollout.",
  },
  {
    question: "Will Voice AI replace my live collectors?",
    answer:
      "No. Voice AI handles high-volume, repetitive Tier-1 work (reminders, verification, basic negotiations). Humans keep responsibility for hardship cases, disputes, and complex negotiations; calls can be warm-transferred with full context.",
  },
  {
    question: "How secure is my data and what compliance artifacts can I request?",
    answer:
      "Calls and data are encrypted in transit and at rest, access-controlled, and logged. Vodex can provide compliance documentation and audit artifacts on request to support vendor reviews and regulatory needs.",
  },
  {
    question: "Do I need a dialer or telephony stack to use Voice AI?",
    answer:
      "You need an outbound voice channel (dialer, SIP trunk, or telephony partner). Vodex works with your existing telephony or can route calls from our platform through partner carriers — the important part is an enabled calling channel.",
  },
  {
    question: "Can borrowers pay during the same Voice AI call?",
    answer:
      "Yes, with caveats. Common approaches: transfer to a PCI-compliant IVR, send a secure payment link via SMS, or warm-handoff to an agent for assisted payment. Full in-call card collection requires PCI controls and approved payment partners.",
  },
  {
    question: "What KPIs should I measure in a PTP or payment-reminder pilot?",
    answer:
      "Track PTP capture rate, PTP→ payment conversion, connect/RPC rate, average handle time (AHT), cost-per-contact, and escalation rate. Run a control vs test cohort so you can credibly measure lift before scaling.",
  },
  {
    question: "How are call outcomes and transcripts returned to our system?",
    answer:
      "Outcomes (PTP date/amount, paid, dispute, disposition) and transcripts are delivered via API/webhook or downloadable CSV. You control field mapping so CRM records update in near real-time and remain audit-ready.",
  },
  {
    question: "Can Voice AI follow our custom workflows, rules, and business logic?",
    answer:
      "Yes. You can configure intents, routing rules, escalation paths, workflows, and logic to mirror your exact collections process. Vodex maps to your existing rules so AI acts as a seamless voice layer on top of your system.",
  },
];

/** /solutions/payment-reminders (old /use-cases/payment-reminders). */
export const PAYMENT_REMINDERS_FAQS: FaqItem[] = [
  {
    question: "How do AI payment reminders (automated payment reminder calls) actually work for collections?",
    answer:
      "AI voice agents pull due dates from your CRM or uploaded CSV, schedule calls by segment, run consent checks, deliver context-aware scripts, capture responses (promise-to-pay, dispute, updated contact) and sync results to your dashboard, enabling automated payment reminder calls at scale.",
  },
  {
    question: "What business impact can US collection teams expect from AI payment reminders?",
    answer:
      "Real programs report meaningful gains: improved on-time payments (clients report up to ~30% uplift), reduced agent workload (~40% less manual follow-up), and lower cost per contact, the net effect: shorter DSO and fewer delinquencies. (Use a pilot to measure your exact ROI.)",
  },
  {
    question: "Which reminder types should US receivables teams automate first?",
    answer:
      "Start with high-impact flows: upcoming-due reminders, same-day reminders, grace-period follow-ups, overdue notices, last-chance alerts and promise-to-pay confirmations. Prioritize accounts by balance, risk, and contact history.",
  },
  {
    question: "When should collections use voice reminders vs SMS or email?",
    answer:
      "Voice is best for time-sensitive and high-value reminders or where two-way interaction is needed (e.g., promise-to-pay). SMS/email works for low-value or informational reminders. Use a blended approach: voice for priority accounts, SMS/email for routine nudges.",
  },
  {
    question: "What security and data controls are required for US payment reminder programs?",
    answer:
      "AI payment reminder platforms should use encryption in transit & at rest, role-based access controls, retention policies, SOC2/ISO-aligned security, secure webhooks for payment posting, and detailed audit logs. For sensitive data like cardholder info, PCI compliance is typically handled by your payment processor or gateway, not the reminder platform itself.",
  },
  {
    question: "Are automated payment reminder calls FDCPA/TCPA compliant in the US?",
    answer:
      "Yes, when the platform enforces US rules: time-of-day limits, consent/consent-revocation handling, scrub lists (DNC/Consent), configurable legal scripts, and call-record rules. Vodex supports FDCPA/TCPA settings to reduce compliance risk on reminder campaigns.",
  },
  {
    question: "Can AI voice agents verify Right-Party Contact (RPC) and reduce skip-tracing effort?",
    answer:
      "Yes. During reminder calls AI agents confirm identity, capture alternate numbers, verify addresses, and can trigger skip-trace workflows for hard contacts, improving RPC rates and saving manual skip-trace time and costs.",
  },
  {
    question: "How do AI reminders integrate with CRMs and payment gateways?",
    answer:
      "Integrations are via API or secure CSV/webhook. You can sync due dates, payment status, and call outcomes back into your CRM, and push payment links or confirmations to your payment gateway for reconciliation. Typical integrations: CRMs, payment processors, and ticketing systems.",
  },
  {
    question: "How should I run a low-risk pilot of AI payment reminders in the US?",
    answer:
      "Pilot steps: (1) select a sample cohort (e.g., 1–2k accounts), (2) define KPIs (RPC, on-time payments, promises), (3) configure compliant scripts and call windows, (4) run for 4–6 weeks, (5) compare against control group and adjust. Report on DSO change and collection rate.",
  },
  {
    question: "How do I scale automated payment reminder campaigns while staying compliant?",
    answer:
      "Scale safely by throttling call volumes, using consent/opt-out management, deploying adaptive pacing based on contact patterns, continuously monitoring call logs for script deviations, and auditing compliance metrics. Combine automated agents with human handoffs for disputes.",
  },
];

/** /solutions/promise-to-pay (old /use-cases/promise-to-pay-capture). */
export const PROMISE_TO_PAY_FAQS: FaqItem[] = [
  {
    question: "What is Promise-to-Pay (PTP) capture in debt collection?",
    answer:
      "Promise-to-Pay (PTP) capture refers to recording a borrower's commitment to make a payment on a specific date or through a structured plan. Accurate PTP capture is critical because it directly affects recovery forecasts, agent workflows, and compliance reporting. Platforms like Vodex automate the capture, confirmation, and CRM write-back of PTPs so teams always have up-to-date, audit-ready records.",
  },
  {
    question: "Are AI Voice Agents allowed to capture PTPs under federal and state collection rules?",
    answer:
      "Yes. AI Voice Agents are fully allowed to capture PTPs as long as they follow the same federal and state rules required of human collectors. In fact, AI often improves compliance because it never skips mandatory disclosures, mishandles consent, exceeds call-frequency limits, or dials outside approved windows. Vodex strengthens this even further with built-in script locking, real-time compliance guardrails, timestamped transcripts, and automatic DNC syncing ensuring every PTP is captured accurately, consistently, and in a fully auditable format.",
  },
  {
    question: "Can AI Voice Agents confirm or schedule payments during the same call?",
    answer:
      "Yes. Modern systems can negotiate simple payment details, confirm dates, and even trigger SMS or email reminders. Vodex's AI agents can schedule payment reminders, confirm commitments, trigger payment-portal links, and automatically update the borrower's next action in your system of record.",
  },
  {
    question: "Can AI Voice Agents reduce the cost of collecting PTPs?",
    answer:
      "Absolutely. Since PTP calls are high-volume but repetitive, AI can handle 60–80% of first-tier interactions at a fraction of the cost of human agents. Vodex customers typically shift the majority of low-complexity PTP conversations to Voice AI, reducing operational expenses while increasing actual commitments.",
  },
  {
    question: "Does AI improve the quality and consistency of PTP follow-up?",
    answer:
      "Yes. AI ensures reminders, verifications, payment-link nudges, and callbacks happen exactly on schedule. Vodex automates the entire follow-up chain, triggering reminders, updating next-contact dates, and ensuring no PTP slips through the cracks.",
  },
  {
    question: "How can AI Voice Agents improve PTP capture rates?",
    answer:
      "AI Voice Agents improve PTP capture by maintaining consistent scripts, asking follow-up questions reliably, and confirming payment details without error. They never rush the borrower, stay compliant, and preserve every intent signal. Vodex's Voice AI agents are specifically tuned for debt collection conversations and are trained to detect payment intent, verify borrower identity, and confirm payment dates with near-perfect consistency.",
  },
  {
    question: "How accurate is AI-based PTP detection compared to human agents?",
    answer:
      "AI often captures PTPs more reliably because it doesn't skip steps, forget disclaimers, or mistype details. It records exact borrower statements, intent categories, dates, and follow-ups. Vodex uses intent classification and structured data extraction so every PTP is logged cleanly and written back to your CRM in real time.",
  },
  {
    question: "What happens if a borrower declines or hesitates during a PTP call?",
    answer:
      "AI agents can de-escalate, offer alternative dates, provide information, or gracefully hand off to a human if needed. Vodex includes real-time call transfer to your team when the borrower needs a human, ensuring continuity without compliance risk.",
  },
  {
    question: "Is the borrower data and PTP information securely stored?",
    answer:
      "Yes. PTP data must be encrypted, access-controlled, and audit-logged to meet federal and industry security requirements. Vodex stores transcripts, call logs, and PTP details in a secure environment with audit trails and optional compliance documentation (SOC2, HIPAA, ISO on request).",
  },
  {
    question: "Can AI integrate with our collections CRM or in-house system for PTP updates?",
    answer:
      "Yes. Most platforms integrate via APIs, middleware, or file-based syncing. Vodex supports integrations with leading collections systems, dialers, and custom in-house platforms ensuring PTP commitments, timestamps, and call outcomes sync automatically.",
  },
];

/** /solutions/lead-qualification (old /use-cases/lead-qualification). */
export const LEAD_QUALIFICATION_FAQS: FaqItem[] = [
  {
    question: "What is AI-powered lead qualification?",
    answer:
      "AI-powered lead qualification uses artificial intelligence, often through voice or conversational AI to automatically verify, assess, and categorize leads based on their intent, eligibility, and readiness to buy. Instead of manual calls or long forms, AI agents engage prospects in natural conversations, capture details, and instantly score or qualify them for your sales team.",
  },
  {
    question: "What kind of businesses benefit from AI lead qualification?",
    answer:
      "Industries like financial services, insurance, real estate, mortgage, healthcare, education, and digital marketing benefit the most. Any business handling high lead volumes or time-sensitive inquiries can automate early screening and let human teams focus only on qualified opportunities.",
  },
  {
    question: "How accurate are AI voice agents in identifying qualified leads?",
    answer:
      "Modern AI voice agents can achieve up to 90% accuracy in identifying qualified leads by combining conversational AI, natural language understanding, and CRM data. The more they interact and learn from real calls, the more precise they become at detecting buying intent and eligibility.",
  },
  {
    question: "How much does AI lead qualification software cost?",
    answer:
      "Pricing depends on call volume, use case complexity, and integrations. Vodex offers standard, growth, pro as well as custom enterprise plans. The ROI typically outweighs the cost, as teams save hours in manual qualification and convert more leads faster.",
  },
  {
    question: "Can AI voice agents handle compliance during lead qualification?",
    answer:
      "Yes. AI voice agents can be trained to comply with regional regulations like TCPA, GLBA, or HIPAA. They record disclosures, manage consent, and log every interaction securely—ensuring your qualification process stays compliant across markets.",
  },
  {
    question: "How do AI voice agents qualify leads?",
    answer:
      "AI voice agents qualify leads by asking context-based questions, listening to responses, and analyzing tone, sentiment, and intent in real time. They can verify data (like income or business type), check eligibility against preset rules, and determine whether the lead meets your qualification criteria and then hand off hot leads to sales reps or book appointments directly.",
  },
  {
    question: "What are the benefits of automating lead qualification with AI?",
    answer:
      "Automation improves lead response time, reduces manual workload, and ensures every inquiry is followed up 24/7. Businesses see up to 3x higher response rates and more consistent qualification accuracy, leading to better pipeline efficiency and higher conversions, all while reducing operational costs.",
  },
  {
    question: "How does a Vodex AI lead qualification system integrate with CRMs or other tools?",
    answer:
      "Vodex can integrate directly with CRMs like HubSpot, Salesforce, GoHighLevel or custom tools through APIs. They can automatically update lead status, push call notes, and even trigger workflows, so your sales teams never lose track of qualified opportunities.",
  },
  {
    question: "How long does it take to set up AI lead qualification for my business?",
    answer:
      "Setup typically takes 1–2 weeks depending on the complexity of your qualification rules and CRM setup. Once configured, the AI voice agent can start making or receiving calls immediately, learning from real interactions and improving over time.",
  },
  {
    question: "How do I know if AI lead qualification Agents are right for my business?",
    answer:
      "If your team spends hours calling unqualified leads or struggling to follow up consistently, AI lead qualification Agents can make a big difference. It helps filter the right prospects faster, ensures no lead is missed, and lets your team focus on deals that actually convert.",
  },
];
