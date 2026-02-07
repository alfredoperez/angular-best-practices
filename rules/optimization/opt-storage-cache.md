---
title: Cache API Results in Web Storage
impact: MEDIUM
impactDescription: Eliminates redundant network requests
tags: caching, storage, performance
---

## Cache API Results in Web Storage

Cache API results in sessionStorage with TTL for faster subsequent loads.

```typescript
loadConfig() {
  const cached = sessionStorage.getItem('config');
  if (cached) {
    const { data, expires } = JSON.parse(cached);
    if (Date.now() < expires) return of(data);
  }
  return this.http.get<Config>('/api/config').pipe(
    tap(d => sessionStorage.setItem('config', JSON.stringify({ data: d, expires: Date.now() + 300000 })))
  );
}
```
