# Angular Best Practices

> AI-powered coding rules for Angular 17+ development.

[![npm version](https://badge.fury.io/js/angular-best-practices.svg)](https://www.npmjs.com/package/angular-best-practices)

## Installation

```bash
npx add-skill angular-best-practices
```

## What's Included

**66 rules** across these categories:

| Category | Count | Description |
|----------|-------|-------------|
| TypeScript | 14 | Type safety, patterns, conventions |
| Optimization | 10 | Async, data structures, caching |
| Bundle | 5 | Code splitting, imports, @defer |
| State Management | 4 | Signals, SignalStore, TanStack, NgRx |
| Components | 3 | Patterns, mappers, architecture |
| Data & UI | 7 | Forms, HTTP, dialogs, loading |
| Testing | 7 | Unit, component, E2E, mocking |
| Infrastructure | 6 | Routing, security, a11y, performance |
| Architecture | 2 | Project structure, GraphQL |

## Quick Start

After installation, your AI assistant will automatically apply these rules when:

- Creating new components
- Writing services
- Setting up state management
- Writing tests
- Reviewing code

### Example: Component Creation

```
You: Create a user profile component

AI applies:
- Standalone component (RULES.md)
- Signal inputs: input<User>() (RULES.md)
- Computed for derived state (signals.md)
- OnPush change detection (RULES.md)
- Container/Presentation pattern if needed (components.md)
```

## Rule Format (Strict)

All rules must be **atomic** and follows this strict format to minimize context usage:

```markdown
---
title: Rule Title
impact: HIGH|MEDIUM|LOW
impactDescription: Brief impact description (e.g., "Prevents memory leaks")
tags: tag1, tag2
---

## Rule Title

Context/Explanation (1-2 sentences).

**Incorrect:**
```typescript
// Bad code example
```

**Correct:**
```typescript
// Good code example
```
```

## AGENTS.md Format

The `AGENTS.md` file is the compilation of all rules, designed to be consumed by AI agents. It follows this structure:

1.  **Metadata Header**: Timestamp and generation info.
2.  **Table of Contents**: Auto-generated links to all sections.
3.  **Concatenated Rules**: All rule files merged together, organized by category.

**Constraint**: `AGENTS.md` must be kept under **5000 lines** to preserve context window space. Tutorial-style content is excluded in favor of concise, atomic rules.

## Files

```
angular-best-practices/
├── SKILL.md          # User instructions & prompt
├── AGENTS.md         # Compiled Knowledge Base (Rules)
├── rules/            # Source definition files
│   ├── ts-*.md       # TypeScript rules
│   ├── opt-*.md      # Optimization rules
│   ├── core/         # Angular Core rules
│   └── ...           # Other categories
```

## Customization

Add team-specific rules in `custom/`:

```
custom/
├── our-naming.md
├── our-api-patterns.md
└── patterns/
    └── data-table.md
```

These persist through updates.

## AI Tool Support

| Tool | Output Location |
|------|-----------------|
| Claude Code | `.claude/rules/*.md` |
| Cursor | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |

## Maintenance

To update the compiled rules:

```bash
# Rebuild AGENTS.md
npm run build
```

## Contributing

1. Fork the repo
2. Add/modify rules in `rules/`
3. Run `npm run build` (or `./generate-agents.sh`)
4. Submit PR


## License

MIT
