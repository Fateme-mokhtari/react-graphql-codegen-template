import type { GetCharactersQuery } from "../generated/graphql-types";

type CharacterItem = NonNullable<
  NonNullable<NonNullable<GetCharactersQuery["characters"]>["results"]>[number]
>;

interface Props {
  character: CharacterItem;
}

export function CharacterCard({ character }: Props) {
  return (
    <article className="character-card">
      <img src={character.image ?? ""} alt={character.name ?? ""} />
      <div>
        <h2>{character.name}</h2>
        <p>{character.species}</p>
        <span>{character.status}</span>
      </div>
    </article>
  );
}
