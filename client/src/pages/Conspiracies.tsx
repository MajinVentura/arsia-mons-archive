import { useState } from "react";

interface ConspiracyThread {
  id: string;
  title: string;
  status: "OPEN" | "UNRESOLVED" | "SUPPRESSED";
  severity: "HIGH" | "CRITICAL" | "UNKNOWN";
  description: string;
  evidence: string[];
  crossReferences: string[];
  analystNote: string;
}

const threads: ConspiracyThread[] = [
  {
    id: "CT-001",
    title: "THE 100-SOL CYCLE",
    status: "OPEN",
    severity: "CRITICAL",
    description: "Every 100 SOLs, without exception, Lazarus activity surges. SOL 500. SOL 1100. SOL 1700. SOL 2300. At the exact moment of each surge, every electronic device in the colony experiences a 0.003-second interruption. The interruption is too brief to trigger alarms but has been confirmed by deep-signal analysis of archived telemetry data. The pattern has repeated for 2,800 years. The colony is 2,847 SOLs old. The pattern predates the colony.",
    evidence: [
      "Telemetry archives confirm 0.003s interruption at SOL 500, 1100, 1700, 2300 (recovered from purged data fragments)",
      "Lazarus surge activity correlates with 100% accuracy to these interruptions",
      "The interruption signal originates from beneath Sector 7 — the sealed pre-colonial cave system",
      "The signal frequency matches no known human technology",
      "Pattern extrapolation suggests next surge: SOL 2900 (53 SOLs from present)",
    ],
    crossReferences: ["Lazarus Agency Dossier", "Timeline: SOL -847", "Sector 7 Intelligence", "The Pre-Colonial Question"],
    analystNote: "If the pattern predates the colony, then whatever causes it was active before humans arrived on Mars. This means one of two things: either the pattern is a natural phenomenon that Lazarus has learned to exploit, or Lazarus — or whatever Lazarus actually is — was here first. Neither explanation is comforting.",
  },
  {
    id: "CT-002",
    title: "THE PRE-COLONIAL QUESTION",
    status: "SUPPRESSED",
    severity: "CRITICAL",
    description: "Multiple independent data points suggest intelligent presence on Mars before human colonization. The MCA has systematically suppressed all research into this question. Researchers who pursue it disappear, are reassigned, or suffer 'accidents.' The pattern of suppression is itself evidence that the MCA knows more than it admits.",
    evidence: [
      "SOL -847: Survey Drone 7 captures carved symbols in cave formation — symbols match no human language",
      "SOL -847: Same drone captures humanoid figure in cave wearing modern colony clothing (temporal anomaly)",
      "Jet Pack technology reverse-engineered from pre-colonial artifact found in sealed caves",
      "Lazarus operative biometrics show normal human physiology — but resurrection ability has no biological explanation",
      "Black Rose 'petals' contain no DNA/RNA — organic structure with no genetic material",
      "Caliber archives contain records that predate colony founding by ~200 SOLs",
      "The colony mainframe beneath Sector 7 is built on the sealed cave system — officially for 'electromagnetic shielding'",
    ],
    crossReferences: ["Timeline: SOL -847", "Lazarus Agency Dossier", "Equipment: JP-3 Icarus", "Sector 7 Intelligence"],
    analystNote: "The MCA's suppression of pre-colonial evidence is too thorough to be bureaucratic caution. They're not investigating because they already know the answers. The question isn't whether something was here before us. The question is whether it's still here. The evidence suggests yes.",
  },
  {
    id: "CT-003",
    title: "ZERO'S LAST TRANSMISSION",
    status: "UNRESOLVED",
    severity: "HIGH",
    description: "Static's founder (or figurehead, or AI construct) known as 'Zero' transmitted a single message on SOL 2812: 'THE COLONY MAINFRAME IS NOT WHAT THEY TOLD US IT IS.' No context. No follow-up. Zero has not communicated since. Static leadership has not acknowledged the transmission publicly but internal behavior suggests significant operational changes since that date.",
    evidence: [
      "Transmission authenticated via Zero's unique cryptographic signature (unbroken since SOL 2444)",
      "Static operations shifted from offensive to defensive posture within 48 hours of transmission",
      "Three Static operatives reassigned from government targets to Sector 7 perimeter surveillance",
      "Static's satellite network redirected 40% of bandwidth to monitoring underground electromagnetic signatures",
      "Zero's previous transmissions averaged one per 30 SOLs. 35 SOLs of silence is unprecedented.",
    ],
    crossReferences: ["Static Agency Dossier", "Sector 7 Intelligence", "The Pre-Colonial Question"],
    analystNote: "Zero either discovered something about the mainframe that changed Static's entire operational philosophy, or Zero was compromised and the transmission is disinformation. If the former, what did Zero find? If the latter, who is capable of compromising an entity that may not be human?",
  },
  {
    id: "CT-004",
    title: "THE HOLLOWHEAD PARADOX",
    status: "OPEN",
    severity: "UNKNOWN",
    description: "The compound used exclusively by Black Rose operatives — Hollowhead — cannot be synthesized with any known Martian chemistry. Its molecular structure contains elements that don't appear on the periodic table. It exists. It works. It shouldn't be possible. Where does it come from?",
    evidence: [
      "Chemical analysis confirms non-periodic elements in Hollowhead molecular structure",
      "No manufacturing facility for Hollowhead has ever been identified on Mars",
      "Supply appears unlimited — 347 confirmed kills over 100 years with no evidence of scarcity",
      "The compound degrades within 6 hours of exposure to Martian atmosphere — it must be stored in sealed conditions",
      "Black Rose 'petals' share similar impossible chemistry — organic matter with no genetic material",
    ],
    crossReferences: ["Black Rose Agency Dossier", "The Pre-Colonial Question", "Equipment Registry"],
    analystNote: "If Hollowhead can't be made on Mars and can't survive atmospheric exposure for more than 6 hours, it must be manufactured in a sealed environment and used quickly. This implies either an off-world supply chain (no evidence of incoming shipments) or a sealed manufacturing facility somewhere in the colony that uses chemistry we don't understand. The pre-colonial caves are sealed environments with unknown contents.",
  },
  {
    id: "CT-005",
    title: "THE IDENTITY PROBLEM",
    status: "SUPPRESSED",
    severity: "HIGH",
    description: "The DM-5 Disguise Module doesn't just change appearance — it perfectly replicates biosignatures, DNA patterns, and identity markers. The technology's implications have been classified at the highest level. If perfect identity replication is possible, the fundamental question becomes: how do you know anyone is who they appear to be? The MCA has no answer.",
    evidence: [
      "DM-5 technology confirmed to defeat all known biometric security systems",
      "MCA internal designation: 'The Identity Problem' — all research classified ULTRAVIOLET",
      "Three MCA officials have been identified as 'duplicates' in the past decade — the originals were never found",
      "Black Rose operatives consistently fail to trigger friend-or-foe systems — they may be using advanced identity masking",
      "Lazarus operative 'Kael' has been killed and confirmed active multiple times — same biometrics each time",
    ],
    crossReferences: ["Equipment: DM-5 Chameleon", "Black Rose Agency Dossier", "Lazarus Agency Dossier"],
    analystNote: "This thread connects to everything. If identity can be perfectly replicated, then no intelligence is trustworthy. Any operative could be any other operative. Any official could be replaced. The entire intelligence apparatus of Mars rests on the assumption that people are who they appear to be. That assumption may be false.",
  },
  {
    id: "CT-006",
    title: "THE PURGE — SOL 2844",
    status: "OPEN",
    severity: "CRITICAL",
    description: "Three days ago, the MCA initiated an emergency data purge across all government servers. 40% of colonial records destroyed in 3 hours. No explanation given. No warning. The timing — 53 SOLs before the predicted next Lazarus surge — may not be coincidental. What did the MCA destroy? What were they trying to hide before the next cycle?",
    evidence: [
      "Purge confirmed across all MCA data centers simultaneously — required authorization from Governor Harrison personally",
      "Purge targeted specific data categories: pre-colonial surveys, Lazarus encounter reports, Sector 7 subsurface scans",
      "53 SOLs before predicted SOL 2900 Lazarus surge",
      "This archive exists because the purge was incomplete — scattered data fragments survived on damaged partitions",
      "Governor Harrison has not been seen publicly since the purge order. Official statement: 'routine administrative absence'",
    ],
    crossReferences: ["Timeline: SOL 2844", "The 100-SOL Cycle", "The Pre-Colonial Question", "Sector 7 Intelligence"],
    analystNote: "The purge wasn't about hiding the past. It was about preventing someone — or something — from accessing specific information during the next surge. The MCA knows what happens at SOL intervals. They know what Lazarus is looking for. And they just destroyed it. The question is: did they destroy it to protect themselves, or to protect everyone else?",
  },
];

export default function Conspiracies() {
  const [selectedThread, setSelectedThread] = useState(0);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 pt-6">
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--blood)' }}>
            CONSPIRACY THREADS
          </h1>
          <p className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
            Cross-referenced anomalies. Unresolved patterns. Things that shouldn't connect but do.
          </p>
          <div className="mt-2 text-[10px] italic" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.5 }}>
            WARNING: The following intelligence threads contain analyst speculation alongside confirmed data. 
            Distinguish between evidence and interpretation. Trust nothing completely.
          </div>
        </div>

        <div className="relative w-full h-[180px] md:h-[250px] overflow-hidden border border-[var(--blood)]/10 mb-8">
          <img src="/assets/conspiracy-signal_63a3bd9c.png" alt="Signal Anomaly" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center gap-3">
            <span className="stamp-classified">CLASSIFIED</span>
            <span className="text-[9px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--blood)' }}>
              {threads.length} ACTIVE THREADS
            </span>
          </div>
        </div>

        {/* Thread list */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-1">
            {threads.map((thread, i) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(i)}
                className={`w-full text-left px-3 py-3 border transition-all duration-200 ${
                  selectedThread === i
                    ? "border-[var(--blood)]/40 bg-[var(--blood)]/5"
                    : "border-[var(--steel)]/20 bg-[#080808] hover:border-[var(--steel)]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
                    {thread.id}
                  </span>
                  <span className={`text-[8px] px-1.5 py-0.5 border ${
                    thread.status === "OPEN" ? "border-[var(--amber)]/40 text-[var(--amber)]" :
                    thread.status === "SUPPRESSED" ? "border-[var(--blood)]/40 text-[var(--blood)]" :
                    "border-[var(--signal-white)]/20 text-[var(--signal-white)]/40"
                  }`} style={{ fontFamily: 'Courier Prime, monospace' }}>
                    {thread.status}
                  </span>
                </div>
                <div className="text-[10px] tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: selectedThread === i ? 'var(--blood)' : 'var(--signal-white)', opacity: selectedThread === i ? 1 : 0.7 }}>
                  {thread.title}
                </div>
              </button>
            ))}
          </div>

          {/* Thread detail */}
          <div className="border border-[var(--steel)]/20 bg-[#080808] p-6">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="stamp-classified">CLASSIFIED</span>
              <span className={`text-[9px] px-2 py-0.5 border ${
                threads[selectedThread].severity === "CRITICAL" ? "border-[var(--blood)] text-[var(--blood)]" :
                threads[selectedThread].severity === "HIGH" ? "border-[var(--amber)] text-[var(--amber)]" :
                "border-[var(--signal-white)]/30 text-[var(--signal-white)]/50"
              }`} style={{ fontFamily: 'Courier Prime, monospace' }}>
                SEVERITY: {threads[selectedThread].severity}
              </span>
              <span className="text-[9px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
                {threads[selectedThread].id}
              </span>
            </div>

            <h2 className="text-lg tracking-wider mb-4" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--blood)' }}>
              {threads[selectedThread].title}
            </h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--signal-white)', opacity: 0.7 }}>
              {threads[selectedThread].description}
            </p>

            {/* Evidence */}
            <div className="mb-6">
              <div className="text-[9px] tracking-wider mb-3" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--phosphor)', opacity: 0.6 }}>
                SUPPORTING EVIDENCE
              </div>
              <div className="space-y-2">
                {threads[selectedThread].evidence.map((ev, i) => (
                  <div key={i} className="flex gap-2 text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                    <span className="text-[var(--phosphor)]/40 flex-shrink-0">▸</span>
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross references */}
            <div className="mb-6">
              <div className="text-[9px] tracking-wider mb-3" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.6 }}>
                CROSS-REFERENCES
              </div>
              <div className="flex flex-wrap gap-2">
                {threads[selectedThread].crossReferences.map((ref, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 border border-[var(--amber)]/20 text-[var(--amber)]/70" style={{ fontFamily: 'Courier Prime, monospace' }}>
                    {ref}
                  </span>
                ))}
              </div>
            </div>

            {/* Analyst note */}
            <div className="border-t border-[var(--steel)]/20 pt-4">
              <div className="text-[9px] tracking-wider mb-2" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.5 }}>
                ANALYST NOTE — SPECULATIVE
              </div>
              <p className="text-[11px] leading-relaxed italic" style={{ color: 'var(--amber)', opacity: 0.7 }}>
                {threads[selectedThread].analystNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
