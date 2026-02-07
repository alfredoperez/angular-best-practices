---
title: E2E Testing with Playwright
impact: MEDIUM
impactDescription: reliable end-to-end user journey tests
tags: testing, playwright, e2e, integration
---

## E2E Testing with Playwright

Use Playwright for E2E tests. Test user journeys, use Page Object pattern for reusable actions, mock APIs with `page.route()`.

```typescript
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/dashboard');
});
```
