import { useEffect, useState } from 'react';

const colors = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626', '#EC4899'];

export function ConfettiBurst({ trigger, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const count = 12;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      angle: (360 / count) * i + Math.random() * 20,
      color: colors[i % colors.length],
      distance: 60 + Math.random() * 40,
      delay: i * 20,
    }));
    setParticles(newParticles);
    const t = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 700);
    return () => clearTimeout(t);
  }, [trigger, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[90]" aria-hidden>
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <div
            key={p.id}
            className="absolute w-2 h-2 rounded-full left-1/2 top-1/2 confetti-dot"
            style={{
              backgroundColor: p.color,
              animation: `confettiFly 0.6s ease-out ${p.delay}ms forwards`,
              '--tx': `${tx}px`,
              '--ty': `${ty}px`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFly {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); }
        }
      `}</style>
    </div>
  );
}
