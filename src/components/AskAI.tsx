import MessageBox from "lucide-solid/icons/message-square-text";
import { createEffect, createSignal, For, Show } from "solid-js";
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

  createEffect(() => {
    messages();
    isLoading();
    requestAnimationFrame(() => {
      if (messagesRef) {
        messagesRef.scrollTop = messagesRef.scrollHeight;
      }
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
        class="askai-trigger justify-center gap-2"
        onClick={toggleOpen}
        aria-label="Ask AI for help"
      >
        <span class="hidden md:inline">Ask for help</span>
        <MessageBox size={18} />
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
                class="askai-header__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                &times;
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
                  <div class="askai-message__label">
                    {AI_BOT_NAME} the Guide
                  </div>
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
                type="text"
                class="askai-inputbar__input"
                placeholder="Ask a question..."
                value={inputValue()}
                onInput={(e) => setInputValue(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading()}
                autofocus
              />
              <button
                type="button"
                class="askai-inputbar__send"
                onClick={handleSend}
                disabled={isLoading() || !inputValue().trim()}
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
