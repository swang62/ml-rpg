import { useNavigate } from "@solidjs/router";
import type { SourceResult } from "~/server/rag";
import { AI_BOT_NAME } from "./AskAI";

interface Props {
  role: "user" | "assistant";
  content: string;
  sources?: SourceResult[];
}

export default function AskAIMessage(props: Props) {
  const navigate = useNavigate();

  return (
    <div
      class="askai-message"
      classList={{
        "askai-message--user": props.role === "user",
        "askai-message--assistant": props.role === "assistant",
      }}
    >
      <div class="askai-message__label">
        {props.role === "user" ? "You" : AI_BOT_NAME}
      </div>
      <div class="askai-message__content">{props.content}</div>

      {props.sources && props.sources.length > 0 && (
        <div class="askai-message__sources">
          Sources:
          <ul>
            {props.sources.map((s) => (
              <li>
                <button type="button" onClick={() => navigate(s.url)}>
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
