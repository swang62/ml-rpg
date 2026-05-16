import { createAsync, type RouteDefinition, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import ExternalLink from "lucide-solid/icons/external-link";

import { createSignal, Show } from "solid-js";
import BackToQuest from "~/components/BackToQuest";
import LessonNav from "~/components/LessonNav";
import LessonTracker from "~/components/LessonTracker";
import PageTitle from "~/components/PageTitle";
import { getLessonNavQuery } from "~/server/course";
import { getLessonHTMLQuery } from "~/server/lesson";
import { getLessonReadStatusQuery } from "~/server/progress";
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

  // Preloaded via route.preload, auto-invalidated by markLessonReadAction via
  // single-flight mutation — no manual refetching needed
  const isRead = createAsync(() =>
    getLessonReadStatusQuery(
      params.course as string,
      params.subsection as string,
      params.lesson as string,
    ),
  );

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
        isRead={!!isRead()}
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
          <span>Objective {nav()?.currentLesson?.order}</span>
          <span
            class="article-xp-badge"
            classList={{ "article-xp-badge--read": isRead() }}
          >
            {!isRead() && (
              <>
                {"("}
                {(nav()?.currentLesson?.order ?? 0) * XP_VALUE}
                <span class="article-xp-badge__label">XP)</span>
              </>
            )}
          </span>
          <ExternalLink size={14} class="lesson-title__ext-link" />
        </a>
        <div innerHTML={lessonHtml()} />
        <LessonTracker
          course={params.course}
          subsection={params.subsection}
          lesson={nav()?.currentLesson?.slug}
          order={nav()?.currentLesson?.order}
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
            <span>Objective Complete</span>
          </div>
        </Show>
      </div>
    </main>
  );
}
