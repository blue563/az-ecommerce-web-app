# AZ Shop

E-commerce web app built with Vue 3 + TypeScript, using the Fake Store API.

## Tech stack

- Vue 3 (`<script setup>`, Composition API)
- TypeScript
- Vite
- Vue Router (category filter via query string, auth guard)
- Pinia (products, auth, cart, wishlist, theme)
- SCSS with CSS Custom Properties (light/dark theme tokens)
- Vitest + @vue/test-utils

## Setup

\`\`\`bash:
npm install
npm run dev
\`\`\`

## Test / build

\`\`\`bash:
npm run test
npm run build
npm run preview
\`\`\`

## Demo login

The Fake Store API only accepts its seeded accounts. Use:
- username: `mor_2314`
- password: `83r5^_`

(See `GET /users` on the API for other valid accounts.)

Cart and Wishlist require login and are route-guarded.

## Features

- Product grid with dynamic categories, filterable via `?category=` query
  string (survives refresh/direct links)
- Product detail view with loading/error states
- Login/logout via `POST /auth/login`, session persisted in localStorage
- Cart and Wishlist (client-side state, no persistence by design)
- Light/dark theme toggle
- Responsive layout with a collapsible mobile menu
- Vitest unit + component tests

## Known limitations

- Cart/Wishlist state resets on page reload (client-side only, per
  challenge spec).
- Auth token stored in localStorage; a production app would use
  httpOnly cookies instead.

## Use of AI tools

I used Claude (Anthropic) as a learning/pair-programming assistant while
building this project: it helped me understand Vue 3/TypeScript/Pinia
concepts, suggested code structure, and helped debug specific issues I
ran into (routing, reactivity, responsive CSS, accessibility). I wrote
and adapted the code myself, validating it at each step by running
`vue-tsc`, `npm run build`, `npm run test`, and manually testing every
flow (filtering, deep links, login/logout, cart/wishlist, keyboard
navigation, responsive layout) in the browser.