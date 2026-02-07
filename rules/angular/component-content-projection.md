---
title: Use Content Projection for Layouts
impact: MEDIUM
impactDescription: Flexible, reusable layout components
tags: components, patterns, ng-content
---

## Use Content Projection for Layouts

Use `<ng-content>` with selectors for flexible layouts instead of complex config objects. Allows consumers to provide custom content with full template control.

```html
<app-card>
  <h2 card-header>Title</h2>
  <p>Body content</p>
  <button card-footer>Action</button>
</app-card>
```
