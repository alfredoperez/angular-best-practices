---
title: Lazy Load Routes and Components
impact: HIGH
impactDescription: Reduces initial bundle size
tags: routing, lazy-loading, performance
---

## Lazy Load Routes and Components

Use `loadComponent: () => import('./component').then(m => m.Component)` and `loadChildren: () => import('./routes').then(m => m.routes)` instead of direct component imports. Lazy loading reduces initial bundle size by loading code only when routes are visited.
