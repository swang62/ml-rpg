import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import { createMemo, createResource, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { getReadLessons } from "~/utils/lesson-progress";
import { useNotFound } from "~/utils/not-found";

export default function CategoryPage() {
  const params = useParams();
  if (!params.category) return;

  const [course] = createResource(() => params.course, loadCourse);

  const category = createMemo(() =>
    course()?.categories.find((cat) => cat.category === params.category),
  );

  useNotFound(() => !course() || !category());

  const subsectionList = createMemo(() => category()?.subsections ?? []);

  const [allReadMap, { refetch }] = createResource(
    subsectionList,
    async (subsections) => {
      if (!subsections.length) return new Map<string, boolean>();
      const results = await Promise.all(
        subsections.map(async (sub) => {
          if (!sub.lessons.length)
            return { subsection: sub.subsection, allRead: false };
          const read = await getReadLessons(
            params.course ?? "",
            sub.subsection,
          );
          return {
            subsection: sub.subsection,
            allRead: read.length >= sub.lessons.length,
          };
        }),
      );
      return new Map(results.map((r) => [r.subsection, r.allRead]));
    },
  );

  // Force client-side refetch after SSR (IndexedDB unavailable on server)
  onMount(() => {
    refetch();
  });

  return (
    <Show when={category()}>
      <CoursePageShell
        title={category()?.title}
        subtitle={`${category()?.subsections.length} section${category()?.subsections.length !== 1 ? "s" : ""}`}
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
              <Show when={allReadMap()?.get(section.subsection)}>
                <span class="subsection-checkmark">
                  <Check size={16} />
                </span>
              </Show>
            </A>
          ))}
        </section>
      </CoursePageShell>
    </Show>
  );
}
