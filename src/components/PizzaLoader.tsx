import { useEffect, useState } from "react";

export function PizzaLoader() {
  const [activeSlice, setActiveSlice] = useState(0);
  const totalSlices = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlice((prev) => (prev + 1) % totalSlices);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative size-32 drop-shadow-2xl">
        <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
          {/* Base crust */}
          <circle cx="50" cy="50" r="48" fill="#e2a74c" />
          {/* Base cheese */}
          <circle cx="50" cy="50" r="42" fill="#ffd54f" />
          
          {Array.from({ length: totalSlices }).map((_, i) => {
            const angle = (360 / totalSlices) * i;
            const nextAngle = (360 / totalSlices) * (i + 1);
            
            // The slice path: start at center, go to edge, arc, go back to center
            const x1 = 50 + 48 * Math.cos((angle * Math.PI) / 180);
            const y1 = 50 + 48 * Math.sin((angle * Math.PI) / 180);
            const x2 = 50 + 48 * Math.cos((nextAngle * Math.PI) / 180);
            const y2 = 50 + 48 * Math.sin((nextAngle * Math.PI) / 180);
            
            // The slice is missing if it's the active slice
            const isMissing = i === activeSlice;
            
            return (
              <g key={i} className="transition-all duration-75" style={{ opacity: isMissing ? 0 : 1, transform: isMissing ? `scale(0.8)` : `scale(1)`, transformOrigin: '50px 50px' }}>
                <path d={`M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`} fill="transparent" stroke="#d49539" strokeWidth="2" />
                {/* Pepperoni 1 */}
                <circle
                  cx={50 + 20 * Math.cos(((angle + 15) * Math.PI) / 180)}
                  cy={50 + 20 * Math.sin(((angle + 15) * Math.PI) / 180)}
                  r="5"
                  fill="#c93c3c"
                />
                {/* Pepperoni 2 */}
                <circle
                  cx={50 + 32 * Math.cos(((angle + 40) * Math.PI) / 180)}
                  cy={50 + 32 * Math.sin(((angle + 40) * Math.PI) / 180)}
                  r="4"
                  fill="#c93c3c"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <h2 className="mt-10 text-2xl font-black text-primary animate-pulse">
        جاري تحضير البيتزا...
      </h2>
    </div>
  );
}
