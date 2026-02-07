---
title: Combine Multiple Array Iterations
impact: LOW
impactDescription: reduces iterations over data
tags: arrays, iteration, performance, optimization
---

## Combine Multiple Array Iterations

For large arrays (1000+ items) in hot paths, combine filter/map chains into single iteration. Chaining is fine for small arrays and readability priority.

```typescript
const result: string[] = [];
for (const user of users) {
  if (user.isActive && user.email.endsWith('@company.com')) {
    result.push(user.email);
  }
}
```
