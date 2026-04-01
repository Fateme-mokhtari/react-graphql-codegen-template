import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: "@apollo/client/react",
      },
    },
  },
};

export default config;
