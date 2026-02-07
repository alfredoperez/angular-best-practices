---
title: Use Platform Checks for Browser APIs
impact: MEDIUM
impactDescription: Prevents SSR errors
tags: ssr, platform, browser
---

## Use Platform Checks for Browser APIs

Use `isPlatformBrowser(inject(PLATFORM_ID))` before accessing browser-only APIs like `window`, `document`, or `localStorage`. These APIs don't exist during server-side rendering and will throw errors.
