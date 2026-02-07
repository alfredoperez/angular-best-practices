---
title: Reduce SVG Coordinate Precision
impact: LOW
impactDescription: 10-30% smaller SVG files
tags: svg, optimization, assets
---

## Reduce SVG Coordinate Precision

Limit SVG path coordinates to 1-2 decimal places; extra precision is invisible. Instead of `<path d="M12.349823749 5.928374928 L45.293847293 67.192837492"/>`, use `<path d="M12.35 5.93 L45.29 67.19"/>`. Use SVGO or similar tools to automatically optimize SVG files during build.
