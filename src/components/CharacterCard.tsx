import type { GetCharactersQuery } from "../generated/graphql-types";

type CharacterItem = NonNullable<
  NonNullable<NonNullable<GetCharactersQuery["characters"]>["results"]>[number]
>;

interface Props {
  character: CharacterItem;
  onClick?: (characterId: string) => void;
}

export function CharacterCard({ character, onClick }: Props) {
  const handleClick = () => {
    if (onClick && character.id) {
      onClick(character.id);
    }
  };

  return (
    <article
      className="character-card"
      onClick={handleClick}
      style={onClick ? { cursor: "pointer" } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }
          : undefined
      }
    >
      <img src={character.image ?? ""} alt={character.name ?? ""} />
      <div>
        <h2>{character.name}</h2>
        <p>{character.species}</p>
        <span>{character.status}</span>
      </div>
    </article>
  );
}
