import { A, createAsync, useParams } from "@solidjs/router";
import { createEffect } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import {
  getCourseStructureQuery,
  getReadCountsQuery,
  getTotalXpQuery,
} from "~/server/quest-store";
import { useNotFound } from "~/utils/not-found";
import { onCardLeave, onCardMove } from "~/utils/tilt";

export const route = {
  preload: ({ params }: { params: Record<string, string> }) => {
    getTotalXpQuery();
    getCourseStructureQuery(params.course as string);
    getReadCountsQuery(params.course as string);
  },
};

export default function CategoryPage() {
  const params = useParams();
  if (!params.category) return;

  const course = createAsync(() =>
    getCourseStructureQuery(params.course as string),
  );
  const category = () =>
    course()?.categories.find((cat) => cat.category === params.category);
  createEffect(() => {
    if (course() !== undefined) useNotFound(!course() || !category());
  });

  const subsections = category()?.subsections ?? [];
  const readCounts = createAsync(() =>
    getReadCountsQuery(params.course as string),
  );

  return (
    <CoursePageShell
      title={category()?.title}
      subtitle="Choose your quest"
      badge="LEVEL"
      containerClass="container-medium"
      pageLevel="category"
      backHref={`/${params.course}`}
      backLabel="World"
    >
      <section class="subsections-list">
        {subsections.map((section) => {
          const readCount = readCounts()?.[section.subsection] ?? 0;
          return (
            <A
              href={`/${params.course}/${category()?.category}/${section.subsection}`}
              class="card card--subsection"
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <h2>{section.title}</h2>
              {section.lessons.length > 0 && (
                <ProgressBar
                  value={readCount}
                  max={section.lessons.length}
                  color="--level-category"
                />
              )}
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
