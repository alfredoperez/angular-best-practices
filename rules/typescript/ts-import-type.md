---
title: Use import type for Type-Only Imports
impact: LOW
impactDescription: Smaller bundles, cleaner transpilation
tags: typescript, imports, bundle
---

## Use import type for Type-Only Imports

Use `import type { User } from './user'` instead of `import { type User } from './user'`.

The `import type` syntax is completely erased at transpilation, while inline `type` may leave an empty import that still executes the module's side effects.
