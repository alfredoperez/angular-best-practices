# Angular Tanstack Best Practices

> Use with the core `angular-best-practices` skill.

---

## 1. TanStack Query

**Impact: HIGH** (Server state)

### 1.1 Know When to Use TanStack Query

**Impact: MEDIUM** (Right tool for the job)

Use TanStack Query for server state (data from APIs); use signals for client state (UI state like form dirty, modal open).

**Example:**

```typescript
// Server state → TanStack Query (caching, refetching)
users = injectQuery(() => ({ queryKey: ['users'], queryFn: fetchUsers }));
// Client state → Signals (no caching needed)
formDirty = signal(false);
```

### 1.2 Use Mutations with Cache Invalidation

**Impact: MEDIUM** (Consistent cache, automatic refetch)

Use `injectMutation(() => ({ mutationFn, onSuccess }))` for write operations. Invalidate related queries in `onSuccess` with `queryClient.invalidateQueries({ queryKey })` to keep cache consistent with server state.

### 1.3 Use Query Key Factories

**Impact: MEDIUM** (Consistent invalidation, hierarchical keys)

Define query key factories for consistent key structure and easy hierarchical invalidation.

**Example:**

```typescript
const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
};
// Invalidate all user queries: queryClient.invalidateQueries({ queryKey: userKeys.all })
```

### 1.4 Use TanStack Query for Server State

**Impact: HIGH** (Automatic caching, deduplication, background updates)

Use `injectQuery(() => ({ queryKey, queryFn }))` for data fetched from APIs. TanStack Query handles caching, deduplication, background refetching, and loading/error states automatically. Access data via `query.data()`, `query.isPending()`, `query.isError()`.

---
