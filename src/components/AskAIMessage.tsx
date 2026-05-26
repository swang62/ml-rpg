import { useNavigate } from "@solidjs/router";
import { RAG_BOT_NAME } from "~/utils/constants";
import { boldTerms, escapeHtml } from "~/utils/search-utils";
import type { SourceResult } from "~/utils/types";

interface Props {
  role: "user" | "assistant";
  content: string;
  sources?: SourceResult[];
  keywords?: string[];
  onClose?: () => void;
}

export default function AskAIMessage(props: Props) {
  const navigate = useNavigate();

  const handleSourceClick = (url: string) => {
    navigate(url);
    props.onClose?.();
  };

  return (
    <div
      class="askai-message"
      classList={{
        "askai-message--user": props.role === "user",
        "askai-message--assistant": props.role === "assistant",
      }}
    >
      <div class="askai-message__label">
        {props.role === "user" ? "You" : RAG_BOT_NAME}
      </div>
      <div
        class="askai-message__content"
        innerHTML={
          props.role === "assistant" && props.keywords?.length
            ? boldTerms(escapeHtml(props.content), props.keywords)
            : escapeHtml(props.content)
        }
      />

      {props.sources && props.sources.length > 0 && (
        <div class="askai-message__sources">
          Sources:
          <ul>
            {props.sources.map((s) => (
              <li>
                <button type="button" onClick={() => handleSourceClick(s.url)}>
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
