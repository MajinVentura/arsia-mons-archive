import { useState } from "react";

interface TimelineEvent {
  sol: string;
  title: string;
  description: string;
  classification: "canon" | "expanded" | "classified";
  image?: string;
  category: "founding" | "political" | "conflict" | "mystery" | "collapse";
}

const events: TimelineEvent[] = [
  {
    sol: "SOL -847",
    title: "FIRST SURVEY — ANOMALY DETECTED",
    description: "MCA Survey Drone 7 captures imagery of carved symbols inside a natural cave formation near Arsia Mons. Symbols match no known human language. Data classified immediately. Cave sealed during subsequent construction. Survey team leader Dr. Elena Vasquez files a formal objection to the sealing order. Her objection is redacted from official records. She resigns three days later and is never heard from again.",
    classification: "classified",
    image: "/manus-storage/conspiracy-signal_63a3bd9c.png",
    category: "mystery",
  },
  {
    sol: "SOL 0",
    title: "COLONY FOUNDING — ARSIA MONS",
    description: "The Martian Colonial Authority establishes permanent settlement at Arsia Mons. Initial population: 2,400 colonists. Twelve atmospheric processing companies awarded terraforming contracts. The colony charter promises democratic governance within 50 SOLs. That promise will never be kept.",
    classification: "canon",
    image: "/manus-storage/timeline-founding_fc290898.png",
    category: "founding",
  },
  {
    sol: "SOL 400-600",
    title: "FIRST EXPANSION — LAZARUS EMERGENCE",
    description: "Colony grows to 45,000. First reports of individuals displaying impossible physical resilience. MCA internal security documents these encounters but publicly attributes them to 'oxygen deprivation hallucinations.' Seventeen colonists disappear during this period. All were researching pre-colonial geological surveys.",
    classification: "expanded",
    category: "mystery",
  },
  {
    sol: "SOL 1200",
    title: "ATMOSPHERIC CONSOLIDATION BEGINS",
    description: "Of twelve original terraforming contractors, only three remain operational. Noxis, Helios Atmospheric, and Redwind Solutions. Competition intensifies. Noxis begins aggressive acquisition strategy. Two smaller companies accept buyout offers. One refuses.",
    classification: "expanded",
    category: "political",
  },
  {
    sol: "SOL 1247",
    title: "HELIOS ATMOSPHERIC — CATASTROPHIC FAILURE",
    description: "Helios Atmospheric Processing Plant 3 suffers a 'catastrophic cascade failure.' Entire senior engineering staff — 34 people — killed in a single afternoon. Investigation ruled accidental within 48 hours. No independent review permitted. Noxis acquires Helios assets at auction six days later.",
    classification: "classified",
    image: "/manus-storage/timeline-collapse_abab10bf.png",
    category: "conflict",
  },
  {
    sol: "SOL 1600",
    title: "NOXIS MONOPOLY ACHIEVED",
    description: "Redwind Solutions ceases operations after their primary processing facility is 'condemned for safety violations.' Noxis is now the sole atmospheric processor on Mars. They control 70% of breathable oxygen production. The remaining 30% comes from small independent scrubbers that Noxis will spend the next two centuries eliminating.",
    classification: "expanded",
    category: "political",
  },
  {
    sol: "SOL 1700",
    title: "SECOND LAZARUS SURGE",
    description: "Exactly 100 SOLs after the first emergence. Government facilities breached in Sectors 3, 7, and 12. Pre-colonial survey data stolen. Three MCA security officers report killing the same individual on three separate occasions within a 4-hour window. All three pass psychological evaluation.",
    classification: "classified",
    category: "mystery",
  },
  {
    sol: "SOL 1847",
    title: "THE OXYGEN CONSOLIDATION ACT",
    description: "Legislation written by Noxis lawyers grants the corporation exclusive atmospheric processing rights in exchange for 'guaranteed supply stability.' Every breath on Mars now carries a corporate price tag. Opposition legislators who voted against the act experience 'equipment malfunctions' in their personal oxygen supplies within the month. All survive. All change their votes on subsequent legislation.",
    classification: "expanded",
    category: "political",
  },
  {
    sol: "SOL 1923",
    title: "FIRST CONFIRMED BLACK ROSE KILL",
    description: "Mid-level MCA bureaucrat found dead in sealed apartment. No forced entry. Cause of death: Hollowhead compound. A single synthetic black rose petal on the desk. No motive identified. No demands made. The beginning of something that has no end.",
    classification: "canon",
    category: "conflict",
  },
  {
    sol: "SOL 2300",
    title: "THIRD LAZARUS SURGE — THE SILENT WEEK",
    description: "For seven days, every electronic device in Sectors 7 through 12 displays the same symbol — one of the pre-colonial cave markings. No technical explanation found. When the displays return to normal, 23 colonists have vanished. Their apartments are empty. Their ID chips are found arranged in a circle in the sealed pre-colonial cave. The cave's seals are intact.",
    classification: "classified",
    category: "mystery",
  },
  {
    sol: "SOL 2440-2444",
    title: "THE BRAIN HEMORRHAGE — STATIC FORMS",
    description: "67% of MCA junior technical staff vanish over four days. Apartments emptied. ID chips in drainage systems. Work terminals wiped. The government calls it a staffing crisis. In truth, someone is building an army of the colony's most dangerous people: those who understand how everything works.",
    classification: "canon",
    category: "conflict",
  },
  {
    sol: "SOL 2756",
    title: "HANDLER WEBB — DEATH AND SIGHTINGS",
    description: "Noxis Handler Marcus Webb officially declared dead. Death certificate filed. Funeral attended by 200 colleagues. Three confirmed sightings in subsequent SOLs — each in a different sector, each by reliable witnesses. MCA refuses to investigate. Noxis refuses to comment.",
    classification: "expanded",
    category: "mystery",
  },
  {
    sol: "SOL 2790",
    title: "THE SECTOR 4 BLACKOUT",
    description: "Static operative 'Crash' disables all power systems in Sector 4 for 72 hours. During the blackout, 14 government surveillance archives are physically removed from their facilities. When power returns, the archives are gone. Static broadcasts a single message across all frequencies: 'NOW YOU KNOW WHAT IT FEELS LIKE TO LIVE IN THE DARK.'",
    classification: "expanded",
    category: "conflict",
  },
  {
    sol: "SOL 2844",
    title: "THE PURGE",
    description: "MCA initiates emergency data purge across all government servers. Reason: classified. Duration: 3 hours. Estimated data destroyed: 40% of colonial records. What survived was scattered across damaged partitions. This archive is what remains.",
    classification: "canon",
    category: "collapse",
  },
  {
    sol: "SOL 2847",
    title: "SIGNAL ACQUIRED — PRESENT DAY",
    description: "You are here. The archive is online. The signal is degrading. What you find in these records was never meant to survive. Read carefully. The connection is unstable. And something is still watching the frequencies.",
    classification: "expanded",
    category: "collapse",
  },
];

const categoryColors: Record<string, string> = {
  founding: "var(--phosphor)",
  political: "var(--noxis-blue)",
  conflict: "var(--blood)",
  mystery: "var(--lazarus-gold)",
  collapse: "var(--amber)",
};

export default function Timeline() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? events : events.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-6">
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--amber)' }}>
            COLONY TIMELINE
          </h1>
          <p className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
            Recovered temporal records — SOL -847 to present. Integrity: 61%. Gaps indicate purged data.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "founding", "political", "conflict", "mystery", "collapse"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase border transition-all ${
                filter === cat
                  ? "border-[var(--phosphor)]/60 text-[var(--phosphor)] bg-[var(--phosphor)]/5"
                  : "border-[var(--steel)]/30 text-[var(--signal-white)]/40 hover:text-[var(--signal-white)]/70"
              }`}
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[60px] md:left-[100px] top-0 bottom-0 w-px bg-[var(--steel)]/20" />

          <div className="space-y-8">
            {filtered.map((event, i) => (
              <div key={i} className="relative flex gap-4 md:gap-8">
                {/* SOL marker */}
                <div className="w-[60px] md:w-[100px] flex-shrink-0 text-right pr-4 relative">
                  <div
                    className="text-[10px] md:text-xs font-bold tracking-wider"
                    style={{ fontFamily: 'Share Tech Mono, monospace', color: categoryColors[event.category] }}
                  >
                    {event.sol}
                  </div>
                  {/* Dot on line */}
                  <div
                    className="absolute right-[-5px] top-1 w-2.5 h-2.5 border-2"
                    style={{ borderColor: categoryColors[event.category], background: '#050505' }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 border border-[var(--steel)]/20 bg-[#080808] overflow-hidden">
                  {event.image && (
                    <div className="relative h-[150px] md:h-[200px] overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={event.classification === "canon" ? "stamp-canon" : event.classification === "classified" ? "stamp-classified" : "stamp-expanded"}>
                        {event.classification}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: 'Courier Prime, monospace', color: categoryColors[event.category], opacity: 0.6 }}>
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-sm tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
                      {event.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 border-t border-[var(--steel)]/20 pt-4">
          <p className="text-[10px] italic" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.5 }}>
            ANALYST NOTE: Gaps between SOL 600 and SOL 1200 suggest approximately 400 records were successfully purged.
            Cross-referencing with Lazarus surge patterns reveals the gaps align precisely with predicted 100-SOL cycles.
            This may be coincidence. It probably isn't.
          </p>
        </div>
      </div>
    </div>
  );
}
