---
title: Always Use trackBy in @for
impact: HIGH
impactDescription: Prevents unnecessary DOM recreation
tags: change-detection, performance, loops
---

## Always Use trackBy in @for

Use `track item.id` (unique identifier) instead of `track $index` in `@for` loops. Tracking by index causes the entire list to re-render on any change; tracking by ID allows Angular to reuse existing DOM elements.
