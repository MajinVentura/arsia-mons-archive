import { useState, useEffect } from "react";
import { Link } from "wouter";

const bootSequence = [
  "INITIALIZING SECURE CONNECTION...",
  "ROUTING THROUGH PROXY NODE: PHOBOS-7",
  "HANDSHAKE COMPLETE — ENCRYPTION: AES-512-MARS",
  "ACCESSING ARCHIVED DATA PARTITION...",
  "WARNING: FILE INTEGRITY AT 73%",
  "RECOVERED RECORDS: 2,847 OF ~4,100 ESTIMATED",
  "SIGNAL ACQUIRED — ARCHIVE ONLINE",
];

const agencyLinks = [
  { id: "noxis", name: "NOXIS", color: "var(--noxis-blue)", desc: "Oxygen monopoly. Corporate tyranny." },
  { id: "static", name: "STATIC", color: "var(--static-cyan)", desc: "Hackers. Satellite networks. Rebellion." },
  { id: "caliber", name: "CALIBER", color: "var(--caliber-brass)", desc: "Information brokers. Money. Leverage." },
  { id: "lazarus", name: "LAZARUS", color: "var(--lazarus-gold)", desc: "Resurrection cult. Pre-colonial mystery." },
  { id: "blackrose", name: "BLACK ROSE", color: "var(--corruption)", desc: "Stealth. Poison. Identity erasure." },
];

export default function Home() {
  // Check if boot sequence has already played this session
  const hasBooted = sessionStorage.getItem("arsia-boot-complete") === "true";

  const [bootIndex, setBootIndex] = useState(hasBooted ? bootSequence.length : 0);
  const [bootComplete, setBootComplete] = useState(hasBooted);
  const [showContent, setShowContent] = useState(hasBooted);

  useEffect(() => {
    if (hasBooted) return; // Skip animation if already played
    if (bootIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootIndex(bootIndex + 1);
      }, 400 + Math.random() * 300);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setBootComplete(true);
        sessionStorage.setItem("arsia-boot-complete", "true");
      }, 500);
      setTimeout(() => setShowContent(true), 800);
    }
  }, [bootIndex, hasBooted]);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-8">
      {/* Boot sequence — only shows on first visit */}
      {!hasBooted && (
        <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${bootComplete ? 'opacity-30' : 'opacity-100'}`}>
          <div className="mb-8 p-4 border border-[var(--steel)]/30">
            {bootSequence.slice(0, bootIndex).map((line, i) => (
              <div
                key={i}
                className="text-xs mb-1"
                style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  color: i === bootSequence.length - 1 ? 'var(--phosphor)' : 'var(--signal-white)',
                  opacity: i === bootSequence.length - 1 ? 1 : 0.5,
                }}
              >
                <span className="text-[var(--phosphor)]/40 mr-2">&gt;</span>
                {line}
              </div>
            ))}
            {bootIndex < bootSequence.length && (
              <span className="inline-block w-2 h-4 bg-[var(--phosphor)] animate-pulse" />
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Hero section */}
        <div className="relative w-full max-w-7xl mx-auto mb-12">
          <div className="relative overflow-hidden border border-[var(--phosphor)]/20">
            <img
              src="/assets/hero-terminal_622699e9.png"
              alt="Arsia Mons Terminal"
              className="w-full h-[300px] md:h-[400px] object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <h1
                className="text-3xl md:text-5xl font-bold mb-3 phosphor-glow tracking-wider"
                style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}
              >
                ARSIA MONS ARCHIVE
              </h1>
              <p className="text-sm md:text-base max-w-xl" style={{ color: 'var(--signal-white)', opacity: 0.7 }}>
                Recovered intelligence records from the Martian Colonial Authority purge.
                Classification Level: ULTRAVIOLET. Unauthorized access will be traced.
              </p>
              <div className="mt-4 flex gap-3">
                <span className="stamp-classified">ULTRAVIOLET CLEARANCE</span>
                <span className="stamp-canon">RECOVERED DATA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agency grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[var(--phosphor)]/40" />
            <h2
              className="text-sm tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}
            >
              AGENCY DOSSIERS — SELECT TARGET
            </h2>
            <div className="flex-1 h-px bg-[var(--phosphor)]/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {agencyLinks.map((agency) => (
              <Link
                key={agency.id}
                href={`/agency/${agency.id}`}
                className="group relative border border-[var(--steel)]/40 p-4 hover:border-opacity-100 transition-all duration-300 bg-[#080808] overflow-hidden"
                style={{ borderColor: `${agency.color}30` }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-0.5 transition-all duration-300 group-hover:opacity-100 opacity-40"
                  style={{ background: agency.color }}
                />
                <div className="relative z-10">
                  <h3
                    className="text-xs font-bold tracking-wider mb-2"
                    style={{ fontFamily: 'Share Tech Mono, monospace', color: agency.color }}
                  >
                    {agency.name}
                  </h3>
                  <p className="text-[10px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.5 }}>
                    {agency.desc}
                  </p>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ background: agency.color }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick access grid — now includes Sector Map */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <Link href="/timeline" className="group border border-[var(--steel)]/30 p-5 hover:border-[var(--amber)]/40 transition-all duration-300 bg-[#080808]">
            <div className="text-[9px] text-[var(--amber)]/60 mb-2" style={{ fontFamily: 'Courier Prime, monospace' }}>FREQ 88.7MHz</div>
            <h3 className="text-sm tracking-wider mb-2 group-hover:text-[var(--amber)] transition-colors" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
              COLONY TIMELINE
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
              From founding to collapse. 847 recovered temporal records.
            </p>
          </Link>

          <Link href="/equipment" className="group border border-[var(--steel)]/30 p-5 hover:border-[var(--phosphor)]/40 transition-all duration-300 bg-[#080808]">
            <div className="text-[9px] text-[var(--phosphor)]/60 mb-2" style={{ fontFamily: 'Courier Prime, monospace' }}>FREQ 112.4MHz</div>
            <h3 className="text-sm tracking-wider mb-2 group-hover:text-[var(--phosphor)] transition-colors" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
              WEAPONS REGISTRY
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
              Classified armament database. Authorization required.
            </p>
          </Link>

          <Link href="/districts" className="group border border-[var(--steel)]/30 p-5 hover:border-[var(--static-cyan)]/40 transition-all duration-300 bg-[#080808]">
            <div className="text-[9px] text-[var(--static-cyan)]/60 mb-2" style={{ fontFamily: 'Courier Prime, monospace' }}>FREQ 156.9MHz</div>
            <h3 className="text-sm tracking-wider mb-2 group-hover:text-[var(--static-cyan)] transition-colors" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
              SECTOR MAP
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
              Colony district intelligence. Territorial control analysis.
            </p>
          </Link>

          <Link href="/conspiracies" className="group border border-[var(--steel)]/30 p-5 hover:border-[var(--blood)]/40 transition-all duration-300 bg-[#080808]">
            <div className="text-[9px] text-[var(--blood)]/60 mb-2" style={{ fontFamily: 'Courier Prime, monospace' }}>FREQ 203.1MHz</div>
            <h3 className="text-sm tracking-wider mb-2 group-hover:text-[var(--blood)] transition-colors" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--signal-white)' }}>
              CONSPIRACY THREADS
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
              Unresolved. Unsettling. Cross-referenced anomalies.
            </p>
          </Link>
        </div>

        {/* Archive status */}
        <div className="max-w-7xl mx-auto border-t border-[var(--steel)]/20 pt-6">
          <div className="flex flex-wrap gap-6 text-[10px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.3 }}>
            <span>ARCHIVE STATUS: PARTIALLY RECOVERED</span>
            <span>INTEGRITY: 73.2%</span>
            <span>LAST SYNC: SOL 2847.14</span>
            <span>ORIGIN: MCA-SECTOR-7-MAINFRAME</span>
            <span className="text-[var(--blood)]">PURGE DETECTED: SOL 2844</span>
          </div>
        </div>
      </div>
    </div>
  );
}
