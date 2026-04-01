import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { useGetCharactersQuery } from "./generated/graphql-types";

const header = (
  <>
    <h1>React + GraphQL</h1>
    <p className="description">Frontend is connected to a public GraphQL API.</p>
  </>
);

function App() {
  const { data, loading, error } = useGetCharactersQuery();
  const characters = data?.characters?.results?.flatMap((c) => (c ? [c] : [])) ?? [];

  return (
    <main className="app">
      <section className="card">
        {header}

        {loading && <p>Loading GraphQL data...</p>}
        {error && <p className="error">Error: {error.message}</p>}

        {characters.length > 0 ? (
          <div className="result-grid">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default App;
