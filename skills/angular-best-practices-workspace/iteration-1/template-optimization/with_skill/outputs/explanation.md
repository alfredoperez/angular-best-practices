# Template Optimization Explanation

## Changes Applied

### 1. Replaced `*ngIf` + `async` pipe with `toSignal()` (Rule 5.11)

**Before:** `*ngIf="products$ | async as products"`
**After:** `products()` (signal access in template)

The component should convert the `products$` observable to a signal using `toSignal()` in the component class:

```typescript
products = toSignal(this.products$, { initialValue: [] });
```

This eliminates the `async` pipe subscription management, produces cleaner templates, and is zoneless-ready. The `@if` wrapper becomes unnecessary because `toSignal` provides an initial value.

### 2. Virtual scrolling for large list (Rule 8.3)

**Before:** `*ngFor="let product of products"` rendering all items
**After:** `<cdk-virtual-scroll-viewport>` with `*cdkVirtualFor`

For a "big list of products," rendering every DOM node causes layout thrashing and high memory usage. Virtual scrolling renders only the visible items (~20 DOM nodes instead of potentially thousands), dramatically reducing rendering cost.

The component needs to import `ScrollingModule` from `@angular/cdk/scrolling`.

### 3. Replaced `src` with `ngSrc` using NgOptimizedImage (Rule 8.1)

**Before:** `src="{{product.image}}"`
**After:** `[ngSrc]="product.image"` with `width`, `height`, and `alt` attributes

`NgOptimizedImage` provides automatic lazy loading, srcset generation, preconnect hints, and prevents layout shift by requiring explicit dimensions. The `alt` attribute was also added for accessibility.

The component needs to import `NgOptimizedImage` from `@angular/common`.

### 4. Replaced method call with pure pipe (Rule 8.2)

**Before:** `{{ getFormattedPrice(product) }}`
**After:** `{{ product.price | currency:'USD' }}`

Method calls in templates execute on every change detection cycle. Pure pipes are memoized and only recalculate when the input value changes. The built-in `currency` pipe handles price formatting. If custom formatting is needed, a custom pure pipe should be created instead.

### 5. Added `alt` attribute to images (Accessibility rules)

Images must have descriptive `alt` text for screen readers. Using `product.name` provides meaningful context.

## Component Class Changes Required

The component TypeScript file should be updated to support these template changes:

```typescript
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage, UpperCasePipe, CurrencyPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  standalone: true,
  imports: [NgOptimizedImage, UpperCasePipe, CurrencyPipe, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
}
```

## Performance Impact Summary

| Change | Impact | Reason |
|--------|--------|--------|
| Virtual scrolling | HIGH | Renders only visible items instead of full list |
| NgOptimizedImage | HIGH | Automatic lazy loading, srcset, layout shift prevention |
| Pure pipe over method call | MEDIUM | Memoized; avoids re-execution every CD cycle |
| toSignal over async pipe | MEDIUM | Cleaner, zoneless-ready, no subscription management |
