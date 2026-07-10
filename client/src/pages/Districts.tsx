import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
 * ═══════════════════════════════════════════════════════════
 * DESIGN: SIGNAL DECAY — Corrupted Intelligence Terminal
 * Two-tab page: Combat Zone maps (real game levels) and
 * Colony Sectors (lore-based worldbuilding districts).
 * ═══════════════════════════════════════════════════════════
 */

interface MapData {
  id: string;
  name: string;
  filename: string;
  dimensions: string;
  maxPlayers: number;
  teams: number;
  tagline: string;
  image: string;
  description: string;
  tacticalNotes: string;
}

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

const maps: MapData[] = [
  {
    id: "ally10c",
    name: "ALLY10c",
    filename: "ally10c.sil",
    dimensions: "59×40",
    maxPlayers: 7,
    teams: 6,
    tagline: "You'll have to out-think your opponents to kill them here.",
    image: "/assets/map-ally10c_2dbb1198.png",
    description: "A multi-tiered horizontal complex featuring stacked corridors connected by vertical access shafts. The ladder-like layout forces vertical thinking — engagements happen across elevation changes, making positioning critical.",
    tacticalNotes: "Six-team configuration in a relatively compact space means alliances form and break rapidly. The horizontal corridors provide long sightlines for ranged weapons, while the vertical shafts create ambush opportunities. Control the central connectors to dominate movement between levels."
  },
  {
    id: "cran01h",
    name: "CRAN01h",
    filename: "cran01h.sil",
    dimensions: "99×46",
    maxPlayers: 8,
    teams: 8,
    tagline: "Enter the mining camps of Mars and pray you get out alive.",
    image: "/assets/map-cran01h_6f7ad8c7.png",
    description: "The largest standard combat zone — a sprawling mining facility with cavernous open areas, elevated observation platforms, and a network of maintenance tunnels. Originally a Caliber Industries ore extraction site before it was abandoned during the Sector 4 Blackout.",
    tacticalNotes: "Eight teams in a massive arena. The open mining chambers favor explosive weapons and long-range engagements. Maintenance tunnels offer flanking routes but are narrow enough for flamer traps. Elevated platforms provide overwatch but limited escape routes."
  },
  {
    id: "easy05c",
    name: "EASY05c",
    filename: "easy05c.sil",
    dimensions: "34×24",
    maxPlayers: 4,
    teams: 3,
    tagline: "Small, Fast, and Furious. Don't say you weren't warned.",
    image: "/assets/map-easy05c_c5777791.png",
    description: "A compact, claustrophobic arena with no room to hide. Angular corridors create a compressed labyrinth where every turn could be your last. Designed for rapid, brutal engagements — matches here rarely last long.",
    tacticalNotes: "The smallest combat zone in active rotation. Three teams in this space guarantees constant contact. No dead ends means you're never truly cornered, but also never truly safe. Fast weapons dominate — rockets and bombs are as dangerous to the user as the target."
  },
  {
    id: "pit16d",
    name: "PIT16d",
    filename: "pit16d.sil",
    dimensions: "70×49",
    maxPlayers: 8,
    teams: 4,
    tagline: "Climb quickly or you'll pay the price.",
    image: "/assets/map-pit16d_7d33c9a5.png",
    description: "A vertical nightmare. A deep industrial shaft with platforms at staggered heights, connected by ladders and narrow walkways. Gravity is your enemy — falling means death or disadvantage. The pit structure rewards aggressive vertical movement.",
    tacticalNotes: "Four teams competing for high ground in a vertical arena. The central shaft is a kill zone — crossing it exposes you from multiple angles. Jetpacks are invaluable here. Shaped bombs dropped from above are devastating. Control the top platforms and rain death downward."
  },
  {
    id: "star72",
    name: "STAR72",
    filename: "star72.sil",
    dimensions: "121×41",
    maxPlayers: 8,
    teams: 6,
    tagline: "Left, Up, Right — the action is all around.",
    image: "/assets/map-star72_57dd2b39.png",
    description: "An extremely wide combat zone spanning the full breadth of a colony sub-level. Multiple distinct areas — control rooms, observation decks, connecting walkways — create a series of micro-arenas within the larger battlefield.",
    tacticalNotes: "The widest map in rotation. Six teams spread across a massive horizontal space creates a war of territory control. Teams that hold the center can project force in both directions, but are vulnerable to coordinated pincer attacks."
  },
  {
    id: "thet06e",
    name: "THET06e",
    filename: "thet06e.sil",
    dimensions: "46×30",
    maxPlayers: 6,
    teams: 4,
    tagline: "Don't get caught in the corners with your Secret.",
    image: "/assets/map-thet06e_085863dc.png",
    description: "A rectangular complex where the corner chambers are both sanctuary and trap. Each corner room offers defensible positions but limited escape routes — get cornered while carrying intelligence and you're dead.",
    tacticalNotes: "Four teams in a map designed around corner control. The corner chambers are large enough to defend but have only one or two exits — making them deathtraps if breached. Carrying a Secret through the open corridors is a calculated risk."
  }
];

const districts: District[] = [
  {
    name: "INDUSTRIAL SECTOR",
    designation: "SECTOR 4 — OXYGEN PROCESSING",
    image: "/assets/district-industrial_216fc111.png",
    atmosphere: "Heavy machinery noise. Chemical vapor. Constant hum of atmospheric processors. The air tastes metallic.",
    controlledBy: "NOXIS CORPORATION",
    classification: "canon",
    description: "The beating heart of Noxis's oxygen monopoly. Massive processing towers convert Martian atmosphere into breathable air — at a price. Workers in sealed suits tend machinery that never stops. Corporate propaganda screens display production quotas and loyalty slogans. Security checkpoints control all access.",
    secrets: "Beneath the processing floor, a secondary facility operates on no official blueprint. Workers who've glimpsed it through maintenance hatches describe rows of sealed chambers connected to the main oxygen supply. The chambers contain something that breathes but isn't human.",
  },
  {
    name: "GOVERNMENT SECTOR",
    designation: "SECTOR 7 — MCA HEADQUARTERS",
    image: "/assets/district-government_54c0d2d5.png",
    atmosphere: "Oppressive silence. Surveillance cameras track every movement. The architecture is designed to make you feel small.",
    controlledBy: "MARTIAN COLONIAL AUTHORITY",
    classification: "canon",
    description: "The seat of colonial power. A brutalist fortress of angular concrete and steel, bristling with surveillance equipment. Governor Harrison's face dominates propaganda screens at every entrance. Armed guard robots patrol elevated walkways. Citizens pass through security checkpoints with heads down.",
    secrets: "The MCA mainframe beneath Sector 7 is built on top of the sealed pre-colonial cave system. The cave's natural electromagnetic properties provide shielding for sensitive equipment. Whatever signal emanates from the cave cannot be detected from outside Sector 7.",
  },
  {
    name: "THE DEEP WARRENS",
    designation: "SECTOR 12 — SUBTERRANEAN",
    image: "/assets/district-underground_c4aaf5ed.png",
    atmosphere: "Dripping water. Bioluminescent fungi. The smell of wet stone and something older. Sounds echo wrong down here.",
    controlledBy: "CONTESTED / UNKNOWN",
    classification: "expanded",
    description: "The lowest inhabited level of the colony — carved from volcanic basalt during the initial expansion and then officially abandoned when 'structural instabilities' were detected. Unofficially, thousands live here. Makeshift structures built into cave walls, connected by catwalks and ladders.",
    secrets: "The 'structural instabilities' that caused official abandonment were fabricated. Excavation teams broke through into a chamber that predates human presence on Mars. The chamber contained technology that was still functioning.",
  },
  {
    name: "THE HOLLOWS",
    designation: "SECTOR 9 — BLACK MARKET",
    image: "/assets/district-market_1c613953.png",
    atmosphere: "Neon chaos. Shouting vendors. The smell of cooking food and chemical solvents. Danger is a constant background hum.",
    controlledBy: "NO SINGLE AUTHORITY",
    classification: "expanded",
    description: "What happens when a government abandons a sector and its people refuse to leave. The Hollows is a vast underground marketplace where anything can be bought: weapons, hacking tools, forged identity chips, stolen oxygen canisters, information, people.",
    secrets: "The Hollows has its own government — a council of seven merchants. One seat has been empty for 40 years. It belongs to Black Rose. No one has ever seen a Black Rose representative attend a meeting. But the seat remains empty, and no one dares sit in it.",
  },
];

type TabMode = "combat-zones" | "colony-sectors";

export default function Districts() {
  const [mode, setMode] = useState<TabMode>("combat-zones");
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const activeMap = maps.find(m => m.id === selectedMap);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 pt-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-[var(--terminal-amber)] animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--amber)' }}>
              Tactical Operations // Sector Map
            </span>
          </div>
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
            COLONY SECTOR MAP
          </h1>
        </motion.div>

        {/* Mode Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[var(--steel)]/20 pb-3">
          <button
            onClick={() => setMode("combat-zones")}
            className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
              mode === "combat-zones"
                ? "border-[var(--phosphor)]/60 text-[var(--phosphor)] bg-[var(--phosphor)]/8"
                : "border-[var(--steel)]/20 text-[var(--signal-white)]/40 hover:text-[var(--signal-white)]/70 hover:border-[var(--steel)]/40"
            }`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            ◆ Combat Zones
          </button>
          <button
            onClick={() => setMode("colony-sectors")}
            className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
              mode === "colony-sectors"
                ? "border-[var(--phosphor)]/60 text-[var(--phosphor)] bg-[var(--phosphor)]/8"
                : "border-[var(--steel)]/20 text-[var(--signal-white)]/40 hover:text-[var(--signal-white)]/70 hover:border-[var(--steel)]/40"
            }`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            ◆ Colony Sectors
          </button>
        </div>

        <AnimatePresence mode="wait">
          {mode === "combat-zones" ? (
            <motion.div
              key="combat-zones"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs mb-6" style={{ color: 'var(--signal-white)', opacity: 0.4, fontFamily: 'Courier Prime, monospace' }}>
                Recovered tactical layouts from active combat zones within the Arsia Mons colony underground. Select a zone for full tactical briefing.
              </p>

              {/* Map Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {maps.map((map, index) => (
                  <motion.button
                    key={map.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    onClick={() => setSelectedMap(selectedMap === map.id ? null : map.id)}
                    className={`group relative text-left border transition-all duration-300 overflow-hidden ${
                      selectedMap === map.id
                        ? "border-[var(--amber)]/60 bg-[var(--amber)]/5"
                        : "border-[var(--steel)]/20 hover:border-[var(--phosphor)]/40 bg-black/30"
                    }`}
                  >
                    {/* Map Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={map.image}
                        alt={`Map layout: ${map.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Overlay Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
                            {map.name}
                          </span>
                          <span className="text-[10px]" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--amber)' }}>
                            {map.dimensions}
                          </span>
                        </div>
                      </div>

                      {/* Scanline overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
                        }}
                      />
                    </div>

                    {/* Map Meta */}
                    <div className="p-3 border-t border-[var(--steel)]/20">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[10px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.5 }}>
                          PLAYERS: <span style={{ color: 'var(--phosphor)' }}>{map.maxPlayers}</span>
                        </span>
                        <span className="text-[10px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.5 }}>
                          TEAMS: <span style={{ color: 'var(--phosphor)' }}>{map.teams}</span>
                        </span>
                      </div>
                      <p className="text-[11px] italic leading-relaxed" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.8 }}>
                        "{map.tagline}"
                      </p>
                    </div>

                    {/* Selection indicator */}
                    {selectedMap === map.id && (
                      <motion.div
                        layoutId="map-selector"
                        className="absolute top-0 left-0 w-1 h-full"
                        style={{ background: 'var(--amber)' }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Expanded Map Detail */}
              <AnimatePresence mode="wait">
                {activeMap && (
                  <motion.div
                    key={activeMap.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="border border-[var(--amber)]/30 bg-black/50 p-6">
                      {/* Detail Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-1.5" style={{ background: 'var(--amber)' }} />
                        <span className="text-xs tracking-[0.2em]" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--amber)' }}>
                          TACTICAL BRIEFING // {activeMap.name}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Large map view */}
                        <div className="relative">
                          <img
                            src={activeMap.image}
                            alt={`Detailed map: ${activeMap.name}`}
                            className="w-full border border-[var(--steel)]/20"
                          />
                          <div className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,65,0.1) 1px, rgba(0,255,65,0.1) 2px)"
                            }}
                          />
                        </div>

                        {/* Right: Intel */}
                        <div className="space-y-4">
                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="border border-[var(--steel)]/20 p-3 bg-black/30">
                              <span className="block text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.4 }}>FILENAME</span>
                              <span className="text-sm" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>{activeMap.filename}</span>
                            </div>
                            <div className="border border-[var(--steel)]/20 p-3 bg-black/30">
                              <span className="block text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.4 }}>DIMENSIONS</span>
                              <span className="text-sm" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>{activeMap.dimensions}</span>
                            </div>
                            <div className="border border-[var(--steel)]/20 p-3 bg-black/30">
                              <span className="block text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.4 }}>MAX PLAYERS</span>
                              <span className="text-sm" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>{activeMap.maxPlayers}</span>
                            </div>
                            <div className="border border-[var(--steel)]/20 p-3 bg-black/30">
                              <span className="block text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.4 }}>TEAMS</span>
                              <span className="text-sm" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>{activeMap.teams}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="border-l-2 border-[var(--phosphor)]/30 pl-4">
                            <span className="block text-[9px] tracking-wider mb-2" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.6 }}>
                              ZONE OVERVIEW
                            </span>
                            <p className="text-xs leading-relaxed" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.7 }}>
                              {activeMap.description}
                            </p>
                          </div>

                          {/* Tactical Notes */}
                          <div className="border-l-2 border-[var(--amber)]/30 pl-4">
                            <span className="block text-[9px] tracking-wider mb-2" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.6 }}>
                              TACTICAL ANALYSIS
                            </span>
                            <p className="text-xs leading-relaxed" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.7 }}>
                              {activeMap.tacticalNotes}
                            </p>
                          </div>

                          {/* Tagline */}
                          <div className="border border-[var(--amber)]/20 bg-[var(--amber)]/5 p-3">
                            <p className="text-xs italic text-center" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)' }}>
                              "{activeMap.tagline}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="colony-sectors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs mb-6" style={{ color: 'var(--signal-white)', opacity: 0.4, fontFamily: 'Courier Prime, monospace' }}>
                Recovered sector intelligence — structural data partially corrupted. Known colony districts only.
              </p>

              {/* District tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {districts.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDistrict(i)}
                    className={`px-3 py-1.5 text-[10px] tracking-wider uppercase border transition-all ${
                      selectedDistrict === i
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
                  <img src={districts[selectedDistrict].image} alt={districts[selectedDistrict].name} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className={districts[selectedDistrict].classification === "canon" ? "stamp-canon" : "stamp-expanded"}>
                      {districts[selectedDistrict].classification}
                    </span>
                    <h2 className="text-xl md:text-2xl tracking-wider mt-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
                      {districts[selectedDistrict].name}
                    </h2>
                    <div className="text-[10px] mt-1" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
                      {districts[selectedDistrict].designation}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-[var(--steel)]/20 p-3">
                      <div className="text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.6 }}>ATMOSPHERE</div>
                      <p className="text-[11px] italic leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                        {districts[selectedDistrict].atmosphere}
                      </p>
                    </div>
                    <div className="border border-[var(--steel)]/20 p-3">
                      <div className="text-[9px] tracking-wider mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--amber)', opacity: 0.6 }}>CONTROLLED BY</div>
                      <p className="text-xs tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
                        {districts[selectedDistrict].controlledBy}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="text-[9px] tracking-wider mb-2" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--phosphor)', opacity: 0.5 }}>SECTOR BRIEFING</div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.7 }}>
                      {districts[selectedDistrict].description}
                    </p>
                  </div>

                  {/* Secret */}
                  <div className="border border-[var(--blood)]/20 p-4 bg-[var(--blood)]/3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="stamp-classified">CLASSIFIED</span>
                      <span className="text-[9px]" style={{ color: 'var(--blood)', opacity: 0.6 }}>ANALYST NOTES — RESTRICTED</span>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                      {districts[selectedDistrict].secrets}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-[10px] tracking-wider" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.2 }}>
            ═══ SECTOR DATA RECOVERED FROM COLONY MAINFRAME // ACCURACY: 94.7% ═══
          </p>
        </motion.div>
      </div>
    </div>
  );
}
