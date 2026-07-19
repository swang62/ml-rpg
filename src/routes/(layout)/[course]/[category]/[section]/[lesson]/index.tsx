import "~/legacy-shim.css";

import { createAsync, type RouteDefinition, useParams } from "@solidjs/router";
import ExternalLink from "lucide-solid/icons/external-link";

import { createMemo, createSignal, Show } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import BackToQuest from "~/components/BackToQuest";
import LessonNav from "~/components/LessonNav";
import LessonTracker from "~/components/LessonTracker";
import PageTitle from "~/components/PageTitle";
import {
  getLessonPageContentQuery,
  getLessonReadStatusFresh,
} from "~/server/course";
import { EXTERNAL_URL, XP_TOAST_TIMEOUT, XP_VALUE } from "~/utils/constants";
import { isAnonLessonRead, version } from "~/utils/local-storage";

export const route = {
  preload: ({ params }) => {
    getLessonPageContentQuery(
      params.course as string,
      params.category as string,
      params.section as string,
    );
  },
} satisfies RouteDefinition;

export default function LessonPage() {
  const params = useParams();
  if (!params.category || !params.section || !params.lesson) return;

  const { signedIn } = useAuth();

  // Cached by section — navigating between lessons in the same section is instant
  const lessons = createAsync(() =>
    getLessonPageContentQuery(
      params.course as string,
      params.category as string,
      params.section as string,
    ),
  );

  // Derive current lesson, prev/next, html from the full section array
  const lessonData = createMemo(() => {
    const all = lessons();
    if (!all) return null;
    const idx = all.findIndex((l) => l.slug === params.lesson);
    if (idx === -1) return null;
    return {
      currentLesson: all[idx],
      prevLesson: idx > 0 ? all[idx - 1] : null,
      nextLesson: idx < all.length - 1 ? all[idx + 1] : null,
      html: all[idx].html,
    };
  });

  // Fresh every navigation — lightweight boolean
  const freshReadStatus = createAsync(
    () =>
      signedIn()
        ? getLessonReadStatusFresh(
            params.course as string,
            params.category as string,
            params.section as string,
            params.lesson as string,
          )
        : Promise.resolve(false),
    { initialValue: false },
  );

  const isRead = createMemo(() => {
    if (signedIn()) return freshReadStatus();
    version();
    return isAnonLessonRead(
      params.course as string,
      params.category as string,
      params.section as string,
      params.lesson as string,
    );
  });

  const [toastVisible, setToastVisible] = createSignal(false);

  const handleRead = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), XP_TOAST_TIMEOUT);
  };

  const lessonURL = () =>
    `${EXTERNAL_URL}/${params.category}/${params.section}/${lessonData()?.currentLesson?.slug}`;

  return (
    <main class="container container-narrow page-level--lesson">
      <PageTitle segment={lessonData()?.currentLesson?.title} />
      <BackToQuest
        href={`/${params.course}/${params.category}/${params.section}`}
        isRead={isRead()}
      />

      <div class="lesson-card">
        <LessonNav
          prevLesson={lessonData()?.prevLesson ?? null}
          nextLesson={lessonData()?.nextLesson ?? null}
          course={params.course as string}
          category={params.category as string}
          section={params.section as string}
        />

        <a
          href={lessonURL()}
          target="_blank"
          rel="noopener noreferrer"
          class={`lesson-title ${isRead() && "lesson-title--read"}`}
        >
          <span>Objective {lessonData()?.currentLesson?.lessonorder}</span>
          <span
            class="lesson-xp-badge"
            classList={{ "lesson-xp-badge--read": isRead() }}
          >
            {!isRead() && (
              <>
                {"("}
                {(lessonData()?.currentLesson?.lessonorder ?? 0) * XP_VALUE}
                <span class="lesson-xp-badge__label">XP)</span>
              </>
            )}
          </span>
          <ExternalLink size={14} class="lesson-title__ext-link" />
        </a>
        <div innerHTML={lessonData()?.html ?? ""} />
        <LessonTracker
          course={params.course}
          category={params.category}
          section={params.section}
          lesson={lessonData()?.currentLesson?.slug}
          lessonOrder={lessonData()?.currentLesson?.lessonorder}
          alreadyRead={isRead()}
          onRead={handleRead}
        />
        <LessonNav
          prevLesson={lessonData()?.prevLesson ?? null}
          nextLesson={lessonData()?.nextLesson ?? null}
          course={params.course as string}
          category={params.category as string}
          section={params.section as string}
        />

        <Show when={toastVisible()}>
          <div class="lesson-read-toast font-pixel">
            +{(lessonData()?.currentLesson?.lessonorder ?? 0) * XP_VALUE} XP
          </div>
        </Show>
      </div>
    </main>
  );
}
