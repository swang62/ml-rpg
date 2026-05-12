export default function LoadingFallback() {
  return (
    <main class="page-level--course">
      <section class="hero" aria-hidden="true">
        <div class="skeleton skeleton--tag" />
        <div class="skeleton skeleton--title" />
        <div class="skeleton skeleton--subtitle" />
        <section class="skeleton-cards">
          <div class="skeleton skeleton--card">
            <div class="skeleton skeleton--icon" />
            <div class="skeleton skeleton--card-title" />
            <div class="skeleton skeleton--chevron" />
          </div>
          <div class="skeleton skeleton--card">
            <div class="skeleton skeleton--icon" />
            <div class="skeleton skeleton--card-title" />
            <div class="skeleton skeleton--chevron" />
          </div>
        </section>
      </section>
    </main>
  );
}
