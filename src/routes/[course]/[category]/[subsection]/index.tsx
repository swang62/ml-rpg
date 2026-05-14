import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createMemo, createResource, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ResetButton from "~/components/ResetButton";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";
import { getReadLessons, resetSection } from "~/utils/tracking";

export default function SubsectionPage() {
  const params = useParams();
  if (!params.category || !params.subsection) return;

  const course = loadCourse(params.course);
  const category = course?.categories.find(
    (cat) => cat.category === params.category,
  );
  const subsection = category?.subsections.find(
    (s) => s.subsection === params.subsection,
  );
  useNotFound(!course || !category || !subsection);

  const [readLessons, { refetch }] = createResource(
    () => ({ course: params.course, subsection: params.subsection }),
    async ({ course, subsection }) => getReadLessons(course, subsection),
  );

  onMount(refetch);

  const onClickReset = async () => {
    await resetSection(params.course, params.subsection);
    refetch();
  };

  const lessons = subsection?.lessons ?? [];
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  const breadcrumbs = createMemo(() => [
    { label: SITE_NAME, href: "/" },
    { label: course?.title, href: `/${params.course}` },
    { label: category?.title, href: `/${params.course}/${params.category}` },
    { label: subsection?.title },
  ]);

  return (
    <CoursePageShell
      title={subsection?.title}
      subtitle={`${lessons.length} mission${lessons.length !== 1 ? "s" : ""}`}
      extra={
        <ResetButton onClick={onClickReset}>
          <RotateCcw size={12} />
          Reset
        </ResetButton>
      }
      pageLevel="section"
      containerClass="container-narrow"
      breadcrumbs={breadcrumbs()}
      backHref={`/${params.course}/${params.category}`}
      backLabel={category?.title}
    >
      <section class="articles-list">
        {sortedLessons.map((article) => {
          const isRead = readLessons()?.includes(article.lesson);
          return (
            <A
              href={`/${params.course}/${params.category}/${params.subsection}/${article.lesson}`}
              class={`card card--article${isRead ? " card--article--read" : ""}`}
            >
              <span class="article-order">{article.order}</span>
              <span class="article-title">{article.title}</span>
              <Show when={isRead}>
                <span class="article-read-checkmark">
                  <Check size={14} />
                </span>
              </Show>
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
