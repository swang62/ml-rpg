import { A, createAsync, useAction, useParams } from "@solidjs/router";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createMemo } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ResetButton from "~/components/ResetButton";
import { resetSectionAction } from "~/server/actions";
import { getSubsectionMetaQuery } from "~/server/course";
import { getSectionReadCountsQuery } from "~/server/progress";
import { XP_VALUE } from "~/utils/constants";

export default function SubsectionPage() {
  const params = useParams();
  if (!params.category || !params.subsection) return;

  const subsection = createAsync(() =>
    getSubsectionMetaQuery(
      params.course as string,
      params.category as string,
      params.subsection as string,
    ),
  );
  const readLessons = createAsync(
    () =>
      getSectionReadCountsQuery(
        params.course as string,
        params.subsection as string,
      ),
    { initialValue: [] },
  );
  const reset = useAction(resetSectionAction);

  const sortedLessons = createMemo(() =>
    [...(subsection()?.lessons ?? [])].sort((a, b) => a.order - b.order),
  );

  return (
    <CoursePageShell
      title={subsection()?.title}
      subtitle="Complete all objectives"
      badge="QUEST"
      containerClass="container-narrow"
      pageLevel="section"
      backHref={`/${params.course}/${params.category}`}
      backLabel="Level"
      extra={
        <div class="flex flex-nowrap gap-2 items-center">
          <span class="subtitle-xp-counter">
            {readLessons().length} / {sortedLessons().length} completed
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
        {sortedLessons().map((lesson) => {
          const isRead = readLessons().includes(lesson.slug);
          return (
            <A
              href={`/${params.course}/${params.category}/${params.subsection}/${lesson.slug}`}
              class={`card card--article${isRead ? " card--article--read" : ""}`}
            >
              <span class="article-order">{lesson.order}</span>
              <span class="article-title">{lesson.title}</span>
              <span
                class="article-xp-badge"
                classList={{ "article-xp-badge--read": isRead }}
              >
                {lesson.order * XP_VALUE}{" "}
                <span class="article-xp-badge__label">XP</span>
              </span>
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
