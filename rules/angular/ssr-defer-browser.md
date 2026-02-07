---
title: Defer Browser-Only Components
impact: MEDIUM
impactDescription: Avoids SSR hydration mismatches
tags: ssr, defer, browser
---

## Defer Browser-Only Components

Use `@defer (on idle)` with a `@placeholder` for components that use browser APIs (canvas, charts, maps). This avoids hydration mismatches by deferring the component until after hydration completes on the client.
