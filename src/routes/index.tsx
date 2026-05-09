import { A } from "@solidjs/router";
import PageTitle from "~/components/PageTitle";
import { ROUTES, SITE_NAME } from "~/data/site-data";

export default function HomePage() {
  const courses = Object.keys(ROUTES);

  let totalCategories = 0;
  let totalSubsections = 0;
  let totalLessons = 0;
  courses.forEach((course) => {
    const categories = ROUTES[course].categories;
    const sectionCount = categories.reduce(
      (sum, c) => sum + c.subsections.length,
      0,
    );
    const lessonCount = categories.reduce(
      (sum, c) =>
        sum + c.subsections.reduce((s, sub) => s + sub.lessons.length, 0),
      0,
    );

    totalCategories = +categories.length;
    totalSubsections = +sectionCount;
    totalLessons = +lessonCount;
  });

  return (
    <main class="page-level--course">
      <PageTitle />
      <section class="hero min-h-[80dvh]">
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

        <section class="flex items-center justify-center">
          <A
            href={ROUTES["ml-system-design"].base}
            class="card hero-course-card"
          >
            <div class="hero-course-card__info">
              <h2>{ROUTES["ml-system-design"].title}</h2>
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
      </section>
    </main>
  );
}
