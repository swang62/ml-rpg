import { A, useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import { fetchSectionReadStatus } from "~/server/tracking";
import { COURSES } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export default function CourseIndexPage() {
  const params = useParams();
  const course = COURSES[params.course as string];
  useNotFound(!course);

  const categories = course?.categories ?? [];

  const [sectionReadStatus] = createResource(
    () => ({ course: params.course, categories }),
    async ({ course, categories }) =>
      fetchSectionReadStatus(course, categories),
  );

  return (
    <CoursePageShell
      title={course?.title}
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
            sectionReadStatus()?.get(category.category) ?? [];
          const completed = subsectionStatuses.filter(Boolean).length;
          return (
            <A
              href={`/${params.course}/${category.category}`}
              class="card card--category"
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
