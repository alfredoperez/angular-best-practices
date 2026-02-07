---
title: Cache Repeated Property Access
impact: LOW
impactDescription: reduces property lookups in loops
tags: caching, loops, performance, optimization
---

## Cache Repeated Property Access

Cache deep property chains in local variables. In Angular templates, use `@let` for repeated property access.

```typescript
const activeUsers = data.users.active;
for (const item of activeUsers) {
  const theme = item.profile.settings.theme;
  // Use theme multiple times...
}

// Template: @let settings = user.profile.settings;
```
