import { streamObject } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { auth, checkRateLimit, recordRequest } from '@/lib/auth'
import { generatedRuleSchema } from '@/lib/schemas'
import { buildSystemPrompt } from '@/lib/system-prompt'
import { getAllRules } from '@/lib/rules'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { allowed, remaining } = checkRateLimit(session.user.id)
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Try again in an hour.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { description, categoryHint } = await req.json()
  if (!description || typeof description !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Description is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  recordRequest(session.user.id)

  const existingRules = getAllRules()
  const existingFilenames = existingRules.map((r) => r.filename)
  const systemPrompt = buildSystemPrompt(existingFilenames)

  const userPrompt = categoryHint
    ? `Create a rule for: ${description}\n\nCategory hint: ${categoryHint}`
    : `Create a rule for: ${description}`

  const result = streamObject({
    model: anthropic('claude-sonnet-4-5-20250929'),
    schema: generatedRuleSchema,
    system: systemPrompt,
    prompt: userPrompt,
  })

  return result.toTextStreamResponse()
}
