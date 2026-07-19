import MessageBox from "lucide-solid/icons/message-square-text";
import X from "lucide-solid/icons/x";
import {
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";
import AskAIMessage from "~/components/AskAIMessage";
import { RAG_BOT_NAME, RAG_MAX_HISTORY, SHORTCUTS } from "~/utils/constants";
import { setupFocusTrap } from "~/utils/focus-trap";
import { escapeHtml, shouldHideSources } from "~/utils/search-utils";
import type { SourceResult } from "~/utils/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: SourceResult[];
  keywords?: string[];
}

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi I'm ${RAG_BOT_NAME}, the local guide around here, what can I help you with?`,
};

export default function AskAI() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [messages, setMessages] = createSignal<ChatMessage[]>([GREETING]);
  const [inputValue, setInputValue] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [loadingText, setLoadingText] = createSignal("...");
  const [streamingContent, setStreamingContent] = createSignal<string | null>(
    null,
  );
  const [hasStartedStreaming, setHasStartedStreaming] = createSignal(false);
  let panelRef: HTMLDivElement | undefined;
  let messagesRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    messages();
    isLoading();
    streamingContent();
    requestAnimationFrame(() => {
      if (messagesRef) {
        messagesRef.scrollTop = messagesRef.scrollHeight;
      }
    });
  });

  createEffect(() => {
    if (isOpen()) {
      requestAnimationFrame(() => inputRef?.focus());
      if (!panelRef) return;
      const trapCleanup = setupFocusTrap(panelRef);
      onCleanup(() => trapCleanup());
    }
  });

  onMount(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === SHORTCUTS.ASK_AI) {
        e.preventDefault();
        if (isOpen()) {
          requestAnimationFrame(() => inputRef?.focus());
        } else {
          setIsOpen(true);
        }
      }
    };
    const handleShortcut = () => {
      if (isOpen()) {
        requestAnimationFrame(() => inputRef?.focus());
      } else {
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("shortcut:askai", handleShortcut);
    onCleanup(() => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("shortcut:askai", handleShortcut);
    });
  });

  const toggleOpen = () => {
    const next = !isOpen();
    setIsOpen(next);
    if (!next) {
      setInputValue("");
    }
  };

  const handleSend = async () => {
    const query = inputValue().trim();
    if (!query || isLoading()) return;

    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setIsLoading(true);
    setHasStartedStreaming(false);
    setStreamingContent(null);

    const history = messages()
      .slice(1, -1)
      .slice(-RAG_MAX_HISTORY)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history }),
      });

      if (response.status === 429 || response.status === 400) {
        const errData = (await response.json().catch(() => ({}))) as Record<
          string,
          unknown
        >;
        const skipMsg =
          errData.type === "skip" ? String(errData.content) : null;
        if (skipMsg) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: skipMsg },
          ]);
          return;
        }
      }

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Chat API returned no body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedContent = "";
      let sources: SourceResult[] = [];
      let keywords: string[] = [];
      let done = false;

      while (!done) {
        const { done: readerDone, value } = await reader.read();
        if (readerDone) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") {
            done = true;
            break;
          }

          try {
            const parsed = JSON.parse(data) as Record<string, unknown>;

            if (parsed.type === "error" || parsed.type === "skip") {
              accumulatedContent = String(parsed.content ?? "");
              setStreamingContent(accumulatedContent);
              done = true;
              break;
            }

            if (parsed.type === "meta") {
              sources = (parsed.sources ?? []) as SourceResult[];
              keywords = (parsed.keywords ?? []) as string[];
              break;
            }

            const choices = parsed.choices as
              | Array<{ delta?: { content?: string } }>
              | undefined;
            const delta = choices?.[0]?.delta?.content;
            if (delta) {
              accumulatedContent += delta;
              setStreamingContent(accumulatedContent);
              if (!hasStartedStreaming()) {
                setHasStartedStreaming(true);
              }
            }
          } catch {
            // skip unparseable events
          }
        }
      }

      const finalSources = shouldHideSources(accumulatedContent, sources)
        ? []
        : sources;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: accumulatedContent,
          sources: finalSources,
          keywords,
        },
      ]);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something ain't right, come back later...",
        },
      ]);
    } finally {
      setIsLoading(false);
      setLoadingText("...");
      setStreamingContent(null);
      setHasStartedStreaming(false);
      requestAnimationFrame(() => inputRef?.focus());
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        class="askai-trigger gap-2"
        onClick={toggleOpen}
        aria-label="Ask AI for help"
      >
        <MessageBox class="block md:hidden" size={18} />
        <span class="hidden md:inline">Ask for help</span>
        <span class="askai-shortcut" aria-hidden="true">
          <kbd>{SHORTCUTS.ASK_AI.toUpperCase()}</kbd>
        </span>
      </button>

      <Show when={isOpen()}>
        <Portal>
          <button
            type="button"
            class="askai-backdrop"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          />
          <div
            ref={panelRef}
            class="askai-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Ask a local guide"
          >
            <div class="askai-header">
              <span class="askai-header__title">Talk to a local</span>
              <button
                type="button"
                class="absolute top-3 right-3 inline-flex items-center gap-1.5 z-10 cursor-pointer bg-transparent border-none text-muted hover:text-heading transition-colors duration-150"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <kbd class="shortcut-kbd hidden md:inline-flex">esc</kbd>
                <X size={18} class="inline-flex md:hidden" />
              </button>
            </div>

            <div class="askai-messages" ref={messagesRef}>
              <For each={messages()}>
                {(msg) => (
                  <AskAIMessage
                    role={msg.role}
                    content={msg.content}
                    sources={msg.sources}
                    keywords={msg.keywords}
                    onClose={() => setIsOpen(false)}
                  />
                )}
              </For>

              <Show when={isLoading() && !hasStartedStreaming()}>
                <div class="askai-message askai-message--assistant">
                  <div class="askai-message__label">{RAG_BOT_NAME}</div>
                  <div class="askai-loading">
                    {loadingText() === "..." ? (
                      <>
                        <span class="askai-loading__dot">.</span>
                        <span class="askai-loading__dot">.</span>
                        <span class="askai-loading__dot">.</span>
                      </>
                    ) : (
                      <span class="askai-loading__wave">{loadingText()}</span>
                    )}
                  </div>
                </div>
              </Show>

              <Show when={hasStartedStreaming()}>
                <div class="askai-message askai-message--assistant">
                  <div class="askai-message__label">{RAG_BOT_NAME}</div>
                  <div class="askai-message__content">
                    {escapeHtml(streamingContent() ?? "")}
                  </div>
                </div>
              </Show>
            </div>

            <div class="askai-inputbar">
              <input
                ref={inputRef}
                type="text"
                class="askai-inputbar__input"
                placeholder="Ask a question..."
                value={inputValue()}
                onInput={(e) => setInputValue(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading()}
                maxLength={1000}
                autofocus
              />
              <button
                type="button"
                class="askai-inputbar__send"
                data-umami-event="ask-for-help"
                onClick={handleSend}
                disabled={
                  isLoading() ||
                  !inputValue().trim() ||
                  inputValue().length > 1000
                }
              >
                Send
              </button>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
}
