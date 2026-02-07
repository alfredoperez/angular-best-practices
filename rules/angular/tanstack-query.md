---
title: Use TanStack Query for Server State
impact: HIGH
impactDescription: Automatic caching, deduplication, background updates
tags: state, tanstack, query, server-state
---

## Use TanStack Query for Server State

Use `injectQuery(() => ({ queryKey, queryFn }))` for data fetched from APIs. TanStack Query handles caching, deduplication, background refetching, and loading/error states automatically. Access data via `query.data()`, `query.isPending()`, `query.isError()`.
