import { A } from "@solidjs/router";
import Delete from "lucide-solid/icons/delete";

interface Props {
  href: string;
  isRead?: boolean;
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
      <Delete size={16} />
      {props.isRead ? "Back to Quest" : "Run Away..."}
    </A>
  );
}
