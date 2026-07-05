import { useState, useEffect } from "react";

export default function SignalIndicator() {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    const generateBars = () => {
      const newBars = Array.from({ length: 40 }, () => Math.random() * 100);
      setBars(newBars);
    };
    generateBars();
    const interval = setInterval(generateBars, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-6 bg-[#050505]/90 border-t border-[var(--steel)]/10 flex items-end px-4 gap-[1px] z-40 overflow-hidden">
      {bars.map((height, i) => (
        <div
          key={i}
          className="flex-1 transition-all duration-100"
          style={{
            height: `${Math.max(2, height * 0.2)}px`,
            background: height > 80 ? 'var(--phosphor)' : height > 50 ? 'var(--phosphor-dim)' : 'var(--steel)',
            opacity: height > 80 ? 0.8 : height > 50 ? 0.4 : 0.2,
          }}
        />
      ))}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] tracking-wider" style={{ fontFamily: 'Courier Prime, monospace', color: 'var(--phosphor)', opacity: 0.4 }}>
        SIGNAL ACTIVE
      </div>
    </div>
  );
}
