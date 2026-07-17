import { A } from "@solidjs/router";

export default function NotFoundPage() {
  return (
    <main class="not-found">
      <div class="not-found__code">
        4<span>0</span>4
      </div>
      <h1 class="not-found__title">Page not found</h1>
      <A href="/" class="back-link">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to homepage
      </A>
    </main>
  );
}
