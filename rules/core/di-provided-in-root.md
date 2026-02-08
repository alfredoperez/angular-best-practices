---
title: Use providedIn root for Tree-Shakeable Services
impact: MEDIUM
impactDescription: Auto tree-shaking of unused services
tags: dependency-injection, services, tree-shaking
---

## Use providedIn root for Tree-Shakeable Services

Provide services with `providedIn: 'root'` to enable automatic tree-shaking of unused services instead of listing them in module or component `providers` arrays.

**Incorrect:**

```typescript
@Injectable()
export class UserService { /* ... */ }
// Must manually add to providers: [UserService] — not tree-shakeable
```

**Correct:**

```typescript
@Injectable({ providedIn: 'root' })
export class UserService { /* ... */ }
// Automatically provided and tree-shaken if unused
```
