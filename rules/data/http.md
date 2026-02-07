---
title: HTTP Client Patterns
impact: HIGH
impactDescription: Secure and efficient data fetching
tags: data, http, interceptors, api
---

## HTTP Client Patterns

Use functional `HttpInterceptorFn` for request/response handling. Always type API responses (avoid `any`). Use `HttpContext` to pass config to interceptors.

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  return token ? next(req.clone({ setHeaders: { Authorization: token } })) : next(req);
};

// Skip interceptor: http.get('/api', { context: new HttpContext().set(SKIP_AUTH, true) })
```
