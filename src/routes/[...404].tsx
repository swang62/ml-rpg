import { A } from "@solidjs/router";
import { ROUTES } from "~/constants/paths";

export default function NotFoundPage() {
  return (
    <main class="container">
      <h1>Not Found</h1>
      <A href={ROUTES.HOME} class="back-link">
        ← Back to homepage
      </A>
    </main>
  );
}
