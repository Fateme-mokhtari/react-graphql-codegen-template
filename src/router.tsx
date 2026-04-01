/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { CharacterDetail } from "./pages/CharacterDetail/CharacterDetail";
import NotFound from "./pages/NotFound";

function LoadingPage() {
  return (
    <main className="app">
      <section className="card">
        <p>Loading...</p>
      </section>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "character/:characterId",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <CharacterDetail />
      </Suspense>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
