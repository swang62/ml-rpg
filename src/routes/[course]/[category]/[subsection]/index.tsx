import { A, useParams } from "@solidjs/router";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createMemo, createResource, onMount } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ResetButton from "~/components/ResetButton";
import { loadCourse } from "~/server/course";
import { getReadLessons, resetSection } from "~/server/tracking";
import { getSectionXp } from "~/server/xp-store";
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

  const [sectionXp] = createResource(
    () => ({ course: params.course, subsection: params.subsection }),
    async ({ course, subsection }) => getSectionXp(course, subsection),
  );

  onMount(() => {
    refetch();
  });

  const onClickReset = async () => {
    await resetSection(params.course, params.subsection);
    refetch();
  };

  const lessons = subsection?.lessons ?? [];
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
  const totalSectionXp = sortedLessons.reduce(
    (sum, l) => sum + l.order * 25,
    0,
  );

  const breadcrumbs = createMemo(() => [
    { label: SITE_NAME, href: "/" },
    { label: course?.title, href: `/${params.course}` },
    { label: category?.title, href: `/${params.course}/${params.category}` },
    { label: subsection?.title },
  ]);

  return (
    <CoursePageShell
      title={subsection?.title}
      subtitle="Complete all objectives"
      badge="QUEST"
      containerClass="container-narrow"
      pageLevel="section"
      breadcrumbs={breadcrumbs()}
      backHref={`/${params.course}/${params.category}`}
      backLabel="Level"
      extra={
        <>
          <span class="subtitle-xp-counter">
            {sectionXp() ?? 0} / {totalSectionXp} XP
          </span>
          <ResetButton onClick={onClickReset}>
            <RotateCcw size={12} />
            Reset All
          </ResetButton>
        </>
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
              <span
                class="article-xp-badge"
                classList={{ "article-xp-badge--read": isRead }}
              >
                {article.order * 25}{" "}
                <span class="article-xp-badge__label">XP</span>
              </span>
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
