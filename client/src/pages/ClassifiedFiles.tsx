import { useState } from "react";

interface ClassifiedFile {
  id: string;
  title: string;
  origin: string;
  date: string;
  integrity: string;
  content: string;
  redactions: number;
}

const files: ClassifiedFile[] = [
  {
    id: "CF-001",
    title: "GOVERNOR HARRISON — PRIVATE MEMO",
    origin: "MCA Executive Office",
    date: "SOL 2843 (1 day before purge)",
    integrity: "78%",
    content: `TO: Director Yun, MCA Intelligence Division
FROM: Governor Harrison
RE: Contingency BLACKOUT

The timeline has accelerated. Our models predicted SOL 2900 for the next event. New data from the Sector 7 monitoring station suggests activity is building 40-50 SOLs ahead of schedule. This is unprecedented.

I am authorizing full data purge of all Category 7 records effective SOL 2844. I understand the implications. The historical record will be incomplete. Future administrations will not have context for what happens next.

This is preferable to the alternative.

[REDACTED — 4 LINES]

If the pattern holds, the surge will begin with electromagnetic disruption followed by [REDACTED]. Previous surges resulted in [REDACTED] casualties and the disappearance of [REDACTED] colonists. We cannot prevent this. We can only ensure that [REDACTED] does not gain access to the [REDACTED] data before the event.

Destroy everything related to Project FOUNDATION. Destroy the survey drone archives. Destroy the cave mapping data. Leave nothing that could serve as [REDACTED].

I will not be available after SOL 2844. Do not attempt to contact me. If I am seen after that date, it is not me.

— Harrison`,
    redactions: 7,
  },
  {
    id: "CF-002",
    title: "INTERCEPTED NOXIS INTERNAL — PROJECT ASPHYXIA",
    origin: "Noxis Corporation — Executive Division",
    date: "SOL 2801",
    integrity: "62%",
    content: `CLASSIFICATION: NOXIS EYES ONLY — BOARD LEVEL

PROJECT ASPHYXIA — STATUS UPDATE

The contingency remains operational. Three keyholders confirmed:
- Director Tanaka (Sector 4 Processing Hub)
- [REDACTED] (Sector 11 Distribution Node)
- [REDACTED] (Orbital Relay Station)

Activation requires simultaneous key-turn from all three positions. Time from activation to 40% atmospheric reduction: 7 minutes. Time to colony-wide critical oxygen levels: 23 minutes.

The Board reaffirms that Project Asphyxia exists solely as a deterrent against government nationalization. It will never be used.

[ANALYST NOTE: This document was recovered from a Noxis executive's personal terminal after their death — attributed to Black Rose. The executive's name has been redacted for operational security. The fact that Black Rose killed someone with access to Asphyxia protocols raises questions about Black Rose's motivations that we cannot currently answer.]

ADDENDUM (SOL 2830): Director Tanaka's bio-sporria exposure has reached 340%. Medical staff report she has begun speaking in her sleep — in a language that does not match any known human dialect. Request for psychological evaluation denied by Noxis board.`,
    redactions: 3,
  },
  {
    id: "CF-003",
    title: "STATIC INTERNAL — ZERO'S FINAL BROADCAST",
    origin: "Static Network — Encrypted Channel",
    date: "SOL 2812",
    integrity: "91%",
    content: `[SIGNAL AUTHENTICATED — ZERO CRYPTOGRAPHIC SIGNATURE CONFIRMED]
[BROADCAST TO: ALL STATIC OPERATIVES — PRIORITY ABSOLUTE]

I found it.

The colony mainframe is not what they told us it is. It's not a computer. It never was. The MCA built their infrastructure around something that was already here. Something that was already running.

The processing cycles we attributed to government operations — the ones we've been monitoring for decades — they're not government operations. They're not human operations. The mainframe is running processes that predate the colony by thousands of years.

We thought we were hacking their system. We were wrong. We were inside something else entirely. Something that noticed us.

I don't know what it wants. I don't know if 'want' is the right word. But it knows we're here now. All of us. Every device connected to the colony network. Every person with an ID chip.

Change everything. Go analog. Dead drops only. Destroy your network interfaces. Do it now.

I won't transmit again. It's listening.

— ZERO

[END TRANSMISSION]
[NO FURTHER COMMUNICATIONS FROM THIS SIGNATURE DETECTED — 35 SOLS AND COUNTING]`,
    redactions: 0,
  },
  {
    id: "CF-004",
    title: "MCA MEDICAL REPORT — LAZARUS AUTOPSY",
    origin: "MCA Sector 7 Medical Division",
    date: "SOL 2807",
    integrity: "54%",
    content: `SUBJECT: Operative designated "KAEL" (Lazarus affiliation confirmed)
ATTENDING: Dr. Miriam Cross, Chief Pathologist
STATUS: DECEASED (confirmed 14:32 SOL 2807)

AUTOPSY FINDINGS:
- Subject is human male, approximately 30-35 years of age
- Cause of death: Three gunshot wounds to torso (MCA security engagement)
- No implants, modifications, or foreign objects detected
- No unusual chemical compounds in bloodstream
- DNA analysis: Standard human genome, no anomalies
- Brain structure: Normal
- Organ function at time of death: Normal (prior to trauma)

CONCLUSION: Subject is a baseline human with no detectable modifications that would explain reported "resurrection" capability.

[ADDENDUM — 06:17 SOL 2808]
Subject is no longer in the examination room. The room was locked from the inside. Security footage shows no movement between 02:00 and 06:00. At 06:00, the camera experiences a 0.003-second interruption. When footage resumes, the examination table is empty. The body bag is folded neatly on the counter.

The door lock mechanism shows no signs of tampering. It was opened from the inside using the standard release. The standard release requires a living human hand.

I am requesting immediate transfer from this facility.

— Dr. Cross

[NOTE: Dr. Cross's transfer request was denied. She has not reported for duty since SOL 2810. Her apartment is empty. Her ID chip was found in the Sector 7 drainage system.]`,
    redactions: 0,
  },
  {
    id: "CF-005",
    title: "CALIBER ARCHIVE — PRE-COLONIAL DISCREPANCY",
    origin: "Caliber Internal Archives (leaked)",
    date: "UNDATED — estimated SOL 2600-2700",
    integrity: "43%",
    content: `FROM: The Broker
TO: Senior Archivists Only
RE: The Founding Discrepancy

Our records indicate the colony was established approximately 200 SOLs before the official MCA founding date. This is not a clerical error. This is a deliberate falsification of colonial history.

The first 200 SOLs are missing from all official records. Our archives — the only surviving account — describe a period of [REDACTED] that the MCA has systematically erased.

During this period:
- The pre-colonial caves were opened and explored
- [REDACTED] was discovered inside
- [REDACTED] colonists were exposed to [REDACTED]
- The decision was made to seal the caves and begin the "official" colony timeline at what we now call SOL 0
- All participants in the first 200 SOLs were [REDACTED]

This information is the most valuable asset in our possession. It is also the most dangerous. It explains Lazarus. It explains the resurrection ability. It explains why the MCA built their mainframe on top of the caves.

It does not explain Black Rose. Nothing explains Black Rose.

This document is never to be sold. It is never to be copied. It exists in one physical form. If I am compromised, destroy it.

— The Broker`,
    redactions: 5,
  },
  {
    id: "CF-006",
    title: "BLACK ROSE — THE ONLY COMMUNICATION",
    origin: "Unknown — delivered physically to MCA headquarters",
    date: "SOL 2500 (approximate)",
    integrity: "100%",
    content: `[This document was found on the desk of MCA Intelligence Director Yun on the morning of SOL 2500. No security breach was detected. No entry was recorded. The document is handwritten on paper that does not match any manufacturing process on Mars. The ink contains trace amounts of Hollowhead compound — enough to identify but not enough to harm.]

WE ARE NOT YOUR ENEMY.
WE ARE NOT YOUR ALLY.
WE ARE NOT WHAT YOU THINK WE ARE.

WHEN THE TIME COMES, YOU WILL UNDERSTAND.
UNTIL THEN, DO NOT LOOK FOR US.
THOSE WHO LOOK FIND ONLY DEATH.

THIS IS NOT A THREAT.
THIS IS MERCY.

[No signature. No symbol. A single synthetic black rose petal was found beneath the document.]

[ANALYST NOTE: This is the only known communication from Black Rose in the organization's 577-year documented history. Its implications are debated. The phrase "when the time comes" suggests Black Rose is waiting for a specific event. The phrase "we are not what you think we are" suggests they are aware of — and reject — all existing theories about their nature. The Hollowhead trace in the ink may be a signature, a warning, or simply unavoidable contamination from whoever wrote it.]`,
    redactions: 0,
  },
];

export default function ClassifiedFiles() {
  const [selectedFile, setSelectedFile] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);

  if (!accessGranted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="max-w-lg w-full border border-[var(--blood)]/30 bg-[#080808] p-8 text-center">
          <div className="text-[var(--blood)] text-4xl mb-4" style={{ fontFamily: 'Share Tech Mono, monospace' }}>⚠</div>
          <h2 className="text-lg tracking-wider mb-3" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--blood)' }}>
            RESTRICTED ACCESS
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
            The following files contain intercepted communications, recovered documents, and intelligence fragments.
            Classification Level: ULTRAVIOLET. Unauthorized viewing constitutes treason under MCA Security Protocol 7.
          </p>
          <button
            onClick={() => setAccessGranted(true)}
            className="px-6 py-2 border border-[var(--blood)]/60 text-[var(--blood)] text-xs tracking-wider hover:bg-[var(--blood)]/10 transition-all"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            OVERRIDE SECURITY — ACCESS FILES
          </button>
          <p className="text-[9px] mt-4 italic" style={{ color: 'var(--signal-white)', opacity: 0.2 }}>
            Your access has been logged. Signal traced. Connection monitored.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 pt-6">
          <h1 className="text-xl md:text-2xl tracking-wider mb-2" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--blood)' }}>
            CLASSIFIED FILES
          </h1>
          <p className="text-xs" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
            Intercepted documents. Recovered fragments. Intelligence that survived the purge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* File list */}
          <div className="space-y-1">
            {files.map((file, i) => (
              <button
                key={file.id}
                onClick={() => setSelectedFile(i)}
                className={`w-full text-left px-3 py-3 border transition-all duration-200 ${
                  selectedFile === i
                    ? "border-[var(--blood)]/40 bg-[var(--blood)]/5"
                    : "border-[var(--steel)]/20 bg-[#080808] hover:border-[var(--steel)]/40"
                }`}
              >
                <div className="text-[9px] mb-1" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
                  {file.id} — INTEGRITY: {file.integrity}
                </div>
                <div className="text-[10px] tracking-wider" style={{ fontFamily: 'Share Tech Mono, monospace', color: selectedFile === i ? 'var(--blood)' : 'var(--signal-white)', opacity: selectedFile === i ? 1 : 0.7 }}>
                  {file.title}
                </div>
              </button>
            ))}
          </div>

          {/* File content */}
          <div className="border border-[var(--steel)]/20 bg-[#080808] p-6">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="stamp-classified">CLASSIFIED</span>
              <span className="text-[9px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
                {files[selectedFile].id}
              </span>
              {files[selectedFile].redactions > 0 && (
                <span className="text-[9px] text-[var(--blood)]" style={{ fontFamily: 'Courier Prime, monospace' }}>
                  {files[selectedFile].redactions} REDACTION(S)
                </span>
              )}
            </div>

            <h2 className="text-sm tracking-wider mb-1" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--blood)' }}>
              {files[selectedFile].title}
            </h2>

            <div className="flex gap-4 mb-4 text-[9px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.4 }}>
              <span>ORIGIN: {files[selectedFile].origin}</span>
              <span>DATE: {files[selectedFile].date}</span>
            </div>

            <div className="border border-[var(--steel)]/10 p-4 bg-[#0a0a0a]">
              <pre className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--signal-white)', opacity: 0.7 }}>
                {files[selectedFile].content}
              </pre>
            </div>

            <div className="mt-4 text-[9px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.2 }}>
              FILE INTEGRITY: {files[selectedFile].integrity} — RECOVERED FROM DAMAGED PARTITION — SOME DATA MAY BE CORRUPTED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
