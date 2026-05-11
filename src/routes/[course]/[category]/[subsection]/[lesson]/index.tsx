import { A, useNavigate, useParams } from "@solidjs/router";
import {
  type Component,
  createEffect,
  createMemo,
  Show,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageTitle from "~/components/PageTitle";
import { COURSES, SITE_NAME } from "~/data/site-data";
import { getOriginalLessonUrl } from "~/utils/url";

const lessonComponents = import.meta.glob<Component>(
  "~/data/lessons/**/*.tsx",
  {
    eager: true,
    import: "default",
  },
);

export default function LessonPage() {
  const params = useParams();
  const navigate = useNavigate();

  const data = createMemo(() => {
    const course = COURSES[params.course ?? ""];
    const category = course?.categories.find(
      (c) => c.category === params.category,
    );
    const subsection = category?.subsections.find(
      (s) => s.subsection === params.subsection,
    );
    const lesson = subsection?.lessons.find((l) => l.lesson === params.lesson);

    const contentKey = Object.keys(lessonComponents).find((k) =>
      k.endsWith(
        `/${params.course}/${params.subsection}__${params.lesson}.tsx`,
      ),
    );
    const LessonComponent =
      (contentKey ? lessonComponents[contentKey] : undefined) ?? null;

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
      course,
      category,
      subsection,
      lesson,
      LessonComponent,
      sortedLessons,
      prevLesson,
      nextLesson,
    };
  });

  // Early out if anything is missing from path
  createEffect(() => {
    const d = data();
    if (
      !d.course ||
      !d.category ||
      !d.subsection ||
      !d.lesson ||
      !d.LessonComponent
    ) {
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
          {
            label: data().course?.title ?? "",
            href: data().course?.base ?? "",
          },
          {
            label: data().category?.title ?? "",
            href:
              data().course?.getCategoryPath(data().category?.category ?? "") ??
              "",
          },
          {
            label: data().subsection?.title ?? "",
            href:
              data().course?.getSectionPath(
                data().category?.category ?? "",
                data().subsection?.subsection ?? "",
              ) ?? "",
          },
          { label: data().lesson?.title ?? "" },
        ]}
      />

      <div class="lesson-card">
        <Show when={params.lesson} keyed>
          {lessonNav()}
          <div class="lesson-fade-in">
            <Dynamic component={data().LessonComponent as ValidComponent} />
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
              href={
                data().course?.getSectionPath(
                  data().category?.category ?? "",
                  data().subsection?.subsection ?? "",
                ) ?? ""
              }
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
