import {
  A,
  createAsync,
  type RouteDefinition,
  useAction,
  useParams,
} from "@solidjs/router";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import CoursePageShell from "~/components/CoursePageShell";
import ResetButton from "~/components/ResetButton";
import { getSubsectionMetaQuery } from "~/server/course";
import { resetSectionAction } from "~/server/mutations";
import { getSectionReadCountsQuery } from "~/server/progress";
import {
  getAnonSectionReadSlugs,
  resetAnonSection,
  version,
} from "~/utils/client-storage";
import { XP_VALUE } from "~/utils/constants";

export const route = {
  preload: ({ params }) => {
    getSubsectionMetaQuery(
      params.course as string,
      params.category as string,
      params.subsection as string,
    );
    getSectionReadCountsQuery(
      params.course as string,
      params.subsection as string,
    );
  },
} satisfies RouteDefinition;

export default function SubsectionPage() {
  const params = useParams();
  if (!params.category || !params.subsection) return;

  const { signedIn } = useAuth();

  const subsection = createAsync(() =>
    getSubsectionMetaQuery(
      params.course as string,
      params.category as string,
      params.subsection as string,
    ),
  );

  const serverReadLessons = createAsync(
    () =>
      signedIn()
        ? getSectionReadCountsQuery(
            params.course as string,
            params.subsection as string,
          )
        : Promise.resolve([]),
    { initialValue: [] },
  );

  const [anonReadLessons, setAnonReadLessons] = createSignal<string[]>([]);
  const dep = createMemo(() => version());

  onMount(() => dep());
  createEffect(() => {
    dep();
    if (!signedIn()) {
      setAnonReadLessons(
        getAnonSectionReadSlugs(
          params.course as string,
          params.subsection as string,
        ),
      );
    }
  });

  const readLessons = createMemo(() =>
    signedIn() ? serverReadLessons() : anonReadLessons(),
  );

  const reset = useAction(resetSectionAction);

  return (
    <CoursePageShell
      title={subsection()?.title}
      subtitle="Complete all objectives to finish this quest"
      badge="QUEST"
      containerClass="container-narrow"
      pageLevel="section"
      backHref={`/${params.course}/${params.category}`}
      backLabel="Level"
      extra={
        <div class="flex flex-nowrap gap-2 items-center">
          <span class="subtitle-xp-counter">
            {readLessons().length} / {subsection()?.lessons.length} completed
          </span>
          <ResetButton
            onClick={async () => {
              if (signedIn()) {
                await reset(
                  params.course as string,
                  params.subsection as string,
                );
              } else {
                resetAnonSection(
                  params.course as string,
                  params.subsection as string,
                );
                setAnonReadLessons([]);
              }
            }}
          >
            <RotateCcw size={12} />
            Reset All
          </ResetButton>
        </div>
      }
    >
      <section class="articles-list">
        {subsection()?.lessons.map((lesson) => {
          const isRead = readLessons().includes(lesson.slug);
          return (
            <A
              href={`/${params.course}/${params.category}/${params.subsection}/${lesson.slug}`}
              class={`card card--article${isRead ? " card--article--read" : ""}`}
            >
              <span class="article-order">{lesson.lessonorder}</span>
              <span class="article-title">{lesson.title}</span>
              <span
                class="article-xp-badge"
                classList={{ "article-xp-badge--read": isRead }}
              >
                {lesson.lessonorder * XP_VALUE}{" "}
                <span class="article-xp-badge__label">XP</span>
              </span>
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
