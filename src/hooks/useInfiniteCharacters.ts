import { useCallback, useMemo, useRef } from "react";
import { useGetCharactersQuery } from "../generated/graphql-types";

export function useInfiniteCharacters() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch initial page
  const { data, loading, error, fetchMore } = useGetCharactersQuery({
    variables: { page: 1 },
  });

  // Accumulate characters from all fetched pages
  const allCharacters = useMemo(
    () => data?.characters?.results?.flatMap((c) => (c ? [c] : [])) ?? [],
    [data?.characters?.results]
  );

  const pageInfo = data?.characters?.info;
  const canLoadMore = Boolean(pageInfo?.next);

  const loadMore = useCallback(async () => {
    if (!canLoadMore || loading || !pageInfo?.next) return;

    const nextPage = pageInfo.next;

    // Fetch the next page and append results
    await fetchMore({
      variables: { page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        // Concatenate results: existing + new
        return {
          characters: {
            ...prev.characters,
            results: [
              ...(prev.characters?.results ?? []),
              ...(fetchMoreResult.characters?.results ?? []),
            ],
            info: fetchMoreResult.characters?.info,
          },
        };
      },
    });
  }, [canLoadMore, loading, pageInfo, fetchMore]);

  return {
    allCharacters,
    loading,
    error,
    canLoadMore,
    loadMore,
    sentinelRef,
    observerRef,
  };
}
