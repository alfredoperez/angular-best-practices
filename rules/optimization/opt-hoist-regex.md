---
title: Hoist RegExp Out of Loops
impact: LOW
impactDescription: avoids regex recompilation
tags: regex, loops, performance, optimization
---

## Hoist RegExp Out of Loops

Define regex outside loops to avoid recompilation. In services, define as class properties. Note: global regex (`/g`) maintains state via `lastIndex`.

```typescript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
for (const email of emails) {
  if (!EMAIL_REGEX.test(email)) return false;
}
```
