import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createMemo, createResource, Show } from "solid-js";
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

  // Reactive signals
  const category = createMemo(() =>
    course()?.categories.find((cat) => cat.category === params.category),
  );
  const subsection = createMemo(() =>
    category()?.subsections.find((s) => s.subsection === params.subsection),
  );

  // Early out
  useNotFound(() => !course() || !category() || !subsection());

  return (
    <Show when={params.subsection} keyed>
      <CoursePageShell
        title={subsection()?.title}
        subtitle={`${subsection()?.lessons.length} lesson${subsection()?.lessons.length !== 1 ? "s" : ""}`}
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
        <Show when={(readLessons()?.length ?? 0) > 0}>
          <div class="section-reset">
            <button
              type="button"
              class="section-reset-btn"
              onClick={async () => {
                await resetSection(
                  params.course ?? "",
                  params.subsection ?? "",
                );
                refetch();
              }}
            >
              <RotateCcw size={14} />
              Reset progress
            </button>
          </div>
        </Show>
      </CoursePageShell>
    </Show>
  );
}
