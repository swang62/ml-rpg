import { A, createAsync } from "@solidjs/router";
import ArrowDown from "lucide-solid/icons/arrow-down";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ArrowRight from "lucide-solid/icons/arrow-right";
import ArrowUp from "lucide-solid/icons/arrow-up";
import ChevronRight from "lucide-solid/icons/chevron-right";
import CornerDownLeft from "lucide-solid/icons/corner-down-left";
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

      <div class="flex justify-center nav-shortcuts-bottom">
        <span class="nav-shortcuts">
          <span class="shortcuts-bar__label">nav</span>
          <ArrowLeft size={14} />
          <ArrowRight size={14} />
          <ArrowUp size={14} />
          <ArrowDown size={14} />
          <span class="shortcuts-bar__label">select</span>
          <CornerDownLeft size={14} />
        </span>
      </div>
    </main>
  );
}
