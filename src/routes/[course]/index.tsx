import { A, useParams } from "@solidjs/router";
import Circle from "lucide-solid/icons/circle";
import { createResource, For, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { getReadLessons } from "~/utils/lesson-progress";
import { useNotFound } from "~/utils/not-found";

export default function CourseIndexPage() {
  const params = useParams();

  const [course] = createResource(() => params.course, loadCourse);

  // Early out
  useNotFound(() => !course());

  const [sectionReadStatus, { refetch }] = createResource(
    () => course(),
    async (course) => {
      if (!course) return new Map<string, boolean[]>();
      const results = await Promise.all(
        course.categories.map(async (cat) => {
          const statuses = await Promise.all(
            cat.subsections.map(
              async (sub) =>
                (await getReadLessons(params.course, sub.subsection)).length >=
                sub.lessons.length,
            ),
          );
          return { category: cat.category, statuses };
        }),
      );
      return new Map(results.map((r) => [r.category, r.statuses]));
    },
  );

  // Force client-side refetch after SSR (IndexedDB unavailable on server)
  onMount(() => {
    refetch();
  });

  return (
    <Show when={course()}>
      <CoursePageShell
        title={course()?.title}
        subtitle={`${course()?.categories.length} categories`}
        containerClass=""
        pageLevel="course"
        breadcrumbs={[
          { label: SITE_NAME, href: "/" },
          { label: course()?.title },
        ]}
        backHref="/"
        backLabel={SITE_NAME}
      >
        <section class="categories-grid">
          {course()?.categories.map((category) => (
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
    </Show>
  );
}
