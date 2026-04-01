# React + TypeScript + Vite

A modern React portfolio project demonstrating GraphQL integration, code generation, and professional React patterns.

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

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
