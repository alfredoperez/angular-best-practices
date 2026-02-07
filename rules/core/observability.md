---
title: Observability Patterns
impact: MEDIUM
impactDescription: Faster debugging
tags: observability, logging, monitoring
---

## Observability Patterns

Use structured logging (JSON objects, not strings) for filtering. Integrate error tracking (Sentry). Monitor Core Web Vitals (LCP, CLS, FID).

```typescript
logger.info('User created', { userId: user.id, role: user.role });
onLCP(metric => logger.info('LCP', metric));
```
