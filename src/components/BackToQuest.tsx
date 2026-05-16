import { A } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";

interface Props {
  href: string;
  isRead: boolean;
}

export default function BackToQuest(props: Props) {
  return (
    <A
      href={props.href}
      classList={{
        "lesson-back-link": true,
        "lesson-back-link--unread": !props.isRead,
      }}
    >
      <ChevronLeft size={16} />
      {props.isRead ? "Back to Quest" : "Run Away..."}
    </A>
  );
}
