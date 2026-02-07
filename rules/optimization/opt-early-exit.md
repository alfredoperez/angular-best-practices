---
title: Early Return from Functions
impact: LOW
impactDescription: Avoids unnecessary computation
tags: functions, optimization, early-return, guards
---

## Early Return from Functions

Return early when result is determined. Use `find()` instead of `filter()[0]`. Use `some()`/`every()` instead of `filter().length`.

```typescript
if (!order) return { error: 'No order' };
if (!user) return { error: 'No user' };
return calculateTotal(order, user);
```
