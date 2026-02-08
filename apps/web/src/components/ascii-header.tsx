import Image from 'next/image'

export function AsciiHeader() {
  return (
    <div className="scanlines scanline-move relative flex flex-col items-center gap-6 py-8"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
      }}
    >
      <div className="glitch-image" aria-label="Angular Best Practices" role="img">
        <Image
          src="/angular-wordmark.png"
          alt="Angular Best Practices"
          width={600}
          height={188}
          className="max-w-[min(600px,80vw)] h-auto"
          priority
        />
      </div>
      <p className="text-sm tracking-wide text-text-muted">
        for AI agents &amp; LLMs
      </p>
    </div>
  )
}
