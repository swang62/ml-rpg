import {
  A,
  createAsync,
  type RouteDefinition,
  useNavigate,
  useParams,
} from "@solidjs/router";
import { createMemo, createSignal } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import { getCategoryMetaQuery } from "~/server/course";
import { getCategoryReadCountsQuery } from "~/server/progress";
import { onCardLeave, onCardMove } from "~/utils/animation";
import { navigateAfterLoadingPaint } from "~/utils/loading-nav";
import { getAnonSectionReadCounts, version } from "~/utils/local-storage";

export const route = {
  preload: ({ params }) => {
    getCategoryMetaQuery(params.course as string, params.category as string);
    getCategoryReadCountsQuery(params.course as string);
  },
} satisfies RouteDefinition;

export default function CategoryPage() {
  const navigate = useNavigate();
  const params = useParams();
  if (!params.category) return;

  const { signedIn } = useAuth();
  const [loadingHref, setLoadingHref] = createSignal("");

  const category = createAsync(() =>
    getCategoryMetaQuery(params.course as string, params.category as string),
  );
  const serverReadCounts = createAsync(() =>
    signedIn()
      ? getCategoryReadCountsQuery(params.course as string)
      : Promise.resolve({} as Record<string, number>),
  );

  const readCounts = createMemo(() => {
    if (signedIn()) return serverReadCounts();
    version();
    return getAnonSectionReadCounts(
      params.course as string,
      params.category as string,
    );
  });

  const sections = createMemo(() => category()?.sections ?? []);

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
      <section class="sections-list">
        {sections().map((section) => {
          const readCount = readCounts()?.[section.section] ?? 0;
          const href = `/${params.course}/${params.category}/${section.section}`;
          return (
            <A
              href={href}
              class="card card--section"
              classList={{ "is-navigating": loadingHref() === href }}
              onClick={(event) =>
                navigateAfterLoadingPaint(event, href, navigate, setLoadingHref)
              }
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
