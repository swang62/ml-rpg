import { A } from "@solidjs/router";
import { ROUTES } from "~/constants/paths";

export default function NotFoundPage() {
  return (
    <main class="container flex flex-col items-center justify-center min-h-[90dvh]">
      <h1 class="text-4xl">Not Found</h1>
      <A href={ROUTES.HOME} class="back-link">
        ← Back to homepage
      </A>
    </main>
  );
}
