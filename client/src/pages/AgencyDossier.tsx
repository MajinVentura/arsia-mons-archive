import { useParams, Link } from "wouter";
import { useState } from "react";

interface AgencyData {
  name: string;
  codename: string;
  color: string;
  image: string;
  advantage: string;
  canonDescription: string;
  expandedHistory: string;
  operatives: { name: string; role: string; status: string; note: string }[];
  secrets: string[];
  propaganda: string;
  relationships: { agency: string; status: string; detail: string }[];
}

const agencies: Record<string, AgencyData> = {
  noxis: {
    name: "NOXIS CORPORATION",
    codename: "BREATHTAKER",
    color: "var(--noxis-blue)",
    image: "/manus-storage/agency-noxis_0cf9aca3.png",
    advantage: "Endurance +3, Jump +5 — Bio-sporria enhanced physiology",
    canonDescription: "The Noxis corporation terraformed the majority of the initial habitable sectors of Mars, and continues to do so, as well as producing and selling 70 percent of the breathable oxygen. Since they are widely known to the populace and government, they have taken steps to bolster their agent's health so they are better able to avoid detection. Training in bio-sporria rich environments, and possessing suits with advanced oxygen processors and filters, has given these agents improved physical abilities such as higher jumps, more stamina, and enhanced durability.",
    expandedHistory: "Noxis began as a legitimate terraforming contractor in the colony's first decade — one of twelve companies awarded atmospheric processing licenses by the Martian Colonial Authority. By SOL 1200, only three remained. By SOL 1600, only Noxis. The others didn't fail. They were acquired, dismantled, or — in the case of Helios Atmospheric — suffered catastrophic 'equipment failures' that killed their entire senior engineering staff in a single afternoon.\n\nThe Oxygen Consolidation Act of SOL 1847 was written by Noxis lawyers and passed by MCA legislators who breathed Noxis air. It granted the corporation exclusive rights to atmospheric processing in exchange for 'guaranteed supply stability.' What it actually guaranteed was that every breath on Mars carried a price tag — and Noxis set the price.\n\nTheir intelligence division emerged from corporate security. When you control the air supply, you don't need weapons to threaten people. You need information — who's building unauthorized scrubbers, who's stockpiling tanks, who's talking to Earth about antitrust. The Silencer program was a natural evolution: agents trained in bio-sporria chambers who could operate in low-oxygen environments that would kill normal operatives. They don't just gather intelligence. They ensure Noxis remains the only source of breath on Mars.",
    operatives: [
      { name: "DIRECTOR YUKI TANAKA", role: "Division Chief", status: "ACTIVE", note: "Former MCA atmospheric scientist. Defected SOL 2340. Knows the oxygen grid's kill-switches." },
      { name: "AGENT COLE VICKERS", role: "Field Operative", status: "ACTIVE", note: "Bio-sporria exposure level: 340%. Can operate in 4% O2 for 90 minutes. Side effects classified." },
      { name: "AGENT SERA OKONKWO", role: "Infiltration Specialist", status: "MIA — SOL 2801", note: "Last transmission from Sector 12. Mentioned 'breathing wrong.' Signal lost." },
      { name: "HANDLER MARCUS WEBB", role: "Intelligence Coordinator", status: "DECEASED — OFFICIAL", note: "Death certificate filed SOL 2756. Three confirmed sightings since." },
    ],
    secrets: [
      "Noxis maintains a network of hidden oxygen reserves — enough to sustain 50,000 people for a decade. Their location is the corporation's most guarded secret. Some analysts believe they're insurance against their own sabotage.",
      "The bio-sporria training program has a 23% fatality rate. Survivors gain enhanced physiology but report persistent auditory hallucinations — described as 'the sound of Mars breathing.'",
      "Internal documents reference 'Project Asphyxia' — a contingency plan to reduce colony oxygen levels by 40% in the event of government nationalization. The plan requires only three people to execute.",
    ],
    propaganda: "BREATH IS PRIVILEGE. LOYALTY IS LIFE. — Every Noxis facility displays this slogan. Colonists see it every time they purchase their monthly oxygen allocation.",
    relationships: [
      { agency: "Static", status: "HOSTILE", detail: "Static has repeatedly attempted to hack Noxis atmospheric control systems. Two successful breaches resulted in free oxygen distribution to Sector 9 for 72 hours before Noxis regained control." },
      { agency: "Caliber", status: "TRANSACTIONAL", detail: "Caliber sells Noxis information about competitor research. Noxis pays well. Neither trusts the other." },
      { agency: "Lazarus", status: "UNKNOWN", detail: "Noxis has no confirmed intelligence on Lazarus operations. This concerns them more than any active threat." },
      { agency: "Black Rose", status: "FEAR", detail: "Three Noxis executives have been found dead with Hollowhead compound in their systems. No pattern. No demands. Just death." },
    ],
  },
  static: {
    name: "STATIC",
    codename: "GHOSTWAVE",
    color: "var(--static-cyan)",
    image: "/manus-storage/agency-static_ab26c49d.png",
    advantage: "Satellite Ability, Hacking +3 — Network omniscience",
    canonDescription: "The Guv first realized that there was a brain-drain about four years ago. Silently, the youngest talented computer specialists and high level programmers were disappearing and leaving the Guv without the technical support it required. They ended up creating Static as a technologically savvy anti-government agency, but many members are more interested in reinforcing their reputation as turbulently wild hackers with the best skills and techniques.",
    expandedHistory: "Static didn't begin as an agency. It began as a dropout rate. Between SOL 2440 and SOL 2444, the Martian Colonial Authority lost 67% of its junior technical staff. Not to rival corporations. Not to Earth. They simply vanished — apartments emptied overnight, ID chips found in drainage systems, work terminals wiped to factory state.\n\nThe government called it the 'Brain Hemorrhage.' Internal reports blamed poor wages and harsh conditions. The truth was simpler and more dangerous: someone was recruiting. Someone who understood that on a colony where every system — life support, communications, security, oxygen distribution — runs on networked infrastructure, the people who maintain that infrastructure are the most powerful people on Mars.\n\nStatic operates from mobile server farms that relocate every 72 hours. Their satellite network — hijacked from decommissioned MCA survey equipment — gives them eyes on every sector simultaneously. They don't fight with weapons. They fight with access. A Static operative can open any door, disable any camera, redirect any oxygen flow, and erase any record. The government fears them more than any armed insurgency because Static doesn't need to destroy the system. They ARE the system.\n\nBut Static has a weakness: ego. Their culture rewards spectacle over strategy. The most respected operatives aren't the most effective — they're the most visible. Graffiti on government servers. Taunting messages left in classified databases. Signature hacks that announce 'STATIC WAS HERE' in phosphor green across every screen in a sector. This need for recognition has cost them operatives, compromised safe houses, and given the MCA patterns to trace.",
    operatives: [
      { name: "ZERO (FOUNDER)", role: "Unknown", status: "UNCONFIRMED", note: "No one has met Zero. Some believe Zero is a person. Others believe Zero is an AI that achieved sentience inside the colony mainframe." },
      { name: "AGENT PIXEL", role: "Satellite Operations", status: "ACTIVE", note: "Controls 14 hijacked survey satellites. Real name unknown. Communicates only through text. Voice has never been recorded." },
      { name: "AGENT CRASH", role: "Infiltration Hacker", status: "ACTIVE", note: "Youngest confirmed operative — recruited at 16. Responsible for the Sector 4 Blackout of SOL 2790." },
      { name: "AGENT VOID", role: "Counter-Intelligence", status: "COMPROMISED?", note: "Behavioral analysis suggests possible double agent. Under internal surveillance since SOL 2830." },
    ],
    secrets: [
      "Static has a backdoor into the MCA's oxygen distribution network. They've never used it offensively — but they've let Noxis know they have it. The implied threat keeps Noxis from targeting Static infrastructure directly.",
      "The organization's true communication network isn't digital. It's a series of dead drops using modified oxygen canisters with data chips embedded in the valve assemblies. Analog. Untraceable.",
      "Zero's last verified communication (SOL 2812) contained a single line: 'THE COLONY MAINFRAME IS NOT WHAT THEY TOLD US IT IS.' No context was provided. No follow-up has been received.",
    ],
    propaganda: "NO MASTERS. NO FLAGS. — Spray-painted on government buildings across six sectors. The MCA has spent 2.3 million credits on removal. It keeps reappearing.",
    relationships: [
      { agency: "Noxis", status: "HOSTILE", detail: "Ideological enemies. Static views Noxis as the embodiment of corporate tyranny. Multiple sabotage operations ongoing." },
      { agency: "Caliber", status: "CONTEMPT", detail: "Static views Caliber as parasites who profit from information without using it for change. Caliber views Static as children playing revolution." },
      { agency: "Lazarus", status: "CURIOSITY", detail: "Static has detected anomalous network traffic originating from Lazarus-associated locations. The data doesn't conform to any known protocol." },
      { agency: "Black Rose", status: "WARY RESPECT", detail: "Static and Black Rose have never directly conflicted. Both operate in shadows. An unspoken non-aggression pact exists." },
    ],
  },
  caliber: {
    name: "CALIBER",
    codename: "GOLDWEIGHT",
    color: "var(--caliber-brass)",
    image: "/manus-storage/agency-caliber_7f06e116.png",
    advantage: "Contacts +3 — Unmatched information network",
    canonDescription: "Looking more like weekend fact-finders or trivia buffs than technological spelunkers, members of Caliber seem to be concerned with obtaining a broad range of general information. So while harvesting data may be only a hobby for their predominantly upper-class agents, even the simplest router checks give them what they want. For some reason, Caliber pays its members extremely well for even the most common files.",
    expandedHistory: "Caliber is the oldest agency on Mars — older than the current government, older than Noxis's monopoly, older perhaps than the colony's official founding date. Their archives (which no outsider has ever accessed) allegedly contain records from the first survey missions, before permanent settlement was authorized.\n\nThey present themselves as dilettantes. Wealthy hobbyists who collect information the way others collect art. Their operatives dress well, speak softly, and never carry weapons heavier than a concealed data-spike. They attend government functions. They dine with Noxis executives. They're seen at every social event worth attending — and many that aren't.\n\nThis is the mask. Beneath it, Caliber operates the most sophisticated intelligence brokerage in the solar system. Every piece of information that moves through Mars — every transaction, every communication, every secret — passes through Caliber's awareness at some point. They don't steal secrets to use them. They steal secrets to SELL them. To everyone. Simultaneously.\n\nCalibur's true power isn't information itself — it's the network of obligations their information creates. When you buy intelligence from Caliber, you owe them. Not money (though they charge handsomely). You owe them a future favor. An access point. A blind eye at the right moment. Over decades, these accumulated debts have made Caliber the invisible architecture of Martian power. They don't rule. They don't need to. Everyone who rules owes them something.",
    operatives: [
      { name: "THE BROKER", role: "Director", status: "ACTIVE", note: "Identity unknown. Communicates through intermediaries. Has held the position for at least 40 years — possibly longer. Some theorize the role is inherited." },
      { name: "AGENT STERLING", role: "High-Society Infiltration", status: "ACTIVE", note: "Maintains cover as a shipping magnate. Net worth: 340 million credits. All of it is operational budget." },
      { name: "AGENT QUILL", role: "Data Acquisition", status: "ACTIVE", note: "Former MCA archivist. Memorized the colony's entire filing system before defecting. Can locate any document ever created." },
      { name: "AGENT MERIDIAN", role: "Debt Collection", status: "ACTIVE", note: "When favors come due and debtors refuse, Meridian visits. No one has refused twice." },
    ],
    secrets: [
      "Caliber's payment structure is a front. The 'generous compensation' for common files is actually a recruitment pipeline — they're not paying for data, they're paying for loyalty. Every operative who accepts payment becomes entangled in Caliber's debt network.",
      "The organization maintains a document called 'The Ledger' — a complete record of every favor owed to Caliber by every person of influence on Mars. It is stored in a physical format (no digital copies) in a location known only to The Broker.",
      "Caliber has information about the colony's founding that contradicts official MCA records by approximately 200 SOLs. They have never sold this information. They have never explained why.",
    ],
    propaganda: "KNOWLEDGE IS THE MOST VALUABLE COMMODITY. INTELLECT. INFORMATION. INFLUENCE. DISCRETION. — Engraved on brass plates in Caliber's private clubs.",
    relationships: [
      { agency: "Noxis", status: "CLIENT", detail: "Noxis is Caliber's largest single customer. They purchase competitor intelligence, political forecasts, and personnel dossiers. Caliber sells them exactly what they ask for — and sells their purchase history to others." },
      { agency: "Static", status: "MUTUAL DISDAIN", detail: "Static steals information to free it. Caliber hoards information to profit from it. Philosophically incompatible. Operationally, they avoid each other." },
      { agency: "Lazarus", status: "FASCINATION", detail: "Caliber has been attempting to acquire Lazarus intelligence for decades. Every operative sent to infiltrate has returned with no memory of the assignment." },
      { agency: "Black Rose", status: "CAUTIOUS", detail: "Caliber has attempted to recruit Black Rose operatives. Three attempts. Three dead recruiters. Message received." },
    ],
  },
  lazarus: {
    name: "LAZARUS",
    codename: "PHOENIX PROTOCOL",
    color: "var(--lazarus-gold)",
    image: "/manus-storage/agency-lazarus_a2ee3345.png",
    advantage: "Resurrection Ability — Death is not permanent",
    canonDescription: "Like the mythical phoenix, the loose organization known as Lazarus has been resurfacing every hundred years and causing chaos in the larger urban areas of Mars. Whether it's belief in some higher power, an understanding of mystical truths, or something else entirely, no one outside of the group is sure of their motives. Numerous witnesses of Lazarus attacks claim to have seen supposedly fatally wounded agents dust themselves off and continue their efforts, virtually undamaged.",
    expandedHistory: "The first recorded mention of Lazarus predates the colony by approximately 200 years. A survey drone from the initial Mars mapping mission (SOL -847, Earth year 2089) captured imagery of what appeared to be carved symbols inside a natural cave formation near Arsia Mons. The symbols matched no known human language. The drone's data was classified and the cave was sealed during colony construction.\n\nLazarus emerged publicly during the First Expansion (SOL 400-600), when colonists reported encounters with individuals who displayed impossible physical resilience. Gunshot wounds that closed in minutes. Falls from lethal heights followed by the victim standing up and walking away. The MCA dismissed these reports as 'oxygen deprivation hallucinations' — but their internal security files tell a different story.\n\nEvery century, like clockwork, Lazarus activity surges. SOL 500. SOL 1100. SOL 1700. SOL 2300. During each surge, the same pattern: chaos in urban areas, government facilities breached, specific data stolen (always related to pre-colonial survey records), and then silence. The operatives vanish. For a hundred years.\n\nWhat they want is unknown. What they ARE is unknown. The resurrection ability has been documented by MCA medical staff who examined captured operatives — only to find the examination rooms empty the next morning, locked from the inside, with no evidence of exit. The bodies were confirmed dead. The locks were confirmed sealed. And yet.\n\nSome theorists within the MCA believe Lazarus isn't an organization at all. It's a phenomenon. Something that was here before humanity arrived. Something that wears human faces when it needs to.",
    operatives: [
      { name: "THE VOICE", role: "Unknown", status: "UNKNOWN", note: "A signal broadcast on frequency 0.001MHz every 100 SOLs. Contains coordinates. The coordinates always lead to empty chambers with fresh symbols on the walls." },
      { name: "AGENT KAEL (ITERATION 7?)", role: "Field Operative", status: "ACTIVE", note: "Confirmed killed SOL 2801, 2803, 2807, 2812, 2819. Confirmed active SOL 2802, 2804, 2808, 2813, 2820. Same biometrics each time." },
      { name: "THE WITNESS", role: "Recruitment", status: "ACTIVE", note: "Approaches potential recruits with a single question: 'Do you remember dying?' Those who answer yes are never seen in public again." },
      { name: "UNKNOWN DESIGNATION", role: "Unknown", status: "PRE-COLONIAL?", note: "MCA Survey Drone 7 imagery (SOL -847) shows a humanoid figure standing in the sealed cave. The figure is wearing modern colony clothing." },
    ],
    secrets: [
      "The resurrection ability is not biological. MCA autopsy reports on captured (temporarily dead) Lazarus operatives show normal human physiology. No implants. No modifications. No explanation. The bodies are simply... normal. Until they aren't dead anymore.",
      "The symbols found in pre-colonial caves match symbols that appear spontaneously on walls in Lazarus-associated locations. Carbon dating of the cave symbols places them at approximately 4,000 years old. The colony is 2,847 SOLs old.",
      "Every 100 SOLs, at the exact moment of the Lazarus surge, every electronic device in the colony experiences a 0.003-second interruption. It's too brief to trigger alarms. But it's there. Every time. For 2,800 years.",
    ],
    propaganda: "WE WERE HERE BEFORE. WE WILL BE HERE AFTER. — Found carved into stone beneath Sector 7, in a chamber that was sealed during original colony construction. The carving is fresh.",
    relationships: [
      { agency: "Noxis", status: "IRRELEVANT", detail: "Lazarus shows no interest in corporate politics or oxygen control. Noxis cannot find them to threaten them." },
      { agency: "Static", status: "ANOMALOUS", detail: "Lazarus network traffic uses protocols that predate the colony's communication infrastructure. Static is obsessed with decoding it." },
      { agency: "Caliber", status: "IMPENETRABLE", detail: "Every Caliber operative sent to gather Lazarus intelligence returns with no memory. Their debt network has no leverage here." },
      { agency: "Black Rose", status: "UNKNOWN", detail: "No recorded interaction between Lazarus and Black Rose. This may be significant. Or it may mean nothing." },
    ],
  },
  blackrose: {
    name: "BLACK ROSE",
    codename: "VOID PROTOCOL",
    color: "#6b0099",
    image: "/manus-storage/agency-blackrose_68663f24.png",
    advantage: "Stealth Ability, Shield +2 — Invisible. Invulnerable. Alone.",
    canonDescription: "More like a dark force than a loose collection of humans, little is known of Black Rose. Something vibrant was taken from these people, and left in its place was a new form of sustenance. Its members seem to be misanthropic and have a penchant for using illegal compounds such as Hollowhead injections to cause extreme pain and internal withering in their victims. Shunned by even the most avaristic mercenaries, these agents work alone and yet still prosper due to some combination of ego and superlative talent.",
    expandedHistory: "Black Rose has no founding date. No origin story. No manifesto. They simply appeared — or rather, they were always there, and at some point, people started dying in ways that required a name for the cause.\n\nThe first confirmed Black Rose kill was SOL 1923. A mid-level MCA bureaucrat found in his sealed apartment with no signs of forced entry. Cause of death: Hollowhead compound — an illegal synthetic that causes the victim's nervous system to experience every pain receptor firing simultaneously for approximately 4 minutes before total organ failure. On his desk, a single black rose petal. Synthetic. No biological origin.\n\nIn the century since, 347 deaths have been attributed to Black Rose. No pattern in the victims — government officials, corporate executives, criminals, scientists, colonists. No ransom demands. No political statements. No communication of any kind. Just death, delivered with surgical precision and absolute anonymity.\n\nWhat makes Black Rose terrifying isn't the killing. It's the absence. No one has ever identified a Black Rose operative and lived to report it. No one has ever infiltrated their organization (if it IS an organization). No one knows how they recruit, where they operate from, or what they want. They have no propaganda, no territory, no visible infrastructure.\n\nThe prevailing theory among MCA intelligence analysts is that Black Rose isn't an agency in any traditional sense. It's a state of being. Something happens to certain individuals — something that removes their connection to humanity and replaces it with... something else. They don't work together because they can't. Whatever they've become doesn't allow for trust, partnership, or loyalty. Each one is alone. Each one is complete.\n\nThe Hollowhead compound is their signature, but not their only tool. Poison. Stealth technology that defeats every known sensor. Personal shield generators of unknown origin. And patience. Black Rose operatives have been documented waiting in a single position for up to 19 days without moving, eating, or sleeping. Waiting for the perfect moment.",
    operatives: [
      { name: "UNKNOWN", role: "Unknown", status: "ACTIVE", note: "Black Rose operatives have no known names, designations, or identifiers. They are identified only by their kills." },
      { name: "THE GARDENER (THEORETICAL)", role: "Coordinator?", status: "UNCONFIRMED", note: "Some analysts believe a single entity coordinates Black Rose operations. Others argue coordination is impossible given their psychology." },
      { name: "SUBJECT 7 (MCA DESIGNATION)", role: "Field Operative", status: "ACTIVE", note: "Responsible for 23 confirmed kills over 40 years. Same Hollowhead batch signature. Same rose petal. Same impossible entry methods. MCA believes this is one individual." },
      { name: "THE CONVERT (RUMOR)", role: "Former Other-Agency", status: "UNCONFIRMED", note: "Persistent rumor that Black Rose 'recruits' by breaking operatives from other agencies. The process allegedly involves Hollowhead exposure at sub-lethal doses over months." },
    ],
    secrets: [
      "Hollowhead compound cannot be synthesized with any known Martian chemistry. Its molecular structure contains elements that don't appear on the periodic table. Where it comes from is unknown.",
      "MCA surveillance has captured exactly one image of a confirmed Black Rose operative. The image shows a human figure with normal proportions, wearing unmarked black armor. The face is visible. It belongs to a colonist who died — confirmed dead, cremated, witnessed — 12 years before the image was taken.",
      "The black rose petals left at kill sites are not manufactured. Microscopic analysis reveals cellular structure consistent with organic plant matter. But the cells contain no DNA. No RNA. No genetic material of any kind. They are structurally perfect flowers made of nothing.",
    ],
    propaganda: "Black Rose has no propaganda. No slogans. No symbols beyond the petal. This absence IS their message: we do not need you to understand. We do not need you at all.",
    relationships: [
      { agency: "Noxis", status: "PREY", detail: "Three Noxis executives killed. No demands made. No pattern identified. Noxis has tripled executive security. It hasn't helped." },
      { agency: "Static", status: "NON-INTERFERENCE", detail: "An unspoken boundary. Static doesn't hack Black Rose (assuming they could find anything to hack). Black Rose doesn't kill Static operatives." },
      { agency: "Caliber", status: "LETHAL", detail: "Caliber tried to buy Black Rose information. Caliber tried to recruit Black Rose operatives. Caliber learned that some things cannot be purchased." },
      { agency: "Lazarus", status: "UNKNOWN", detail: "No recorded interaction. Two organizations that defy explanation. The silence between them feels deliberate." },
    ],
  },
};

const agencyOrder = ["noxis", "static", "caliber", "lazarus", "blackrose"];

export default function AgencyDossier() {
  const { id } = useParams<{ id: string }>();
  const [decryptedSecrets, setDecryptedSecrets] = useState<Set<number>>(new Set());
  const agency = agencies[id || "noxis"];

  if (!agency) {
    return <div className="min-h-screen pt-24 px-8 text-center text-[var(--blood)]">AGENCY NOT FOUND — SIGNAL LOST</div>;
  }

  const toggleSecret = (index: number) => {
    setDecryptedSecrets((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Agency navigation tabs */}
      <div className="border-b border-[var(--steel)]/20 px-4 md:px-8 pt-2">
        <div className="flex gap-0 overflow-x-auto">
          {agencyOrder.map((agId) => (
            <Link
              key={agId}
              href={`/agency/${agId}`}
              className={`px-4 py-2 text-[10px] tracking-wider uppercase whitespace-nowrap border-b-2 transition-all ${
                agId === id
                  ? "border-current opacity-100"
                  : "border-transparent opacity-40 hover:opacity-70"
              }`}
              style={{ fontFamily: 'Share Tech Mono, monospace', color: agencies[agId].color }}
            >
              {agencies[agId].name.split(" ")[0]}
            </Link>
          ))}
        </div>
      </div>

      {/* Banner image */}
      <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
        <img src={agency.image} alt={agency.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/20" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <div className="text-[9px] tracking-wider mb-2" style={{ fontFamily: 'Courier Prime, monospace', color: agency.color, opacity: 0.7 }}>
            CODENAME: {agency.codename}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: agency.color }}>
            {agency.name}
          </h1>
          <div className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
            {agency.advantage}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 space-y-10">
        {/* Canon description */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="stamp-canon">CANON</span>
            <h2 className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
              OFFICIAL RECORD
            </h2>
          </div>
          <div className="border-l-2 pl-4 py-2" style={{ borderColor: `${agency.color}40` }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.8 }}>
              {agency.canonDescription}
            </p>
          </div>
        </section>

        {/* Expanded history */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="stamp-expanded">EXPANDED LORE</span>
            <h2 className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--amber)' }}>
              RECOVERED INTELLIGENCE
            </h2>
          </div>
          <div className="space-y-4">
            {agency.expandedHistory.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.7 }}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Operatives */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="stamp-expanded">EXPANDED LORE</span>
            <h2 className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--amber)' }}>
              KNOWN OPERATIVES
            </h2>
          </div>
          <div className="space-y-3">
            {agency.operatives.map((op, i) => (
              <div key={i} className="border border-[var(--steel)]/20 p-4 bg-[#080808]">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-xs font-bold tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: agency.color }}>
                      {op.name}
                    </div>
                    <div className="text-[10px] mt-1" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
                      {op.role}
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 border ${
                    op.status.includes("ACTIVE") ? "border-[var(--phosphor)]/40 text-[var(--phosphor)]" :
                    op.status.includes("DECEASED") ? "border-[var(--blood)]/40 text-[var(--blood)]" :
                    op.status.includes("MIA") ? "border-[var(--amber)]/40 text-[var(--amber)]" :
                    "border-[var(--steel)]/40 text-[var(--signal-white)]/50"
                  }`} style={{ fontFamily: 'Courier Prime, monospace' }}>
                    {op.status}
                  </span>
                </div>
                <p className="text-[11px] mt-2 leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                  {op.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Classified secrets */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="stamp-classified">CLASSIFIED</span>
            <h2 className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--blood)' }}>
              ENCRYPTED FILES — CLICK TO DECRYPT
            </h2>
          </div>
          <div className="space-y-3">
            {agency.secrets.map((secret, i) => (
              <div
                key={i}
                onClick={() => toggleSecret(i)}
                className={`border p-4 cursor-pointer transition-all duration-500 ${
                  decryptedSecrets.has(i)
                    ? "border-[var(--phosphor)]/30 bg-[var(--phosphor)]/5"
                    : "border-[var(--blood)]/30 bg-[var(--blood)]/5 hover:bg-[var(--blood)]/10"
                }`}
              >
                {decryptedSecrets.has(i) ? (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--phosphor)', opacity: 0.9 }}>
                    {secret}
                  </p>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--blood)] text-xs" style={{ fontFamily: 'Courier Prime, monospace' }}>
                      [ENCRYPTED — CLICK TO DECRYPT]
                    </span>
                    <div className="flex-1 h-px bg-[var(--blood)]/20" />
                    <span className="text-[9px] text-[var(--blood)]/50">LEVEL {i + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Relationships */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="stamp-expanded">EXPANDED LORE</span>
            <h2 className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--amber)' }}>
              INTER-AGENCY RELATIONS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {agency.relationships.map((rel, i) => (
              <div key={i} className="border border-[var(--steel)]/20 p-4 bg-[#080808]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
                    {rel.agency.toUpperCase()}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 ${
                    rel.status === "HOSTILE" ? "text-[var(--blood)]" :
                    rel.status === "FEAR" || rel.status === "LETHAL" || rel.status === "PREY" ? "text-[var(--blood)]" :
                    rel.status === "UNKNOWN" || rel.status === "UNCONFIRMED" ? "text-[var(--signal-white)]/40" :
                    "text-[var(--amber)]"
                  }`} style={{ fontFamily: 'Courier Prime, monospace' }}>
                    [{rel.status}]
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
                  {rel.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Propaganda */}
        <section className="border border-[var(--steel)]/20 p-6 bg-[#080808] relative overflow-hidden">
          <div className="absolute top-2 right-3">
            <span className="stamp-canon">CANON</span>
          </div>
          <div className="text-[9px] tracking-wider mb-3" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
            INTERCEPTED PROPAGANDA
          </div>
          <blockquote className="text-base md:text-lg italic leading-relaxed" style={{ fontFamily: 'Courier Prime, monospace', color: agency.color }}>
            "{agency.propaganda}"
          </blockquote>
        </section>
      </div>
    </div>
  );
}
