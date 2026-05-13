import { A, useParams } from "@solidjs/router";
import Circle from "lucide-solid/icons/circle";
import { createMemo, createResource, For, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { getReadLessons } from "~/utils/lesson-progress";
import { useNotFound } from "~/utils/not-found";

export default function CategoryPage() {
  const params = useParams();
  if (!params.category) return;

  // Resources
  const [course] = createResource(() => params.course, loadCourse);
  const category = createMemo(() =>
    course()?.categories.find((cat) => cat.category === params.category),
  );
  const subsectionList = createMemo(() => category()?.subsections ?? []);

  const [readCounts, { refetch }] = createResource(
    subsectionList,
    async (subsections) => {
      if (!subsections.length) return new Map<string, number>();
      const results = await Promise.all(
        subsections.map(async (sub) => {
          const read = await getReadLessons(params.course, sub.subsection);
          return { subsection: sub.subsection, read: read.length };
        }),
      );
      return new Map(results.map((r) => [r.subsection, r.read]));
    },
  );

  // Force client-side refetch after SSR (IndexedDB unavailable on server)
  onMount(() => {
    refetch();
  });

  const totalSubs = () => category()?.subsections.length;

  // Early out
  useNotFound(() => !course() || !category());

  return (
    <Show when={category()}>
      <CoursePageShell
        title={category()?.title}
        subtitle={`${totalSubs()} section${totalSubs() !== 1 ? "s" : ""}`}
        containerClass="container-medium"
        pageLevel="category"
        breadcrumbs={[
          { label: SITE_NAME, href: "/" },
          { label: course()?.title, href: `/${params.course}` },
          { label: category()?.title },
        ]}
        backHref={`/${params.course}`}
        backLabel={course()?.title}
      >
        <section class="subsections-list">
          {category()?.subsections.map((section) => (
            <A
              href={`/${params.course}/${category()?.category}/${section.subsection}`}
              class="card card--subsection"
            >
              <h2>{section.title}</h2>
              <span class="section-dots">
                <For each={section.lessons}>
                  {(_, i) => (
                    <Circle
                      size={8}
                      fill={
                        i() < (readCounts()?.get(section.subsection) ?? 0)
                          ? "currentColor"
                          : "none"
                      }
                    />
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
