'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-wider text-text">
          <Image src="/angular-logo.png" alt="" width={24} height={24} />
          Angular Best Practices
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/browse"
            className={`text-sm transition-colors ${
              pathname === '/browse'
                ? 'text-text'
                : 'text-text-muted hover:text-text'
            }`}
          >
            Browse
          </Link>
          <Link
            href="/submit"
            className={`text-sm transition-colors ${
              pathname === '/submit'
                ? 'text-text'
                : 'text-text-muted hover:text-text'
            }`}
          >
            Submit
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              {session.user?.name ?? 'Sign out'}
            </button>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
