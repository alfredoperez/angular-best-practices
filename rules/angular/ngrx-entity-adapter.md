---
title: Use Entity Adapter for Collections
impact: MEDIUM
impactDescription: O(1) lookups, less boilerplate
tags: ngrx, state, entity
---

## Use Entity Adapter for Collections

Use `createEntityAdapter<T>()` from `@ngrx/entity` for CRUD operations on collections. The adapter provides optimized methods like `addOne`, `updateOne`, `removeOne` with O(1) lookups and generates selectors automatically.
