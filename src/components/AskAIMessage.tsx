import { useNavigate } from "@solidjs/router";
import type { SourceResult } from "~/server/rag";
import { RAG_BOT_NAME } from "~/utils/constants";

interface Props {
  role: "user" | "assistant";
  content: string;
  sources?: SourceResult[];
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
      <div class="askai-message__content">{props.content}</div>

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
