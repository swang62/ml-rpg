import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createMemo, createResource, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { getReadLessons, resetSection } from "~/utils/lesson-progress";
import { useNotFound } from "~/utils/not-found";

export default function SubsectionPage() {
  const params = useParams();
  if (!params.category || !params.subsection) return;

  // Resources
  const [course] = createResource(() => params.course, loadCourse);
  const [readLessons, { refetch }] = createResource(
    () => params.subsection,
    () => getReadLessons(params.course, params.subsection),
  );

  // Force a client-side refetch after hydration so IndexedDB data is loaded
  // (SSR returns empty because IndexedDB isn't available on the server)
  onMount(() => {
    refetch();
  });

  // Reactive signals
  const category = createMemo(() =>
    course()?.categories.find((cat) => cat.category === params.category),
  );
  const subsection = createMemo(() =>
    category()?.subsections.find((s) => s.subsection === params.subsection),
  );

  // Early out
  useNotFound(() => !course() || !category() || !subsection());

  const totalLessons = () => subsection()?.lessons.length ?? 0;
  const completedCount = () => readLessons()?.length ?? 0;

  return (
    <Show when={params.subsection} keyed>
      <CoursePageShell
        title={subsection()?.title}
        subtitle={`${totalLessons()} lesson${totalLessons() !== 1 ? "s" : ""}`}
        pageLevel="section"
        subtitleExtra={
          <Show when={totalLessons() > 0}>
            <span class="subtitle-progress">
              {completedCount()}/{totalLessons()} completed
            </span>
            <Show when={completedCount() > 0}>
              <button
                type="button"
                class="subtitle-reset-btn"
                onClick={async () => {
                  await resetSection(
                    params.course ?? "",
                    params.subsection ?? "",
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
        containerClass="container-narrow"
        breadcrumbs={[
          { label: SITE_NAME, href: "/" },
          { label: course()?.title, href: `/${params.course}` },
          {
            label: category()?.title,
            href: `/${params.course}/${params.category}`,
          },
          { label: subsection()?.title },
        ]}
        backHref={`/${params.course}/${params.category}`}
        backLabel={category()?.title}
      >
        <section class="articles-list">
          {subsection()
            ?.lessons.sort((a, b) => a.order - b.order)
            .map((article) => (
              <A
                href={`/${params.course}/${params.category}/${params.subsection}/${article.lesson}`}
                class={`card card--article${readLessons()?.includes(article.lesson) ? " card--article--read" : ""}`}
              >
                <span class="article-order">{article.order}</span>
                <span class="article-title">{article.title}</span>
                <Show when={readLessons()?.includes(article.lesson)}>
                  <span class="article-read-checkmark">
                    <Check size={14} />
                  </span>
                </Show>
              </A>
            ))}
        </section>
      </CoursePageShell>
    </Show>
  );
}
