# az-ecommerce-web-app API

NestJS backend for az-ecommerce-web-app, replacing the Fake Store API:
products, categories, and real authentication (bcrypt-hashed passwords,
JWT sessions), backed by a local SQLite database.

## Tech stack

- NestJS (TypeScript)
- TypeORM + better-sqlite3
- bcrypt (password hashing)
- @nestjs/jwt + Passport (JWT authentication)
- @nestjs/config (environment variables)

## Setup

```bash
npm install
cp .env.example .env
```

Then open `.env` and set `JWT_SECRET`.

## Run

```bash
npm run start:dev
```

The server starts on `http://localhost:3000` and automatically creates
`shopvue.db` (SQLite) on first run.

## Seeding the database

The database is empty on first run. Import real product data from the
Fake Store API with:

```bash
npx ts-node src/seed.ts
```

The script is idempotent: if the database already has products, it
won't duplicate them.

## Main endpoints

| Method | Route                       | Description                     | Protected |
|--------|------------------------------|-----------------------------------|-----------|
| GET    | `/products`                  | List products                     | No        |
| GET    | `/products/:id`               | Product detail                    | No        |
| GET    | `/products/categories`        | List categories                   | No        |
| GET    | `/products/category/:name`    | Products filtered by category     | No        |
| POST   | `/auth/register`              | Register a new user               | No        |
| POST   | `/auth/login`                 | Login, returns a JWT              | No        |

## Test

```bash
npm run test
```

## Security notes

- Passwords are never stored in plain text: they are hashed with
  bcrypt (cost factor 10) before being written to the database.
- The JWT secret is read from an environment variable (`.env`, not
  versioned) — see `.env.example` for the template.
- `synchronize: true` in TypeORM is used for local development
  convenience only; a production setup would replace it with
  versioned migrations.

## Connecting the frontend

In the frontend (`ecommerce-app`), set `BASE_URL` in
`src/api/client.ts` to `http://localhost:3000` to use this backend
instead of the Fake Store API.
