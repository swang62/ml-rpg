import { A, useParams } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ExternalLink from "lucide-solid/icons/external-link";
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  onCleanup,
  Show,
} from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import LessonNav from "~/components/LessonNav";
import LessonTracker from "~/components/LessonTracker";
import PageTitle from "~/components/PageTitle";
import { loadCourse } from "~/server/course";
import { getLessonHTML } from "~/server/lesson";
import { BASE_URL, SITE_NAME } from "~/utils/constants";
import { isLessonRead } from "~/utils/lesson-progress";
import { useNotFound } from "~/utils/not-found";

export default function LessonPage() {
  const params = useParams();
  if (!params.category || !params.subsection || !params.lesson) return;

  // Static course data — category/subsection slugs come from the URL and don't change
  const course = loadCourse(params.course);
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

  // Reactive resources
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
  const [lessonHTML] = createResource(
    () => params.lesson,
    async () => getLessonHTML(params.course, params.subsection, params.lesson),
  );

  const [isRead, setIsRead] = createSignal(false);

  createEffect(() => {
    setIsRead(false);
    let cancelled = false;

    const check = async () => {
      if (cancelled) return;
      const read = await isLessonRead(
        params.course,
        params.subsection,
        params.lesson,
      );
      if (!cancelled && read) {
        setIsRead(true);
        clearInterval(timer);
      }
    };

    check();
    const timer = setInterval(check, 1000);

    onCleanup(() => {
      cancelled = true;
      clearInterval(timer);
    });
  });

  return (
    <main class="container container-narrow page-level--lesson">
      <PageTitle segment={currentLesson()?.title} />
      <Breadcrumbs
        items={[
          { label: SITE_NAME, href: "/" },
          { label: course?.title, href: `/${params.course}` },
          {
            label: category?.title,
            href: `/${params.course}/${params.category}`,
          },
          {
            label: subsection?.title,
            href: `/${params.course}/${params.category}/${params.subsection}`,
          },
          { label: currentLesson()?.title },
        ]}
      />

      <div class="lesson-card">
        <LessonNav
          prevLesson={navData()?.prevLesson}
          nextLesson={navData()?.nextLesson}
          course={params.course}
          category={params.category}
          subsection={params.subsection}
        />
        <div class="lesson-number flex justify-center items-center flex-nowrap gap-2">
          Lesson {currentLesson()?.order}
          <a
            href={`${BASE_URL}/${category?.category}/${subsection?.subsection}/${currentLesson()?.lesson}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={14} color="grey" />
          </a>
        </div>
        <div innerHTML={lessonHTML()} />
        <LessonTracker
          course={params.course}
          subsection={params.subsection}
          lesson={currentLesson()?.lesson}
        />
        <LessonNav
          prevLesson={navData()?.prevLesson}
          nextLesson={navData()?.nextLesson}
          course={params.course}
          category={params.category}
          subsection={params.subsection}
        />

        <div class="lesson-footer">
          <div class="lesson-footer__inner">
            <A
              href={`/${params.course}/${category?.category}/${subsection?.subsection}`}
              class="back-link"
            >
              <ChevronLeft size={14} />
              Back to {subsection?.title}
            </A>
          </div>
        </div>
        <Show when={isRead()}>
          <div class="lesson-read-badge">
            <Check size={14} />
            <span>Read</span>
          </div>
        </Show>
      </div>
    </main>
  );
}
