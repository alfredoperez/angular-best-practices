---
title: Install Type Definitions for Libraries
impact: LOW
impactDescription: Proper type support for dependencies
tags: typescript, libraries, types
---

## Install Type Definitions for Libraries

For untyped libraries, install `@types/library-name` or create a declaration file with `declare module 'library-name'`.

Without types, TypeScript treats imports as `any`, disabling type checking for that dependency.
