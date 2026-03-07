# Template Optimization Explanation

## Changes Made

### 1. Replaced `*ngIf` with `@if` control flow

**Before:** `<div *ngIf="products$ | async as products">`
**After:** `@if (products$ | async; as products) { ... }`

**Why:** The built-in control flow syntax (`@if`, `@for`) was introduced in Angular 17 and is the recommended approach going forward. It produces more efficient compiled code, avoids the overhead of structural directives, and enables better type narrowing.

### 2. Added `trackBy` to `*ngFor`

**Before:** `*ngFor="let product of products"`
**After:** `*ngFor="let product of products; trackBy: trackByProductId"`

**Why:** Without `trackBy`, Angular destroys and recreates every DOM element whenever the list changes. With `trackBy`, Angular can identify which items changed and only update those specific DOM nodes. For a large product list, this is one of the biggest performance wins. The component class needs a corresponding method:

```typescript
trackByProductId(index: number, product: Product): number | string {
  return product.id;
}
```

### 3. Added `loading="lazy"` to images

**Before:** `<img src="{{product.image}}" />`
**After:** `<img [src]="product.image" loading="lazy" />`

**Why:** Native lazy loading tells the browser to defer loading off-screen images until the user scrolls near them. For a large product list, most images are below the fold, so this dramatically reduces initial page load time, bandwidth usage, and memory consumption.

### 4. Replaced interpolation binding with property binding for `img src`

**Before:** `src="{{product.image}}"`
**After:** `[src]="product.image"`

**Why:** Property binding (`[src]`) is the idiomatic Angular approach. Interpolation (`{{}}`) for attributes works but forces Angular to concatenate strings. Property binding is slightly more efficient and avoids potential issues with special characters in URLs.

### 5. Replaced method call `getFormattedPrice(product)` with a pre-computed property

**Before:** `{{ getFormattedPrice(product) }}`
**After:** `{{ product.formattedPrice }}`

**Why:** This is a critical performance fix. Method calls in templates are re-evaluated on every change detection cycle. For a list of N products, `getFormattedPrice()` runs N times per cycle, and change detection can fire many times per second (on mouse moves, scrolls, keystrokes, etc.). Moving the computation out of the template eliminates this overhead entirely. The price should be pre-computed when the data is fetched or mapped, e.g.:

```typescript
this.products$ = this.productService.getProducts().pipe(
  map(products => products.map(p => ({
    ...p,
    formattedPrice: this.formatPrice(p)
  })))
);
```

Alternatively, if a pipe is preferred, a custom `price` pipe would also work since pure pipes are memoized by Angular and only re-execute when inputs change.

### 6. Added `alt` attribute to images

**Before:** `<img src="{{product.image}}" />`
**After:** `<img [src]="product.image" [attr.alt]="product.name" loading="lazy" />`

**Why:** Accessibility best practice. Every image should have an `alt` attribute for screen readers and when images fail to load. This does not affect performance but is an important quality improvement.

## Summary of Performance Impact

| Change | Impact |
|---|---|
| `trackBy` on list | High - prevents full DOM recreation on list updates |
| Remove method call in template | High - eliminates repeated computation every change detection cycle |
| Lazy loading images | High - reduces initial load time and bandwidth for large lists |
| `@if` control flow | Medium - more efficient compiled output |
| Property binding for src | Low - minor efficiency gain |
