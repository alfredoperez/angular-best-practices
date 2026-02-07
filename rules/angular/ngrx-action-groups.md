---
title: Use createActionGroup
impact: MEDIUM
impactDescription: Less boilerplate, better organization
tags: ngrx, state, actions
---

## Use createActionGroup

Use `createActionGroup({ source: 'Feature', events: {...} })` to group related actions by source instead of individual `createAction()` calls. This reduces boilerplate and organizes actions by feature.
