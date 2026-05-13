import { A, useParams } from "@solidjs/router";
import { createResource, onMount, Show } from "solid-js";
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

  const [categoryProgress, { refetch }] = createResource(
    () => course(),
    async (c) => {
      if (!c) return new Map<string, { completed: number; total: number }>();
      const results = await Promise.all(
        c.categories.flatMap((cat) =>
          cat.subsections.map(async (sub) => ({
            category: cat.category,
            allRead:
              (await getReadLessons(params.course, sub.subsection)).length >=
              sub.lessons.length,
          })),
        ),
      );
      const map = new Map<string, { completed: number; total: number }>();
      for (const r of results) {
        const entry = map.get(r.category) ?? { completed: 0, total: 0 };
        entry.total++;
        if (r.allRead) entry.completed++;
        map.set(r.category, entry);
      }
      return map;
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
          {course()?.categories.map((category) => {
            const prog = categoryProgress()?.get(category.category);
            return (
              <A
                href={`/${params.course}/${category.category}`}
                class="card card--category"
              >
                <h2>{category.title}</h2>
                <span
                  class="card__count"
                  style={
                    prog
                      ? {
                          color: `hsl(${Math.round((120 * prog.completed) / prog.total)}, 35%, 52%)`,
                          opacity: 0.8 + 0.2 * (prog.completed / prog.total),
                        }
                      : undefined
                  }
                >
                  {prog ? `${prog.completed}/${prog.total} completed` : "–"}
                </span>
              </A>
            );
          })}
        </section>
      </CoursePageShell>
    </Show>
  );
}
