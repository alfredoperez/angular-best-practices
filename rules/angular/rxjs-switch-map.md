---
title: Use switchMap for Cancellation
impact: MEDIUM
impactDescription: Cancels stale requests
tags: rxjs, operators, search
---

## Use switchMap for Cancellation

Use `switchMap` for search/typeahead to cancel previous requests when new values arrive. Prevents race conditions from out-of-order responses.

```typescript
// switchMap cancels previous request on new emission
search$ = this.searchTerm$.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term))
);
```
