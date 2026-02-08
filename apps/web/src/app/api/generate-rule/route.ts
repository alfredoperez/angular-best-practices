import { streamObject } from 'ai'
import { google } from '@ai-sdk/google'
import { auth, checkRateLimit, recordRequest } from '@/lib/auth'
import { generatedRuleSchema } from '@/lib/schemas'
import { buildSystemPrompt } from '@/lib/system-prompt'
import { getAllRules } from '@/lib/rules'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { allowed, remaining } = checkRateLimit(session.user.id)
  if (!allowed) {
    return Response.json(
      { error: 'Rate limit reached. You can generate up to 3 rules per day.' },
      { status: 429 }
    )
  }

  const { description, categoryHint } = await req.json()
  if (!description || typeof description !== 'string') {
    return Response.json({ error: 'Description is required' }, { status: 400 })
  }

  recordRequest(session.user.id)

  const existingRules = getAllRules()
  const existingFilenames = existingRules.map((r) => r.filename)
  const systemPrompt = buildSystemPrompt(existingFilenames)

  const userPrompt = categoryHint
    ? `Create a rule for: ${description}\n\nCategory hint: ${categoryHint}`
    : `Create a rule for: ${description}`

  try {
    const result = streamObject({
      model: google('gemini-2.0-flash'),
      schema: generatedRuleSchema,
      system: systemPrompt,
      prompt: userPrompt,
      mode: 'json',
    })

    return result.toTextStreamResponse()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI generation failed'
    return Response.json({ error: message }, { status: 502 })
  }
}
