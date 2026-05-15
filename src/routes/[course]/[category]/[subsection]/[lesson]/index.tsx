import { A, createAsync, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ExternalLink from "lucide-solid/icons/external-link";
import { Show } from "solid-js";
import LessonNav from "~/components/LessonNav";
import LessonTracker from "~/components/LessonTracker";
import PageTitle from "~/components/PageTitle";
import {
  getLessonHTMLQuery,
  getLessonNavQuery,
  isLessonReadQuery,
} from "~/server/quest-store";
import { BASE_URL } from "~/utils/constants";

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
  const isRead = createAsync(
    () =>
      isLessonReadQuery(
        params.course as string,
        params.subsection as string,
        params.lesson as string,
      ),
    { initialValue: false },
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

  const lessonURL = () =>
    `${BASE_URL}/${params.category}/${params.subsection}/${nav()?.currentLesson?.lesson}`;

  return (
    <main class="container container-narrow page-level--lesson">
      <PageTitle segment={nav()?.currentLesson?.title} />

      <A
        href={`/${params.course}/${params.category}/${params.subsection}`}
        classList={{
          "lesson-back-link": true,
          "lesson-back-link--unread": !isRead(),
        }}
      >
        <ChevronLeft size={16} />
        Back to Quest
      </A>

      <div class="lesson-card">
        <LessonNav
          prevLesson={nav()?.prevLesson ?? null}
          nextLesson={nav()?.nextLesson ?? null}
          course={params.course as string}
          category={params.category as string}
          subsection={params.subsection as string}
        />

        <div class={`lesson-title ${isRead() && "lesson-title--read"}`}>
          <span>Objective {nav()?.currentLesson?.order}</span>
          <span
            class="article-xp-badge"
            classList={{ "article-xp-badge--read": isRead() }}
          >
            {(nav()?.currentLesson?.order ?? 0) * 25}
            <span class="article-xp-badge__label">XP</span>
          </span>
          <a href={lessonURL()} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} color="grey" />
          </a>
        </div>
        <div innerHTML={lessonHtml()} />
        <LessonTracker
          course={params.course}
          subsection={params.subsection}
          lesson={nav()?.currentLesson?.lesson}
          order={nav()?.currentLesson?.order}
        />
        <LessonNav
          prevLesson={nav()?.prevLesson ?? null}
          nextLesson={nav()?.nextLesson ?? null}
          course={params.course as string}
          category={params.category as string}
          subsection={params.subsection as string}
        />

        <Show when={isRead()}>
          <div class="lesson-read-badge lesson-read-badge--enter">
            <Check size={14} />
            <span>Completed</span>
          </div>
        </Show>
      </div>
    </main>
  );
}
