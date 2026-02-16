---
name: angular-best-practices
description: >-
  Curated Angular best practices for building performant, maintainable Angular 17+
  applications. Covers Signals, RxJS, performance, SSR, testing, forms, routing,
  and architecture. Library-specific add-ons available for NgRx, SignalStore,
  TanStack Query, Material, PrimeNG, Spartan UI, and Transloco.
version: 1.1.0
author: alfredoperez
tags:
  - angular
  - typescript
  - signals
  - performance
  - testing
  - state-management
globs:
  - "**/*.ts"
  - "**/*.html"
  - "**/*.component.ts"
  - "**/*.service.ts"
---

# Angular Best Practices

Curated rules for building performant, maintainable Angular 17+ applications. Library-specific add-ons available for state management, UI component libraries, and internationalization.

## Links

- [GitHub Repository](https://github.com/alfredoperez/angular-best-practices)
- [Submit a Rule](https://github.com/alfredoperez/angular-best-practices/issues/new) via GitHub Issues
- [Browse All Skills](https://skills.sh/alfredoperez/angular-best-practices)

## When to Apply

- Creating components, services, and directives
- Setting up state management with Signals
- Writing unit, component, and E2E tests
- Optimizing bundle size and runtime performance
- Implementing forms, routing, and SSR
- Structuring applications with scalable architecture

## Rule Categories

| Category | Impact |
|----------|--------|
| Eliminating Waterfalls | CRITICAL |
| Bundle Optimization | CRITICAL |
| JavaScript Performance | HIGH |
| TypeScript Best Practices | MEDIUM |
| Signals & Reactivity | HIGH |
| Component Patterns | HIGH |
| RxJS Patterns | HIGH |
| Change Detection | HIGH |
| Template Optimization | HIGH |
| SSR & Hydration | HIGH |
| Forms | MEDIUM |
| Architecture | HIGH |
| Testing | HIGH |
| Infrastructure | MEDIUM |
| UI & Accessibility | MEDIUM |
| Data Handling | MEDIUM |

## Quick Reference

### Modern Angular Patterns

| Pattern | Use | Avoid |
|---------|-----|-------|
| Signal inputs | `input<T>()` | `@Input()` |
| Signal outputs | `output<T>()` | `@Output()` |
| Dependency injection | `inject()` | Constructor injection |
| Control flow | `@if`, `@for`, `@switch` | `*ngIf`, `*ngFor` |
| Class binding | `[class.active]` | `[ngClass]` |
| Change detection | `OnPush` | Default |
| Derived state | `computed()` | Getters |

### Component Template

```typescript
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (user(); as u) {
      <h2>{{ u.name }}</h2>
      <button (click)="selected.emit(u)">Select</button>
    }
  `,
})
export class UserCardComponent {
  user = input.required<User>();
  selected = output<User>();
}
```

## Optional Library Skills

Install library-specific rules alongside this core skill:

| Library | Install Command |
|---------|----------------|
| [NgRx](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-ngrx) | `npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-ngrx` |
| [SignalStore](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-signalstore) | `npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-signalstore` |
| [TanStack Query](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-tanstack) | `npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-tanstack` |
| [Angular Material](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-material) | `npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-material` |
| [PrimeNG](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-primeng) | `npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-primeng` |
| [Spartan UI](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-spartan) | `npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-spartan` |
| [Transloco](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-transloco) | `npx skills add alfredoperez/angular-best-practices --skill angular-best-practices-transloco` |

## Contributing

Have a rule suggestion or improvement? [Open an issue](https://github.com/alfredoperez/angular-best-practices/issues/new) on GitHub.

## License

MIT
