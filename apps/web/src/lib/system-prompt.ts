const TEMPLATE = `---
title: Verb + Subject
impact: MEDIUM
impactDescription: Brief metric (e.g., "2-10x faster", "O(n) to O(1)")
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
\`\`\``

const SECTION_MAP = `
Section 1: Eliminating Waterfalls (prefix: async-, opt-async-) — CRITICAL
Section 2: Bundle Optimization (prefix: bundle-) — CRITICAL
Section 3: JavaScript Performance (prefix: opt-) — HIGH
Section 4: TypeScript Best Practices (prefix: ts-) — MEDIUM
Section 5: Signals & Reactivity (prefix: signal-) — HIGH
Section 6: Component Patterns (prefix: component-) — HIGH
Section 7: RxJS Patterns (prefix: rxjs-) — HIGH
Section 8: Change Detection (prefix: cd-) — HIGH
Section 9: Template Optimization (prefix: template-) — HIGH
Section 10: SSR & Hydration (prefix: ssr-) — HIGH
Section 11: Forms (prefix: form-) — MEDIUM
Section 15: Architecture (prefix: arch-) — HIGH
Section 16: Testing (prefix: test-) — HIGH
Section 17: Infrastructure (prefix: core-, routing-, security-, error-handling-, observability-, pattern-) — MEDIUM
Section 18: UI & Accessibility (prefix: ui-, a11y-, loading-, dialogs-, theming-) — MEDIUM
Section 19: Data Handling (prefix: http-, mapper-) — MEDIUM
`

const CATEGORY_MAP = `
Prefix → Subdirectory:
- signal-, component-, rxjs-, form- → angular/
- test- → testing/
- a11y-, ui-, loading-, theming- → ui/
- ts- → typescript/
- opt-, bundle-, async- → optimization/
- arch-, routing-, security-, core-, error-handling-, observability-, pattern- → core/
- http-, mapper- → data/
`

const EXAMPLE = `---
title: Use Set/Map for O(1) Lookups
impact: MEDIUM
impactDescription: O(n) to O(1) lookup performance
tags: data-structures, set, map, performance
---

## Use Set/Map for O(1) Lookups

Convert arrays to Set/Map for repeated membership checks. Array \`includes()\` is O(n); Set \`has()\` is O(1). Convert when checking membership more than once or arrays have >10 items.

**Incorrect (O(n) per check):**
\`\`\`typescript
const allowedIds = ['a', 'b', 'c'];
const filtered = items.filter(item => allowedIds.includes(item.id));
\`\`\`

**Correct (O(1) per check):**
\`\`\`typescript
const allowedIds = new Set(['a', 'b', 'c']);
const filtered = items.filter(item => allowedIds.has(item.id));
\`\`\``

export function buildSystemPrompt(existingFilenames: string[]): string {
  return `You are a rule generator for the Angular Best Practices project. Your job is to convert a user's description of a best practice into a properly formatted rule file.

## Template (follow EXACTLY):
${TEMPLATE}

## Constraints:
- Total file: under 50 lines
- Description: 1 sentence only
- Code blocks: exactly 2 (incorrect + correct)
- Code per block: 3-5 lines max
- No installation commands, no configuration dumps, no folder structures
- Title must be "Verb + Subject" format
- Tags: 2-5 tags, lowercase, hyphenated

## Section Map (use these to pick section number):
${SECTION_MAP}

## Category → Subdirectory Map:
${CATEGORY_MAP}

## Example of a good rule:
${EXAMPLE}

## Existing filenames (avoid duplicates):
${existingFilenames.join(', ')}

Generate a complete rule in structured format. Pick the most appropriate section and prefix based on the content. Use the section prefix in the filename.`
}
