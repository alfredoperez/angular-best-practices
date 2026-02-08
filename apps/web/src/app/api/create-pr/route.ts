import { auth } from '@/lib/auth'
import { createRulePR } from '@/lib/github'
import { generatedRuleSchema } from '@/lib/schemas'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = generatedRuleSchema.safeParse(body.rule)
  if (!parsed.success) {
    return Response.json(
      { error: 'Invalid rule data', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const githubUsername =
    (session.user as { login?: string }).login ?? session.user.name ?? 'unknown'

  const result = await createRulePR(parsed.data, githubUsername)

  if ('error' in result) {
    return Response.json({ error: result.error }, { status: 500 })
  }

  return Response.json({ url: result.url })
}
