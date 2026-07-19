import {
  A,
  createAsync,
  type RouteDefinition,
  useParams,
} from "@solidjs/router";
import { createMemo } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import { getCourseMetaQuery } from "~/server/course";
import { getCourseReadCountsQuery } from "~/server/progress";
import { onCardLeave, onCardMove } from "~/utils/animation";
import { getAnonSectionReadCounts, version } from "~/utils/local-storage";

export const route = {
  preload: ({ params }) => {
    getCourseReadCountsQuery(params.course as string);
  },
} satisfies RouteDefinition;

export default function CourseIndexPage() {
  const params = useParams();
  const { signedIn } = useAuth();
  const course = createAsync(() => getCourseMetaQuery(params.course as string));
  const serverSectionStatus = createAsync(() =>
    signedIn()
      ? getCourseReadCountsQuery(params.course as string)
      : Promise.resolve({} as Record<string, boolean[]>),
  );

  const categories = createMemo(() => course()?.categories ?? []);
  const sectionReadStatus = createMemo(() =>
    signedIn() ? (serverSectionStatus() ?? {}) : {},
  );
  const anonSectionReadCounts = createMemo(() => {
    version();
    const counts: Record<string, Record<string, number>> = {};
    for (const category of categories()) {
      counts[category.category] = getAnonSectionReadCounts(
        params.course as string,
        category.category,
      );
    }
    return counts;
  });

  return (
    <CoursePageShell
      title={course()?.title}
      subtitle="Choose a level to explore"
      badge="WORLD"
      containerClass=""
      pageLevel="course"
      backHref="/"
      backLabel="Worlds"
    >
      <section class="categories-grid">
        {categories().map((category) => {
          const sectionStatuses =
            sectionReadStatus()?.[category.category] ?? [];
          const completed = signedIn()
            ? sectionStatuses.filter(Boolean).length
            : category.sections.filter(
                (section) =>
                  (anonSectionReadCounts()[category.category]?.[
                    section.section
                  ] ?? 0) >= section.lessonCount,
              ).length;
          const max = signedIn()
            ? sectionStatuses.length
            : category.sections.length;

          return (
            <A
              href={`/${params.course}/${category.category}`}
              class="card card--category"
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <h2>{category.title}</h2>
              {max > 0 && (
                <ProgressBar
                  value={completed}
                  max={max}
                  color="--level-course"
                />
              )}
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
