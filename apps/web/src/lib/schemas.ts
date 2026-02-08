import { z } from 'zod'

export const generatedRuleSchema = z.object({
  filename: z
    .string()
    .describe('Rule filename, e.g. "signal-query-result.md". Use kebab-case with the section prefix.'),
  category: z
    .string()
    .describe('Subdirectory under rules/, e.g. "angular", "typescript", "testing"'),
  section: z
    .number()
    .min(1)
    .max(19)
    .describe('Section number 1-19 from the section map'),
  frontmatter: z.object({
    title: z.string().describe('Verb + Subject format, e.g. "Use Set/Map for O(1) Lookups"'),
    impact: z.enum(['CRITICAL', 'HIGH', 'MEDIUM-HIGH', 'MEDIUM', 'LOW-MEDIUM', 'LOW']),
    impactDescription: z
      .string()
      .describe('Brief metric, e.g. "2-10x faster", "O(n) to O(1)"'),
    tags: z.array(z.string()).min(2).max(5),
  }),
  body: z
    .string()
    .describe(
      'Markdown body: ## heading, one-sentence description, **Incorrect:** code block, **Correct:** code block'
    ),
  reasoning: z
    .string()
    .describe('Why you chose this category, impact level, and filename'),
})

export type GeneratedRule = z.infer<typeof generatedRuleSchema>

export function ruleToMarkdown(rule: GeneratedRule): string {
  const { frontmatter, body } = rule
  return `---
title: ${frontmatter.title}
impact: ${frontmatter.impact}
impactDescription: ${frontmatter.impactDescription}
tags: ${frontmatter.tags.join(', ')}
---

${body}
`
}
