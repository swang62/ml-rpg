import { A, createAsync } from "@solidjs/router";
import ChevronRight from "lucide-solid/icons/chevron-right";
import { createMemo } from "solid-js";
import PageTitle from "~/components/PageTitle";
import { getCoursesQuery } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { onCardLeave, onCardMove } from "~/utils/tilt";

export default function HomePage() {
  const coursesData = createAsync(() => getCoursesQuery());
  const courses = createMemo(() => coursesData() ?? []);

  return (
    <main class="page-level--world">
      <PageTitle />
      <section class="hero">
        <div class="hero__tag">World Hub</div>
        <h1>{SITE_NAME}</h1>
        <p class="subtitle">Choose your adventure</p>

        <section class="flex flex-wrap justify-center">
          {courses().map((course) => (
            <A
              href={`/${course.slug}`}
              class="card hero-course-card"
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <div class="hero-course-card__info">
                <h2>{course.title}</h2>
              </div>
              <div class="hero-course-card__arrow">
                <ChevronRight size={16} />
              </div>
            </A>
          ))}
        </section>
      </section>
    </main>
  );
}
