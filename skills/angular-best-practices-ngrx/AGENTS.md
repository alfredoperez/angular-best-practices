# Angular Ngrx Best Practices

> Use with the core `angular-best-practices` skill.

---

## 1. NgRx State Management

**Impact: HIGH** (Global state)

### 1.1 Keep Reducers Pure

**Impact: HIGH** (Predictable state, testable, time-travel debugging)

Reducers must be pure functions: no side effects, no HTTP calls, no subscriptions. Only compute new state from action and current state. Move side effects to Effects.

**Example:**

```typescript
on(UsersActions.load, state => ({ ...state, loading: true }));
// HTTP call goes in UsersEffects
```

### 1.2 Use createActionGroup

**Impact: MEDIUM** (Less boilerplate, better organization)

Use `createActionGroup({ source: 'Feature', events: {...} })` to group related actions by source instead of individual `createAction()` calls. This reduces boilerplate and organizes actions by feature.

### 1.3 Use Entity Adapter for Collections

**Impact: MEDIUM** (O(1) lookups, less boilerplate)

Use `createEntityAdapter<T>()` from `@ngrx/entity` for CRUD operations on collections. The adapter provides optimized methods like `addOne`, `updateOne`, `removeOne` with O(1) lookups and generates selectors automatically.

### 1.4 Use Feature Selectors

**Impact: MEDIUM** (Memoized selection, better performance)

Use `createFeatureSelector` and `createSelector` for memoized state selection. Selectors only recompute when their inputs change.

**Example:**

```typescript
const selectCounterState = createFeatureSelector<CounterState>('counter');
export const selectCount = createSelector(selectCounterState, s => s.count);
```

### 1.5 Use selectSignal in Components

**Impact: MEDIUM** (Simpler templates, zoneless-ready)

Use `store.selectSignal(selector)` instead of `store.select(selector)` with `| async` pipe. Signal-based selection simplifies templates (use `users()` instead of `users$ | async`) and is zoneless-ready.

---
