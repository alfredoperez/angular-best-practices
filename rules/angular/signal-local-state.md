---
title: Use Signals for Local State
impact: HIGH
impactDescription: Fine-grained reactivity, zoneless-ready
tags: signals, state, performance
---

## Use Signals for Local State

Use `signal<T>(initialValue)` instead of plain class properties for component state. Signals provide fine-grained reactivity and enable zoneless change detection. Update with `.set()`, `.update()`, or `.mutate()`.
