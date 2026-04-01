import { useEffect } from "react";

interface LoadMoreSentinelProps {
  ref: React.RefObject<HTMLDivElement | null>;
  onVisible: () => void;
  isLoading: boolean;
}

export function LoadMoreSentinel({
  ref,
  onVisible,
  isLoading,
}: LoadMoreSentinelProps) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          onVisible();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, onVisible, isLoading]);

  return (
    <div
      ref={ref}
      className="load-more-sentinel"
      aria-live="polite"
      aria-label="Load more characters"
    >
      {isLoading && <p>Loading more...</p>}
    </div>
  );
}
