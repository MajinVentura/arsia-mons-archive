import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  sol: string;
  title: string;
  description: string;
  classification: "canon" | "expanded" | "classified";
  image: string;
  category: "founding" | "political" | "conflict" | "mystery" | "collapse";
}

const events: TimelineEvent[] = [
  {
    sol: "SOL -847",
    title: "FIRST SURVEY — ANOMALY DETECTED",
    description: "MCA Survey Drone 7 captures imagery of carved symbols inside a natural cave formation near Arsia Mons. Symbols match no known human language. Data classified immediately. Cave sealed during subsequent construction. Survey team leader Dr. Elena Vasquez files a formal objection to the sealing order. Her objection is redacted from official records. She resigns three days later and is never heard from again.",
    classification: "classified",
    image: "/assets/conspiracy-signal_63a3bd9c.png",
    category: "mystery",
  },
  {
    sol: "SOL 0",
    title: "COLONY FOUNDING — ARSIA MONS",
    description: "The Martian Colonial Authority establishes permanent settlement at Arsia Mons. Initial population: 2,400 colonists. Twelve atmospheric processing companies awarded terraforming contracts. The colony charter promises democratic governance within 50 SOLs. That promise will never be kept.",
    classification: "canon",
    image: "/assets/timeline-founding_fc290898.png",
    category: "founding",
  },
  {
    sol: "SOL 400-600",
    title: "FIRST EXPANSION — LAZARUS EMERGENCE",
    description: "Colony grows to 45,000. First reports of individuals displaying impossible physical resilience. MCA internal security documents these encounters but publicly attributes them to 'oxygen deprivation hallucinations.' Seventeen colonists disappear during this period. All were researching pre-colonial geological surveys.",
    classification: "expanded",
    image: "/assets/timeline-expansion_58e0e0b4.png",
    category: "mystery",
  },
  {
    sol: "SOL 1200",
    title: "ATMOSPHERIC CONSOLIDATION BEGINS",
    description: "Of twelve original terraforming contractors, only three remain operational. Noxis, Helios Atmospheric, and Redwind Solutions. Competition intensifies. Noxis begins aggressive acquisition strategy. Two smaller companies accept buyout offers. One refuses.",
    classification: "expanded",
    image: "/assets/timeline-consolidation_03e83daf.png",
    category: "political",
  },
  {
    sol: "SOL 1247",
    title: "HELIOS ATMOSPHERIC — CATASTROPHIC FAILURE",
    description: "Helios Atmospheric Processing Plant 3 suffers a 'catastrophic cascade failure.' Entire senior engineering staff — 34 people — killed in a single afternoon. Investigation ruled accidental within 48 hours. No independent review permitted. Noxis acquires Helios assets at auction six days later.",
    classification: "classified",
    image: "/assets/timeline-collapse_abab10bf.png",
    category: "conflict",
  },
  {
    sol: "SOL 1600",
    title: "NOXIS MONOPOLY ACHIEVED",
    description: "Redwind Solutions ceases operations after their primary processing facility is 'condemned for safety violations.' Noxis is now the sole atmospheric processor on Mars. They control 70% of breathable oxygen production. The remaining 30% comes from small independent scrubbers that Noxis will spend the next two centuries eliminating.",
    classification: "expanded",
    image: "/assets/timeline-monopoly_40349712.png",
    category: "political",
  },
  {
    sol: "SOL 1700",
    title: "SECOND LAZARUS SURGE",
    description: "Exactly 100 SOLs after the first emergence. Government facilities breached in Sectors 3, 7, and 12. Pre-colonial survey data stolen. Three MCA security officers report killing the same individual on three separate occasions within a 4-hour window. All three pass psychological evaluation.",
    classification: "classified",
    image: "/assets/timeline-lazarus-surge_abde3030.png",
    category: "mystery",
  },
  {
    sol: "SOL 1847",
    title: "THE OXYGEN CONSOLIDATION ACT",
    description: "Legislation written by Noxis lawyers grants the corporation exclusive atmospheric processing rights in exchange for 'guaranteed supply stability.' Every breath on Mars now carries a corporate price tag. Opposition legislators who voted against the act experience 'equipment malfunctions' in their personal oxygen supplies within the month. All survive. All change their votes on subsequent legislation.",
    classification: "expanded",
    image: "/assets/timeline-oxygen-act_7607b98d.png",
    category: "political",
  },
  {
    sol: "SOL 1923",
    title: "FIRST CONFIRMED BLACK ROSE KILL",
    description: "Mid-level MCA bureaucrat found dead in sealed apartment. No forced entry. Cause of death: Hollowhead compound. A single synthetic black rose petal on the desk. No motive identified. No demands made. The beginning of something that has no end.",
    classification: "canon",
    image: "/assets/timeline-blackrose_a82aefb4.png",
    category: "conflict",
  },
  {
    sol: "SOL 2300",
    title: "THIRD LAZARUS SURGE — THE SILENT WEEK",
    description: "For seven days, every electronic device in Sectors 7 through 12 displays the same symbol — one of the pre-colonial cave markings. No technical explanation found. When the displays return to normal, 23 colonists have vanished. Their apartments are empty. Their ID chips are found arranged in a circle in the sealed pre-colonial cave. The cave's seals are intact.",
    classification: "classified",
    image: "/assets/timeline-silent-week_315a30b7.png",
    category: "mystery",
  },
  {
    sol: "SOL 2440-2444",
    title: "THE BRAIN HEMORRHAGE — STATIC FORMS",
    description: "67% of MCA junior technical staff vanish over four days. Apartments emptied. ID chips in drainage systems. Work terminals wiped. The government calls it a staffing crisis. In truth, someone is building an army of the colony's most dangerous people: those who understand how everything works.",
    classification: "canon",
    image: "/assets/timeline-braindrain_ca296f6f.png",
    category: "conflict",
  },
  {
    sol: "SOL 2756",
    title: "HANDLER WEBB — DEATH AND SIGHTINGS",
    description: "Noxis Handler Marcus Webb officially declared dead. Death certificate filed. Funeral attended by 200 colleagues. Three confirmed sightings in subsequent SOLs — each in a different sector, each by reliable witnesses. MCA refuses to investigate. Noxis refuses to comment.",
    classification: "expanded",
    image: "/assets/timeline-webb_376a7f78.png",
    category: "mystery",
  },
  {
    sol: "SOL 2790",
    title: "THE SECTOR 4 BLACKOUT",
    description: "Static operative 'Crash' disables all power systems in Sector 4 for 72 hours. During the blackout, 14 government surveillance archives are physically removed from their facilities. When power returns, the archives are gone. Static broadcasts a single message across all frequencies: 'NOW YOU KNOW WHAT IT FEELS LIKE TO LIVE IN THE DARK.'",
    classification: "expanded",
    image: "/assets/timeline-blackout_62602b76.png",
    category: "conflict",
  },
  {
    sol: "SOL 2844",
    title: "THE PURGE",
    description: "MCA initiates emergency data purge across all government servers. Reason: classified. Duration: 3 hours. Estimated data destroyed: 40% of colonial records. What survived was scattered across damaged partitions. This archive is what remains.",
    classification: "canon",
    image: "/assets/timeline-purge_fccc02a7.png",
    category: "collapse",
  },
  {
    sol: "SOL 2847",
    title: "SIGNAL ACQUIRED — PRESENT DAY",
    description: "You are here. The archive is online. The signal is degrading. What you find in these records was never meant to survive. Read carefully. The connection is unstable. And something is still watching the frequencies.",
    classification: "expanded",
    image: "/assets/timeline-present_3c289fd8.png",
    category: "collapse",
  },
];

const categoryColors: Record<string, string> = {
  founding: "var(--phosphor)",
  political: "var(--noxis-blue)",
  conflict: "var(--blood)",
  mystery: "var(--lazarus-gold)",
  collapse: "var(--corruption)",
};

const categoryLabels: Record<string, string> = {
  founding: "FOUNDING",
  political: "POLITICAL",
  conflict: "CONFLICT",
  mystery: "MYSTERY",
  collapse: "COLLAPSE",
};

export default function Timeline() {
  const [filter, setFilter] = useState<string>("all");
  const [expandedNode, setExpandedNode] = useState<number | null>(null);

  const filtered = filter === "all" ? events : events.filter(e => e.category === filter);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 pt-6">
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
            COLONY TIMELINE
          </h1>
          <p className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
            Recovered temporal records — SOL -847 to present. {events.length} events catalogued. Click a node to expand.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-[10px] tracking-wider border transition-all ${
              filter === "all"
                ? "border-[var(--phosphor)]/60 bg-[var(--phosphor)]/10 text-[var(--phosphor)]"
                : "border-[var(--steel)]/30 text-[var(--signal-white)]/50 hover:border-[var(--steel)]/60"
            }`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            ALL ({events.length})
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 text-[10px] tracking-wider border transition-all ${
                filter === key
                  ? "border-current/60 bg-current/10"
                  : "border-[var(--steel)]/30 hover:border-[var(--steel)]/60"
              }`}
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                color: filter === key ? categoryColors[key] : 'var(--signal-white)',
                opacity: filter === key ? 1 : 0.5,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Horizontal Node Graph Timeline */}
        <div className="relative">
          {/* Scrollable horizontal track */}
          <div className="relative overflow-x-auto pb-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--steel) #0a0a0a' }}>
            {/* Horizontal connector line */}
            <div className="absolute top-[60px] left-0 right-0 h-px bg-[var(--steel)]/30" style={{ minWidth: `${filtered.length * 140}px` }} />

            {/* Nodes row */}
            <div className="relative flex items-start" style={{ minWidth: `${filtered.length * 140}px` }}>
              {filtered.map((event, i) => {
                const isExpanded = expandedNode === i;
                const nodeColor = categoryColors[event.category];

                return (
                  <button
                    key={`${event.sol}-${i}`}
                    onClick={() => setExpandedNode(isExpanded ? null : i)}
                    className="relative group flex flex-col items-center cursor-pointer transition-all duration-200 flex-shrink-0 pt-2"
                    style={{ outline: 'none', width: '140px' }}
                  >
                    {/* SOL label above line */}
                    <div
                      className="text-[8px] tracking-wider mb-2"
                      style={{ fontFamily: 'Courier Prime, monospace', color: nodeColor, opacity: 0.8 }}
                    >
                      {event.sol}
                    </div>

                    {/* Node circle on the line */}
                    <div className="relative">
                      {isExpanded && (
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full animate-ping opacity-20"
                          style={{ background: nodeColor }}
                        />
                      )}
                      <div
                        className={`relative z-10 w-[14px] h-[14px] rounded-full border-2 transition-all duration-200 ${
                          isExpanded ? 'scale-[1.6]' : 'group-hover:scale-125'
                        }`}
                        style={{
                          borderColor: nodeColor,
                          background: isExpanded ? nodeColor : '#050505',
                          boxShadow: isExpanded ? `0 0 12px ${nodeColor}` : 'none',
                        }}
                      />
                    </div>

                    {/* Mini thumbnail below line */}
                    <div className={`mt-3 w-[90px] h-[52px] overflow-hidden border transition-all duration-200 ${
                      isExpanded ? 'border-current opacity-100 scale-105' : 'border-[var(--steel)]/20 opacity-50 group-hover:opacity-80'
                    }`} style={{ borderColor: isExpanded ? nodeColor : undefined }}>
                      <img src={event.image} alt="" className="w-full h-full object-cover" />
                    </div>

                    {/* Title hint */}
                    <div
                      className="mt-2 text-[8px] tracking-wider text-center leading-tight px-1 h-[28px] overflow-hidden"
                      style={{ fontFamily: 'Share Tech Mono, monospace', color: isExpanded ? nodeColor : 'var(--signal-white)', opacity: isExpanded ? 1 : 0.5 }}
                    >
                      {event.title.length > 32 ? event.title.slice(0, 30) + '...' : event.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="text-[8px] tracking-wider text-right mt-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--steel)', opacity: 0.4 }}>
            SCROLL → TO NAVIGATE TIMELINE
          </div>

          {/* Expanded content panel below */}
          <AnimatePresence mode="wait">
            {expandedNode !== null && filtered[expandedNode] && (
              <motion.div
                key={expandedNode}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="mt-4 overflow-hidden"
              >
                <div className="border border-[var(--steel)]/30 bg-[#080808]">
                  {/* Event image banner */}
                  <div className="relative w-full h-[200px] md:h-[280px] overflow-hidden">
                    <img
                      src={filtered[expandedNode].image}
                      alt={filtered[expandedNode].title}
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span
                        className="text-[8px] px-1.5 py-0.5 tracking-wider border"
                        style={{
                          fontFamily: 'Share Tech Mono, monospace',
                          color: categoryColors[filtered[expandedNode].category],
                          borderColor: `${categoryColors[filtered[expandedNode].category]}40`,
                          background: '#050505cc',
                        }}
                      >
                        {categoryLabels[filtered[expandedNode].category]}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className={filtered[expandedNode].classification === "canon" ? "stamp-canon" : filtered[expandedNode].classification === "classified" ? "stamp-classified" : "stamp-expanded"}>
                        {filtered[expandedNode].classification}
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-5 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="text-[9px] tracking-wider"
                        style={{ fontFamily: 'Courier Prime, monospace', color: categoryColors[filtered[expandedNode].category] }}
                      >
                        {filtered[expandedNode].sol}
                      </div>
                      <div className="h-px flex-1 bg-[var(--steel)]/20" />
                      <button
                        onClick={() => setExpandedNode(null)}
                        className="text-[9px] tracking-wider px-2 py-0.5 border border-[var(--steel)]/30 hover:border-[var(--blood)]/60 hover:text-[var(--blood)] transition-colors"
                        style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)', opacity: 0.5 }}
                      >
                        CLOSE
                      </button>
                    </div>
                    <h3
                      className="text-base md:text-lg tracking-wider mb-4"
                      style={{ fontFamily: 'Share Tech Mono, monospace', color: categoryColors[filtered[expandedNode].category] }}
                    >
                      {filtered[expandedNode].title}
                    </h3>
                    <p
                      className="text-xs md:text-sm leading-relaxed max-w-3xl"
                      style={{ color: 'var(--signal-white)', opacity: 0.7 }}
                    >
                      {filtered[expandedNode].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
