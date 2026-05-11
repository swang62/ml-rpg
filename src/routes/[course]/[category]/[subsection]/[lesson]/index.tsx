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

  const category = createMemo(() => {
    const c = course();
    return c?.categories.find((cat) => cat.category === params.category);
  });

  const subsection = createMemo(() => {
    const cat = category();
    return cat?.subsections.find((s) => s.subsection === params.subsection);
  });

  const lesson = createMemo(() => {
    const sub = subsection();
    return sub?.lessons.find((l) => l.lesson === params.lesson);
  });

  const sortedLessons = createMemo(() => {
    const sub = subsection();
    return sub ? [...sub.lessons].sort((a, b) => a.order - b.order) : [];
  });

  const currentIndex = createMemo(() =>
    sortedLessons().findIndex((l) => l.lesson === params.lesson),
  );

  const prevLesson = createMemo(() =>
    currentIndex() > 0 ? sortedLessons()[currentIndex() - 1] : null,
  );

  const nextLesson = createMemo(() =>
    currentIndex() < sortedLessons().length - 1
      ? sortedLessons()[currentIndex() + 1]
      : null,
  );

  // 404 handling: course not found
  createEffect(() => {
    const c = course();
    if (c !== undefined && !c) navigate("/404");
  });

  // 404 handling: category not found
  createEffect(() => {
    if (course() && !category()) navigate("/404");
  });

  // 404 handling: subsection not found
  createEffect(() => {
    if (course() && category() && !subsection()) navigate("/404");
  });

  // 404 handling: lesson not found
  createEffect(() => {
    if (course() && category() && subsection() && !lesson()) navigate("/404");
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
    // Navigate to 404 if lesson component can't be found
    const key = contentKey();
    if (key === undefined && lesson()) {
      navigate("/404");
    }
  });

  const lessonNav = (prev, next) => (
    <nav class="lesson-nav">
      {prev ? (
        <A
          href={`/${params.course}/${params.category}/${params.subsection}/${prev.lesson}`}
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
          <span class="lesson-nav__order">{prev.order}</span>
          <span class="lesson-nav__title">{prev.title}</span>
        </A>
      ) : null}
      {next ? (
        <A
          href={`/${params.course}/${params.category}/${params.subsection}/${next.lesson}`}
          class="lesson-nav__link lesson-nav__link--next"
        >
          <span class="lesson-nav__title">{next.title}</span>
          <span class="lesson-nav__order">{next.order}</span>
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

  const pageData = createMemo(() => {
    const c = course();
    const cat = category();
    const sub = subsection();
    const l = lesson();
    if (!c || !cat || !sub || !l) return null;
    return { c, cat, sub, l } as const;
  });

  return (
    <Show when={pageData()}>
      {(data) => {
        const { c, cat, sub, l } = data();
        return (
          <main class="container container-narrow page-level--lesson">
            <PageTitle segment={l.title} />
            <Breadcrumbs
              items={[
                { label: SITE_NAME, href: "/" },
                { label: c.title, href: `/${params.course}` },
                {
                  label: cat.title,
                  href: `/${params.course}/${cat.category}`,
                },
                {
                  label: sub.title,
                  href: `/${params.course}/${cat.category}/${sub.subsection}`,
                },
                { label: l.title },
              ]}
            />

            <div class="lesson-card">
              <Show when={params.lesson} keyed>
                {lessonNav(prevLesson(), nextLesson())}
                <div class="lesson-number">Lesson {l.order}</div>
                <div class="lesson-fade-in">
                  <Show
                    when={lessonComp()}
                    fallback={<div class="lesson-loading" />}
                  >
                    {(Comp) => <Dynamic component={Comp() as ValidComponent} />}
                  </Show>
                </div>
                {lessonNav(prevLesson(), nextLesson())}
                <a
                  href={getOriginalLessonUrl(
                    cat.category,
                    sub.subsection,
                    l.lesson,
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
                    href={`/${params.course}/${cat.category}/${sub.subsection}`}
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
                    Back to {sub.title}
                  </A>
                </div>
              </Show>
            </div>
          </main>
        );
      }}
    </Show>
  );
}
