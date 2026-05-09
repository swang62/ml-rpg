import { A } from "@solidjs/router";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";
import { siteData } from "~/data/site-data";

export default function HomePage() {
  const totalCategories = siteData.length;
  const totalSubsections = siteData.reduce(
    (sum, c) => sum + c.subsections.length,
    0,
  );
  const totalArticles = siteData.reduce(
    (sum, c) =>
      sum + c.subsections.reduce((s, sub) => s + sub.articles.length, 0),
    0,
  );

  return (
    <main class="page-level--course">
      <PageTitle />
      <section class="hero">
        <div class="hero__tag">Course Catalog</div>
        <h1>System Overflow</h1>
        <p class="subtitle">
          A curated navigation hub for ML System Design content &mdash;
          experiments, infrastructure, embeddings, and production ML.
        </p>
      </section>

      <section class="stats-bar">
        <div class="stat">
          <div class="stat__value">{totalCategories}</div>
          <div class="stat__label">Categories</div>
        </div>
        <div class="stat">
          <div class="stat__value">{totalSubsections}</div>
          <div class="stat__label">Sections</div>
        </div>
        <div class="stat">
          <div class="stat__value">{totalArticles}</div>
          <div class="stat__label">Lessons</div>
        </div>
      </section>

      <section class="flex items-center justify-center">
        <A href={ROUTES.ML_BASE} class="card hero-course-card">
          <div class="hero-course-card__info">
            <h2>ML System Design</h2>
            <p class="meta">
              {totalCategories} categories &middot; {totalSubsections} sections
            </p>
          </div>
          <div class="hero-course-card__arrow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </A>
      </section>
    </main>
  );
}
