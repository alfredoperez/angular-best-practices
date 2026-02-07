# Angular Best Practices

This repository contains Angular best practice rules for AI agent consumption.

## Project Structure

```
rules/                    # Rule files organized by category
  angular/                # Angular-specific rules
  core/                   # Architecture, components, routing
  data/                   # Forms, HTTP, mappers
  optimization/           # Performance rules
  testing/                # Testing patterns
  typescript/             # TypeScript patterns
  ui/                     # Accessibility, theming
  _template.md            # Template for new rules
  _sections.md            # Category definitions
skills/                   # Optional library skill outputs (generated)
  angular-best-practices-ngrx/
  angular-best-practices-signalstore/
  angular-best-practices-tanstack/
packages/                 # Build tooling
  angular-best-practices-build/
```

## Rule File Standards

Rules must be **concise** for efficient AI context usage:

- **Description:** 1 sentence max
- **Code examples:** 3 lines max each
- **Code blocks:** 2 max (incorrect + correct)
- **Total length:** Under 50 lines

See `.claude/skills/rules-reviewer/SKILL.md` for the full review criteria.

## Available Skills

### rules-reviewer

Reviews and audits rule files for compliance with formatting standards.

Usage:
- "Review rules/typescript/ts-readonly.md"
- "Audit all rules for code example length"
- "Rewrite architecture.md to be concise"

## Creating New Rules

1. Copy `rules/_template.md`
2. Follow the format exactly
3. Keep code examples to 1-3 lines
4. Run rules-reviewer to validate

## Optional Library Skills

Library-specific rules (NgRx, SignalStore, TanStack Query) are split into separate installable skills so users only get what they need.

**Config:** `packages/angular-best-practices-build/src/config.ts` — `OPTIONAL_SKILLS` array defines which sections become separate skills.

**Build:** `npm run build` generates:
- `AGENTS.md` — core rules (everything except optional sections)
- `skills/<name>/AGENTS.md` — one per optional skill

**Adding a new optional skill:**
1. Add entry to `OPTIONAL_SKILLS` in `config.ts`
2. Create `skills/<name>/SKILL.md` with frontmatter
3. Run `npm run build`

## Inspired By

- [Vercel's react-best-practices](https://github.com/vercel-labs/agent-skills) - 57 rules, all concise
- [Agent Skills specification](https://agentskills.io/)
