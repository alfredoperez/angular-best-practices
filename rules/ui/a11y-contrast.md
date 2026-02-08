---
title: Meet WCAG Color Contrast Ratios
impact: MEDIUM
impactDescription: Readability for low-vision users
tags: a11y, contrast, wcag, color
---

## Meet WCAG Color Contrast Ratios

Text must meet WCAG AA contrast ratios: 4.5:1 for normal text, 3:1 for large text (18px+ bold or 24px+). Use CSS custom properties for theme colors and validate with browser dev tools.

**Incorrect:**

```css
.label { color: #aaa; background: #fff; } /* 2.3:1 ratio — fails AA */
```

**Correct:**

```css
.label { color: #595959; background: #fff; } /* 7:1 ratio — passes AA */
```
