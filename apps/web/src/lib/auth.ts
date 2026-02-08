import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_APP_ID,
      clientSecret: process.env.GITHUB_APP_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      if (token.login) {
        (session.user as { login?: string }).login = token.login as string
      }
      return session
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.login = (profile as { login?: string }).login
      }
      return token
    },
  },
})

// Rate limiting: 3 per user per day, 20 global per day
const rateLimitMap = new Map<string, number[]>()
const globalTimestamps: number[] = []

const WINDOW_MS = 24 * 60 * 60 * 1000 // 24 hours
const MAX_PER_USER = 3
const MAX_GLOBAL = 20

function pruneTimestamps(timestamps: number[], now: number): number[] {
  return timestamps.filter((t) => now - t < WINDOW_MS)
}

export function checkRateLimit(userId: string): { allowed: boolean; remaining: number } {
  const now = Date.now()

  // Global limit
  const prunedGlobal = pruneTimestamps(globalTimestamps, now)
  globalTimestamps.length = 0
  globalTimestamps.push(...prunedGlobal)
  if (prunedGlobal.length >= MAX_GLOBAL) {
    return { allowed: false, remaining: 0 }
  }

  // Per-user limit
  const timestamps = pruneTimestamps(rateLimitMap.get(userId) ?? [], now)
  rateLimitMap.set(userId, timestamps)

  if (timestamps.length >= MAX_PER_USER) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: MAX_PER_USER - timestamps.length }
}

export function recordRequest(userId: string) {
  const now = Date.now()
  const timestamps = rateLimitMap.get(userId) ?? []
  timestamps.push(now)
  rateLimitMap.set(userId, timestamps)
  globalTimestamps.push(now)
}
