'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/submit'

  return (
    <div className="mx-auto max-w-md px-6 py-32 text-center space-y-8">
      <div className="space-y-3">
        <h1 className="text-lg font-medium text-text">Sign In</h1>
        <p className="text-sm text-text-muted">
          Sign in with GitHub to submit new rules. Your GitHub username will be
          attributed on the pull request.
        </p>
      </div>

      <button
        onClick={() => signIn('github', { callbackUrl })}
        className="inline-flex items-center gap-2 rounded border border-border bg-bg-card px-6 py-2.5 text-sm text-text hover:border-border-bright transition-colors"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Sign in with GitHub
      </button>

      <p className="text-xs text-text-dim">
        We only request read access to your public profile.
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
