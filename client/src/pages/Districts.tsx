import { useState } from "react";

interface District {
  name: string;
  designation: string;
  image: string;
  atmosphere: string;
  controlledBy: string;
  classification: "canon" | "expanded";
  description: string;
  secrets: string;
}

const districts: District[] = [
  {
    name: "INDUSTRIAL SECTOR",
    designation: "SECTOR 4 — OXYGEN PROCESSING",
    image: "/manus-storage/district-industrial_216fc111.png",
    atmosphere: "Heavy machinery noise. Chemical vapor. Constant hum of atmospheric processors. The air tastes metallic.",
    controlledBy: "NOXIS CORPORATION",
    classification: "canon",
    description: "The beating heart of Noxis's oxygen monopoly. Massive processing towers convert Martian atmosphere into breathable air — at a price. Workers in sealed suits tend machinery that never stops. Corporate propaganda screens display production quotas and loyalty slogans. Security checkpoints control all access. The sector operates 24/7 under artificial lighting that never changes — there is no day or night here, only shifts.",
    secrets: "Beneath the processing floor, a secondary facility operates on no official blueprint. Workers who've glimpsed it through maintenance hatches describe rows of sealed chambers connected to the main oxygen supply. The chambers contain something that breathes but isn't human. Noxis security removes anyone who asks questions.",
  },
  {
    name: "GOVERNMENT SECTOR",
    designation: "SECTOR 7 — MCA HEADQUARTERS",
    image: "/manus-storage/district-government_54c0d2d5.png",
    atmosphere: "Oppressive silence. Surveillance cameras track every movement. The architecture is designed to make you feel small.",
    controlledBy: "MARTIAN COLONIAL AUTHORITY",
    classification: "canon",
    description: "The seat of colonial power. A brutalist fortress of angular concrete and steel, bristling with surveillance equipment. Governor Harrison's face dominates propaganda screens at every entrance. Armed guard robots patrol elevated walkways. Citizens pass through security checkpoints with heads down, ID chips ready. The architecture is deliberately intimidating — every surface says 'you are watched, you are controlled, you are nothing.'",
    secrets: "The MCA mainframe beneath Sector 7 is built on top of the sealed pre-colonial cave system. The original colony architects chose this location specifically — the cave's natural electromagnetic properties provide shielding for sensitive equipment. But the shielding works both ways. Whatever signal emanates from the cave cannot be detected from outside Sector 7. The MCA may not be containing the signal. They may be hiding it.",
  },
  {
    name: "THE DEEP WARRENS",
    designation: "SECTOR 12 — SUBTERRANEAN",
    image: "/manus-storage/district-underground_c4aaf5ed.png",
    atmosphere: "Dripping water. Bioluminescent fungi. The smell of wet stone and something older. Sounds echo wrong down here.",
    controlledBy: "CONTESTED / UNKNOWN",
    classification: "expanded",
    description: "The lowest inhabited level of the colony — carved from volcanic basalt during the initial expansion and then officially abandoned when 'structural instabilities' were detected. Unofficially, thousands live here. Makeshift structures built into cave walls, connected by catwalks and ladders. Bioluminescent fungi provide the only light in sectors where power was cut decades ago. Agency safe houses hide behind concealed doors. The MCA pretends this place doesn't exist.",
    secrets: "The 'structural instabilities' that caused official abandonment were fabricated. The real reason Sector 12 was sealed: excavation teams broke through into a chamber that predates human presence on Mars. The chamber contained technology that was still functioning. The excavation team was reassigned to different sectors. Their reports were purged. But someone — possibly Lazarus — has been accessing that chamber ever since.",
  },
  {
    name: "THE HOLLOWS",
    designation: "SECTOR 9 — BLACK MARKET",
    image: "/manus-storage/district-market_1c613953.png",
    atmosphere: "Neon chaos. Shouting vendors. The smell of cooking food and chemical solvents. Danger is a constant background hum.",
    controlledBy: "NO SINGLE AUTHORITY",
    classification: "expanded",
    description: "What happens when a government abandons a sector and its people refuse to leave. The Hollows is a vast underground marketplace where anything can be bought: weapons, hacking tools, forged identity chips, stolen oxygen canisters, information, people. Neon signs advertise services in six languages. Armed mercenaries provide the only security. The MCA sends patrols to the perimeter but never enters. Everyone here has a reason to be invisible.",
    secrets: "The Hollows has its own economy, its own laws, and its own government — a council of seven merchants who've held power for decades. One seat on the council has been empty for 40 years. It belongs to Black Rose. No one has ever seen a Black Rose representative attend a meeting. But the seat remains empty, and no one dares sit in it. Decisions that affect Black Rose interests are never made.",
  },
];

export default function Districts() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 pt-6">
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
            COLONY SECTOR MAP
          </h1>
          <p className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
            Recovered sector intelligence — structural data partially corrupted. Known districts only.
          </p>
        </div>

        {/* District tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {districts.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-3 py-1.5 text-[10px] tracking-wider uppercase border transition-all ${
                selected === i
                  ? "border-[var(--phosphor)]/60 text-[var(--phosphor)] bg-[var(--phosphor)]/5"
                  : "border-[var(--steel)]/30 text-[var(--signal-white)]/40 hover:text-[var(--signal-white)]/70"
              }`}
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Selected district */}
        <div className="border border-[var(--steel)]/20 bg-[#080808] overflow-hidden">
          {/* Image */}
          <div className="relative h-[250px] md:h-[400px] overflow-hidden">
            <img src={districts[selected].image} alt={districts[selected].name} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className={districts[selected].classification === "canon" ? "stamp-canon" : "stamp-expanded"}>
                {districts[selected].classification}
              </span>
              <h2 className="text-xl md:text-2xl tracking-wider mt-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
                {districts[selected].name}
              </h2>
              <div className="text-[10px] mt-1" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
                {districts[selected].designation}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[var(--steel)]/20 p-3">
                <div className="text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.6 }}>ATMOSPHERE</div>
                <p className="text-[11px] italic leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                  {districts[selected].atmosphere}
                </p>
              </div>
              <div className="border border-[var(--steel)]/20 p-3">
                <div className="text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.6 }}>CONTROLLED BY</div>
                <p className="text-xs tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
                  {districts[selected].controlledBy}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="text-[9px] tracking-wider mb-2" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--phosphor)', opacity: 0.5 }}>SECTOR BRIEFING</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.7 }}>
                {districts[selected].description}
              </p>
            </div>

            {/* Secret */}
            <div className="border border-[var(--blood)]/20 p-4 bg-[var(--blood)]/3">
              <div className="flex items-center gap-2 mb-2">
                <span className="stamp-classified">CLASSIFIED</span>
                <span className="text-[9px]" style={{ color: 'var(--blood)', opacity: 0.6 }}>ANALYST NOTES — RESTRICTED</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                {districts[selected].secrets}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
