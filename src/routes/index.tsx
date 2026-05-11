import { A } from "@solidjs/router";
import { createResource, For } from "solid-js";
import PageTitle from "~/components/PageTitle";
import { COURSE_INDEX } from "~/data/course-index";
import { SITE_NAME } from "~/utils/constants";
import { loadCourse } from "~/utils/course-data";

export default function HomePage() {
  const [totals] = createResource(
    async () => {
      const slugs = Object.keys(COURSE_INDEX);
      const courses = await Promise.all(slugs.map(loadCourse));
      let categories = 0;
      let subsections = 0;
      let lessons = 0;
      for (const course of courses) {
        if (!course) continue;
        categories += course.categories.length;
        for (const cat of course.categories) {
          subsections += cat.subsections.length;
          for (const sub of cat.subsections) {
            lessons += sub.lessons.length;
          }
        }
      }
      return { categories, subsections, lessons };
    },
    { initialValue: { categories: 0, subsections: 0, lessons: 0 } },
  );

  return (
    <main class="page-level--course">
      <PageTitle />
      <section class="hero">
        <div class="hero__tag">Course Catalog</div>
        <h1>{SITE_NAME}</h1>
        <p class="subtitle">A curated navigation hub for system-overflow.com</p>
        <section class="stats-bar">
          <div class="stat">
            <div class="stat__value">{totals()?.categories ?? "..."}</div>
            <div class="stat__label">Categories</div>
          </div>
          <div class="stat">
            <div class="stat__value">{totals()?.subsections ?? "..."}</div>
            <div class="stat__label">Sections</div>
          </div>
          <div class="stat">
            <div class="stat__value">{totals()?.lessons ?? "..."}</div>
            <div class="stat__label">Lessons</div>
          </div>
        </section>

        <section class="flex flex-wrap justify-center">
          <For each={Object.keys(COURSE_INDEX)}>
            {(slug) => (
              <A href={COURSE_INDEX[slug].base} class="card hero-course-card">
                <div class="hero-course-card__info">
                  <h2>{COURSE_INDEX[slug].title}</h2>
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
