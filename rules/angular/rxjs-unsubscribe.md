---
title: Always Unsubscribe from Observables
impact: HIGH
impactDescription: Prevents memory leaks
tags: rxjs, subscriptions, memory
---

## Always Unsubscribe from Observables

Use `toSignal()` (auto-unsubscribes) or `takeUntilDestroyed()` to prevent memory leaks from long-lived subscriptions.

```typescript
data = toSignal(this.data$); // Auto-unsubscribes
// OR
this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
```
