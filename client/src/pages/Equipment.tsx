import { useState } from "react";

interface Weapon {
  name: string;
  designation: string;
  type: string;
  cost: string;
  classification: "canon" | "expanded";
  description: string;
  specs: { label: string; value: string }[];
  lore: string;
}

const weapons: Weapon[] = [
  {
    name: "ENERGY BLASTER",
    designation: "EB-7 'WHISPER'",
    type: "Primary Sidearm",
    cost: "Standard Issue",
    classification: "canon",
    description: "Standard-issue energy weapon for all Silencer operatives. Fires concentrated plasma bolts at medium range. Reliable, accurate, and quiet enough for covert operations. Every agency issues a variant — the differences are cosmetic, not functional.",
    specs: [
      { label: "Damage", value: "Medium" },
      { label: "Fire Rate", value: "High" },
      { label: "Range", value: "Medium" },
      { label: "Energy Use", value: "Low" },
    ],
    lore: "The EB-7 was originally designed as a mining tool — a precision cutter for volcanic basalt. Its conversion to a weapon was inevitable on a colony where the government controls all conventional arms manufacturing. The first Silencer to use one in combat was a Static operative named 'Flicker,' who discovered that the mining laser's frequency could be modulated to pass through standard MCA body armor. Flicker's modification became standard within a month. The MCA never updated their armor.",
  },
  {
    name: "ROCKET LAUNCHER",
    designation: "RL-4 'JUDGMENT'",
    type: "Heavy Ordnance",
    cost: "800 Credits",
    classification: "canon",
    description: "Shoulder-mounted rocket system capable of destroying reinforced structures and armored targets. Slow to reload, devastating on impact. The weapon of choice for operatives who prefer certainty over subtlety.",
    specs: [
      { label: "Damage", value: "Extreme" },
      { label: "Fire Rate", value: "Very Low" },
      { label: "Range", value: "Long" },
      { label: "Reload Time", value: "4.2 seconds" },
    ],
    lore: "The RL-4 is technically illegal under the Mars Weapons Convention of SOL 1400. This has not prevented its widespread use. Noxis manufactures them in a facility officially registered as an 'atmospheric sensor calibration plant.' The warheads use a compressed oxygen payload — ironic, given Noxis's primary business. Each rocket costs approximately 200 credits to manufacture and is sold for 800. War is profitable when you make both the weapons and the air people breathe.",
  },
  {
    name: "FLAMETHROWER",
    designation: "FT-9 'PYRE'",
    type: "Area Denial",
    cost: "600 Credits",
    classification: "canon",
    description: "Pressurized fuel system projecting a cone of superheated plasma. Effective in corridors and confined spaces. The psychological impact often exceeds the physical damage — few operatives maintain composure when engulfed in flame.",
    specs: [
      { label: "Damage", value: "High (sustained)" },
      { label: "Range", value: "Short" },
      { label: "Fuel Capacity", value: "8 seconds continuous" },
      { label: "Duration", value: "Burns for 3 seconds after contact" },
    ],
    lore: "On a colony where oxygen is the most valuable commodity, a weapon that consumes oxygen at an extraordinary rate carries a particular cruelty. The FT-9 doesn't just burn its targets — it depletes the breathable air in the surrounding area for approximately 90 seconds after discharge. In sealed corridors, this means anyone without an enhanced oxygen suit (Noxis operatives, conveniently) suffocates while the flames die. Some analysts believe the FT-9 was designed specifically to give Noxis operatives an environmental advantage. This has never been confirmed.",
  },
  {
    name: "PLASMA BOMB",
    designation: "PB-2 'SUNSPOT'",
    type: "Deployable Explosive",
    cost: "200 Credits",
    classification: "canon",
    description: "Timed explosive device that detonates in a sphere of superheated plasma. Can be placed on surfaces or thrown. Used for breaching reinforced doors, destroying equipment, or area denial. The detonation produces a distinctive blue flash visible through walls.",
    specs: [
      { label: "Damage", value: "Extreme (area)" },
      { label: "Radius", value: "4 meters" },
      { label: "Charge Time", value: "3 seconds" },
      { label: "Energy Use", value: "High" },
    ],
    lore: "The PB-2's distinctive blue flash has become a signal in the colony's underground. When you see blue light bleeding through the walls, you run. Static operatives have been known to detonate PB-2s as diversions — the flash draws security attention while the real operation happens elsewhere. Caliber sells 'flash insurance' to businesses in high-conflict sectors: for a monthly fee, they'll warn you 30 seconds before a detonation in your area. How they know is never explained.",
  },
  {
    name: "FIXED CANNON",
    designation: "FC-1 'SENTINEL'",
    type: "Base Defense Turret",
    cost: "300 Credits",
    classification: "canon",
    description: "Automated defense turret deployable at agency base locations. Fires rapid energy bolts at hostile targets within range. Can be destroyed but requires significant firepower. Essential for protecting stored intelligence.",
    specs: [
      { label: "Damage", value: "Medium" },
      { label: "Fire Rate", value: "Very High" },
      { label: "Range", value: "Medium" },
      { label: "Durability", value: "High" },
    ],
    lore: "The FC-1 uses friend-or-foe identification based on agency-specific biosignatures. This system has a known flaw: Black Rose operatives consistently fail to trigger hostile response from ANY agency's turrets. The turrets simply don't see them. Whether this is a deliberate backdoor in the FC-1's firmware or something else entirely remains one of the colony's persistent mysteries. Three separate firmware audits have found nothing wrong with the code.",
  },
  {
    name: "JET PACK",
    designation: "JP-3 'ICARUS'",
    type: "Mobility Enhancement",
    cost: "Standard Issue",
    classification: "canon",
    description: "Personal flight system providing 5 seconds of sustained thrust. Auto-recharges when grounded. Essential for navigating the colony's vertical architecture and accessing elevated terminals. Upgradeable for extended flight duration.",
    specs: [
      { label: "Flight Duration", value: "5 seconds (base)" },
      { label: "Recharge", value: "Automatic on ground contact" },
      { label: "Max Altitude", value: "12 meters" },
      { label: "Upgradeable", value: "Yes — extended fuel cells" },
    ],
    lore: "The JP-3 was reverse-engineered from pre-colonial technology found in the sealed caves beneath Sector 7. The original device provided unlimited flight duration but was powered by an energy source that could not be replicated. The JP-3 is a compromise — limited duration, conventional fuel cells, but the thrust vectoring system is identical to the original. No one knows who built the original. Its design predates human presence on Mars by an estimated 4,000 years.",
  },
  {
    name: "DISGUISE MODULE",
    designation: "DM-5 'CHAMELEON'",
    type: "Stealth System",
    cost: "Standard Issue",
    classification: "canon",
    description: "Holographic projection system that allows operatives to assume the appearance of colony NPCs — workers, guards, civilians. Disguise breaks when firing weapons or taking damage. Essential for moving through guarded areas undetected.",
    specs: [
      { label: "Duration", value: "Unlimited (while passive)" },
      { label: "Break Conditions", value: "Weapon fire, damage taken" },
      { label: "Cooldown", value: "10 seconds after break" },
      { label: "Detection Risk", value: "Low (guard proximity)" },
    ],
    lore: "The DM-5 doesn't just change appearance — it alters the operative's biosignature to match the projected identity. This means security scanners, DNA checkpoints, and even oxygen allocation systems register the operative as whoever they're impersonating. The implications are disturbing: if the technology can perfectly replicate a person's biological identity, how do you know anyone is who they appear to be? The MCA has never publicly acknowledged this question. Internally, they've designated it 'The Identity Problem' and classified all research into it at the highest level.",
  },
];

export default function Equipment() {
  const [selectedWeapon, setSelectedWeapon] = useState<number>(0);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 pt-6">
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
            WEAPONS & EQUIPMENT REGISTRY
          </h1>
          <p className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
            Classified armament database — MCA Sector 7 Weapons Division. Authorization: ULTRAVIOLET.
          </p>
        </div>

        {/* Arsenal image */}
        <div className="relative w-full h-[200px] md:h-[280px] overflow-hidden border border-[var(--phosphor)]/10 mb-8">
          <img src="/manus-storage/equipment-weapons_db5cf345.png" alt="Weapons Arsenal" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
          <div className="absolute bottom-3 left-4">
            <span className="stamp-canon">CANON REFERENCE</span>
          </div>
        </div>

        {/* Weapon selector + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Weapon list */}
          <div className="space-y-1">
            {weapons.map((weapon, i) => (
              <button
                key={i}
                onClick={() => setSelectedWeapon(i)}
                className={`w-full text-left px-3 py-2.5 border transition-all duration-200 ${
                  selectedWeapon === i
                    ? "border-[var(--phosphor)]/40 bg-[var(--phosphor)]/5"
                    : "border-[var(--steel)]/20 bg-[#080808] hover:border-[var(--steel)]/40"
                }`}
              >
                <div className="text-[10px] tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: selectedWeapon === i ? 'var(--phosphor)' : 'var(--signal-white)' }}>
                  {weapon.name}
                </div>
                <div className="text-[9px] mt-0.5" style={{ color: 'var(--signal-white)', opacity: 0.3 }}>
                  {weapon.designation} — {weapon.type}
                </div>
              </button>
            ))}
          </div>

          {/* Weapon detail */}
          <div className="border border-[var(--steel)]/20 bg-[#080808] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={weapons[selectedWeapon].classification === "canon" ? "stamp-canon" : "stamp-expanded"}>
                {weapons[selectedWeapon].classification}
              </span>
              <span className="text-[9px] tracking-wider" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
                COST: {weapons[selectedWeapon].cost}
              </span>
            </div>

            <h2 className="text-lg tracking-wider mb-1" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
              {weapons[selectedWeapon].name}
            </h2>
            <div className="text-xs mb-4" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
              {weapons[selectedWeapon].designation} — {weapons[selectedWeapon].type}
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--signal-white)', opacity: 0.7 }}>
              {weapons[selectedWeapon].description}
            </p>

            {/* Specs */}
            <div className="border border-[var(--steel)]/20 p-4 mb-6">
              <div className="text-[9px] tracking-wider mb-3" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--phosphor)', opacity: 0.6 }}>
                TECHNICAL SPECIFICATIONS
              </div>
              <div className="grid grid-cols-2 gap-2">
                {weapons[selectedWeapon].specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-[var(--steel)]/10 pb-1">
                    <span className="text-[10px]" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>{spec.label}</span>
                    <span className="text-[10px] font-bold" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lore */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="stamp-expanded">EXPANDED LORE</span>
                <span className="text-[9px]" style={{ color: 'var(--amber)', opacity: 0.5 }}>INTELLIGENCE NOTES</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                {weapons[selectedWeapon].lore}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
