import { ApolloProvider } from "@apollo/client/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppSelector from "./AppSelector";
import { apolloClient } from "./graphql-client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <AppSelector />
    </ApolloProvider>
  </StrictMode>,
);
