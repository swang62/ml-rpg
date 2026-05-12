import { A, useParams } from "@solidjs/router";
import { ChevronLeft, ChevronRight } from "lucide-solid";
import { createEffect, createMemo, createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageTitle from "~/components/PageTitle";
import { loadCourse } from "~/server/course";
import { getLessonHTML } from "~/server/lesson";
import { BASE_URL, SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

const preloaded = new Map<string, string>();

export default function LessonPage() {
  const params = useParams();

  const [course] = createResource(() => params.course ?? "", loadCourse);

  const data = createMemo(() => {
    const c = course();
    const category = c?.categories.find(
      (cat) => cat.category === params.category,
    );
    const subsection = category?.subsections.find(
      (s) => s.subsection === params.subsection,
    );
    const lesson = subsection?.lessons.find((l) => l.lesson === params.lesson);

    const sortedLessons = subsection
      ? [...subsection.lessons].sort((a, b) => a.order - b.order)
      : [];
    const currentIndex = sortedLessons.findIndex(
      (l) => l.lesson === params.lesson,
    );
    const prevLesson =
      currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
    const nextLesson =
      currentIndex < sortedLessons.length - 1
        ? sortedLessons[currentIndex + 1]
        : null;

    return {
      c,
      category,
      subsection,
      lesson,
      sortedLessons,
      prevLesson,
      nextLesson,
    };
  });

  useNotFound(() => {
    const d = data();
    return !d.c || !d.category || !d.subsection || !d.lesson;
  });

  const lessonKey = () => {
    const c = params.course;
    const s = params.subsection;
    const l = params.lesson;
    if (!c || !s || !l) return "";
    return `${c}/${s}/${l}`;
  };

  const [lessonHTML] = createResource(lessonKey, async (key) => {
    if (!key) return "";
    const cached = preloaded.get(key);
    if (cached !== undefined) {
      preloaded.delete(key);
      return cached;
    }
    const [course, subsection, lesson] = key.split("/");
    return getLessonHTML(course, subsection, lesson);
  });

  // Preload adjacent lessons
  createEffect(() => {
    const { prevLesson, nextLesson } = data();
    const current = lessonKey();
    if (!current) return;
    const [course, subsection] = current.split("/");
    for (const lesson of [prevLesson, nextLesson]) {
      if (!lesson) continue;
      const k = `${course}/${subsection}/${lesson.lesson}`;
      if (!preloaded.has(k) && k !== current) {
        getLessonHTML(course, subsection, lesson.lesson).then((html) =>
          preloaded.set(k, html),
        );
      }
    }
  });

  const lessonNav = () => (
    <nav class="lesson-nav">
      {data().prevLesson ? (
        <A
          href={`/${params.course}/${params.category}/${params.subsection}/${data().prevLesson?.lesson}`}
          class="lesson-nav__link lesson-nav__link--prev"
        >
          <ChevronLeft size={14} />
          <span class="lesson-nav__order">{data().prevLesson?.order}</span>
          <span class="lesson-nav__title">{data().prevLesson?.title}</span>
        </A>
      ) : null}
      {data().nextLesson ? (
        <A
          href={`/${params.course}/${params.category}/${params.subsection}/${data().nextLesson?.lesson}`}
          class="lesson-nav__link lesson-nav__link--next"
        >
          <span class="lesson-nav__title">{data().nextLesson?.title}</span>
          <span class="lesson-nav__order">{data().nextLesson?.order}</span>
          <ChevronRight size={14} />
        </A>
      ) : null}
    </nav>
  );

  return (
    <main class="container container-narrow page-level--lesson">
      <PageTitle segment={data().lesson?.title} />
      <Breadcrumbs
        items={[
          { label: SITE_NAME, href: "/" },
          { label: data().c?.title ?? "", href: `/${params.course}` },
          {
            label: data().category?.title ?? "",
            href: `/${params.course}/${data().category?.category}`,
          },
          {
            label: data().subsection?.title ?? "",
            href: `/${params.course}/${data().category?.category}/${data().subsection?.subsection}`,
          },
          { label: data().lesson?.title ?? "" },
        ]}
      />

      <div class="lesson-card">
        <Show when={params.lesson} keyed>
          {lessonNav()}
          <div class="lesson-number">Lesson {data().lesson?.order}</div>
          <Show when={lessonHTML()} fallback={<div class="lesson-loading" />}>
            {(html) => <div innerHTML={html()} />}
          </Show>
          {lessonNav()}
          <a
            href={`${BASE_URL}/${data().category?.category ?? ""}/${data().subsection?.subsection ?? ""}/${data().lesson?.lesson ?? ""}`}
            target="_blank"
            rel="noopener noreferrer"
            class="lesson-source-btn"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 12L12 2M12 2H5M12 2v7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            View original on System Overflow
          </a>
          <div class="lesson-footer">
            <A
              href={`/${params.course}/${data().category?.category}/${data().subsection?.subsection}`}
              class="back-link"
            >
              <ChevronLeft size={14} />
              Back to {data().subsection?.title}
            </A>
          </div>
        </Show>
      </div>
    </main>
  );
}
