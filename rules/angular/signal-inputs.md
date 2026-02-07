---
title: Use Signal Inputs
impact: HIGH
impactDescription: Type-safe, works with computed
tags: signals, inputs, components
---

## Use Signal Inputs

Use `input.required<T>()` and `input<T>(defaultValue)` instead of `@Input()` decorators. Signal inputs are more type-safe and work seamlessly with `computed()` for derived state.
