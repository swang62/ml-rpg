import { createAsync, type RouteDefinition, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import ExternalLink from "lucide-solid/icons/external-link";

import { createMemo, createSignal, Show } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import BackToQuest from "~/components/BackToQuest";
import LessonNav from "~/components/LessonNav";
import LessonTracker from "~/components/LessonTracker";
import PageTitle from "~/components/PageTitle";
import { getLessonNavQuery } from "~/server/course";
import { getLessonHTMLQuery } from "~/server/lesson";
import { getLessonReadStatusQuery } from "~/server/progress";
import { isAnonLessonRead, version } from "~/utils/client-storage";
import { BASE_URL, TOAST_TIMEOUT, XP_VALUE } from "~/utils/constants";

export const route = {
  preload: ({ params }) => {
    getLessonReadStatusQuery(
      params.course as string,
      params.subsection as string,
      params.lesson as string,
    );
  },
} satisfies RouteDefinition;

export default function LessonPage() {
  const params = useParams();
  if (!params.category || !params.subsection || !params.lesson) return;

  const { signedIn } = useAuth();

  const nav = createAsync(() =>
    getLessonNavQuery(
      params.course as string,
      params.category as string,
      params.subsection as string,
      params.lesson as string,
    ),
  );

  const lessonHtml = createAsync(
    () =>
      getLessonHTMLQuery(
        params.course as string,
        params.subsection as string,
        params.lesson as string,
      ),
    { initialValue: "" },
  );

  const serverReadStatus = createAsync(() =>
    signedIn()
      ? getLessonReadStatusQuery(
          params.course as string,
          params.subsection as string,
          params.lesson as string,
        )
      : Promise.resolve(false),
  );

  const isRead = createMemo(() => {
    if (signedIn()) return serverReadStatus();
    version(); // reactively re-read localStorage on version bumps (e.g. lesson marked read)
    return isAnonLessonRead(
      params.course as string,
      params.category as string,
      params.subsection as string,
      params.lesson as string,
    );
  });

  const [toastVisible, setToastVisible] = createSignal(false);

  const handleRead = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), TOAST_TIMEOUT);
  };

  const lessonURL = () =>
    `${BASE_URL}/${params.category}/${params.subsection}/${nav()?.currentLesson?.slug}`;

  return (
    <main class="container container-narrow page-level--lesson">
      <PageTitle segment={nav()?.currentLesson?.title} />
      <BackToQuest
        href={`/${params.course}/${params.category}/${params.subsection}`}
        isRead={isRead()}
      />

      <div class="lesson-card">
        <LessonNav
          prevLesson={nav()?.prevLesson ?? null}
          nextLesson={nav()?.nextLesson ?? null}
          course={params.course as string}
          category={params.category as string}
          subsection={params.subsection as string}
        />

        <a
          href={lessonURL()}
          target="_blank"
          rel="noopener noreferrer"
          class={`lesson-title ${isRead() && "lesson-title--read"}`}
        >
          <span>Objective {nav()?.currentLesson?.lessonorder}</span>
          <span
            class="article-xp-badge"
            classList={{ "article-xp-badge--read": isRead() }}
          >
            {!isRead() && (
              <>
                {"("}
                {(nav()?.currentLesson?.lessonorder ?? 0) * XP_VALUE}
                <span class="article-xp-badge__label">XP)</span>
              </>
            )}
          </span>
          <ExternalLink size={14} class="lesson-title__ext-link" />
        </a>
        <div innerHTML={lessonHtml()} />
        <LessonTracker
          course={params.course}
          category={params.category}
          subsection={params.subsection}
          lesson={nav()?.currentLesson?.slug}
          lessonOrder={nav()?.currentLesson?.lessonorder}
          alreadyRead={isRead()}
          onRead={handleRead}
        />
        <LessonNav
          prevLesson={nav()?.prevLesson ?? null}
          nextLesson={nav()?.nextLesson ?? null}
          course={params.course as string}
          category={params.category as string}
          subsection={params.subsection as string}
        />

        <div class="lesson-back-link-bottom">
          <BackToQuest
            href={`/${params.course}/${params.category}/${params.subsection}`}
            isRead={!!isRead()}
          />
        </div>

        <Show when={toastVisible()}>
          <div class="lesson-read-toast">
            <Check size={14} />
            <span>Complete</span>
          </div>
        </Show>
      </div>
    </main>
  );
}
