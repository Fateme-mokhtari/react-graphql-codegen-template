import "./App.css";
import { useGetCharactersQuery } from "./generated/graphql-types";

function App() {
  const { data, loading, error } = useGetCharactersQuery();
  const characters =
    data?.characters?.results?.filter(
      (character): character is NonNullable<typeof character> =>
        Boolean(character),
    ) ?? [];

  return (
    <main className="app">
      <section className="card">
        <h1>React + GraphQL</h1>
        <p className="description">
          Frontend is connected to a public GraphQL API.
        </p>

        {loading && <p>Loading GraphQL data...</p>}
        {error && <p className="error">Error: {error.message}</p>}

        {characters.length > 0 && (
          <div className="result-grid">
            {characters.map((character) => (
              <article className="character-card" key={character.id}>
                <img src={character.image} alt={character.name} />
                <div>
                  <h2>{character.name}</h2>
                  <p>{character.species}</p>
                  <span>{character.status}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
