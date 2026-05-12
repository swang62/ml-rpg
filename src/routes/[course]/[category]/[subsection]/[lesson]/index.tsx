import { destructure } from "@solid-primitives/destructure";
import { A, useParams } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import ExternalLink from "lucide-solid/icons/external-link";
import { createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageTitle from "~/components/PageTitle";
import type { Lesson } from "~/data/types";
import { loadCourse } from "~/server/course";
import { getLessonHTML } from "~/server/lesson";
import { BASE_URL, SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

function LessonNav(props: {
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  course: string | undefined;
  category: string | undefined;
  subsection: string | undefined;
}) {
  return (
    <nav class="lesson-nav">
      {props.prevLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.subsection}/${props.prevLesson.lesson}`}
          class="lesson-nav__link lesson-nav__link--prev"
        >
          <ChevronLeft size={14} />
          <span class="lesson-nav__order">{props.prevLesson.order}</span>
          <span class="lesson-nav__title">{props.prevLesson.title}</span>
        </A>
      ) : null}
      {props.nextLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.subsection}/${props.nextLesson.lesson}`}
          class="lesson-nav__link lesson-nav__link--next"
        >
          <span class="lesson-nav__title">{props.nextLesson.title}</span>
          <span class="lesson-nav__order">{props.nextLesson.order}</span>
          <ChevronRight size={14} />
        </A>
      ) : null}
    </nav>
  );
}

export default function LessonPage() {
  const params = useParams();
  const lessonKey = () => {
    const c = params.course;
    const s = params.subsection;
    const l = params.lesson;
    if (!c || !s || !l) return "";
    return `${c}/${s}/${l}`;
  };

  // Resources
  const [courseData] = createResource(() => params.course, loadCourse);
  const [lessonHTML] = createResource(lessonKey, async (key) => {
    if (!key) return "";
    const [course, subsection, lesson] = key.split("/");
    return getLessonHTML(course, subsection, lesson);
  });

  // Reactive signals
  const data = () => {
    const course = courseData();
    const category = course?.categories.find(
      (cat) => cat.category === params.category,
    );
    const subsection = category?.subsections.find(
      (s) => s.subsection === params.subsection,
    );
    const lesson = subsection?.lessons.find((l) => l.lesson === params.lesson);
    return { course, category, subsection, lesson };
  };

  const { course, category, subsection, lesson } = destructure(data, {
    lazy: true,
  });

  const navData = () => {
    const sub = subsection();
    if (!sub) return { prevLesson: null, nextLesson: null };
    const sorted = [...sub.lessons].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((l) => l.lesson === params.lesson);
    return {
      prevLesson: idx > 0 ? sorted[idx - 1] : null,
      nextLesson: idx < sorted.length - 1 ? sorted[idx + 1] : null,
    };
  };

  const { prevLesson, nextLesson } = destructure(navData, {
    lazy: true,
  });
  useNotFound(() => !course() || !category() || !subsection() || !lesson());

  return (
    <main class="container container-narrow page-level--lesson">
      <PageTitle segment={lesson()?.title} />
      <Breadcrumbs
        items={[
          { label: SITE_NAME, href: "/" },
          { label: course()?.title, href: `/${params.course}` },
          {
            label: category()?.title,
            href: `/${params.course}/${category()?.category}`,
          },
          {
            label: subsection()?.title,
            href: `/${params.course}/${category()?.category}/${subsection()?.subsection}`,
          },
          { label: lesson()?.title },
        ]}
      />

      <div class="lesson-card">
        <Show when={params.lesson} keyed>
          <LessonNav
            prevLesson={prevLesson()}
            nextLesson={nextLesson()}
            course={params.course}
            category={params.category}
            subsection={params.subsection}
          />
          <div class="lesson-number">Lesson {lesson()?.order}</div>
          <Show when={lessonHTML()} fallback={<div class="lesson-loading" />}>
            {(html) => <div innerHTML={html()} />}
          </Show>
          <LessonNav
            prevLesson={prevLesson()}
            nextLesson={nextLesson()}
            course={params.course}
            category={params.category}
            subsection={params.subsection}
          />
          <a
            href={`${BASE_URL}/${category()?.category}/${subsection()?.subsection}/${lesson()?.lesson}`}
            target="_blank"
            rel="noopener noreferrer"
            class="lesson-source-btn"
          >
            <ExternalLink size={14} />
            View on System Overflow
          </a>
          <div class="lesson-footer">
            <A
              href={`/${params.course}/${category()?.category}/${subsection()?.subsection}`}
              class="back-link"
            >
              <ChevronLeft size={14} />
              Back to {subsection()?.title}
            </A>
          </div>
        </Show>
      </div>
    </main>
  );
}
