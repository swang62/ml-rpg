import { destructure } from "@solid-primitives/destructure";
import { A, useParams } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ExternalLink from "lucide-solid/icons/external-link";
import { createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import LessonNav from "~/components/LessonNav";
import PageTitle from "~/components/PageTitle";
import { loadCourse } from "~/server/course";
import { getLessonHTML } from "~/server/lesson";
import { BASE_URL, SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

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
          <div class="lesson-number flex justify-center items-center flex-nowrap gap-2">
            Lesson {lesson()?.order}
            <a
              href={`${BASE_URL}/${category()?.category}/${subsection()?.subsection}/${lesson()?.lesson}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} color="grey" />
            </a>
          </div>
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
