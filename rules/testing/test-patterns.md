---
title: Advanced Testing Patterns
impact: MEDIUM
impactDescription: Maintainable and robust test suites
tags: testing, patterns, factories, mocks
---

## Advanced Testing Patterns

Use factory functions for test data. Mock network with MSW. Create custom render functions to wrap providers.

```typescript
export function createUser(overrides: Partial<User> = {}): User {
  return { id: crypto.randomUUID(), name: 'John', email: 'john@example.com', ...overrides };
}
```
