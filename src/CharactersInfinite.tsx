import { useCallback } from "react";
import "./CharactersInfinite.css";
import { CharacterCard } from "./components/CharacterCard";
import { LoadMoreSentinel } from "./components/LoadMoreSentinel";
import { useInfiniteCharacters } from "./hooks/useInfiniteCharacters";

const header = (
  <>
    <h1>React + GraphQL (Infinite Scroll)</h1>
    <p className="description">
      Frontend is connected to a public GraphQL API with infinite scroll.
    </p>
  </>
);

export function CharactersInfinite() {
  const { allCharacters, loading, error, canLoadMore, loadMore, sentinelRef } =
    useInfiniteCharacters();

  const handleLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  return (
    <main className="app">
      <section className="card">
        {header}

        {error && <p className="error">Error: {error.message}</p>}

        {allCharacters.length > 0 ? (
          <>
            <div className="result-grid">
              {allCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {canLoadMore && (
              <LoadMoreSentinel
                ref={sentinelRef}
                onVisible={handleLoadMore}
                isLoading={loading}
              />
            )}
          </>
        ) : loading ? (
          <p>Loading characters...</p>
        ) : null}
      </section>
    </main>
  );
}
