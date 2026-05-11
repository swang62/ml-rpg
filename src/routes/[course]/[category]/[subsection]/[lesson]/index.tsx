import { A, useNavigate, useParams } from "@solidjs/router";
import {
  createEffect,
  createMemo,
  createResource,
  Show,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageTitle from "~/components/PageTitle";
import { SITE_NAME } from "~/utils/constants";
import { loadCourse } from "~/utils/course-data";
import { getLessonContentKey, lessonComponents } from "~/utils/lesson";
import { getOriginalLessonUrl } from "~/utils/url";

export default function LessonPage() {
  const params = useParams();
  const navigate = useNavigate();

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

  const contentKey = createMemo(() =>
    getLessonContentKey(
      params.course ?? "",
      params.subsection ?? "",
      params.lesson ?? "",
    ),
  );

  const [lessonComp] = createResource(contentKey, async (key) => {
    if (!key) return null;
    const loader = lessonComponents[key];
    return loader ? await loader() : null;
  });

  createEffect(() => {
    const d = data();
    if (!d.c || !d.category || !d.subsection || !d.lesson) {
      navigate("/404");
    }
  });

  createEffect(() => {
    const key = contentKey();
    if (key === undefined && data().lesson) {
      navigate("/404");
    }
  });

  const lessonNav = () => (
    <nav class="lesson-nav">
      {data().prevLesson ? (
        <A
          href={`/${params.course}/${params.category}/${params.subsection}/${data().prevLesson?.lesson}`}
          class="lesson-nav__link lesson-nav__link--prev"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 11L5 7l4-4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 3l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
          <div class="lesson-fade-in">
            <Show when={lessonComp()} fallback={<div class="lesson-loading" />}>
              {(Comp) => <Dynamic component={Comp() as ValidComponent} />}
            </Show>
          </div>
          {lessonNav()}
          <a
            href={getOriginalLessonUrl(
              data().category?.category ?? "",
              data().subsection?.subsection ?? "",
              data().lesson?.lesson ?? "",
            )}
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 11L5 7l4-4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back to {data().subsection?.title}
            </A>
          </div>
        </Show>
      </div>
    </main>
  );
}
