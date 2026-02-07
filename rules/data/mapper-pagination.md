---
title: Use Generic Mapper for Paginated Responses
impact: LOW
impactDescription: Reusable pagination handling
tags: data, mappers, pagination
---

## Use Generic Mapper for Paginated Responses

Create a generic mapper for paginated API responses to avoid repetition across services.

```typescript
function mapPaginated<TDto, T>(dto: PaginatedDto<TDto>, mapper: (d: TDto) => T): PaginatedResponse<T> {
  return {
    items: dto.data.map(mapper),
    hasNext: dto.meta.current_page < dto.meta.total_pages,
  };
}
// Usage: map(dto => mapPaginated(dto, mapUserDto))
```
