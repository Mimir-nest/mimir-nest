# Mimir Nest API

The Mimir Nest API is a lightweight Express-based Content Delivery API serving static JSON data content such as courses, roadmaps, placement DSA metadata, and student perks. All query parameters are strictly validated using `zod`.

## Base URL

- **Development**: `http://localhost:4000/api`
- **Production**: Production API deployment is not currently documented.

---

## Authentication

- **Authentication**: Not currently required. The API is entirely public.

---

## Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/health` | Server health check endpoint |
| `GET` | `/projects` | Retrieve project templates and code comparison archives |
| `GET` | `/courses` | Retrieve curated university and professional courses |
| `GET` | `/perks` | Retrieve verified student email benefits and SaaS discount packs |
| `GET` | `/placement` | Retrieve target companies and featured tracks for placements |
| `GET` | `/roadmaps` | Retrieve engineering discipline learning tracks and roadmaps |

---

## Query Parameters

Query parameters are validated using Zod. Validation errors will return an `HTTP 400 Bad Request`.

### `/projects`

| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `category` | `string` | No | Filter projects by technical category (e.g., `ai`, `cloud`, `cybersecurity`) | `category=ai` |
| `featured` | `boolean` | No | Filter projects by featured flag (`true` or `false`) | `featured=true` |
| `openSource`| `boolean` | No | Filter projects by open-source status | `openSource=true` |
| `search` | `string` | No | Case-insensitive search on title and description | `search=segmentation` |

### `/courses`

| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `category` | `string` | No | Filter courses by learning category (e.g., `web-dev`, `algorithms`) | `category=web-dev` |
| `featured` | `boolean` | No | Filter courses by featured flag | `featured=true` |
| `level` | `string` | No | Filter courses by level (`Beginner`, `Intermediate`, `Advanced`) | `level=Beginner` |
| `search` | `string` | No | Case-insensitive search on title, description, and provider | `search=odin` |

### `/perks`

| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `category` | `string` | No | Filter perks by category (e.g., `Developers`, `Learning`, `Cloud`) | `category=Developers` |
| `verified` | `boolean` | No | Filter perks by verification status | `verified=true` |
| `search` | `string` | No | Case-insensitive search on title, company, and description | `search=github` |

---

## Endpoint Details

### 1. Health Check
`GET /health` (Note: This is served directly from the root base path: `http://localhost:4000/health`)

**Response (200 OK)**
```json
{
  "ok": true
}
```

### 2. Get Projects
`GET /projects`

**Response (200 OK)**
```json
{
  "data": {
    "projects": [
      {
        "id": "customer-segmentation",
        "title": "Customer Segmentation",
        "description": "Develop a model to categorize customers based on purchasing behavior.",
        "category": "ai",
        "difficulty": "Intermediate",
        "technologies": ["Python", "K-means", "Matplotlib", "Scikit-learn"],
        "github": "https://github.com/...",
        "demo": "https://youtube.com/...",
        "featured": false,
        "openSource": true,
        "stars": 0
      }
    ]
  },
  "meta": {
    "count": 1
  }
}
```

### 3. Get Courses
`GET /courses`

**Response (200 OK)**
```json
{
  "data": [
    {
      "id": "complete-web-development-bootcamp",
      "title": "Complete Web Development Bootcamp",
      "provider": "The Odin Project",
      "duration": "6-9 months",
      "level": "Beginner",
      "rating": 4.8,
      "students": "50k+",
      "description": "Learn full-stack web development from scratch with HTML, CSS, JavaScript, React, and Node.js.",
      "topics": ["HTML/CSS", "JavaScript", "React", "Node.js"],
      "url": "https://www.theodinproject.com/",
      "price": "Free",
      "iconKey": "code",
      "gradient": "from-blue-600/20 to-indigo-600/20",
      "category": "web-dev",
      "free": true,
      "featured": true
    }
  ],
  "meta": {
    "count": 1
  }
}
```

### 4. Get Perks
`GET /perks`

**Response (200 OK)**
```json
{
  "data": [
    {
      "id": "github-student-developer-pack",
      "title": "GitHub Student Developer Pack",
      "provider": "GitHub",
      "company": "GitHub",
      "category": "Developers",
      "description": "A bundle of free developer tools and services from GitHub Education.",
      "offers": ["GitHub Pro", "GitHub Codespaces Pro access", "GitHub Copilot Student"],
      "link": "https://education.github.com/pack",
      "benefit_type": "Student Pack",
      "value": "Not specified",
      "currency": "None",
      "region": "Global",
      "eligibility": "Enrolled in a degree- or diploma-granting program, aged 13+",
      "verification_method": "GitHub Education verification",
      "duration": "While enrolled",
      "renewal": "Annual verification",
      "source_type": "GitHub Student Pack",
      "last_verified": "2026-08-23",
      "verified": true
    }
  ],
  "meta": {
    "count": 1
  }
}
```

### 5. Get Placement Details
`GET /placement`

**Response (200 OK)**
```json
{
  "data": {
    "companies": ["Amazon", "Microsoft", "Google", "Meta"],
    "featuredTracks": ["DSA Question Bank", "Company-wise Interview Prep"],
    "updatedAt": "2026-08-02"
  },
  "meta": {
    "count": 1
  }
}
```

### 6. Get Roadmaps
`GET /roadmaps`

**Response (200 OK)**
```json
{
  "data": [
    {
      "id": "frontend-engineer",
      "title": "Frontend Engineer",
      "summary": "A practical path for building production-ready web interfaces.",
      "steps": [
        "HTML, CSS, and JavaScript fundamentals",
        "React, TypeScript, and component architecture"
      ]
    }
  ],
  "meta": {
    "count": 1
  }
}
```

---

## Errors and Validation Failures

If validation fails (e.g. passing a non-boolean value to a boolean filter), or if the route is not found, the API returns a standard JSON error response:

### Route Not Found (404)
```json
{
  "error": {
    "message": "Route not found"
  }
}
```

### Validation Error (400)
```json
{
  "error": {
    "message": "Invalid query parameters",
    "details": [
      {
        "code": "invalid_union",
        "unionErrors": [
          {
            "issues": [
              {
                "code": "invalid_type",
                "expected": "boolean",
                "received": "string",
                "path": ["featured"],
                "message": "Expected boolean, received string"
              }
            ],
            "name": "ZodError"
          }
        ],
        "path": ["featured"],
        "message": "Invalid input"
      }
    ]
  }
}
```

---

## Example Requests

### Retrieve all AI Category Projects
```bash
curl "http://localhost:4000/api/projects?category=ai"
```

### Retrieve only featured Courses
```bash
curl "http://localhost:4000/api/courses?featured=true"
```

### Search for specific Perks
```bash
curl "http://localhost:4000/api/perks?search=github"
```
