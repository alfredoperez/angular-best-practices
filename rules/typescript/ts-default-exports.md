---
title: Avoid Default Exports
impact: LOW
impactDescription: Better refactoring, consistent imports
tags: typescript, exports, modules
---

## Avoid Default Exports

Use `export class UserService` instead of `export default class UserService`.

Named exports enforce consistent import names across the codebase and enable better IDE refactoring support. Default exports allow arbitrary names like `import Whatever from './user.service'`.
