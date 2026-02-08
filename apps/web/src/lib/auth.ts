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

// Rate limiting: 5 submissions per hour per user
const rateLimitMap = new Map<string, number[]>()

export function checkRateLimit(userId: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 5

  const timestamps = (rateLimitMap.get(userId) ?? []).filter(
    (t) => now - t < windowMs
  )
  rateLimitMap.set(userId, timestamps)

  if (timestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: maxRequests - timestamps.length }
}

export function recordRequest(userId: string) {
  const timestamps = rateLimitMap.get(userId) ?? []
  timestamps.push(Date.now())
  rateLimitMap.set(userId, timestamps)
}
