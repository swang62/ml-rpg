import { A, useParams } from "@solidjs/router";
import Circle from "lucide-solid/icons/circle";
import { createMemo, createResource, For, onMount } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
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
      subtitle={`${categories.length} categories`}
      containerClass=""
      pageLevel="course"
      breadcrumbs={breadcrumbs()}
      backHref="/"
      backLabel={SITE_NAME}
    >
      <section class="categories-grid">
        {categories.map((category) => (
          <A
            href={`/${params.course}/${category.category}`}
            class="card card--category"
          >
            <h2>{category.title}</h2>
            <span class="course-dots">
              <For each={sectionReadStatus()?.get(category.category) ?? []}>
                {(allRead) => (
                  <Circle size={8} fill={allRead ? "currentColor" : "none"} />
                )}
              </For>
            </span>
          </A>
        ))}
      </section>
    </CoursePageShell>
  );
}
