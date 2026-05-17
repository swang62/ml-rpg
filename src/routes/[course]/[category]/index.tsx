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
import { getCategoryMetaQuery } from "~/server/course";
import { getCategoryReadCountsQuery } from "~/server/progress";
import { getAnonCategoryReadCounts } from "~/utils/client-storage";
import { onCardLeave, onCardMove } from "~/utils/tilt";

export const route = {
  preload: ({ params }) => {
    getCategoryMetaQuery(params.course as string, params.category as string);
    getCategoryReadCountsQuery(params.course as string);
  },
} satisfies RouteDefinition;

export default function CategoryPage() {
  const params = useParams();
  if (!params.category) return;

  const { signedIn } = useAuth();

  const category = createAsync(() =>
    getCategoryMetaQuery(params.course as string, params.category as string),
  );
  const serverReadCounts = createAsync(() =>
    signedIn()
      ? getCategoryReadCountsQuery(params.course as string)
      : Promise.resolve({} as Record<string, number>),
  );

  const [anonReadCounts, setAnonReadCounts] = createSignal<
    Record<string, number>
  >({});

  onMount(() => {
    if (!signedIn()) {
      setAnonReadCounts(getAnonCategoryReadCounts(params.course as string));
    }
  });

  const readCounts = createMemo(() =>
    signedIn() ? serverReadCounts() : anonReadCounts(),
  );

  const subsections = createMemo(() => category()?.subsections ?? []);

  return (
    <CoursePageShell
      title={category()?.title}
      subtitle="Choose your quest to begin training"
      badge="LEVEL"
      containerClass="container-medium"
      pageLevel="category"
      backHref={`/${params.course}`}
      backLabel="World"
    >
      <section class="subsections-list">
        {subsections().map((section) => {
          const readCount = readCounts()?.[section.subsection] ?? 0;
          return (
            <A
              href={`/${params.course}/${params.category}/${section.subsection}`}
              class="card card--subsection"
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <h2>{section.title}</h2>
              {section.lessons.length > 0 && (
                <ProgressBar
                  value={readCount}
                  max={section.lessons.length}
                  color="--level-category"
                />
              )}
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
