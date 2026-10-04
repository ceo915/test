export function Waveform({ bars = 25 }: { bars?: number }) {
  return (
    <div className="flex h-20 items-center justify-center gap-[5px]" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => {
        const mid = (bars - 1) / 2
        const envelope = 1 - Math.abs(i - mid) / (mid + 2) // taller in the middle
        return (
          <span
            key={i}
            className="w-1.5 origin-center animate-bar rounded-pill bg-coral"
            style={{
              height: `${24 + envelope * 56}px`,
              animationDuration: `${0.8 + ((i * 37) % 7) * 0.12}s`,
              animationDelay: `${-((i * 53) % 10) * 0.11}s`,
              opacity: 0.45 + envelope * 0.55,
            }}
          />
        )
      })}
    </div>
  )
}
