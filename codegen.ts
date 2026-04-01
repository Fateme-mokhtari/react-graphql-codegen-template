import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/generated/graphql-types.ts": {
      plugins: [
        { add: { content: "// @ts-nocheck" } },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: "@apollo/client/react",
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
