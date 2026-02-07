---
title: Use OnPush Change Detection
impact: HIGH
impactDescription: Reduces change detection cycles
tags: change-detection, performance, components
---

## Use OnPush Change Detection

Set `changeDetection: ChangeDetectionStrategy.OnPush` on components so Angular only checks them when inputs change or events fire, skipping unchanged components during change detection cycles.
