# Angular Best Practices

**Version 1.0.0**
Angular Best Practices
February 7, 2026

> **Note:**
> This document is optimized for AI agents and LLMs. It provides
> actionable guidelines for Angular applications with code examples
> and impact assessments.

---

## Abstract

Comprehensive guidelines for building performant, maintainable Angular applications. These rules cover performance optimization, bundle size reduction, reactive patterns with Signals and RxJS, state management, component architecture, server-side rendering, change detection strategies, testing patterns, and TypeScript best practices. Each rule includes impact assessment and actionable code examples.

---

## Table of Contents

1. [Eliminating Waterfalls](#1-eliminating-waterfalls) — **CRITICAL**
   - 1.1 [Defer Await Until Needed](#11-defer-await-until-needed)
   - 1.2 [Promise.all() for Independent Operations](#12-promise-all-for-independent-operations)
2. [Bundle Optimization](#2-bundle-optimization) — **CRITICAL**
   - 2.1 [Avoid Barrel File Imports](#21-avoid-barrel-file-imports)
   - 2.2 [Conditional Imports for Features](#22-conditional-imports-for-features)
   - 2.3 [Defer Heavy Third-Party Libraries](#23-defer-heavy-third-party-libraries)
   - 2.4 [Preload Critical Resources](#24-preload-critical-resources)
   - 2.5 [Use @defer for Lazy Loading](#25-use-defer-for-lazy-loading)
3. [JavaScript Performance](#3-javascript-performance) — **HIGH**
   - 3.1 [Batch DOM Reads and Writes](#31-batch-dom-reads-and-writes)
   - 3.2 [Cache API Results in Web Storage](#32-cache-api-results-in-web-storage)
   - 3.3 [Cache Repeated Property Access](#33-cache-repeated-property-access)
   - 3.4 [Check Length Before Iteration](#34-check-length-before-iteration)
   - 3.5 [Combine Multiple Array Iterations](#35-combine-multiple-array-iterations)
   - 3.6 [Early Return from Functions](#36-early-return-from-functions)
   - 3.7 [Hoist RegExp Out of Loops](#37-hoist-regexp-out-of-loops)
   - 3.8 [Memoize Expensive Function Results](#38-memoize-expensive-function-results)
   - 3.9 [Pre-build Lookup Maps from Arrays](#39-pre-build-lookup-maps-from-arrays)
   - 3.10 [Reduce SVG Coordinate Precision](#310-reduce-svg-coordinate-precision)
   - 3.11 [Use content-visibility for Off-Screen Content](#311-use-content-visibility-for-off-screen-content)
   - 3.12 [Use Immutable Array Methods](#312-use-immutable-array-methods)
   - 3.13 [Use Passive Event Listeners](#313-use-passive-event-listeners)
   - 3.14 [Use Set/Map for O(1) Lookups](#314-use-set-map-for-o-1-lookups)
4. [TypeScript Best Practices](#4-typescript-best-practices) — **MEDIUM**
   - 4.1 [Avoid Default Exports](#41-avoid-default-exports)
   - 4.2 [Avoid Enums, Use const Objects](#42-avoid-enums-use-const-objects)
   - 4.3 [Declare Return Types for Exported Functions](#43-declare-return-types-for-exported-functions)
   - 4.4 [Handle noUncheckedIndexedAccess](#44-handle-nouncheckedindexedaccess)
   - 4.5 [Install Type Definitions for Libraries](#45-install-type-definitions-for-libraries)
   - 4.6 [Prefer Explicit Undefined Over Optional](#46-prefer-explicit-undefined-over-optional)
   - 4.7 [Prefer Interface Extends Over Intersections](#47-prefer-interface-extends-over-intersections)
   - 4.8 [TypeScript Naming Conventions](#48-typescript-naming-conventions)
   - 4.9 [Use Discriminated Unions](#49-use-discriminated-unions)
   - 4.10 [Use import type for Type-Only Imports](#410-use-import-type-for-type-only-imports)
   - 4.11 [Use Readonly Properties by Default](#411-use-readonly-properties-by-default)
   - 4.12 [Use Result Types Instead of Throwing](#412-use-result-types-instead-of-throwing)
   - 4.13 [When any is Acceptable in Generics](#413-when-any-is-acceptable-in-generics)
   - 4.14 [When to Use JSDoc Comments](#414-when-to-use-jsdoc-comments)
5. [Signals & Reactivity](#5-signals-reactivity) — **HIGH**
   - 5.1 [Avoid Effects for State Propagation](#51-avoid-effects-for-state-propagation)
   - 5.2 [Use Computed for Derived State](#52-use-computed-for-derived-state)
   - 5.3 [Use Signal Inputs](#53-use-signal-inputs)
   - 5.4 [Use Signals for Local State](#54-use-signals-for-local-state)
   - 5.5 [Use toSignal for Observables](#55-use-tosignal-for-observables)
6. [RxJS Patterns](#6-rxjs-patterns) — **HIGH**
   - 6.1 [Always Unsubscribe from Observables](#61-always-unsubscribe-from-observables)
   - 6.2 [Handle Errors in Streams](#62-handle-errors-in-streams)
   - 6.3 [Use combineLatest for Multiple Streams](#63-use-combinelatest-for-multiple-streams)
   - 6.4 [Use shareReplay for Multicasting](#64-use-sharereplay-for-multicasting)
   - 6.5 [Use switchMap for Cancellation](#65-use-switchmap-for-cancellation)
7. [Change Detection](#7-change-detection) — **HIGH**
   - 7.1 [Always Use trackBy in @for](#71-always-use-trackby-in-for)
   - 7.2 [Prefer Async Pipe Over Subscribe](#72-prefer-async-pipe-over-subscribe)
   - 7.3 [Prepare for Zoneless Angular](#73-prepare-for-zoneless-angular)
   - 7.4 [Use OnPush Change Detection](#74-use-onpush-change-detection)
8. [Template Optimization](#8-template-optimization) — **HIGH**
   - 8.1 [Use Pure Pipes for Transforms](#81-use-pure-pipes-for-transforms)
9. [SSR & Hydration](#9-ssr-hydration) — **HIGH**
   - 9.1 [Defer Browser-Only Components](#91-defer-browser-only-components)
   - 9.2 [Enable Client Hydration](#92-enable-client-hydration)
   - 9.3 [Fetch Data in Parallel on Server](#93-fetch-data-in-parallel-on-server)
   - 9.4 [Run Non-Critical Work After Response](#94-run-non-critical-work-after-response)
   - 9.5 [Use LRU Cache for SSR Computations](#95-use-lru-cache-for-ssr-computations)
   - 9.6 [Use Platform Checks for Browser APIs](#96-use-platform-checks-for-browser-apis)
   - 9.7 [Use TransferState to Avoid Refetch](#97-use-transferstate-to-avoid-refetch)
10. [Forms](#10-forms) — **MEDIUM**
   - 10.1 [Create Reusable Validators](#101-create-reusable-validators)
   - 10.2 [Handle Form Submission Properly](#102-handle-form-submission-properly)
   - 10.3 [Use ControlValueAccessor for Custom Controls](#103-use-controlvalueaccessor-for-custom-controls)
   - 10.4 [Use Typed Reactive Forms](#104-use-typed-reactive-forms)
11. [Architecture](#11-architecture) — **HIGH**
   - 11.1 [Enforce Module Boundaries](#111-enforce-module-boundaries)
   - 11.2 [Use Barrel Files for Public APIs](#112-use-barrel-files-for-public-apis)
   - 11.3 [Use Domain-Driven Folder Structure](#113-use-domain-driven-folder-structure)
12. [Testing](#12-testing) — **HIGH**
   - 12.1 [Component Testing with Angular Testing Library](#121-component-testing-with-angular-testing-library)
   - 12.2 [E2E Testing with Playwright](#122-e2e-testing-with-playwright)
   - 12.3 [Mocking with ng-mocks and MSW](#123-mocking-with-ng-mocks-and-msw)
   - 12.4 [Unit Testing with Vitest](#124-unit-testing-with-vitest)
13. [Infrastructure](#13-infrastructure) — **MEDIUM**
   - 13.1 [Error Handling Patterns](#131-error-handling-patterns)
   - 13.2 [Lazy Load Routes and Components](#132-lazy-load-routes-and-components)
   - 13.3 [Observability Patterns](#133-observability-patterns)
   - 13.4 [Schema-Validate LocalStorage Data](#134-schema-validate-localstorage-data)
   - 13.5 [Security Patterns](#135-security-patterns)
   - 13.6 [Use Event Delegation for Lists](#136-use-event-delegation-for-lists)
   - 13.7 [Use Functional Route Guards](#137-use-functional-route-guards)
   - 13.8 [Use Functional Route Resolvers](#138-use-functional-route-resolvers)
   - 13.9 [Use Route Input Binding](#139-use-route-input-binding)
14. [UI & Accessibility](#14-ui-accessibility) — **MEDIUM**
   - 14.1 [Accessibility (a11y)](#141-accessibility-a11y-)
   - 14.2 [Loading State Patterns](#142-loading-state-patterns)
   - 14.3 [Theming Patterns](#143-theming-patterns)
15. [Data Handling](#15-data-handling) — **MEDIUM**
   - 15.1 [Compose Mappers for Nested Data](#151-compose-mappers-for-nested-data)
   - 15.2 [HTTP Client Patterns](#152-http-client-patterns)
   - 15.3 [Use Generic Mapper for Paginated Responses](#153-use-generic-mapper-for-paginated-responses)
   - 15.4 [Use Pure Mapper Functions for DTOs](#154-use-pure-mapper-functions-for-dtos)

---

## 1. Eliminating Waterfalls

**Impact: CRITICAL** (2-10× improvement)

### 1.1 Defer Await Until Needed

**Impact: HIGH** (avoids blocking unused code paths)

Move `await` into branches where needed. Check cheapest conditions first (local state) before making expensive async calls.

**Example:**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) return { skipped: true }; // Fast path - no await
  const userData = await fetchUserData(userId);
  return processUserData(userData);
}
```

### 1.2 Promise.all() for Independent Operations

**Impact: CRITICAL** (2-10x improvement, eliminates waterfalls)

Execute independent async operations concurrently instead of sequentially. Use `forkJoin()` for RxJS, `Promise.allSettled()` for partial failures.

**Example:**

```typescript
const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)]);
```

---

## 2. Bundle Optimization

**Impact: CRITICAL** (Reduces initial load)

### 2.1 Avoid Barrel File Imports

**Impact: CRITICAL** (200-800ms import cost, slow builds)

Import directly from source files instead of barrel files (index.ts) to avoid loading thousands of unused modules. For **creating** barrel files for your domain's public API, see `arch-barrel-files.md`.

**Incorrect:**

```typescript
import { Check, X, Menu } from 'lucide-angular';
import { debounce } from 'lodash';
```

**Correct:**

```typescript
import { LucideCheck } from 'lucide-angular/check';
import debounce from 'lodash/debounce';
```

### 2.2 Conditional Imports for Features

**Impact: MEDIUM** (Excludes unused code from bundle)

Use conditional imports and feature flags to exclude unused code from production bundles.

**Example:**

```typescript
providers: [
  provideRouter(routes),
  ...(isDevMode() ? [provideDevTools()] : []),
]
```

### 2.3 Defer Heavy Third-Party Libraries

**Impact: MEDIUM** (Reduces initial bundle size)

Load heavy libraries (Chart.js, PDF.js, Leaflet, Quill) only when needed using `@defer` or dynamic imports.

**Example:**

```typescript
async generatePdf(content: string) {
  const { jsPDF } = await import('jspdf');
  return new jsPDF().text(content, 10, 10);
}
```

### 2.4 Preload Critical Resources

**Impact: LOW** (Improves perceived performance)

Use `withPreloading(PreloadAllModules)` for routes. Use `@defer (prefetch on idle)` for components. Use `<link rel="preload">` for critical fonts.

**Example:**

```html
@defer (on viewport; prefetch on idle) { <app-heavy-component /> }
@defer (on interaction; prefetch on hover) { <app-modal /> }
```

### 2.5 Use @defer for Lazy Loading

**Impact: HIGH** (reduces initial bundle size)

Use `@defer` for component-level lazy loading. Triggers: `on viewport`, `on interaction`, `on idle`, `on timer(ms)`, `when condition()`.

**Example:**

```html
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="chart-skeleton"></div>
} @loading (minimum 200ms) {
  <app-spinner />
}
```

---

## 3. JavaScript Performance

**Impact: HIGH** (Runtime performance)

### 3.1 Batch DOM Reads and Writes

**Impact: MEDIUM** (avoids layout thrashing)

When manipulating the DOM directly, batch all reads together and all writes together to avoid layout thrashing.

**Incorrect:**

```typescript
for (const el of elements) {
  const height = el.offsetHeight; // READ - triggers layout
  el.style.height = `${height * 2}px`; // WRITE - invalidates layout
}
```

**Correct:**

```typescript
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => el.style.height = `${heights[i] * 2}px`);
```

**In Angular, prefer template bindings** which let Angular handle DOM updates efficiently. When direct DOM access is needed, use `requestAnimationFrame()`.
**Properties that trigger layout:** `offsetTop/Left/Width/Height`, `scrollTop/Left/Width/Height`, `clientTop/Left/Width/Height`, `getComputedStyle()`, `getBoundingClientRect()`

### 3.2 Cache API Results in Web Storage

**Impact: MEDIUM** (Eliminates redundant network requests)

Cache API results in sessionStorage with TTL for faster subsequent loads.

**Example:**

```typescript
loadConfig() {
  const cached = sessionStorage.getItem('config');
  if (cached) {
    const { data, expires } = JSON.parse(cached);
    if (Date.now() < expires) return of(data);
  }
  return this.http.get<Config>('/api/config').pipe(
    tap(d => sessionStorage.setItem('config', JSON.stringify({ data: d, expires: Date.now() + 300000 })))
  );
}
```

### 3.3 Cache Repeated Property Access

**Impact: LOW** (reduces property lookups in loops)

Cache deep property chains in local variables. In Angular templates, use `@let` for repeated property access.

**Example:**

```typescript
const activeUsers = data.users.active;
for (const item of activeUsers) {
  const theme = item.profile.settings.theme;
  // Use theme multiple times...
}

// Template: @let settings = user.profile.settings;
```

### 3.4 Check Length Before Iteration

**Impact: LOW** (avoids unnecessary setup)

Check array length before creating objects or iterating to avoid unnecessary setup. In templates, use `@empty` block.

**Example:**

```typescript
if (items.length === 0) return { results: new Map() };
for (const item of items) { results.set(item.id, process(item)); }
```

### 3.5 Combine Multiple Array Iterations

**Impact: LOW** (reduces iterations over data)

For large arrays (1000+ items) in hot paths, combine filter/map chains into single iteration. Chaining is fine for small arrays and readability priority.

**Example:**

```typescript
const result: string[] = [];
for (const user of users) {
  if (user.isActive && user.email.endsWith('@company.com')) {
    result.push(user.email);
  }
}
```

### 3.6 Early Return from Functions

**Impact: LOW** (Avoids unnecessary computation)

Return early when result is determined. Use `find()` instead of `filter()[0]`. Use `some()`/`every()` instead of `filter().length`.

**Example:**

```typescript
if (!order) return { error: 'No order' };
if (!user) return { error: 'No user' };
return calculateTotal(order, user);
```

### 3.7 Hoist RegExp Out of Loops

**Impact: LOW** (avoids regex recompilation)

Define regex outside loops to avoid recompilation. In services, define as class properties. Note: global regex (`/g`) maintains state via `lastIndex`.

**Example:**

```typescript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
for (const email of emails) {
  if (!EMAIL_REGEX.test(email)) return false;
}
```

### 3.8 Memoize Expensive Function Results

**Impact: MEDIUM** (avoid redundant computation)

Use `computed()` for automatic memoization of expensive calculations. Computed signals only recalculate when dependencies change.

**Example:**

```typescript
statistics = computed(() =>
  this.data().reduce((stats, point) => computeStats(stats, point), initial)
);

// Or use TanStack Query with staleTime for API caching
```

### 3.9 Pre-build Lookup Maps from Arrays

**Impact: MEDIUM** (O(n²) to O(n) for repeated lookups)

When looking up items multiple times, build a Map first. Converts O(n) lookups to O(1).

**Example:**

```typescript
const userMap = new Map(users.map(u => [u.id, u]));
return orders.map(order => ({
  ...order,
  user: userMap.get(order.userId),
}));
```

### 3.10 Reduce SVG Coordinate Precision

**Impact: LOW** (10-30% smaller SVG files)

Limit SVG path coordinates to 1-2 decimal places; extra precision is invisible. Instead of `<path d="M12.349823749 5.928374928 L45.293847293 67.192837492"/>`, use `<path d="M12.35 5.93 L45.29 67.19"/>`. Use SVGO or similar tools to automatically optimize SVG files during build.

### 3.11 Use content-visibility for Off-Screen Content

**Impact: HIGH** (10x faster initial render for long pages)

Apply `content-visibility: auto` to skip rendering of off-screen content until scrolled into view. Add `contain-intrinsic-size` to reserve space for scroll calculations: `.card { content-visibility: auto; contain-intrinsic-size: 0 200px; }`.

### 3.12 Use Immutable Array Methods

**Impact: MEDIUM** (Cleaner code, no accidental mutations)

Use ES2023's `toSorted()`, `toReversed()`, and `toSpliced()` instead of mutating methods that require copying. Instead of `[...items].sort()`, use `items.toSorted()`. Instead of `[...items].reverse()`, use `items.toReversed()`. Instead of splice with a copy, use `items.toSpliced(index, 1)`.

### 3.13 Use Passive Event Listeners

**Impact: LOW** (improves scroll performance)

Add `{ passive: true }` to `addEventListener()` for `scroll`, `wheel`, `touchstart`, `touchmove`, and `touchend` events. Passive listeners improve scroll performance by telling the browser that `preventDefault()` won't be called. Avoid when you need to call `preventDefault()`.

### 3.14 Use Set/Map for O(1) Lookups

**Impact: MEDIUM** (O(n) to O(1) lookup performance)

Convert arrays to Set/Map for repeated membership checks. Array `includes()` is O(n); Set `has()` is O(1). Convert when checking membership more than once or arrays have >10 items.

**Incorrect (O(n) per check):**

```typescript
const allowedIds = ['a', 'b', 'c'];
const filtered = items.filter(item => allowedIds.includes(item.id));
```

**Correct (O(1) per check):**

```typescript
const allowedIds = new Set(['a', 'b', 'c']);
const filtered = items.filter(item => allowedIds.has(item.id));
```

---

## 4. TypeScript Best Practices

**Impact: MEDIUM** (Type safety & maintainability)

### 4.1 Avoid Default Exports

**Impact: LOW** (Better refactoring, consistent imports)

Use `export class UserService` instead of `export default class UserService`. Named exports enforce consistent import names across the codebase and enable better IDE refactoring support. Default exports allow arbitrary names like `import Whatever from './user.service'`.

### 4.2 Avoid Enums, Use const Objects

**Impact: MEDIUM** (Better tree-shaking, clearer behavior)

Use `as const` objects instead of enums for predictable behavior and tree-shaking.

**Incorrect:**

```typescript
enum Direction { Up, Down } // Numeric enums create reverse mappings
Object.keys(Direction).length; // 4, not 2!
```

**Correct:**

```typescript
const Direction = { Up: 'UP', Down: 'DOWN' } as const;
type Direction = (typeof Direction)[keyof typeof Direction]; // 'UP' | 'DOWN'
```

### 4.3 Declare Return Types for Exported Functions

**Impact: LOW** (Improves AI comprehension, serves as documentation)

Add explicit return types to exported/public functions: `function getUser(id: string): User`. This helps AI tools understand your API contracts and catches accidental return type changes. Internal/private functions can rely on inference.

### 4.4 Handle noUncheckedIndexedAccess

**Impact: LOW** (Safer array/object access)

With `noUncheckedIndexedAccess`, array/object indexing returns `T | undefined`. Always check before using.

**Example:**

```typescript
const first = users[0];
if (first) { console.log(first.name); }
// Or: console.log(first?.name ?? 'Unknown');
```

### 4.5 Install Type Definitions for Libraries

**Impact: LOW** (Proper type support for dependencies)

For untyped libraries, install `@types/library-name` or create a declaration file with `declare module 'library-name'`. Without types, TypeScript treats imports as `any`, disabling type checking for that dependency.

### 4.6 Prefer Explicit Undefined Over Optional

**Impact: MEDIUM** (Catches missing property bugs at compile time)

Use `prop: T | undefined` instead of `prop?: T` when omission is a bug. Optional props (`?`) allow complete omission, while `T | undefined` requires explicit `undefined` to signal intentional absence.

### 4.7 Prefer Interface Extends Over Intersections

**Impact: LOW** (Better performance, clearer error messages)

Use `interface Dog extends Animal` instead of `type Dog = Animal & { breed: string }`. Interface extends produces clearer error messages (shows "Dog" vs full intersection) and has better TypeScript compiler performance.

### 4.8 TypeScript Naming Conventions

**Impact: LOW** (Consistent, readable code)

Use kebab-case for files (`user.service.ts`), PascalCase for classes and types (`UserService`, `User`), and camelCase for variables and functions (`userName`, `getUser`).

### 4.9 Use Discriminated Unions

**Impact: HIGH** (Prevents impossible states)

Model mutually exclusive states with a discriminant property to prevent impossible states at compile time.

**Example:**

```typescript
type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

### 4.10 Use import type for Type-Only Imports

**Impact: LOW** (Smaller bundles, cleaner transpilation)

Use `import type { User } from './user'` instead of `import { type User } from './user'`. The `import type` syntax is completely erased at transpilation, while inline `type` may leave an empty import that still executes the module's side effects.

### 4.11 Use Readonly Properties by Default

**Impact: MEDIUM** (Prevents accidental mutation)

Mark properties as `readonly` by default; omit only when mutation is intentional. Use `Readonly<T>` for objects and `readonly T[]` or `ReadonlyArray<T>` for arrays to catch accidental mutations at compile time.

### 4.12 Use Result Types Instead of Throwing

**Impact: MEDIUM** (Explicit error handling, type-safe)

For operations that can fail, return a Result type instead of throwing. Makes error handling explicit and type-safe.

**Example:**

```typescript
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
function parseJson(input: string): Result<unknown> {
  try { return { ok: true, value: JSON.parse(input) }; }
  catch (e) { return { ok: false, error: e as Error }; }
}
```

### 4.13 When any is Acceptable in Generics

**Impact: LOW** (Practical type safety in complex generics)

Use `as any` inside generic function bodies when TypeScript can't verify conditional types. The public API remains typed; internal casts don't leak.

**Example:**

```typescript
const flip = <T extends 'a' | 'b'>(x: T): T extends 'a' ? 'b' : 'a' => {
  return (x === 'a' ? 'b' : 'a') as any; // OK - public API is still typed
};
```

### 4.14 When to Use JSDoc Comments

**Impact: LOW** (Improves discoverability for non-obvious behavior)

Use JSDoc for `@deprecated`, `@throws`, and non-obvious behavior. Don't repeat type information already in the signature.

**Example:**

```typescript
/** @deprecated Use getUserById instead. Removed in v3.0. */
function fetchUser(id: string): Observable<User> { }
```

---

## 5. Signals & Reactivity

**Impact: HIGH** (Reactive state management)

### 5.1 Avoid Effects for State Propagation

**Impact: MEDIUM** (Prevents circular dependencies, cleaner data flow)

Use `computed()` for derived state, not `effect()` with `.set()`. Effects are for external side effects (logging, DOM manipulation, analytics), not for propagating state between signals.

**Example:**

```typescript
// Computed handles derivation without circular dependency risks
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### 5.2 Use Computed for Derived State

**Impact: HIGH** (Memoized derivation, prevents redundant calculations)

Use `computed()` instead of getters for derived state. Getters re-run on every change detection; computed signals are memoized and only recalculate when dependencies change.

**Example:**

```typescript
// Memoized; only runs when firstName or lastName changes
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### 5.3 Use Signal Inputs

**Impact: HIGH** (Type-safe, works with computed)

Use `input.required<T>()` and `input<T>(defaultValue)` instead of `@Input()` decorators. Signal inputs are more type-safe and work seamlessly with `computed()` for derived state.

### 5.4 Use Signals for Local State

**Impact: HIGH** (Fine-grained reactivity, zoneless-ready)

Use `signal<T>(initialValue)` instead of plain class properties for component state. Signals provide fine-grained reactivity and enable zoneless change detection. Update with `.set()`, `.update()`, or `.mutate()`.

### 5.5 Use toSignal for Observables

**Impact: MEDIUM** (Cleaner templates, zoneless-ready)

Use `toSignal()` to bridge RxJS observables to signals for simpler template usage. In templates, use `params()?.id` instead of `(params$ | async)?.id`.

**Example:**

```typescript
// Converts observable to signal with automatic subscription management
params = toSignal(this.route.params);
```

---

## 6. RxJS Patterns

**Impact: HIGH** (Memory leaks & cancellation)

### 6.1 Always Unsubscribe from Observables

**Impact: HIGH** (Prevents memory leaks)

Use `toSignal()` (auto-unsubscribes) or `takeUntilDestroyed()` to prevent memory leaks from long-lived subscriptions.

**Example:**

```typescript
data = toSignal(this.data$); // Auto-unsubscribes
// OR
this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
```

### 6.2 Handle Errors in Streams

**Impact: HIGH** (Prevents stream termination)

Use `catchError` inside `switchMap` to handle errors without terminating the outer stream.

**Incorrect:**

```typescript
// Error terminates entire stream - no more searches work
search$ = this.term$.pipe(
  switchMap(term => this.api.search(term)),
  catchError(() => of([])) // Too late - outer stream dead
);
```

**Correct:**

```typescript
search$ = this.term$.pipe(
  switchMap(term => this.api.search(term).pipe(
    catchError(() => of([])) // Recovers per-request
  ))
);
```

### 6.3 Use combineLatest for Multiple Streams

**Impact: MEDIUM** (Combines dependent data)

Use `combineLatest({ user: user$, permissions: perms$ })` to combine multiple streams instead of nested subscribes. Emits when any source emits, providing the latest value from each.

**Example:**

```typescript
vm$ = combineLatest({
  user: this.user$,
  permissions: this.permissions$,
  settings: this.settings$
});
```

### 6.4 Use shareReplay for Multicasting

**Impact: MEDIUM** (Avoids duplicate HTTP calls)

Use `shareReplay({ bufferSize: 1, refCount: true })` to share results among multiple subscribers and avoid duplicate HTTP requests.

**Example:**

```typescript
users$ = this.http.get<User[]>('/api/users').pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);
```

### 6.5 Use switchMap for Cancellation

**Impact: MEDIUM** (Cancels stale requests)

Use `switchMap` for search/typeahead to cancel previous requests when new values arrive. Prevents race conditions from out-of-order responses.

**Example:**

```typescript
// switchMap cancels previous request on new emission
search$ = this.searchTerm$.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term))
);
```

---

## 7. Change Detection

**Impact: HIGH** (Rendering performance)

### 7.1 Always Use trackBy in @for

**Impact: HIGH** (Prevents unnecessary DOM recreation)

Use `track item.id` (unique identifier) instead of `track $index` in `@for` loops. Tracking by index causes the entire list to re-render on any change; tracking by ID allows Angular to reuse existing DOM elements.

### 7.2 Prefer Async Pipe Over Subscribe

**Impact: MEDIUM** (Auto-unsubscribes, triggers CD)

Use `| async` pipe in templates instead of manual `.subscribe()` calls. The async pipe automatically unsubscribes on component destroy and triggers change detection when new values arrive.

### 7.3 Prepare for Zoneless Angular

**Impact: MEDIUM** (Future-proofs for zoneless)

Use Signals (`signal()`, `computed()`) for state instead of plain properties. Signal-based reactivity works with or without Zone.js, preparing your app for zoneless Angular and explicit change detection.

### 7.4 Use OnPush Change Detection

**Impact: HIGH** (Reduces change detection cycles)

Set `changeDetection: ChangeDetectionStrategy.OnPush` on components so Angular only checks them when inputs change or events fire, skipping unchanged components during change detection cycles.

---

## 8. Template Optimization

**Impact: HIGH** (Lazy loading & pipes)

### 8.1 Use Pure Pipes for Transforms

**Impact: MEDIUM** (Memoized, only recalculates on input change)

Use pure pipes instead of method calls in templates for memoized transformations.

**Incorrect:**

```html
<!-- Method runs on every change detection cycle -->
<span>{{ formatCurrency(price) }}</span>
```

**Correct:**

```html
<!-- Pure pipe only runs when price changes -->
<span>{{ price | currency:'USD' }}</span>
<!-- Or custom pipe -->
<span>{{ user.name | initials }}</span>
```

---

## 9. SSR & Hydration

**Impact: HIGH** (Initial render & SEO)

### 9.1 Defer Browser-Only Components

**Impact: MEDIUM** (Avoids SSR hydration mismatches)

Use `@defer (on idle)` with a `@placeholder` for components that use browser APIs (canvas, charts, maps). This avoids hydration mismatches by deferring the component until after hydration completes on the client.

### 9.2 Enable Client Hydration

**Impact: HIGH** (Preserves server-rendered DOM)

Enable `provideClientHydration(withEventReplay())` to reuse server-rendered DOM instead of destroying and rebuilding it on the client.

**Example:**

```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
});
```

### 9.3 Fetch Data in Parallel on Server

**Impact: HIGH** (Reduces SSR response time by parallelization)

Use `Promise.all()` or `forkJoin()` to fetch independent data sources concurrently during SSR to reduce total response time.

**Example:**

```typescript
async resolve() {
  const [user, posts] = await Promise.all([
    this.userService.get(),   // 200ms
    this.postService.get(),   // 300ms
  ]);
  return { user, posts };     // Total: 300ms (parallel, not 500ms)
}
```

### 9.4 Run Non-Critical Work After Response

**Impact: MEDIUM** (Faster Time to First Byte)

Send the response first, then perform analytics, logging, or cache warming fire-and-forget style without blocking TTFB.

**Example:**

```typescript
async handleRequest(req: Request) {
  const html = await this.render(req);
  // Fire-and-forget: don't await non-critical work
  this.analytics.track(req).catch(console.error);
  this.cache.warm(req).catch(console.error);
  return html;
}
```

### 9.5 Use LRU Cache for SSR Computations

**Impact: HIGH** (Reduces server response time 50-90%)

Cache expensive server-side computations with an LRU cache and TTL to avoid recomputation on repeated requests.

**Example:**

```typescript
private cache = new Map<string, { data: Data; timestamp: number }>();
async renderPage(id: string) {
  const cached = this.cache.get(id);
  if (cached && Date.now() - cached.timestamp < 60000) return this.render(cached.data);
  const data = await this.expensiveComputation(id);
  this.cache.set(id, { data, timestamp: Date.now() });
  return this.render(data);
}
```

### 9.6 Use Platform Checks for Browser APIs

**Impact: MEDIUM** (Prevents SSR errors)

Use `isPlatformBrowser(inject(PLATFORM_ID))` before accessing browser-only APIs like `window`, `document`, or `localStorage`. These APIs don't exist during server-side rendering and will throw errors.

### 9.7 Use TransferState to Avoid Refetch

**Impact: HIGH** (Eliminates duplicate API calls)

Use `TransferState` to pass server-fetched data to the client, avoiding duplicate API requests during hydration.

**Example:**

```typescript
data = this.transferState.hasKey(DATA_KEY)
  ? this.transferState.get(DATA_KEY, null)
  : this.http.get('/api/data').pipe(
      tap(d => this.transferState.set(DATA_KEY, d))
    );
```

---

## 10. Forms

**Impact: MEDIUM** (Form handling)

### 10.1 Create Reusable Validators

**Impact: MEDIUM** (DRY validation, consistent error handling)

Extract common validation logic into reusable `ValidatorFn` functions instead of inline validators or repeated patterns.

**Example:**

```typescript
export const emailValidator: ValidatorFn = (control) =>
  control.value?.includes('@') ? null : { invalidEmail: true };

// Usage: email: ['', [Validators.required, emailValidator]]
```

### 10.2 Handle Form Submission Properly

**Impact: MEDIUM** (Better UX, proper error handling)

Check validity and mark touched before submit, track loading state with a signal, and use `getRawValue()` to include disabled fields.

**Example:**

```typescript
async onSubmit() {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  this.loading.set(true);
  try { await this.api.submit(this.form.getRawValue()); }
  finally { this.loading.set(false); }
}
```

### 10.3 Use ControlValueAccessor for Custom Controls

**Impact: MEDIUM** (Form integration, reusable custom inputs)

Implement `ControlValueAccessor` to make custom components work with reactive forms via `formControlName` and `[(ngModel)]`.

**Example:**

```typescript
@Component({ providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: RatingComponent, multi: true }] })
export class RatingComponent implements ControlValueAccessor {
  writeValue(v: number) { this.value.set(v); }
}
```

### 10.4 Use Typed Reactive Forms

**Impact: HIGH** (Type-safe forms, better autocomplete)

Use `FormBuilder.nonNullable.group()` to create typed form groups with non-nullable values. Use `getRawValue()` to get a fully-typed form value including disabled controls.

---

## 11. Architecture

**Impact: HIGH** (Scalability)

### 11.1 Enforce Module Boundaries

**Impact: HIGH** (Prevents spaghetti dependencies)

Use Sheriff or Nx to enforce dependency rules between domains and layers.

**Incorrect:**

```typescript
// ui component imports from another domain's data layer
import { OrderService } from '../../orders/data/order.service'; // Cross-domain!
```

**Correct:**

```typescript
// ui component only imports from own domain or shared
import { OrderService } from '../data/order.service';
import { formatCurrency } from '@app/shared/util';
```

Use Sheriff for standalone projects, Nx for monorepos.

### 11.2 Use Barrel Files for Public APIs

**Impact: MEDIUM** (Clear public contracts, encapsulation)

Export only what other domains should access via `index.ts` barrel files. This rule is about **creating** focused barrel files for your domain boundaries. For avoiding **consuming** large barrel files from libraries, see `bundle-barrel-imports.md`.

**Example:**

```typescript
// customers/index.ts - only export public API
export { Customer } from './model/customer.model';
export { CustomerService } from './data/customer.service';
```

### 11.3 Use Domain-Driven Folder Structure

**Impact: MEDIUM** (Better organization, clear boundaries)

Organize by domain (feature area) with layers inside each domain instead of grouping by technical type.

**Example:**

```typescript
src/app/domains/
  customers/feature/  # Smart components
  customers/data/     # Services, state
  customers/ui/       # Presentation components
  customers/model/    # Types, interfaces
```

---

## 12. Testing

**Impact: HIGH** (Reliability)

### 12.1 Component Testing with Angular Testing Library

**Impact: HIGH** (user-centric, reliable component tests)

Use Angular Testing Library for user-centric tests. Prefer accessible queries: `getByRole`, `getByLabelText`, `getByText`. Use `getByTestId` as last resort.

**Example:**

```typescript
it('should increment count', async () => {
  await render(CounterComponent);
  await userEvent.setup().click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 12.2 E2E Testing with Playwright

**Impact: MEDIUM** (reliable end-to-end user journey tests)

Use Playwright for E2E tests. Test user journeys, use Page Object pattern for reusable actions, mock APIs with `page.route()`.

**Example:**

```typescript
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/dashboard');
});
```

### 12.3 Mocking with ng-mocks and MSW

**Impact: MEDIUM** (Isolated, reliable tests)

Use ng-mocks for component/service mocking. Use `HttpTestingController` for HTTP mocking in unit tests. Use MSW for integration tests.

**Example:**

```typescript
TestBed.configureTestingModule({
  imports: [ParentComponent, MockComponent(ChildComponent)],
  providers: [MockProvider(UserService, { getUsers: () => of([mockUser]) })],
});
```

### 12.4 Unit Testing with Vitest

**Impact: HIGH** (Fast, reliable tests for services and logic)

Use Vitest for unit testing services, pipes, guards, and signals. For signals, set values directly and assert computed results. For pipes, instantiate and call `transform()`.

**Example:**

```typescript
it('should fetch users', async () => {
  TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
  const service = TestBed.inject(UserService);
  expect(await firstValueFrom(service.getUsers())).toBeDefined();
});
```

---

## 13. Infrastructure

**Impact: MEDIUM** (Cross-cutting concerns)

### 13.1 Error Handling Patterns

**Impact: MEDIUM** (Resilience and user feedback)

Use global `ErrorHandler` for unhandled exceptions. Centralize HTTP errors (401, 403, 500) in an interceptor. Use `retry({ count: 3, delay: 1000 })` for idempotent requests.

**Example:**

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(catchError(err => {
    if (err.status === 401) inject(Router).navigate(['/login']);
    return throwError(() => err);
  }));
```

### 13.2 Lazy Load Routes and Components

**Impact: HIGH** (Reduces initial bundle size)

Use `loadComponent: () => import('./component').then(m => m.Component)` and `loadChildren: () => import('./routes').then(m => m.routes)` instead of direct component imports. Lazy loading reduces initial bundle size by loading code only when routes are visited.

### 13.3 Observability Patterns

**Impact: MEDIUM** (Faster debugging)

Use structured logging (JSON objects, not strings) for filtering. Integrate error tracking (Sentry). Monitor Core Web Vitals (LCP, CLS, FID).

**Example:**

```typescript
logger.info('User created', { userId: user.id, role: user.role });
onLCP(metric => logger.info('LCP', metric));
```

### 13.4 Schema-Validate LocalStorage Data

**Impact: MEDIUM** (Prevents runtime errors from corrupted storage)

Use typed schemas (Zod) with versioning for localStorage to catch corrupted data and enable migrations.

**Example:**

```typescript
const result = StorageSchema.safeParse(JSON.parse(localStorage.getItem('user') ?? 'null'));
const user = result.success ? result.data.user : migrateOrDefault(result); // fallback on failure
```

### 13.5 Security Patterns

**Impact: HIGH** (Prevents vulnerabilities)

Never store tokens in `localStorage` (XSS-vulnerable). Use in-memory signals for access tokens and `HttpOnly` cookies for refresh tokens. Trust Angular's sanitization; avoid bypassing `DomSanitizer`. Enable CSRF with `withXsrfConfiguration()`.

**Incorrect:**

```typescript
localStorage.setItem('accessToken', token); // Vulnerable to XSS
```

**Correct:**

```typescript
private accessToken = signal<string | null>(null); // In-memory only
provideHttpClient(withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }));
```

### 13.6 Use Event Delegation for Lists

**Impact: MEDIUM** (Reduces memory from O(n) to O(1) listeners)

Attach one event listener to a parent instead of listeners on each child. Use `data-*` attributes and `event.target` to identify clicked item.

**Example:**

```html
<div (click)="handleClick($event)">
  @for (item of items(); track item.id) {
    <button [attr.data-id]="item.id">{{ item.name }}</button>
  }
</div>
<!-- One listener handles all clicks via event.target -->
```

### 13.7 Use Functional Route Guards

**Impact: HIGH** (Protects routes, cleaner than class guards)

Use functional `CanActivateFn` guards with `inject()` instead of class-based guards. Return `true`, `false`, or `UrlTree` for redirects.

**Example:**

```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() || router.createUrlTree(['/login']);
};
// Usage: { path: 'dashboard', canActivate: [authGuard] }
```

### 13.8 Use Functional Route Resolvers

**Impact: MEDIUM** (Preloads data before navigation)

Use functional `ResolveFn<T>` resolvers to preload data before component renders, avoiding empty state flicker.

**Example:**

```typescript
export const userResolver: ResolveFn<User | null> = (route) =>
  inject(UserService).getById(route.paramMap.get('id')!).pipe(catchError(() => of(null)));
```

### 13.9 Use Route Input Binding

**Impact: MEDIUM** (Cleaner component code, no ActivatedRoute)

Enable `withComponentInputBinding()` in router config to bind route params, query params, and resolver data directly to component inputs. Use `id = input.required<string>()` for `:id` params instead of injecting `ActivatedRoute`.

---

## 14. UI & Accessibility

**Impact: MEDIUM** (User experience)

### 14.1 Accessibility (a11y)

**Impact: MEDIUM** (Inclusive design and WCAG compliance)

Use semantic HTML (`<button>`, not `<div onclick>`). Ensure keyboard access with `tabindex` and `keyup.enter`. Use `LiveAnnouncer` for dynamic changes. Use `cdkTrapFocus` for modals.

**Incorrect:**

```html
<div (click)="save()">Save</div>
```

**Correct:**

```html
<button (click)="save()">Save</button>
<!-- Or if not button: -->
<span role="button" tabindex="0" (click)="toggle()" (keyup.enter)="toggle()">Toggle</span>
```

### 14.2 Loading State Patterns

**Impact: MEDIUM** (Perceived performance and UX)

Use skeleton loaders matching content shape to prevent CLS. Disable buttons during async actions. Always show helpful `@empty` UI for zero-data states.

**Example:**

```html
@if (loading()) {
  <app-card-skeleton />
} @else {
  <app-card [data]="data()" />
}

@for (user of users(); track user.id) { ... } @empty {
  <app-empty-state title="No users found" />
}
```

### 14.3 Theming Patterns

**Impact: MEDIUM** (Consistent design and dark mode)

Define theme values as CSS custom properties (`--border-color`). Support dark mode via `prefers-color-scheme` and `data-theme` attributes. Use CDK `BreakpointObserver` for responsive logic.

**Example:**

```css
:root { --border-color: #e5e7eb; }
@media (prefers-color-scheme: dark) { :root { --bg-color: #1f2937; } }
```

**Example:**

```typescript
isMobile = toSignal(this.breakpointObserver.observe('(max-width: 768px)').pipe(map(r => r.matches)));
```

---

## 15. Data Handling

**Impact: MEDIUM** (API integration)

### 15.1 Compose Mappers for Nested Data

**Impact: MEDIUM** (Reusable, maintains single responsibility)

Compose smaller mappers for nested structures. Each mapper handles one entity type, enabling reuse and single responsibility.

**Example:**

```typescript
const mapOrderItem = (dto: OrderItemDto): OrderItem => ({
  productName: dto.product_name,
  subtotal: dto.quantity * dto.unit_price,
});

const mapOrder = (dto: OrderDto): Order => ({
  customer: mapCustomer(dto.customer),
  items: dto.items.map(mapOrderItem),
});
```

### 15.2 HTTP Client Patterns

**Impact: HIGH** (Secure and efficient data fetching)

Use functional `HttpInterceptorFn` for request/response handling. Always type API responses (avoid `any`). Use `HttpContext` to pass config to interceptors.

**Example:**

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  return token ? next(req.clone({ setHeaders: { Authorization: token } })) : next(req);
};

// Skip interceptor: http.get('/api', { context: new HttpContext().set(SKIP_AUTH, true) })
```

### 15.3 Use Generic Mapper for Paginated Responses

**Impact: LOW** (Reusable pagination handling)

Create a generic mapper for paginated API responses to avoid repetition across services.

**Example:**

```typescript
function mapPaginated<TDto, T>(dto: PaginatedDto<TDto>, mapper: (d: TDto) => T): PaginatedResponse<T> {
  return {
    items: dto.data.map(mapper),
    hasNext: dto.meta.current_page < dto.meta.total_pages,
  };
}
// Usage: map(dto => mapPaginated(dto, mapUserDto))
```

### 15.4 Use Pure Mapper Functions for DTOs

**Impact: MEDIUM** (Decouples frontend from API, type-safe transforms)

Create pure functions in a `mappers/` folder to map between API DTOs and domain models. Keeps components decoupled from API structure.

**Example:**

```typescript
export function mapUserDto(dto: UserDto): User {
  return {
    fullName: `${dto.first_name} ${dto.last_name}`,
    email: dto.email_address,
    createdAt: new Date(dto.created_at),
  };
}
```

---
