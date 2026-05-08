import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

interface NotFoundProps {
  message?: string;
  backHref?: string;
  backLabel?: string;
}

export default function NotFound(props: NotFoundProps) {
  return (
    <main class="container">
      <Title>Not Found</Title>
      <h1>{props.message ?? "Not found"}</h1>
      {props.backHref && (
        <A href={props.backHref} class="back-link">
          ← {props.backLabel ?? "Back"}
        </A>
      )}
    </main>
  );
}
