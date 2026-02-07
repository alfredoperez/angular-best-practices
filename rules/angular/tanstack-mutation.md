---
title: Use Mutations with Cache Invalidation
impact: MEDIUM
impactDescription: Consistent cache, automatic refetch
tags: state, tanstack, mutation
---

## Use Mutations with Cache Invalidation

Use `injectMutation(() => ({ mutationFn, onSuccess }))` for write operations. Invalidate related queries in `onSuccess` with `queryClient.invalidateQueries({ queryKey })` to keep cache consistent with server state.
