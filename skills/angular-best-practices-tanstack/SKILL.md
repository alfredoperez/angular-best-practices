---
name: angular-best-practices-tanstack
description: >-
  TanStack Query best practices for Angular. Covers query/mutation patterns,
  cache invalidation, and query key factories for server state management.
  Activates when working with @tanstack/angular-query-experimental.
  Install alongside angular-best-practices for full coverage.
license: MIT
metadata:
  author: alfredoperez
  version: "1.1.0"
tags: [angular, tanstack-query, server-state, caching]
globs:
  - "**/*.ts"
  - "**/*.service.ts"
---

# Angular TanStack Query Best Practices

TanStack Query rules for server state with automatic caching, deduplication, and background refetching. Use with the core
[angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
skill for comprehensive Angular coverage.

## Links

- [Core Skill: angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
- [Browse All Skills](https://skills.sh/alfredoperez/angular-best-practices)
- [GitHub Repository](https://github.com/alfredoperez/angular-best-practices)

## When to Apply

- Fetching data from APIs with `injectQuery`
- Performing mutations with cache invalidation
- Structuring query keys for hierarchical invalidation

## Rules

| Rule | Impact | Description |
|------|--------|-------------|
| Know When to Use TanStack Query | MEDIUM | Server state (APIs) vs client state (signals) |
| Use Mutations with Cache Invalidation | MEDIUM | Invalidate related queries on write operations |
| Use Query Key Factories | MEDIUM | Consistent key structure for hierarchical invalidation |
| Use TanStack Query for Server State | HIGH | Automatic caching, deduplication, and background updates |

## Install

Core skill (recommended):
`npx skills add alfredoperez/angular-best-practices --skill angular-best-practices`

This add-on:
`npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-tanstack`

Browse all skills: [skills.sh/alfredoperez/angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices)
