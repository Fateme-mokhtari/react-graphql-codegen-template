# React + TypeScript + Vite

A production-ready React + TypeScript + Vite starter demonstrating modern GraphQL integration patterns with Apollo Client, automated code generation, and type-safe data fetching.

## Key Features

- **GraphQL Code Generation**: Auto-generated TypeScript types and React Apollo hooks from `.graphql` operations
- **Character Pagination**: Browse Rick & Morty characters with previous/next navigation
- **Character Details**: Click any character to view full profile including origin, location, and episode appearances
- **React Router v6**: Professional client-side routing with Suspense boundaries
- **Type-Safe Queries**: Full TypeScript support for GraphQL operations with no type mismatch bugs

## GraphQL Workflow

Create a new query file with a sample operation:

```bash
pnpm query:new GetEpisodes
```

This creates a file in `src/queries` with starter fields you can edit.

Generate schema and operation types from all `.graphql` files:

```bash
pnpm generate:types
```

Watch mode while editing queries:

```bash
pnpm generate:types:watch
```

Generated types are written to `src/generated/graphql-types.ts`.

Reusable Apollo hooks are generated there too, for example:

```ts
import { useGetCharactersQuery } from "./generated/graphql-types";
```

## Documentation

For a detailed guide on GraphQL integration, see:

- [GraphQL Integration Guide for Beginners](docs/graphql-integration-beginner.md)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
