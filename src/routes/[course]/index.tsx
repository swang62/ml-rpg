import { A, createAsync, useParams } from "@solidjs/router";
import { createEffect } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import {
  getCourseStructureQuery,
  getSectionReadStatusesQuery,
  getTotalXpQuery,
} from "~/server/quest-store";
import { useNotFound } from "~/utils/not-found";
import { onCardLeave, onCardMove } from "~/utils/tilt";

export const route = {
  preload: ({ params }: { params: Record<string, string> }) => {
    getTotalXpQuery();
    getCourseStructureQuery(params.course as string);
    getSectionReadStatusesQuery(params.course as string);
  },
};

export default function CourseIndexPage() {
  const params = useParams();
  const course = createAsync(() =>
    getCourseStructureQuery(params.course as string),
  );
  createEffect(() => {
    if (course() !== undefined) useNotFound(!course());
  });

  const categories = course()?.categories ?? [];
  const sectionReadStatus = createAsync(() =>
    getSectionReadStatusesQuery(params.course as string),
  );

  return (
    <CoursePageShell
      title={course()?.title}
      subtitle="Choose a level to begin your training"
      badge="WORLD"
      containerClass=""
      pageLevel="course"
      backHref="/"
      backLabel="Worlds"
    >
      <section class="categories-grid">
        {categories.map((category) => {
          const subsectionStatuses =
            sectionReadStatus()?.[category.category] ?? [];
          const completed = subsectionStatuses.filter(Boolean).length;
          return (
            <A
              href={`/${params.course}/${category.category}`}
              class="card card--category"
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <h2>{category.title}</h2>
              {subsectionStatuses.length > 0 && (
                <ProgressBar
                  value={completed}
                  max={subsectionStatuses.length}
                  color="--level-course"
                />
              )}
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
