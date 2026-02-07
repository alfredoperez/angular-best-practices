---
title: Prefer Async Pipe Over Subscribe
impact: MEDIUM
impactDescription: Auto-unsubscribes, triggers CD
tags: change-detection, rxjs, templates
---

## Prefer Async Pipe Over Subscribe

Use `| async` pipe in templates instead of manual `.subscribe()` calls. The async pipe automatically unsubscribes on component destroy and triggers change detection when new values arrive.
