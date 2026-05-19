import {
  A,
  createAsync,
  type RouteDefinition,
  useParams,
} from "@solidjs/router";
import { createMemo, createSignal, onMount } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import { getCourseMetaQuery } from "~/server/course";
import { getCourseReadCountsQuery } from "~/server/progress";
import { getAnonCategoryReadCounts } from "~/utils/client-storage";
import { onCardLeave, onCardMove } from "~/utils/tilt";

export const route = {
  preload: ({ params }) => {
    getCourseMetaQuery(params.course as string);
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

  const [anonReadCounts, setAnonReadCounts] = createSignal<
    Record<string, number>
  >({});
  onMount(() => {
    if (!signedIn()) {
      setAnonReadCounts(getAnonCategoryReadCounts(params.course as string));
    }
  });

  const categories = createMemo(() => course()?.categories ?? []);
  const sectionReadStatus = createMemo(() =>
    signedIn() ? (serverSectionStatus() ?? {}) : {},
  );

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
          const sectionStatuses = signedIn()
            ? (sectionReadStatus()?.[category.category] ?? [])
            : [];
          const completed = sectionStatuses.filter(Boolean).length;
          const max = sectionStatuses.length;

          const anonRead = anonReadCounts()?.[category.category] ?? 0;
          const totalInCategory = category.lessonCount;

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
              {!signedIn() && totalInCategory > 0 && (
                <ProgressBar
                  value={anonRead}
                  max={totalInCategory}
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
