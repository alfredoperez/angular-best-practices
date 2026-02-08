---
title: Use Transloco for Runtime i18n
impact: MEDIUM
impactDescription: Dynamic language switching without rebuilds
tags: transloco, i18n, internationalization
---

## Use Transloco for Runtime i18n

Use Transloco for runtime internationalization. Configure the `TranslocoModule` with a loader and use the `transloco` pipe or `*transloco` structural directive in templates.

**Incorrect:**

```html
<!-- Hardcoded strings — no translation support -->
<h1>Welcome to the app</h1>
<button>Save Changes</button>
```

**Correct:**

```html
<h1>{{ 'home.welcome' | transloco }}</h1>
<button>{{ 'actions.save' | transloco }}</button>
```
