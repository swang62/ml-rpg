import { createSignal, type JSX } from "solid-js";
import { siteData } from "~/data/site-data";
import { searchSiteData } from "~/utils/search";

export default function Search() {
  const [query, setQuery] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeIndex, setActiveIndex] = createSignal(-1);

  const results = () => {
    const q = query().trim();
    if (!q) return [];
    return searchSiteData(siteData, q);
  };

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setQuery(e.currentTarget.value);
    setActiveIndex(-1);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const r = results();
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, r.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
      return;
    }
    if (e.key === "Enter" && activeIndex() >= 0 && r[activeIndex()]) {
      window.open(r[activeIndex()].url, "_blank", "noopener,noreferrer");
    }
  };

  const handleFocus = () => setIsOpen(true);

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div class="search">
      <div class="search__input-wrapper">
        <svg
          class="search__icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 12.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM14 14l-3.5-3.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <input
          type="search"
          class="search__input"
          placeholder="Search articles..."
          value={query()}
          onInput={handleInput}
          onkeydown={handleKeydown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search articles"
        />
      </div>
      {isOpen() && query().trim() && (
        <div class="search__dropdown" role="listbox">
          {results().length === 0 ? (
            <div class="search__empty">No results found</div>
          ) : (
            results().map((result, i) => (
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                class={`search__result ${i === activeIndex() ? "search__result--active" : ""}`}
                role="option"
                aria-selected={i === activeIndex()}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
              >
                <span class="search__result-title">{result.articleTitle}</span>
                <span class="search__result-meta">
                  {result.categoryTitle} / {result.subsectionTitle}
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
