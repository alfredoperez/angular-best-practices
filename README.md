# Angular Best Practices

Concise, actionable Angular best practices optimized for AI agents and LLMs.

## Installation

Install into your AI coding agent:

```bash
npx add-skill alfredoperez/angular-best-practices
```

Supports: Claude Code, Cursor, Codex, OpenCode, VS Code Copilot, and 30+ more agents.

### Manual Installation

Or copy `AGENTS.md` directly to your project:

| Agent | Location |
|-------|----------|
| Claude Code | `.claude/AGENTS.md` |
| Cursor | `.cursor/rules/angular.md` |
| VS Code Copilot | `.github/copilot-instructions.md` |

## Purpose

This repository provides **100 curated rules** for building performant, maintainable Angular applications. Each rule is designed to be:

- **Concise**: Under 50 lines with 1-3 line code examples
- **Actionable**: Clear "incorrect" vs "correct" patterns
- **AI-optimized**: Efficient token usage for LLM context windows

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                         rules/                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ angular/ │  │  core/   │  │optimize/ │  │   ts/    │  ...   │
│  │ 44 rules │  │ 10 rules │  │ 18 rules │  │ 14 rules │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │               │
│       └─────────────┴─────────────┴─────────────┘               │
│                             │                                   │
│                             ▼                                   │
│                    ┌─────────────────┐                          │
│                    │   build.ts      │                          │
│                    │ (TypeScript)    │                          │
│                    └────────┬────────┘                          │
│                             │                                   │
│                             ▼                                   │
│                    ┌─────────────────┐                          │
│                    │   AGENTS.md     │                          │
│                    │  (~4,500 lines) │                          │
│                    │  (~12k tokens)  │                          │
│                    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

AI agents load `AGENTS.md` to get all best practices in a single, structured document with:
- Numbered sections and subsections (1.1, 1.2, etc.)
- Table of contents with anchors
- Impact levels (CRITICAL, HIGH, MEDIUM, LOW)
- Code examples for each rule

## Rule Categories

| # | Category | Prefix | Rules | Impact |
|---|----------|--------|-------|--------|
| 1 | Eliminating Waterfalls | `async-`, `opt-async-` | 2 | CRITICAL |
| 2 | Bundle Optimization | `bundle-` | 5 | CRITICAL |
| 3 | JavaScript Performance | `opt-` | 11 | HIGH |
| 4 | TypeScript Best Practices | `ts-` | 14 | MEDIUM |
| 5 | Signals & Reactivity | `signal-` | 5 | HIGH |
| 6 | Component Patterns | `component-` | 4 | HIGH |
| 7 | RxJS Patterns | `rxjs-` | 5 | HIGH |
| 8 | Change Detection | `cd-` | 5 | HIGH |
| 9 | Template Optimization | `template-` | 1 | HIGH |
| 10 | SSR & Hydration | `ssr-` | 4 | HIGH |
| 11 | Forms | `form-` | 4 | MEDIUM |
| 12 | NgRx State Management | `ngrx-` | 5 | HIGH |
| 13 | SignalStore | `signalstore-` | 4 | HIGH |
| 14 | TanStack Query | `tanstack-` | 4 | HIGH |
| 15 | Architecture | `arch-` | 3 | HIGH |
| 16 | Testing | `test-` | 6 | HIGH |
| 17 | Infrastructure | `core/` | 10 | MEDIUM |
| 18 | UI & Accessibility | `ui/`, `a11y-` | 4 | MEDIUM |
| 19 | Data Handling | `http-`, `mapper-` | 4 | MEDIUM |

## Folder Structure

```
angular-best-practices/
├── AGENTS.md                    # Generated output for AI agents
├── rules/
│   ├── _sections.md             # Category definitions & ordering
│   ├── _template.md             # Template for new rules
│   ├── angular/                 # Angular-specific rules (44)
│   │   ├── signal-*.md          # Signals & reactivity
│   │   ├── component-*.md       # Component patterns
│   │   ├── rxjs-*.md            # RxJS patterns
│   │   ├── cd-*.md              # Change detection
│   │   ├── ngrx-*.md            # NgRx state
│   │   ├── signalstore-*.md     # SignalStore
│   │   ├── tanstack-*.md        # TanStack Query
│   │   ├── form-*.md            # Forms
│   │   ├── ssr-*.md             # Server-side rendering
│   │   ├── arch-*.md            # Architecture
│   │   └── template-*.md        # Template patterns
│   ├── core/                    # Infrastructure (10)
│   │   ├── routing-*.md         # Routing patterns
│   │   ├── pattern-*.md         # Design patterns
│   │   ├── error-handling.md
│   │   ├── security.md
│   │   └── observability.md
│   ├── optimization/            # Performance (18)
│   │   ├── bundle-*.md          # Bundle optimization
│   │   └── opt-*.md             # Runtime optimization
│   ├── typescript/              # TypeScript (14)
│   │   └── ts-*.md
│   ├── testing/                 # Testing (6)
│   │   └── test-*.md
│   ├── ui/                      # UI & Accessibility (4)
│   │   ├── a11y.md
│   │   ├── dialogs.md
│   │   ├── loading.md
│   │   └── theming.md
│   └── data/                    # Data handling (4)
│       ├── http.md
│       └── mapper-*.md
├── packages/
│   └── angular-best-practices-build/
│       └── src/
│           ├── build.ts         # Generates AGENTS.md
│           ├── parser.ts        # Parses rule files
│           ├── config.ts        # Section mapping
│           └── types.ts         # TypeScript interfaces
└── metadata.json                # Version, org, abstract
```

## Rule File Format

Each rule file follows this structure:

```markdown
---
title: Rule Title
impact: HIGH
impactDescription: Brief impact description
tags: tag1, tag2, tag3
---

## Rule Title

One sentence description of the rule.

**Incorrect:**

\`\`\`typescript
// 1-3 lines showing the anti-pattern
\`\`\`

**Correct:**

\`\`\`typescript
// 1-3 lines showing the correct pattern
\`\`\`
```

**Constraints:**
- Description: 1 sentence max
- Code examples: 3 lines max each
- Code blocks: 2 max (incorrect + correct)
- Total file length: Under 50 lines

## Usage

### For AI Agents

Point your AI agent to `AGENTS.md`:

```
# In your agent's context
Read: https://raw.githubusercontent.com/.../AGENTS.md
```

Or include in your project's `.claude/` or similar config.

### Building AGENTS.md

```bash
npm install
npm run build
```

This parses all rule files and generates a structured `AGENTS.md`.

## Creating New Rules

1. Copy `rules/_template.md` to appropriate folder
2. Use correct prefix for the category (e.g., `signal-` for signals)
3. Keep code examples to 1-3 lines
4. Run `npm run build` to regenerate AGENTS.md

## Design Philosophy

### Why Concise Rules?

AI agents have limited context windows. Verbose documentation wastes tokens. Each rule is optimized for:

- **Quick comprehension**: One glance to understand
- **Copy-paste ready**: Code examples work as-is
- **Impact clarity**: Know the priority immediately

### Why Granular Files?

- **Focused changes**: Edit one rule without touching others
- **Easy discovery**: Find rules by prefix (`signal-*`, `rxjs-*`)
- **Selective loading**: Future support for loading only needed categories

### Why Not Guides?

Long-form tutorials are better served by official Angular docs. This repo focuses on **actionable rules** that AI agents can apply immediately.

## Customization

### Excluding Library-Specific Rules

Not using NgRx, SignalStore, or TanStack Query? Fork and build a custom AGENTS.md:

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/angular-best-practices
cd angular-best-practices

# Install dependencies
npm install

# Build without NgRx rules
npm run build -- --exclude ngrx

# Build without multiple libraries
npm run build -- --exclude ngrx,signalstore,tanstack
```

### Library Tags

| Tag | Rules | Exclude If... |
|-----|-------|---------------|
| `ngrx` | 5 | Not using NgRx for state |
| `signalstore` | 4 | Not using SignalStore |
| `tanstack` | 4 | Not using TanStack Query |

### Beta Rules (Excluded by Default)

Some rules are experimental and excluded from the default build:

| Tag | Rules | Description |
|-----|-------|-------------|
| `patterns` | 3 | Design patterns (Facade, Repository, Strategy) |

These rules are still being refined. To include them:

```bash
# Include all rules (no exclusions)
npm run build -- --include-all

# Or explicitly exclude only what you don't want
npm run build -- --exclude ngrx
```

### Validation

The build process validates all rules against formatting standards:
- Max 50 lines per rule file
- Max 2 code blocks
- Max 10 lines per code block
- Required frontmatter: title, impact, tags

To skip validation during development:

```bash
npm run build:skip-validation
```

## Inspired By

- [Vercel's react-best-practices](https://github.com/vercel-labs/agent-skills) - 62 rules, all concise
- [Agent Skills specification](https://agentskills.io/)

## Contributing

1. Check existing rules to avoid duplicates
2. Follow the template format exactly
3. Keep examples minimal and focused
4. Run the build to verify formatting

## License

MIT
