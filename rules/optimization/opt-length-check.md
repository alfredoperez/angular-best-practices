---
title: Check Length Before Iteration
impact: LOW
impactDescription: avoids unnecessary setup
tags: arrays, guards, performance, optimization
---

## Check Length Before Iteration

Check array length before creating objects or iterating to avoid unnecessary setup. In templates, use `@empty` block.

```typescript
if (items.length === 0) return { results: new Map() };
for (const item of items) { results.set(item.id, process(item)); }
```
