import { A, createAsync, useAction, useParams } from "@solidjs/router";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import CoursePageShell from "~/components/CoursePageShell";
import ResetButton from "~/components/ResetButton";
import {
  getReadLessonsQuery,
  getTotalXpQuery,
  resetSectionAction,
} from "~/server/quest-store";
import { COURSES } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export const route = {
  preload: ({ params }: { params: Record<string, string> }) => {
    getTotalXpQuery();
    getReadLessonsQuery(params.course as string, params.subsection as string);
  },
};

export default function SubsectionPage() {
  const params = useParams();
  if (!params.category || !params.subsection) return;

  const course = COURSES[params.course as string];
  const category = course?.categories.find(
    (cat) => cat.category === params.category,
  );
  const subsection = category?.subsections.find(
    (s) => s.subsection === params.subsection,
  );
  useNotFound(!course || !category || !subsection);

  const readLessons = createAsync(
    () =>
      getReadLessonsQuery(params.course as string, params.subsection as string),
    { initialValue: [] },
  );
  const reset = useAction(resetSectionAction);

  const lessons = subsection?.lessons ?? [];
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
  const totalSections = sortedLessons.length;

  return (
    <CoursePageShell
      title={subsection?.title}
      subtitle="Complete all objectives"
      badge="QUEST"
      containerClass="container-narrow"
      pageLevel="section"
      backHref={`/${params.course}/${params.category}`}
      backLabel="Level"
      extra={
        <div class="flex flex-nowrap gap-2 items-center">
          <span class="subtitle-xp-counter">
            {readLessons().length} / {totalSections} completed
          </span>
          <ResetButton
            onClick={() =>
              reset(params.course as string, params.subsection as string)
            }
          >
            <RotateCcw size={12} />
            Reset All
          </ResetButton>
        </div>
      }
    >
      <section class="articles-list">
        {sortedLessons.map((article) => {
          const isRead = readLessons().includes(article.lesson);
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
