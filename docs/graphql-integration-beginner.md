# Beginner Guide: GraphQL Integration with Generated Types and Hooks

This guide explains, step by step, how this project integrates GraphQL using Apollo Client, .graphql files, generated TypeScript types, and generated reusable hooks.

## What You Get

- Write queries in separate `.graphql` files.
- Generate TypeScript types from your GraphQL schema.
- Generate ready-to-use React Apollo hooks like `useGetCharactersQuery`.
- Keep your React components cleaner and safer.

## Why This Is a Good Pattern

- Better DX: autocomplete and compile-time checks for GraphQL responses.
- Fewer runtime bugs: field/type mismatches are caught earlier.
- Reusability: generated hooks can be reused across components.
- Scalability: each operation lives in its own file.

## 1) Dependencies Installed

Main runtime packages:

```bash
pnpm add @apollo/client graphql react react-dom
```

Code generation packages:

```bash
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

## 2) Scripts Added

In `package.json`, these scripts were added:

```json
{
  "scripts": {
    "query:new": "node ./scripts/new-query.mjs",
    "generate:types": "graphql-codegen --config codegen.ts",
    "generate:types:watch": "graphql-codegen --config codegen.ts --watch"
  }
}
```

What they do:

- `query:new`: creates a new query file with sample content.
- `generate:types`: generates schema + operation types and hooks.
- `generate:types:watch`: keeps regenerating while you edit.

## 3) Query Scaffold Script

File: `scripts/new-query.mjs`

Purpose:

- You run a command like `pnpm query:new GetEpisodes`.
- It creates `src/queries/getEpisodes.graphql`.
- It fills the file with a starter query so you can edit quickly.

Example:

```bash
pnpm query:new GetEpisodes
```

## 4) Codegen Configuration

File: `codegen.ts`

Configuration summary:

- `schema`: remote schema URL (`https://rickandmortyapi.com/graphql`).
- `documents`: all `.graphql` files in `src`.
- output file: `src/generated/graphql-types.ts`.
- plugins:
  - `typescript`
  - `typescript-operations`
  - `typescript-react-apollo`

Important options:

- `withHooks: true` to generate React hooks.
- `withHOC: false` and `withComponent: false` to avoid legacy patterns.
- `apolloReactHooksImportFrom: "@apollo/client/react"` for Apollo Client v4 imports.

## 5) Writing Queries in .graphql Files

Example file:

```graphql
query GetCharacters {
  characters(page: 1) {
    results {
      id
      name
      status
      species
      image
    }
  }
}
```

Saved at: `src/queries/getCharacters.graphql`

## 6) Generating Types and Hooks

Run:

```bash
pnpm generate:types
```

This generates:

- operation result/variables types
- schema utility types
- hooks such as `useGetCharactersQuery`

Output file:

- `src/generated/graphql-types.ts`

## 7) Using Generated Hook in React

Before (manual gql + useQuery typing):

- extra boilerplate and manual generic typing

After (generated hook):

```tsx
import { useGetCharactersQuery } from "./generated/graphql-types";

function App() {
  const { data, loading, error } = useGetCharactersQuery();
  // render UI
}
```

This is simpler and strongly typed.

## 8) Daily Workflow

1. Create query scaffold:

```bash
pnpm query:new SomeOperationName
```

2. Edit the generated `.graphql` file in `src/queries`.

3. Generate types/hooks:

```bash
pnpm generate:types
```

4. Import and use generated hook from `src/generated/graphql-types.ts`.

## 9) Common Beginner Questions

### Q: Do I still need to write TypeScript response types manually?

No. Generated operation types replace that manual work.

### Q: Why not write query strings directly in React files?

You can, but separate `.graphql` files are cleaner and easier to scale.

### Q: Do I need to run generation every time?

Yes, unless you use watch mode:

```bash
pnpm generate:types:watch
```

## 10) What Was Implemented in This Project

- Added query scaffolding via `scripts/new-query.mjs`.
- Added GraphQL Codegen config in `codegen.ts`.
- Added scripts in `package.json` for scaffolding and generation.
- Moved query into `src/queries/getCharacters.graphql`.
- Switched app to generated hook usage in `src/App.tsx`.
- Generated artifacts in `src/generated/graphql-types.ts`.

That is the full integration from raw query authoring to typed reusable hook consumption.
