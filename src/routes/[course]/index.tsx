import { A, useParams } from "@solidjs/router";
import { createMemo, createResource, onMount } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";
import { fetchSectionReadStatus } from "~/utils/tracking";

export default function CourseIndexPage() {
  const params = useParams();
  const course = loadCourse(params.course);
  useNotFound(!course);

  const categories = course?.categories ?? [];

  const [sectionReadStatus, { refetch }] = createResource(
    () => ({ course: params.course, categories }),
    async ({ course, categories }) =>
      fetchSectionReadStatus(course, categories),
  );

  onMount(refetch);

  const breadcrumbs = createMemo(() => [
    { label: SITE_NAME, href: "/" },
    { label: course?.title },
  ]);

  return (
    <CoursePageShell
      title={course?.title}
      subtitle={`${categories.length} level${categories.length !== 1 ? "s" : ""}`}
      containerClass=""
      pageLevel="course"
      breadcrumbs={breadcrumbs()}
      backHref="/"
      backLabel={SITE_NAME}
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
