import { useNavigate, useParams } from "react-router-dom";
import { useGetCharacterDetailQuery } from "../../generated/graphql-types";
import "./CharacterDetail.css";

export function CharacterDetail() {
  const navigate = useNavigate();
  const { characterId } = useParams<{ characterId: string }>();

  const { data, loading, error } = useGetCharacterDetailQuery({
    variables: { id: characterId || "" },
    skip: !characterId,
  });

  const character = data?.character;

  if (!characterId) {
    return (
      <main className="app">
        <section className="card">
          <p className="error">Character ID not found</p>
          <button onClick={() => navigate("/")}>Back to Characters</button>
        </section>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="app">
        <section className="card">
          <p>Loading character details...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app">
        <section className="card">
          <p className="error">Error: {error.message}</p>
          <button onClick={() => navigate("/")}>Back to Characters</button>
        </section>
      </main>
    );
  }

  if (!character) {
    return (
      <main className="app">
        <section className="card">
          <p>Character not found</p>
          <button onClick={() => navigate("/")}>Back to Characters</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="card character-detail">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Characters
        </button>

        <div className="detail-header">
          <img
            src={character.image ?? ""}
            alt={character.name ?? ""}
            className="detail-image"
          />
          <div className="detail-info">
            <h1>{character.name}</h1>
            <p className="status">
              {character.status} • {character.species}
            </p>
            {character.gender && <p className="gender">{character.gender}</p>}
            {character.type && <p className="type">{character.type}</p>}
          </div>
        </div>

        <div className="detail-sections">
          <section className="detail-section">
            <h2>Location</h2>
            <p>{character.location?.name ?? "Unknown"}</p>
          </section>

          {character.origin &&
            character.origin.name !== character.location?.name && (
              <section className="detail-section">
                <h2>Origin</h2>
                <p>{character.origin.name ?? "Unknown"}</p>
              </section>
            )}

          {character.episode && character.episode.length > 0 && (
            <section className="detail-section">
              <h2>Episodes ({character.episode.length})</h2>
              <div className="episodes-grid">
                {character.episode
                  .flatMap((ep) => (ep ? [ep] : []))
                  .map((ep) => (
                    <div key={ep.id} className="episode-card">
                      <p className="episode-name">{ep.name}</p>
                      <p className="episode-number">{ep.episode}</p>
                      {ep.air_date && (
                        <p className="episode-date">{ep.air_date}</p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {character.created && (
            <section className="detail-section">
              <h2>Created</h2>
              <p>{new Date(character.created).toLocaleDateString()}</p>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
