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
import { queryRAG, type SourceResult } from "~/server/rag";
import { RAG_MAX_HISTORY } from "~/utils/constants";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: SourceResult[];
}

export const AI_BOT_NAME = "Bob";
const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi I'm ${AI_BOT_NAME}, your friendly guide, what can I help you with?`,
};

export default function AskAI() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [messages, setMessages] = createSignal<ChatMessage[]>([GREETING]);
  const [inputValue, setInputValue] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  let messagesRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    messages();
    isLoading();
    requestAnimationFrame(() => {
      if (messagesRef) {
        messagesRef.scrollTop = messagesRef.scrollHeight;
      }
    });
  });

  createEffect(() => {
    if (isOpen()) {
      requestAnimationFrame(() => inputRef?.focus());
    }
  });

  onMount(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
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

    try {
      const history = messages()
        .slice(-RAG_MAX_HISTORY * 2)
        .map((m) => ({ role: m.role, content: m.content }));

      const result = await queryRAG({ query, history });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.answer, sources: result.sources },
      ]);
    } catch (err) {
      const error = err as Error;
      console.error(JSON.stringify(error));
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Oops! Something ain't right, come back later...}`,
        },
      ]);
    } finally {
      setIsLoading(false);
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
          <kbd>H</kbd>
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
          <div class="askai-panel" role="dialog" aria-label="Ask a local guide">
            <div class="askai-header">
              <span class="askai-header__title">Talk with a local</span>
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
                    onClose={() => setIsOpen(false)}
                  />
                )}
              </For>

              <Show when={isLoading()}>
                <div class="askai-message askai-message--assistant">
                  <div class="askai-message__label">{AI_BOT_NAME}</div>
                  <div class="askai-loading">
                    <span class="askai-loading__dot">.</span>
                    <span class="askai-loading__dot">.</span>
                    <span class="askai-loading__dot">.</span>
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
