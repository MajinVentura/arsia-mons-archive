import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-4 phosphor-glow" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--phosphor)' }}>
          404
        </div>
        <h1 className="text-lg tracking-wider mb-3" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--blood)' }}>
          SIGNAL LOST — DATA NOT FOUND
        </h1>
        <p className="text-xs mb-6" style={{ color: 'var(--signal-white)', opacity: 0.4 }}>
          The requested file has been purged, corrupted, or never existed.
          This sector of the archive contains no recoverable data.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 border border-[var(--phosphor)]/40 text-[var(--phosphor)] text-xs tracking-wider hover:bg-[var(--phosphor)]/10 transition-all"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
          RETURN TO SIGNAL ORIGIN
        </Link>
        <div className="mt-8 text-[9px]" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--signal-white)', opacity: 0.15 }}>
          ERROR CODE: MCA-7-PURGE-COMPLETE // NO RECOVERY POSSIBLE
        </div>
      </div>
    </div>
  );
}
