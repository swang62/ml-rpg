import { A, useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import { fetchReadCounts } from "~/server/tracking";
import { COURSES } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";
import { onCardLeave, onCardMove } from "~/utils/tilt";

export default function CategoryPage() {
  const params = useParams();
  if (!params.category) return;

  const course = COURSES[params.course as string];
  const category = course?.categories.find(
    (cat) => cat.category === params.category,
  );
  useNotFound(!course || !category);

  const subsections = category?.subsections ?? [];

  const [readCounts] = createResource(
    () => ({ course: params.course, subsections }),
    async ({ course, subsections }) => fetchReadCounts(course, subsections),
  );

  return (
    <CoursePageShell
      title={category?.title}
      subtitle="Choose your quest"
      badge="LEVEL"
      containerClass="container-medium"
      pageLevel="category"
      backHref={`/${params.course}`}
      backLabel="World"
    >
      <section class="subsections-list">
        {subsections.map((section) => {
          const readCount = readCounts()?.get(section.subsection) ?? 0;
          return (
            <A
              href={`/${params.course}/${category?.category}/${section.subsection}`}
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
