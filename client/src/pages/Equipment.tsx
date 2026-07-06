import { useState } from "react";
import { useWeaponSound, type SoundType } from "@/hooks/useAudio";

interface Weapon {
  name: string;
  designation: string;
  type: string;
  cost: string;
  classification: "canon" | "expanded";
  category: "primary" | "grenade" | "deployable" | "utility";
  exclusive?: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  lore: string;
  soundType: SoundType;
}

const weapons: Weapon[] = [
  {
    name: "BLASTER",
    designation: "EB-7 'WHISPER'",
    type: "Primary Sidearm",
    cost: "Standard Issue",
    classification: "canon",
    category: "primary",
    image: "/manus-storage/weapon-blaster_5a318852.png",
    description: "Standard-issue energy weapon for all Silencer operatives. Fires concentrated plasma bolts at medium range with infinite ammunition. Reliable, accurate, and quiet enough for covert operations. Every agency issues a variant — the differences are cosmetic, not functional. Moderate fire rate with high health damage but reduced effectiveness against shields.",
    specs: [
      { label: "Damage", value: "High (Health)" },
      { label: "Shield Damage", value: "Low" },
      { label: "Fire Rate", value: "Moderate" },
      { label: "Ammo", value: "Infinite" },
    ],
    lore: "The EB-7 was originally designed as a mining tool — a precision cutter for volcanic basalt. Its conversion to a weapon was inevitable on a colony where the government controls all conventional arms manufacturing. The first Silencer to use one in combat was a Static operative named 'Flicker,' who discovered that the mining laser's frequency could be modulated to pass through standard MCA body armor. Flicker's modification became standard within a month. The MCA never updated their armor.",
    soundType: "blaster",
  },
  {
    name: "LASER",
    designation: "LS-12 'PIERCE'",
    type: "Anti-Shield Weapon",
    cost: "200 Credits",
    classification: "canon",
    category: "primary",
    image: "/manus-storage/weapon-laser_69aa6ec2.png",
    description: "Precision energy weapon designed specifically to penetrate defensive shield systems. Fires a concentrated beam that passes through energy barriers with devastating efficiency. Limited ammunition requires tactical discipline — 5 shots per purchase, maximum capacity of 30. The weapon of choice for operatives facing shielded targets.",
    specs: [
      { label: "Damage", value: "High (Shields)" },
      { label: "Fire Rate", value: "Moderate" },
      { label: "Ammo Per Buy", value: "5" },
      { label: "Max Capacity", value: "30" },
    ],
    lore: "The LS-12 exploits a fundamental flaw in MCA shield technology: the shields were designed to deflect kinetic projectiles and plasma bolts, not coherent light at specific frequencies. When Static hackers leaked the shield's frequency response specifications, weapon designers across the colony had working anti-shield prototypes within a week. The MCA has been unable to patch the vulnerability because doing so would require replacing every shield generator on Mars — a cost even Noxis won't subsidize.",
    soundType: "laser",
  },
  {
    name: "ROCKET LAUNCHER",
    designation: "RL-4 'JUDGMENT'",
    type: "Heavy Ordnance",
    cost: "400 Credits",
    classification: "canon",
    category: "primary",
    image: "/manus-storage/weapon-rocket_a40ac120.png",
    description: "Shoulder-mounted rocket system capable of destroying reinforced structures and armored targets. Devastating splash damage on impact. 3 rockets per purchase with a maximum capacity of 30. The weapon of choice for operatives who prefer certainty over subtlety. Effective against both personnel and fixed installations.",
    specs: [
      { label: "Damage", value: "Extreme + Splash" },
      { label: "Fire Rate", value: "Low" },
      { label: "Ammo Per Buy", value: "3" },
      { label: "Max Capacity", value: "30" },
    ],
    lore: "The RL-4 is technically illegal under the Mars Weapons Convention of SOL 1400. This has not prevented its widespread use. Noxis manufactures them in a facility officially registered as an 'atmospheric sensor calibration plant.' The warheads use a compressed oxygen payload — ironic, given Noxis's primary business. Each rocket costs approximately 200 credits to manufacture and is sold for 400. War is profitable when you make both the weapons and the air people breathe.",
    soundType: "rocket",
  },
  {
    name: "FLAMER",
    designation: "FT-9 'PYRE'",
    type: "Shield-Bypass Weapon",
    cost: "300 Credits",
    classification: "canon",
    category: "primary",
    image: "/manus-storage/weapon-flamer_cee61d81.png",
    description: "Pressurized fuel system projecting a continuous stream of superheated plasma. Unique among weapons for completely bypassing energy shields — the thermal stream passes through defensive barriers as if they don't exist. 15 fuel units per purchase, maximum 75. Devastating in corridors and confined spaces. The psychological impact often exceeds the physical damage.",
    specs: [
      { label: "Damage", value: "High (Continuous)" },
      { label: "Shield Bypass", value: "YES — Full" },
      { label: "Ammo Per Buy", value: "15" },
      { label: "Max Capacity", value: "75" },
    ],
    lore: "On a colony where oxygen is the most valuable commodity, a weapon that consumes oxygen at an extraordinary rate carries a particular cruelty. The FT-9 doesn't just burn its targets — it depletes the breathable air in the surrounding area for approximately 90 seconds after discharge. In sealed corridors, this means anyone without an enhanced oxygen suit (Noxis operatives, conveniently) suffocates while the flames die. Some analysts believe the FT-9 was designed specifically to give Noxis operatives an environmental advantage.",
    soundType: "flamer",
  },
  {
    name: "EMP BOMB",
    designation: "EM-3 'BLACKOUT'",
    type: "Electronic Warfare",
    cost: "100 Credits",
    classification: "canon",
    category: "grenade",
    image: "/manus-storage/weapon-emp_2b2bbd20.png",
    description: "Electromagnetic pulse device that instantly disables all energy shields within its blast radius. Does not deal direct damage but leaves targets completely vulnerable to follow-up attacks. Essential for coordinated assaults against heavily shielded positions. Cheap, effective, and feared by anyone relying on shield technology for survival.",
    specs: [
      { label: "Damage", value: "None (Shield Strip)" },
      { label: "Effect", value: "Disables all shields in radius" },
      { label: "Blast Radius", value: "Large" },
      { label: "Cost", value: "100 Credits" },
    ],
    lore: "The EMP bomb was originally a Static invention — a byproduct of their research into disrupting government surveillance networks. The first prototype was detonated inside MCA headquarters during the Sector 4 Blackout, disabling every electronic system in the building for 47 minutes. Static sold the design to all agencies simultaneously (for different prices, naturally). Their reasoning: if everyone has EMP capability, no one can rely solely on electronic defenses. This philosophy — 'level the field, then win with skill' — defines Static's approach to warfare.",
    soundType: "emp",
  },
  {
    name: "SHAPED BOMB",
    designation: "SB-1 'UPPERCUT'",
    type: "Directional Explosive",
    cost: "100 Credits",
    classification: "canon",
    category: "grenade",
    image: "/manus-storage/weapon-shaped-bomb_616d80c8.png",
    description: "Focused directional explosive that channels its entire blast force upward. Designed for breaching floors, ceilings, and elevated positions. When detonated, the shaped charge creates a vertical column of destruction while leaving the surrounding area relatively intact. Tactical tool for creating unexpected entry points.",
    specs: [
      { label: "Damage", value: "High (Directional)" },
      { label: "Blast Direction", value: "Upward only" },
      { label: "Breach Capability", value: "Floors/Ceilings" },
      { label: "Cost", value: "100 Credits" },
    ],
    lore: "The shaped bomb was developed by Caliber operatives who needed to access sealed vaults without triggering perimeter alarms. A conventional explosive would alert every sensor in the sector. The SB-1's focused blast is nearly silent from the sides — all the energy goes up. Bank vaults, government archives, corporate safes — if it's above you and you have an SB-1, it's already yours. The MCA has since reinforced all ground-floor vault ceilings with blast-resistant plating. Caliber responded by placing SB-1s on the floor below.",
    soundType: "shaped_bomb",
  },
  {
    name: "PLASMA BOMB",
    designation: "PB-2 'SUNSPOT'",
    type: "Area Explosive",
    cost: "200 Credits",
    classification: "canon",
    category: "grenade",
    image: "/manus-storage/weapon-plasma-bomb_3d679487.png",
    description: "High-damage area explosive that detonates in a sphere of superheated plasma. Occupies 2 inventory slots due to its size and power. Can be placed on surfaces or thrown. Used for breaching reinforced doors, destroying equipment, or area denial. The detonation produces a distinctive blue flash visible through walls.",
    specs: [
      { label: "Damage", value: "Extreme (Area)" },
      { label: "Radius", value: "Large" },
      { label: "Inventory Slots", value: "2" },
      { label: "Cost", value: "200 Credits" },
    ],
    lore: "The PB-2's distinctive blue flash has become a signal in the colony's underground. When you see blue light bleeding through the walls, you run. Static operatives have been known to detonate PB-2s as diversions — the flash draws security attention while the real operation happens elsewhere. Caliber sells 'flash insurance' to businesses in high-conflict sectors: for a monthly fee, they'll warn you 30 seconds before a detonation in your area. How they know is never explained.",
    soundType: "plasma_bomb",
  },
  {
    name: "NEUTRON BOMB",
    designation: "NB-0 'EXTINCTION'",
    type: "Weapon of Mass Destruction",
    cost: "4,000 Credits",
    classification: "canon",
    category: "grenade",
    image: "/manus-storage/weapon-neutron_36eab0ab.png",
    description: "The most devastating weapon available on Mars. When detonated, kills every living entity in the entire map region — operatives, civilians, guards, everyone. The only defense is being inside a sealed agency base at the moment of detonation. Occupies 8 inventory slots. Its mere possession changes the dynamics of any conflict.",
    specs: [
      { label: "Damage", value: "LETHAL — All entities" },
      { label: "Range", value: "Entire map region" },
      { label: "Defense", value: "Inside base ONLY" },
      { label: "Inventory Slots", value: "8" },
    ],
    lore: "The Neutron Bomb exists in a legal grey zone — technically classified as a 'research device' under MCA regulations because no sane bureaucrat wanted to acknowledge that such weapons exist in the colony. Only three have ever been detonated. The first was a test by the MCA military division. The second was used by a Noxis operative during the Sector 9 Incident — 847 civilian casualties. The third... the records of the third detonation were among the data destroyed during the Purge. Whatever happened was bad enough to erase.",
    soundType: "neutron",
  },
  {
    name: "FIXED CANNON",
    designation: "FC-1 'SENTINEL'",
    type: "Auto-Turret",
    cost: "300 Credits",
    classification: "canon",
    category: "deployable",
    image: "/manus-storage/weapon-cannon_c2af2e86.png",
    description: "Automated defense turret deployable at any location. Fires rapid wall projectiles at hostile targets within range. Uses friend-or-foe identification based on agency biosignatures. Can be destroyed but requires significant firepower. Essential for protecting stored intelligence and controlling chokepoints.",
    specs: [
      { label: "Damage", value: "Medium (Rapid)" },
      { label: "Fire Rate", value: "Very High" },
      { label: "Targeting", value: "Auto — IFF system" },
      { label: "Durability", value: "High" },
    ],
    lore: "The FC-1 uses friend-or-foe identification based on agency-specific biosignatures. This system has a known flaw: Black Rose operatives consistently fail to trigger hostile response from ANY agency's turrets. The turrets simply don't see them. Whether this is a deliberate backdoor in the FC-1's firmware or something else entirely remains one of the colony's persistent mysteries. Three separate firmware audits have found nothing wrong with the code.",
    soundType: "cannon",
  },
  {
    name: "FLARE",
    designation: "FL-2 'TORCH'",
    type: "Area Denial",
    cost: "200 Credits",
    classification: "canon",
    category: "deployable",
    image: "/manus-storage/weapon-flare_9689aa1a.png",
    description: "Stationary incendiary device that creates a persistent zone of fire damage. Once deployed, burns continuously and damages any hostile entity that enters its radius. Used for controlling corridors, blocking escape routes, and protecting flanks. Cannot be extinguished once lit — burns until fuel is exhausted.",
    specs: [
      { label: "Damage", value: "Sustained (Area)" },
      { label: "Duration", value: "Extended" },
      { label: "Placement", value: "Stationary" },
      { label: "Cost", value: "200 Credits" },
    ],
    lore: "The Flare was originally a mining safety device — a long-burning marker placed at dangerous excavation sites to warn workers. Its conversion to a weapon was straightforward: increase the fuel concentration, add a thermal accelerant, and suddenly you have a device that turns a corridor into an impassable wall of fire. Miners still use the original version. The weaponized variant is distinguished by its red casing instead of yellow. Both are manufactured by the same company. They don't advertise this.",
    soundType: "flare",
  },
  {
    name: "POISON FLARE",
    designation: "PF-2 'NIGHTSHADE'",
    type: "Toxic Area Denial",
    cost: "200 Credits",
    classification: "canon",
    category: "deployable",
    exclusive: "BLACK ROSE",
    image: "/manus-storage/weapon-poison-flamer_8363d007.png",
    description: "Black Rose exclusive variant of the standard Flare. Combines incendiary damage with a toxic poison compound that continues to damage victims after they leave the area. The poison lingers in the bloodstream, slowly draining health over time. A uniquely cruel device that punishes even brief exposure.",
    specs: [
      { label: "Damage", value: "Fire + Poison (DOT)" },
      { label: "Poison Duration", value: "Extended" },
      { label: "Agency Lock", value: "BLACK ROSE ONLY" },
      { label: "Cost", value: "200 Credits" },
    ],
    lore: "The Poison Flare uses a compound called 'Nightshade-7' — a synthetic toxin developed in Black Rose laboratories that no other agency has been able to replicate. The toxin is absorbed through the skin and lungs simultaneously, making even momentary exposure dangerous. Victims describe a sensation of 'cold fire' spreading through their veins. There is no known antidote. The body must metabolize it naturally — a process that takes hours and leaves permanent scarring on the respiratory system.",
    soundType: "flare",
  },
  {
    name: "PLASMA DETONATOR",
    designation: "PD-4 'PATIENCE'",
    type: "Remote Explosive",
    cost: "200 Credits",
    classification: "canon",
    category: "deployable",
    image: "/manus-storage/weapon-detonator_0bb97e6c.png",
    description: "Remote-detonated explosive that can be placed on any surface and triggered at will. Unlike timed explosives, the operator maintains full control over when the detonation occurs. Ideal for ambushes, traps, and controlled demolition. Can be placed and left indefinitely until triggered.",
    specs: [
      { label: "Damage", value: "High (Area)" },
      { label: "Trigger", value: "Remote — Manual" },
      { label: "Placement", value: "Any surface" },
      { label: "Duration", value: "Indefinite until triggered" },
    ],
    lore: "Caliber operatives are the most prolific users of Plasma Detonators — not for combat, but for leverage. A well-placed PD-4 on a structural support, a life-support conduit, or beneath a target's sleeping quarters creates what Caliber calls 'insurance.' The target doesn't need to know the device is there. They just need to know that Caliber MIGHT have placed one. The uncertainty is the weapon. Several high-ranking MCA officials have their homes swept for PD-4s weekly. The sweeps never find anything. This doesn't mean there's nothing to find.",
    soundType: "detonator",
  },
  {
    name: "CAMERA",
    designation: "CM-1 'WATCHER'",
    type: "Surveillance",
    cost: "100 Credits",
    classification: "canon",
    category: "deployable",
    image: "/manus-storage/weapon-camera_71a0b385.png",
    description: "Deployable remote viewing device that provides real-time visual feed of its location. Once placed, the operative can switch to the camera's perspective at any time. Essential for monitoring enemy movements, watching approach routes, and gathering intelligence without physical presence.",
    specs: [
      { label: "Function", value: "Remote visual feed" },
      { label: "Range", value: "Unlimited" },
      { label: "Detection", value: "Low profile" },
      { label: "Cost", value: "100 Credits" },
    ],
    lore: "The CM-1 is the simplest and most underestimated tool in any operative's arsenal. Static operatives have been known to deploy dozens across a sector, creating a surveillance network that rivals the MCA's own. The feeds are encrypted with rotating keys that change every 30 seconds. Even if an enemy finds a camera, destroying it tells the operator exactly where they are — which is often more valuable than the continued surveillance.",
    soundType: "camera",
  },
  {
    name: "HEALTH PACK",
    designation: "HP-N 'SECOND WIND'",
    type: "Medical",
    cost: "200 Credits",
    classification: "canon",
    category: "utility",
    exclusive: "NOXIS",
    image: "/manus-storage/item-healthpack_3395e51c.png",
    description: "Noxis-exclusive medical device that instantly restores the operative's health to maximum. Contains a concentrated bio-sporria compound that accelerates cellular regeneration. Only Noxis operatives possess the biological compatibility required to survive the injection — for anyone else, the compound is lethal.",
    specs: [
      { label: "Effect", value: "Full health restore" },
      { label: "Agency Lock", value: "NOXIS ONLY" },
      { label: "Activation", value: "Instant" },
      { label: "Cost", value: "200 Credits" },
    ],
    lore: "The Health Pack's bio-sporria compound is the same substance used in Noxis operative training — concentrated to a degree that would kill an unmodified human in seconds. The injection triggers a cascade of cellular regeneration that heals wounds, purges toxins, and restores tissue damage in approximately 3 seconds. The side effects are classified, but long-term Noxis operatives report 'hearing the colony breathe' and experiencing phantom sensations of suffocation in perfectly oxygenated environments.",
    soundType: "health",
  },
  {
    name: "LAZARUS TRACT",
    designation: "LT-1 'CONVERSION'",
    type: "Recruitment Device",
    cost: "250 Credits",
    classification: "canon",
    category: "utility",
    exclusive: "LAZARUS",
    image: "/manus-storage/item-lazarus-tract_076c2ae9.png",
    description: "Lazarus-exclusive artifact that converts nearby civilians to the operative's team. The mechanism is unknown — subjects exposed to the Tract simply... change allegiance. They retain their memories and personality but become utterly devoted to Lazarus. The process appears painless. The converted show no signs of coercion. This makes it more disturbing, not less.",
    specs: [
      { label: "Effect", value: "Converts civilians to team" },
      { label: "Agency Lock", value: "LAZARUS ONLY" },
      { label: "Range", value: "Proximity" },
      { label: "Cost", value: "250 Credits" },
    ],
    lore: "No one outside Lazarus understands how the Tract works. Analysis of recovered fragments reveals text in the same pre-colonial symbols found in the caves beneath Sector 7. The text appears to shift when not directly observed — photographs show different symbols than what witnesses report seeing. MCA scientists who studied a captured Tract for more than 72 hours began experiencing 'sympathetic conversion' — a growing desire to seek out Lazarus operatives and surrender the artifact. The research program was terminated. The scientists were reassigned. Two of them disappeared within the month.",
    soundType: "lazarus",
  },
  {
    name: "SECURITY PASS",
    designation: "SP-C 'GOLDEN KEY'",
    type: "Access Override",
    cost: "1,000 Credits",
    classification: "canon",
    category: "utility",
    exclusive: "CALIBER",
    image: "/manus-storage/item-security-pass_47dcc3f3.png",
    description: "Caliber-exclusive device that causes all guards and security robots to ignore the operative completely. The pass broadcasts a signal that registers the bearer as 'authorized personnel' to every security system simultaneously. Extremely expensive but provides complete freedom of movement through guarded areas.",
    specs: [
      { label: "Effect", value: "Guards/robots ignore you" },
      { label: "Agency Lock", value: "CALIBER ONLY" },
      { label: "Duration", value: "Until deactivated" },
      { label: "Cost", value: "1,000 Credits" },
    ],
    lore: "The Security Pass costs 1,000 credits because that's what it costs Caliber to maintain the backdoor. Every guard robot, every security checkpoint, every surveillance system on Mars contains a hidden subroutine — placed there by Caliber operatives who infiltrated the manufacturing process decades ago. The subroutine recognizes a specific encrypted signal and classifies the bearer as 'maintenance personnel — do not engage.' The MCA has never found the subroutine. They've never even suspected it exists. The 1,000 credit price tag isn't profit — it's the cost of keeping the secret.",
    soundType: "security",
  },
  {
    name: "VIRUS",
    designation: "VR-S 'CORRUPTION'",
    type: "Electronic Warfare",
    cost: "400 Credits",
    classification: "canon",
    category: "utility",
    exclusive: "STATIC",
    image: "/manus-storage/item-virus_d960fd9f.png",
    description: "Static-exclusive hacking device that infects robots and fixed cannons, turning enemy technology against its owners. The virus rewrites IFF protocols, causing infected machines to attack their former allies. Also capable of disabling enemy technological systems entirely. The ultimate expression of Static's philosophy: your technology is only yours until we decide otherwise.",
    specs: [
      { label: "Effect", value: "Converts/disables enemy tech" },
      { label: "Agency Lock", value: "STATIC ONLY" },
      { label: "Targets", value: "Robots, Cannons, Tech" },
      { label: "Cost", value: "400 Credits" },
    ],
    lore: "The Virus is Static's masterpiece — a self-propagating code package that exploits a fundamental vulnerability in all Martian robotics: they all run on the same base operating system, written by MCA engineers who prioritized compatibility over security. A single infected robot can spread the Virus to every machine within communication range in under 60 seconds. Static operatives have triggered cascading infections that turned entire security floors against their operators. The MCA's response has been to isolate robot networks — which means their machines can no longer coordinate. Static considers this an acceptable outcome either way.",
    soundType: "virus",
  },
  {
    name: "POISON",
    designation: "PX-7 'WHISPER DEATH'",
    type: "Assassination Tool",
    cost: "200 Credits",
    classification: "canon",
    category: "utility",
    image: "/manus-storage/weapon-poison_51d75143.png",
    description: "A proximity-activated toxin dispersal device that poisons nearby enemy operatives. The compound is absorbed through exposed skin and begins degrading cellular tissue immediately. Damage is sustained over time, making it difficult for victims to identify when they were poisoned or by whom. The perfect tool for operatives who prefer their kills to look like accidents.",
    specs: [
      { label: "Damage", value: "Sustained (DOT)" },
      { label: "Delivery", value: "Proximity — automatic" },
      { label: "Detection", value: "Very Low" },
      { label: "Cost", value: "200 Credits" },
    ],
    lore: "The poison compound used in the PX-7 is synthesized from Martian soil bacteria — organisms that evolved in an environment with no oxygen and extreme radiation. When introduced to human tissue, these bacteria consume cellular material at a predictable rate. The victim feels nothing for the first 30 seconds. Then a spreading warmth. Then pain. By the time symptoms manifest, the operative who deployed the poison is long gone. Black Rose operatives are rumored to carry a more potent variant, but this has never been confirmed.",
    soundType: "poison",
  },
  {
    name: "DISGUISE MODULE",
    designation: "DM-5 'CHAMELEON'",
    type: "Stealth System",
    cost: "Standard Issue",
    classification: "canon",
    category: "utility",
    image: "/manus-storage/item-disguise_0596c307.png",
    description: "Holographic projection system that allows operatives to assume the appearance of colony NPCs — workers, guards, civilians. Disguise breaks when firing weapons or taking damage. Essential for moving through guarded areas undetected. Alters biosignature to match the projected identity.",
    specs: [
      { label: "Duration", value: "Unlimited (while passive)" },
      { label: "Break Conditions", value: "Weapon fire, damage taken" },
      { label: "Cooldown", value: "10 seconds after break" },
      { label: "Detection Risk", value: "Low" },
    ],
    lore: "The DM-5 doesn't just change appearance — it alters the operative's biosignature to match the projected identity. Security scanners, DNA checkpoints, and even oxygen allocation systems register the operative as whoever they're impersonating. The implications are disturbing: if the technology can perfectly replicate a person's biological identity, how do you know anyone is who they appear to be? The MCA has designated this 'The Identity Problem' and classified all research into it at the highest level.",
    soundType: "disguise",
  },
  {
    name: "JET PACK",
    designation: "JP-3 'ICARUS'",
    type: "Mobility Enhancement",
    cost: "Standard Issue",
    classification: "canon",
    category: "utility",
    image: "/manus-storage/item-jetpack_8e47f9a2.png",
    description: "Personal flight system providing sustained vertical thrust. Auto-recharges when grounded. Essential for navigating the colony's vertical architecture and accessing elevated terminals. Upgradeable for extended flight duration. Standard issue for all operatives.",
    specs: [
      { label: "Flight Duration", value: "5 seconds (base)" },
      { label: "Recharge", value: "Automatic on ground" },
      { label: "Max Altitude", value: "12 meters" },
      { label: "Upgradeable", value: "Yes — extended fuel" },
    ],
    lore: "The JP-3 was reverse-engineered from pre-colonial technology found in the sealed caves beneath Sector 7. The original device provided unlimited flight duration but was powered by an energy source that could not be replicated. The JP-3 is a compromise — limited duration, conventional fuel cells, but the thrust vectoring system is identical to the original. No one knows who built the original. Its design predates human presence on Mars by an estimated 4,000 years.",
    soundType: "jetpack",
  },
  {
    name: "BASE DOOR",
    designation: "BD-1 'RELOCATOR'",
    type: "Base Infrastructure",
    cost: "Standard Issue",
    classification: "canon",
    category: "utility",
    image: "/manus-storage/item-base-door_c37dff46.png",
    description: "Device that relocates the team's base entrance to a new position. Every operative starts with one. Strategic placement of the base door determines how accessible your team's headquarters is — and how vulnerable. A well-placed door can mean the difference between a secure operation and a compromised one.",
    specs: [
      { label: "Function", value: "Relocate base entrance" },
      { label: "Uses", value: "1 (starting equipment)" },
      { label: "Strategic Value", value: "Critical" },
      { label: "Cost", value: "Standard Issue" },
    ],
    lore: "The base door technology uses spatial compression — the same principle that allows the colony's internal transit system to function. The door doesn't create a new entrance. It moves the existing one through compressed space. This means there is always exactly one way into any agency's base. Find the door, and you've found their vulnerability. This is why agencies relocate their doors constantly — and why knowing an enemy's current door location is worth more than most weapons.",
    soundType: "door",
  },
  {
    name: "INSIDER INFO",
    designation: "II-X 'LEVERAGE'",
    type: "Intelligence",
    cost: "500 Credits",
    classification: "canon",
    category: "utility",
    image: "/manus-storage/item-insider-info_dd14ef9f.png",
    description: "Purchased intelligence that advances your team's secret progress by 20 points. Represents classified documents, stolen data, or bribed testimony that brings your agency closer to uncovering the colony's deepest secrets. Expensive but provides guaranteed progress toward mission objectives.",
    specs: [
      { label: "Effect", value: "+20 Secret Progress" },
      { label: "Type", value: "Intelligence data" },
      { label: "Guaranteed", value: "Yes" },
      { label: "Cost", value: "500 Credits" },
    ],
    lore: "Insider Info packages are sold by Caliber — always Caliber — through dead drops in The Hollows. The information varies: sometimes it's MCA personnel files, sometimes corporate research data, sometimes surveillance footage that shouldn't exist. Caliber never reveals their sources. They never guarantee the information is complete. But it's always real. The 500 credit price is non-negotiable. Caliber doesn't do discounts. They don't need to. When you're the only source of truth on Mars, you set the price.",
    soundType: "insider",
  },
];

const categoryLabels: Record<string, string> = {
  primary: "PRIMARY WEAPONS",
  grenade: "GRENADES & BOMBS",
  deployable: "DEPLOYABLES",
  utility: "UTILITY & EQUIPMENT",
};

const categoryColors: Record<string, string> = {
  primary: "var(--phosphor)",
  grenade: "var(--blood)",
  deployable: "var(--amber)",
  utility: "var(--static-cyan)",
};

export default function Equipment() {
  const [selectedWeapon, setSelectedWeapon] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const { playSound } = useWeaponSound();

  const filteredWeapons = filterCategory === "all"
    ? weapons
    : weapons.filter(w => w.category === filterCategory);

  // When filter changes, reset selection
  const handleFilterChange = (cat: string) => {
    setFilterCategory(cat);
    setSelectedWeapon(0);
  };

  const currentWeapon = filteredWeapons[selectedWeapon] || filteredWeapons[0];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 pt-6">
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
            WEAPONS & EQUIPMENT REGISTRY
          </h1>
          <p className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
            Classified armament database — MCA Sector 7 Weapons Division. Authorization: ULTRAVIOLET. {weapons.length} items catalogued.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3 py-1.5 text-[10px] tracking-wider border transition-all ${
              filterCategory === "all"
                ? "border-[var(--phosphor)]/60 bg-[var(--phosphor)]/10 text-[var(--phosphor)]"
                : "border-[var(--steel)]/30 text-[var(--signal-white)]/50 hover:border-[var(--steel)]/60"
            }`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            ALL ({weapons.length})
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              className={`px-3 py-1.5 text-[10px] tracking-wider border transition-all ${
                filterCategory === key
                  ? "border-current/60 bg-current/10"
                  : "border-[var(--steel)]/30 hover:border-[var(--steel)]/60"
              }`}
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                color: filterCategory === key ? categoryColors[key] : 'var(--signal-white)',
                opacity: filterCategory === key ? 1 : 0.5,
              }}
            >
              {label} ({weapons.filter(w => w.category === key).length})
            </button>
          ))}
        </div>

        {/* Weapon selector + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Weapon list */}
          <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
            {filteredWeapons.map((weapon, i) => (
              <button
                key={weapon.name}
                onClick={() => setSelectedWeapon(i)}
                className={`w-full text-left px-3 py-2.5 border transition-all duration-200 ${
                  selectedWeapon === i
                    ? "border-[var(--phosphor)]/40 bg-[var(--phosphor)]/5"
                    : "border-[var(--steel)]/20 bg-[#080808] hover:border-[var(--steel)]/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: categoryColors[weapon.category] }}
                  />
                  <div className="text-[10px] tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: selectedWeapon === i ? 'var(--phosphor)' : 'var(--signal-white)' }}>
                    {weapon.name}
                  </div>
                </div>
                <div className="text-[9px] mt-0.5 pl-3.5" style={{ color: 'var(--signal-white)', opacity: 0.3 }}>
                  {weapon.designation} — {weapon.type}
                </div>
                {weapon.exclusive && (
                  <div className="text-[8px] mt-0.5 pl-3.5 tracking-wider" style={{ color: 'var(--blood)', opacity: 0.7 }}>
                    ★ {weapon.exclusive} EXCLUSIVE
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Weapon detail */}
          {currentWeapon && (
            <div className="border border-[var(--steel)]/20 bg-[#080808]">
              {/* Weapon image */}
              <div className="relative w-full h-[180px] md:h-[220px] overflow-hidden border-b border-[var(--steel)]/20">
                <img
                  src={currentWeapon.image}
                  alt={currentWeapon.name}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/20" />
                <div className="absolute top-3 right-3">
                  <span
                    className="text-[8px] px-2 py-0.5 tracking-wider border"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      color: categoryColors[currentWeapon.category],
                      borderColor: `${categoryColors[currentWeapon.category]}40`,
                      background: `${categoryColors[currentWeapon.category]}10`,
                    }}
                  >
                    {categoryLabels[currentWeapon.category]}
                  </span>
                </div>
                {currentWeapon.exclusive && (
                  <div className="absolute top-3 left-3">
                    <span className="stamp-classified text-[8px]">
                      {currentWeapon.exclusive} EXCLUSIVE
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={currentWeapon.classification === "canon" ? "stamp-canon" : "stamp-expanded"}>
                    {currentWeapon.classification}
                  </span>
                  <span className="text-[9px] tracking-wider" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
                    COST: {currentWeapon.cost}
                  </span>
                </div>

                <h2 className="text-lg tracking-wider mb-1" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
                  {currentWeapon.name}
                </h2>
                <div className="text-xs mb-4" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
                  {currentWeapon.designation} — {currentWeapon.type}
                </div>

                {/* Sound effect button */}
                <button
                  onClick={() => playSound(currentWeapon.soundType)}
                  className="flex items-center gap-2 px-4 py-2 mb-5 border border-[var(--phosphor)]/30 bg-[var(--phosphor)]/5 hover:bg-[var(--phosphor)]/10 hover:border-[var(--phosphor)]/60 transition-all duration-200 active:scale-95 group"
                  title="Play weapon sound effect"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--phosphor)] group-hover:animate-pulse">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                  <span className="text-[10px] tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
                    PLAY SFX
                  </span>
                </button>

                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--signal-white)', opacity: 0.7 }}>
                  {currentWeapon.description}
                </p>

                {/* Specs */}
                <div className="border border-[var(--steel)]/20 p-4 mb-6">
                  <div className="text-[9px] tracking-wider mb-3" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--phosphor)', opacity: 0.6 }}>
                    TECHNICAL SPECIFICATIONS
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {currentWeapon.specs.map((spec, i) => (
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
                    <span className="stamp-expanded">INTELLIGENCE NOTES</span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.6 }}>
                    {currentWeapon.lore}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
