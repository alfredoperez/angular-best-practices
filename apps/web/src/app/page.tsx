import Link from 'next/link'
import { AsciiHeader } from '@/components/ascii-header'
import { CommandBuilder } from '@/components/command-builder'
import { ImpactBadge } from '@/components/impact-badge'
import { sections } from '@/lib/sections-data'

export default function HomePage() {
  const totalRules = sections.reduce((sum, s) => sum + s.ruleCount, 0)

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-4">
        <AsciiHeader />
        <p className="text-text-muted text-sm max-w-xl mx-auto">
          Concise, actionable Angular best practices optimized for AI agents and
          LLMs. {totalRules} rules across {sections.length} categories, each
          under 50 lines.
        </p>
      </section>

      {/* Command Builder */}
      <CommandBuilder />

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-text">How It Works</h2>
        <div className="terminal-box glitch-border p-4">
          <pre className="text-xs text-text-muted leading-relaxed overflow-x-auto">
{`  rules/*.md          →  build system  →  AGENTS.md
  (granular files)       (validate &      (single file per skill,
                          concatenate)     consumed by AI agents)

  Install via:  npx skills add alfredoperez/angular-best-practices
  Agents read:  AGENTS.md at the project root
  Format:       Each rule is < 50 lines, 2 code blocks max`}
          </pre>
        </div>
        <p className="text-xs text-text-muted">
          Rules are stored as individual markdown files, validated for
          conciseness, then compiled into a single AGENTS.md that AI coding
          assistants (Claude Code, Cursor, VS Code Copilot) read at the project
          root.
        </p>
      </section>

      {/* Rule Categories */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-text">
          Rule Categories
        </h2>
        <div className="space-y-1">
          {sections.map((section) => (
            <div
              key={section.number}
              className="flex items-center gap-4 rounded border border-border bg-bg-card px-4 py-3 text-sm hover:border-border-bright transition-colors"
            >
              <span className="w-6 text-text-muted text-right">
                {section.number}
              </span>
              <span className="flex-1 text-text">{section.title}</span>
              <span className="text-xs text-text-muted hidden sm:inline">
                {section.prefix}
              </span>
              <span className="w-8 text-right text-xs text-text-muted">
                {section.ruleCount}
              </span>
              <ImpactBadge impact={section.impact} />
            </div>
          ))}
        </div>
      </section>

      {/* Rule Format */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-text">Rule Format</h2>
        <div className="terminal-box glitch-border p-4">
          <pre className="text-xs text-text-muted leading-relaxed overflow-x-auto">
{`---
title: Verb + Subject
impact: MEDIUM
impactDescription: Brief metric
tags: tag1, tag2
---

## Verb + Subject

One sentence explaining the rule.

**Incorrect:**
\`\`\`typescript
// 3-5 lines max
\`\`\`

**Correct:**
\`\`\`typescript
// 3-5 lines max
\`\`\``}
          </pre>
        </div>
        <p className="text-xs text-text-muted">
          Every rule follows this template: frontmatter with impact metadata,
          one-sentence description, and at most two code blocks (incorrect +
          correct). Total file length must be under 50 lines.
        </p>
      </section>

      {/* Design Philosophy */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-text">
          Design Philosophy
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded border border-border bg-bg-card p-4 space-y-2">
            <p className="text-sm text-text">Concise</p>
            <p className="text-xs text-text-muted">
              Each rule is under 50 lines. AI context windows are expensive —
              every token must earn its place.
            </p>
          </div>
          <div className="rounded border border-border bg-bg-card p-4 space-y-2">
            <p className="text-sm text-text">Granular</p>
            <p className="text-xs text-text-muted">
              One file per rule. Easy to add, review, and maintain. No monolithic
              guides.
            </p>
          </div>
          <div className="rounded border border-border bg-bg-card p-4 space-y-2">
            <p className="text-sm text-text">Actionable</p>
            <p className="text-xs text-text-muted">
              Incorrect → Correct patterns. AI agents can apply these rules
              directly to code without interpretation.
            </p>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/submit"
          className="rounded border border-accent bg-accent/15 px-6 py-2.5 text-sm font-medium text-accent hover:bg-accent/25 transition-colors"
        >
          Submit a Rule
        </Link>
        <Link
          href="/browse"
          className="rounded border border-border-bright px-6 py-2.5 text-sm text-text-muted hover:border-border-bright hover:text-text transition-colors"
        >
          Browse All Rules
        </Link>
      </section>

      {/* Supported Agents */}
      <section className="space-y-4 text-center">
        <h2 className="text-sm font-medium text-text">
          Works With
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
          <span className="rounded border border-border-bright px-3 py-1.5">
            Claude Code
          </span>
          <span className="rounded border border-border-bright px-3 py-1.5">
            Cursor
          </span>
          <span className="rounded border border-border-bright px-3 py-1.5">
            VS Code Copilot
          </span>
          <span className="rounded border border-border-bright px-3 py-1.5">
            Windsurf
          </span>
          <span className="rounded border border-border-bright px-3 py-1.5">
            Any AGENTS.md-compatible agent
          </span>
        </div>
      </section>
    </div>
  )
}
