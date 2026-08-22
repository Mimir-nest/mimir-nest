# API

Base URL: `http://localhost:4000/api`

## Endpoints

- `GET /projects`
- `GET /courses`
- `GET /perks`
- `GET /placement`
- `GET /roadmaps`

## Response Shape

Most content endpoints return:

```json
{
  "data": [],
  "meta": {
    "count": 0
  }
}
```

## Validation

- Query parameters are validated with `zod`.
- CORS is restricted through the `CORS_ORIGIN` environment variable.
