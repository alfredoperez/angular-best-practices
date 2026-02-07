---
title: Use selectSignal in Components
impact: MEDIUM
impactDescription: Simpler templates, zoneless-ready
tags: ngrx, state, signals
---

## Use selectSignal in Components

Use `store.selectSignal(selector)` instead of `store.select(selector)` with `| async` pipe. Signal-based selection simplifies templates (use `users()` instead of `users$ | async`) and is zoneless-ready.
