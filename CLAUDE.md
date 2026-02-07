# Angular Best Practices

This repository contains Angular best practice rules for AI agent consumption.

## Project Structure

```
rules/                    # Rule files organized by category
  core/                   # Architecture, components, routing
  typescript/             # TypeScript patterns
  optimization/           # Performance rules
  testing/                # Testing patterns
  state/                  # State management
  data/                   # Forms, HTTP, mappers
  ui/                     # Accessibility, theming
  _template.md            # Template for new rules
  _sections.md            # Category definitions
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

## Inspired By

- [Vercel's react-best-practices](https://github.com/vercel-labs/agent-skills) - 57 rules, all concise
- [Agent Skills specification](https://agentskills.io/)
