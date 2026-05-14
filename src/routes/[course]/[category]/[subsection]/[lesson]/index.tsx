import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ExternalLink from "lucide-solid/icons/external-link";
import { createMemo, createResource, Show } from "solid-js";
import LessonNav from "~/components/LessonNav";
import LessonTracker from "~/components/LessonTracker";
import PageTitle from "~/components/PageTitle";
import { getLessonHTML } from "~/server/lesson";
import { BASE_URL, COURSES } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";
import { useLessonReadStatus } from "~/utils/tracking";

export default function LessonPage() {
  const params = useParams();
  if (!params.category || !params.subsection || !params.lesson) return;

  const course = COURSES[params.course as string];
  const category = course?.categories.find(
    (cat) => cat.category === params.category,
  );
  const subsection = category?.subsections.find(
    (s) => s.subsection === params.subsection,
  );
  const sortedLessons = subsection
    ? [...subsection.lessons].sort((a, b) => a.order - b.order)
    : [];

  useNotFound(!course || !category || !subsection);

  const currentLesson = createMemo(() =>
    sortedLessons.find((l) => l.lesson === params.lesson),
  );
  const navData = createMemo(() => {
    const idx = sortedLessons.findIndex(
      (l) => l.lesson === currentLesson()?.lesson,
    );
    return {
      prevLesson: idx > 0 ? sortedLessons[idx - 1] : null,
      nextLesson:
        idx < sortedLessons.length - 1 ? sortedLessons[idx + 1] : null,
    };
  });
  const lessonURL = createMemo(
    () =>
      `${BASE_URL}/${category?.category}/${subsection?.subsection}/${currentLesson()?.lesson}`,
  );

  const [lessonHTML] = createResource(
    () => params.lesson,
    async () => getLessonHTML(params.course, params.subsection, params.lesson),
  );

  const isRead = useLessonReadStatus(
    params.course,
    params.subsection,
    () => params.lesson,
  );

  return (
    <main class="container container-narrow page-level--lesson">
      <PageTitle segment={currentLesson()?.title} />

      <A
        href={`/${params.course}/${category?.category}/${subsection?.subsection}`}
        class="lesson-back-link"
      >
        <ChevronLeft size={16} />
        Back to Quest
      </A>

      <div class={`lesson-card`}>
        <LessonNav
          prevLesson={navData()?.prevLesson}
          nextLesson={navData()?.nextLesson}
          course={params.course}
          category={params.category}
          subsection={params.subsection}
        />

        <div class={`lesson-title ${isRead() && "lesson-title--read"}`}>
          <span>Objective {currentLesson()?.order}</span>
          <a href={lessonURL()} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} color="grey" />
          </a>
        </div>
        <div innerHTML={lessonHTML()} />
        <LessonTracker
          course={params.course}
          subsection={params.subsection}
          lesson={currentLesson()?.lesson}
          order={currentLesson()?.order}
        />
        <LessonNav
          prevLesson={navData()?.prevLesson}
          nextLesson={navData()?.nextLesson}
          course={params.course}
          category={params.category}
          subsection={params.subsection}
        />

        <Show when={isRead()}>
          <div class="lesson-read-badge">
            <Check size={14} />
            <span>Completed</span>
          </div>
        </Show>
      </div>
    </main>
  );
}
