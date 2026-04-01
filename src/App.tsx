import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { useGetCharactersQuery } from "./generated/graphql-types";

const header = (
  <>
    <h1>React + GraphQL</h1>
    <p className="description">
      Frontend is connected to a public GraphQL API.
    </p>
  </>
);

function App() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useGetCharactersQuery({
    variables: { page },
  });
  const pageInfo = data?.characters?.info;
  const characters =
    data?.characters?.results?.flatMap((c) => (c ? [c] : [])) ?? [];

  const hasPrevPage = Boolean(pageInfo?.prev);
  const hasNextPage = Boolean(pageInfo?.next);

  return (
    <main className="app">
      <section className="card">
        {header}

        {loading && <p>Loading GraphQL data...</p>}
        {error && <p className="error">Error: {error.message}</p>}

        {pageInfo ? (
          <div className="pagination">
            <button
              type="button"
              onClick={() => {
                if (pageInfo?.prev != null) {
                  setPage(pageInfo.prev);
                }
              }}
              disabled={!hasPrevPage || loading}
            >
              Previous
            </button>
            <p>
              Page {page} of {pageInfo.pages ?? "?"}
            </p>
            <button
              type="button"
              onClick={() => {
                if (pageInfo?.next != null) {
                  setPage(pageInfo.next);
                }
              }}
              disabled={!hasNextPage || loading}
            >
              Next
            </button>
          </div>
        ) : null}

        {characters.length > 0 ? (
          <div className="result-grid">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={(id) => navigate(`/character/${id}`)}
              />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default App;
