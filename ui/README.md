# Store App UI

Angular frontend for the Store App e-commerce backend.

## Prerequisites

- Node.js 18+ and npm
- Angular CLI (`npm install -g @angular/cli`)
- Backend services running (see main repository README)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
ng serve
```

Open your browser at `http://localhost:4200/`.

## Backend Integration

This UI connects to the following backend services:

| Service | URL | Description |
|---------|-----|-------------|
| Portal (API Gateway) | `http://localhost:5130` | Product API via gRPC proxy |
| User Service | `http://localhost:5239` | Authentication & user management |

### API Endpoints Used

- `GET /api/User/Login?username={username}&password={password}` — User authentication
- `GET /Product/Product` — Fetch product data via portal gateway

## Project Structure

```
src/app/
├── components/
│   ├── layout/          # Navigation header and page layout
│   ├── login/           # Login page with authentication form
│   └── product-list/    # Product listing page
├── guards/
│   └── auth.guard.ts    # Route guard for authenticated pages
├── interceptors/
│   └── auth.interceptor.ts  # Adds JWT token to HTTP requests
├── models/
│   ├── product.model.ts # Product data interfaces
│   └── user.model.ts    # User and auth data interfaces
├── services/
│   ├── auth.service.ts  # Authentication service (login/logout/token)
│   └── product.service.ts  # Product data service
└── environments/
    ├── environment.ts       # Development config
    └── environment.prod.ts  # Production config
```

## Demo Credentials

| Username | Password | Roles |
|----------|----------|-------|
| johndoe | password123 | Admin, User |
| janesmith | password123 | User |
| bobjohnson | password123 | Moderator, User |

## Building

```bash
ng build
```

Build artifacts are stored in `dist/`.
