import { useNavigate } from "@solidjs/router";
import { createSignal, type JSX, onMount } from "solid-js";
import { loadSearchIndex, searchSiteData } from "~/utils/search";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeIndex, setActiveIndex] = createSignal(-1);
  const [results, setResults] = createSignal<
    {
      articleTitle: string;
      categoryTitle: string;
      subsectionTitle: string;
      url: string;
    }[]
  >([]);
  let inputRef: HTMLInputElement | undefined;
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef?.focus();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const q = e.currentTarget.value;
    setQuery(q);
    setActiveIndex(-1);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const trimmed = q.trim();
      if (trimmed.length < 3) {
        setResults([]);
        return;
      }
      await loadSearchIndex();
      setResults(searchSiteData(trimmed));
    }, 200);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const r = results();
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      setResults([]);
      inputRef?.blur();
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
      e.preventDefault();
      navigate(r[activeIndex()].url);
      inputRef?.blur();
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
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6.5 11.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM13 13l-3-3"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <input
          ref={inputRef}
          type="search"
          id="search-input"
          name="search"
          class="search__input"
          placeholder="Search lessons..."
          value={query()}
          onInput={handleInput}
          onkeydown={handleKeydown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search lessons"
        />
        <span class="search__shortcut" aria-hidden="true">
          <kbd>{navigator.platform.includes("Mac") ? "\u2318" : "Ctrl"}</kbd>
          <kbd>K</kbd>
        </span>
      </div>
      {isOpen() && query().trim().length >= 3 && (
        <div class="search__dropdown" role="listbox">
          {results().length === 0 ? (
            <div class="search__empty">No results found</div>
          ) : (
            results().map((result, i) => (
              <a
                href={result.url}
                class={`search__result ${i === activeIndex() ? "search__result--active" : ""}`}
                role="option"
                aria-selected={i === activeIndex()}
                onClick={() => {
                  navigate(result.url);
                  setIsOpen(false);
                  setQuery("");
                  setResults([]);
                }}
              >
                <span class="search__result-title">{result.articleTitle}</span>
                <span class="search__result-meta">
                  <span>{result.categoryTitle}</span>
                  <span>{result.subsectionTitle}</span>
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
