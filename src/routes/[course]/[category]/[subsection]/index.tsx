import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createResource, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ResetButton from "~/components/ResetButton";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { getReadLessons, resetSection } from "~/utils/lesson-progress";
import { useNotFound } from "~/utils/not-found";

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
    () => params.subsection,
    async (subsection) => getReadLessons(params.course, subsection),
  );

  onMount(() => {
    refetch();
  });

  const onClickReset = async () => {
    await resetSection(params.course, params.subsection);
    refetch();
  };

  const lessons = subsection?.lessons ?? [];
  const totalLessons = lessons.length;

  return (
    <CoursePageShell
      title={subsection?.title}
      subtitle={`${totalLessons} lesson${totalLessons !== 1 ? "s" : ""}`}
      extra={
        <ResetButton onClick={onClickReset}>
          <RotateCcw size={12} />
          Reset
        </ResetButton>
      }
      pageLevel="section"
      containerClass="container-narrow"
      breadcrumbs={[
        { label: SITE_NAME, href: "/" },
        { label: course?.title, href: `/${params.course}` },
        {
          label: category?.title,
          href: `/${params.course}/${params.category}`,
        },
        { label: subsection?.title },
      ]}
      backHref={`/${params.course}/${params.category}`}
      backLabel={category?.title}
    >
      <section class="articles-list">
        {[...lessons]
          .sort((a, b) => a.order - b.order)
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
  );
}
