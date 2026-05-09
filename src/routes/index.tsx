import { A } from "@solidjs/router";
import { For } from "solid-js";
import PageTitle from "~/components/PageTitle";
import { COURSES, SITE_NAME } from "~/data/site-data";

export default function HomePage() {
  const courseSlugs = Object.keys(COURSES);

  let totalCategories = 0;
  let totalSubsections = 0;
  let totalLessons = 0;
  for (const slug of courseSlugs) {
    const course = COURSES[slug];
    totalCategories += course.categories.length;
    for (const cat of course.categories) {
      totalSubsections += cat.subsections.length;
      for (const sub of cat.subsections) {
        totalLessons += sub.lessons.length;
      }
    }
  }

  return (
    <main class="page-level--course">
      <PageTitle />
      <section class="hero">
        <div class="hero__tag">Course Catalog</div>
        <h1>{SITE_NAME}</h1>
        <p class="subtitle">A curated navigation hub for system-overflow.com</p>
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
            <div class="stat__value">{totalLessons}</div>
            <div class="stat__label">Lessons</div>
          </div>
        </section>

        <section class="flex flex-wrap justify-center">
          <For each={courseSlugs}>
            {(slug) => (
              <A href={COURSES[slug].base} class="card hero-course-card">
                <div class="hero-course-card__info">
                  <h2>{COURSES[slug].title}</h2>
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
            )}
          </For>
        </section>
      </section>
    </main>
  );
}
