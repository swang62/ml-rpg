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
import { getSectionMetaQuery } from "~/server/course";
import { resetSectionAction } from "~/server/mutations";
import { getSectionReadCountsQuery } from "~/server/progress";
import { XP_VALUE } from "~/utils/constants";
import {
  getAnonSectionReadSlugs,
  resetAnonSection,
  version,
} from "~/utils/local-storage";

export const route = {
  preload: ({ params }) => {
    getSectionReadCountsQuery(
      params.course as string,
      params.section as string,
    );
  },
} satisfies RouteDefinition;

export default function SectionPage() {
  const params = useParams();
  if (!params.category || !params.section) return;

  const { signedIn } = useAuth();

  const section = createAsync(() =>
    getSectionMetaQuery(
      params.course as string,
      params.category as string,
      params.section as string,
    ),
  );

  const serverReadLessons = createAsync(
    () =>
      signedIn()
        ? getSectionReadCountsQuery(
            params.course as string,
            params.section as string,
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
          params.category as string,
          params.section as string,
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
      title={section()?.title}
      subtitle="Complete all objectives to finish this quest"
      badge="QUEST"
      containerClass="container-narrow"
      pageLevel="section"
      backHref={`/${params.course}/${params.category}`}
      backLabel="Level"
      extra={
        <div class="flex flex-nowrap gap-2 items-center">
          <ResetButton
            onClick={async () => {
              if (signedIn()) {
                await reset(params.course as string, params.section as string);
              } else {
                resetAnonSection(
                  params.course as string,
                  params.category as string,
                  params.section as string,
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
      <section class="lessons-list">
        {section()?.lessons.map((lesson) => {
          const isRead = readLessons().includes(lesson.slug);
          return (
            <A
              href={`/${params.course}/${params.category}/${params.section}/${lesson.slug}`}
              class={`card card--lesson${isRead ? " card--lesson--read" : ""}`}
            >
              <span class="lesson-order">{lesson.lessonorder}</span>
              <span class="lesson-title">{lesson.title}</span>
              <span
                class="lesson-xp-badge"
                classList={{ "lesson-xp-badge--read": isRead }}
              >
                {lesson.lessonorder * XP_VALUE}{" "}
                <span class="lesson-xp-badge__label">XP</span>
              </span>
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
