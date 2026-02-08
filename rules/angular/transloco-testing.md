---
title: Mock Translations in Tests
impact: MEDIUM
impactDescription: Fast tests without HTTP translation loading
tags: transloco, testing, mocks
---

## Mock Translations in Tests

Use `TranslocoTestingModule` with inline translation objects for unit tests. Avoids HTTP requests and ensures tests run fast and deterministically.

**Incorrect:**

```typescript
// Loading real translation files in tests — slow, flaky, needs HTTP mock
TestBed.configureTestingModule({ imports: [TranslocoModule] });
```

**Correct:**

```typescript
TestBed.configureTestingModule({
  imports: [TranslocoTestingModule.forRoot({
    langs: { en: { 'actions.save': 'Save' } }, defaultLang: 'en',
  })],
});
```
