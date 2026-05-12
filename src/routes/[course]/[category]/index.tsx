import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createMemo, createResource, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { getReadLessons, resetSection } from "~/utils/lesson-progress";
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

  const totalSubs = () => category()?.subsections.length ?? 0;
  const completedSubs = () => {
    const map = allReadMap();
    if (!map) return 0;
    return [...map.values()].filter(Boolean).length;
  };

  return (
    <Show when={category()}>
      <CoursePageShell
        title={category()?.title}
        subtitle={`${totalSubs()} section${totalSubs() !== 1 ? "s" : ""}`}
        subtitleExtra={
          <Show when={totalSubs() > 0}>
            <span class="subtitle-progress">
              {completedSubs()}/{totalSubs()} completed
            </span>
            <Show when={completedSubs() > 0}>
              <button
                type="button"
                class="subtitle-reset-btn"
                onClick={async () => {
                  const subs = category()?.subsections ?? [];
                  await Promise.all(
                    subs.map((s) =>
                      resetSection(params.course ?? "", s.subsection),
                    ),
                  );
                  refetch();
                }}
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </Show>
          </Show>
        }
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
