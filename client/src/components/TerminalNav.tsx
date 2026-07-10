import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useAmbientMusic, useNavSound } from "@/hooks/useAudio";

const frequencies = [
  { id: "home", label: "SIGNAL_ORIGIN", path: "/", freq: "0.001" },
  { id: "agencies", label: "AGENCY_DOSSIERS", path: "/agency/noxis", freq: "47.3" },
  { id: "timeline", label: "COLONY_TIMELINE", path: "/timeline", freq: "88.7" },
  { id: "equipment", label: "WEAPONS_REGISTRY", path: "/equipment", freq: "112.4" },
  { id: "districts", label: "SECTOR_MAP", path: "/districts", freq: "156.9" },
  { id: "conspiracies", label: "CONSPIRACY_THREADS", path: "/conspiracies", freq: "203.1" },
  { id: "classified", label: "CLASSIFIED_FILES", path: "/classified", freq: "∞" },
];

export default function TerminalNav() {
  const [location] = useLocation();
  const [signalStrength, setSignalStrength] = useState(87);
  const [timestamp, setTimestamp] = useState("");
  const { isPlaying, toggle } = useAmbientMusic();
  const { playNavSound } = useNavSound();

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * 15) + 78);
      const now = new Date();
      const marsDate = `SOL ${Math.floor(Math.random() * 900) + 2100}`;
      setTimestamp(`${marsDate} // ${now.toISOString().slice(11, 19)} UTC`);
    }, 3000);
    setTimestamp(`SOL 2847 // ${new Date().toISOString().slice(11, 19)} UTC`);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path.split("/").slice(0, 2).join("/"));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-sm border-b border-[var(--phosphor)]/20">
      {/* Top status bar */}
      <div className="flex items-center justify-between px-4 py-1 border-b border-[var(--steel)]/30 text-[10px] font-[var(--font-stamp)]" style={{ fontFamily: 'Courier Prime, monospace' }}>
        <div className="flex items-center gap-4">
          <span className="text-[var(--phosphor)]/60">ARSIA_MONS_ARCHIVE v0.7.3</span>
          <span className="text-[var(--amber)]/60">SIGNAL: {signalStrength}%</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Ambient music toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-2 py-0.5 border border-[var(--steel)]/30 hover:border-[var(--phosphor)]/40 transition-colors"
            title={isPlaying ? "Mute lobby music" : "Play lobby music (CLOSER2)"}
          >
            <span className={`text-[9px] tracking-wider ${isPlaying ? 'text-[var(--phosphor)]' : 'text-[var(--signal-white)]/40'}`}>
              {isPlaying ? '♫ AUDIO ON' : '♫ AUDIO OFF'}
            </span>
            {isPlaying && (
              <span className="flex gap-[2px]">
                <span className="w-[2px] h-[8px] bg-[var(--phosphor)] animate-pulse" style={{ animationDelay: '0ms' }} />
                <span className="w-[2px] h-[6px] bg-[var(--phosphor)] animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-[2px] h-[10px] bg-[var(--phosphor)] animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </button>
          <span className="text-[var(--blood)]">■ CLASSIFIED</span>
          <span className="text-[var(--signal-white)]/40">{timestamp}</span>
        </div>
      </div>

      {/* Frequency navigation */}
      <div className="flex items-center gap-0 overflow-x-auto px-2 py-0">
        <div className="flex items-center mr-3 pl-2">
          <img src="/assets/logo-icon_ee83a0d3.png" alt="Archive" className="w-6 h-6 opacity-80" />
        </div>
        {frequencies.map((freq) => (
          <Link
            key={freq.id}
            href={freq.path}
            onClick={() => playNavSound(freq.id)}
            className={`
              relative px-3 py-2 text-[11px] tracking-wider whitespace-nowrap transition-all duration-200
              font-[var(--font-display)] uppercase
              ${isActive(freq.path) 
                ? "text-[var(--phosphor)] bg-[var(--phosphor)]/5 border-b-2 border-[var(--phosphor)]" 
                : "text-[var(--signal-white)]/50 hover:text-[var(--phosphor)]/80 hover:bg-[var(--phosphor)]/3 border-b-2 border-transparent"
              }
            `}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            <span className="text-[var(--muted-foreground)] mr-1 text-[9px]">{freq.freq}MHz</span>
            {freq.label}
            {isActive(freq.path) && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--phosphor)] animate-pulse" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
