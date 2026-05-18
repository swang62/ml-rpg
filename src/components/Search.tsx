import { useNavigate } from "@solidjs/router";
import { createSignal, type JSX, onMount } from "solid-js";
import { type MiniSearchResult, searchLessons } from "~/server/search";
import {
  SEARCH_BLUR_CLOSE_MS,
  SEARCH_DEBOUNCE_MS,
  SEARCH_MIN_QUERY_LENGTH,
} from "~/utils/constants";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Bold query terms in text (text must already be HTML-escaped). */
function boldTerms(text: string, terms: string[]): string {
  let result = text;
  for (const term of terms) {
    result = result.replace(
      new RegExp(`(${escapeRegex(term)})`, "gi"),
      "<strong>$1</strong>",
    );
  }
  return result;
}

// function computeBlurb(query: string, lessonContent: string) {
//   const terms = query
//     .toLowerCase()
//     .split(/\s+/)
//     .filter((t) => t.length >= 2);
//   if (terms.length === 0) return { blurb: "", titleNeedsBold: false };

//   const sentences = lessonContent.match(/[^.!?\n]+[.!?]?/g) ?? [lessonContent];

//   const matchingSentences = sentences.filter((s) =>
//     terms.some((t) => s.toLowerCase().includes(t)),
//   );

//   if (matchingSentences.length > 0) {
//     const snippet = matchingSentences.slice(0, 2).join(" ");
//     return {
//       blurb: boldTerms(escapeHtml(snippet), terms),
//       titleNeedsBold: false,
//     };
//   }

//   // Title-only match: include first sentence of content, bold title
//   const firstSentence = sentences[0] || lessonContent;
//   return { blurb: escapeHtml(firstSentence), titleNeedsBold: true };
// }

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeIndex, setActiveIndex] = createSignal(-1);
  const [results, setResults] = createSignal<MiniSearchResult[]>([]);
  const [mobileOpen, setMobileOpen] = createSignal(false);
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
      if (trimmed.length < SEARCH_MIN_QUERY_LENGTH) {
        setResults([]);
        return;
      }
      setResults(await searchLessons(trimmed));
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const r = results();
    const handlers: Record<string, () => void> = {
      Escape: () => {
        setIsOpen(false);
        setQuery("");
        setResults([]);
        setMobileOpen(false);
        inputRef?.blur();
      },
      ArrowDown: () => {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, r.length - 1));
      },
      ArrowUp: () => {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      },
      Enter: () => {
        if (activeIndex() >= 0 && r[activeIndex()]) {
          e.preventDefault();
          navigate(r[activeIndex()].url);
          inputRef?.blur();
        }
      },
    };
    handlers[e.key]?.();
  };

  const handleFocus = () => setIsOpen(true);

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      if (!mobileOpen()) {
        setQuery("");
        setResults([]);
      }
    }, SEARCH_BLUR_CLOSE_MS);
  };

  const toggleMobileSearch = () => {
    setMobileOpen((open) => {
      const next = !open;
      if (next) {
        setTimeout(() => inputRef?.focus(), 100);
      } else {
        setQuery("");
        setResults([]);
        setIsOpen(false);
      }
      return next;
    });
  };

  const isMac = navigator.platform.includes("Mac");

  return (
    <div class="search" classList={{ "search--mobile-open": mobileOpen() }}>
      <button
        type="button"
        class="search__toggle"
        onClick={toggleMobileSearch}
        aria-label={mobileOpen() ? "Close search" : "Open search"}
        aria-expanded={mobileOpen()}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          {mobileOpen() ? (
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          ) : (
            <path
              d="M7.5 13a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM15 15l-3.5-3.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          )}
        </svg>
      </button>
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
          placeholder="Search topics..."
          value={query()}
          onInput={handleInput}
          onkeydown={handleKeydown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search objectives"
        />
        <span class="search__shortcut" aria-hidden="true">
          <kbd>{isMac ? "\u2318" : "Ctrl"}</kbd>
          <kbd>K</kbd>
        </span>
      </div>
      {isOpen() && query().trim().length >= SEARCH_MIN_QUERY_LENGTH && (
        <div class="search__dropdown" role="listbox">
          {results().length === 0 ? (
            <div class="search__empty"></div>
          ) : (
            results().map((result, i) => {
              const q = query();
              const terms = q
                .toLowerCase()
                .split(/\s+/)
                .filter((t) => t.length >= SEARCH_MIN_QUERY_LENGTH);
              const titleHtml = boldTerms(
                escapeHtml(result.lessonTitle),
                terms,
              );
              return (
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
                    setMobileOpen(false);
                  }}
                >
                  <span class="search__result-title" innerHTML={titleHtml} />
                  <span class="search__result-meta">
                    <span>{result.categoryTitle}</span>
                    <span>{result.sectionTitle}</span>
                    {/* <span>Relevance: {Math.round(result.score)}</span> */}
                  </span>
                </a>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
