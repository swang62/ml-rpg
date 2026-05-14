import { A, useParams } from "@solidjs/router";
import { createMemo, createResource, onMount, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ResetButton from "~/components/ResetButton";
import { loadCourse } from "~/server/course";
import { getReadLessons, resetSection } from "~/server/tracking";
import { SITE_NAME } from "~/utils/constants";
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
      subtitle="Complete all missions to master this quest"
      badge="QUEST"
      containerClass="container-narrow"
      pageLevel="section"
      breadcrumbs={breadcrumbs()}
      backHref={`/${params.course}/${params.category}`}
      backLabel={category?.title}
      extra={
        <ResetButton onClick={onClickReset}>
          <img
            src="/assets/icons/reset.svg"
            width="12"
            height="12"
            alt=""
            class="icon"
          />
          Reset
        </ResetButton>
      }
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
                  <img
                    src="/assets/icons/check.svg"
                    width="14"
                    height="14"
                    alt=""
                    class="icon icon--check"
                  />
                </span>
              </Show>
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
