import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Angular Best Practices',
  description:
    'Concise, actionable Angular best practices optimized for AI agents and LLMs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className={`${GeistMono.className} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t border-border py-8 text-center text-sm text-text-dim">
            <div className="mx-auto max-w-5xl px-6">
              Built for AI agents &middot; Inspired by{' '}
              <a
                href="https://agentskills.io"
                className="text-text-muted hover:text-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                agentskills.io
              </a>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
