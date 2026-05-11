import { A, useNavigate, useParams } from "@solidjs/router";
import { createEffect, createMemo, createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { SITE_NAME } from "~/utils/constants";
import { loadCourse } from "~/utils/course-data";
import { getLessonContentKey, lessonComponents } from "~/utils/lesson";

export default function SubsectionPage() {
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

  createEffect(() => {
    const c = course();
    if (c !== undefined && !c) navigate("/404");
  });

  createEffect(() => {
    if (course() && !category()) navigate("/404");
  });

  createEffect(() => {
    if (course() && category() && !subsection()) navigate("/404");
  });

  const pageData = createMemo(() => {
    const c = course();
    const cat = category();
    const sub = subsection();
    if (!c || !cat || !sub) return null;
    return { c, cat, sub } as const;
  });

  // Preload lesson components so navigation to individual lessons is instant
  createEffect(() => {
    const sub = subsection();
    if (sub) {
      for (const lesson of sub.lessons) {
        const key = getLessonContentKey(
          params.course ?? "",
          params.subsection ?? "",
          lesson.lesson,
        );
        if (key) {
          lessonComponents[key]();
        }
      }
    }
  });

  return (
    <Show when={pageData()}>
      {(data) => {
        const { c, cat, sub } = data();
        return (
          <main class="container container-narrow page-level--section">
            <PageTitle segment={sub.title} />
            <Breadcrumbs
              items={[
                { label: SITE_NAME, href: "/" },
                { label: c.title, href: `/${params.course}` },
                {
                  label: cat.title,
                  href: `/${params.course}/${cat.category}`,
                },
                { label: sub.title },
              ]}
            />
            <PageHeader
              title={sub.title}
              subtitle={`${sub.lessons.length} lesson${sub.lessons.length !== 1 ? "s" : ""}`}
            />

            <section class="articles-list">
              {[...sub.lessons]
                .sort((a, b) => a.order - b.order)
                .map((article) => (
                  <A
                    href={`/${params.course}/${params.category}/${params.subsection}/${article.lesson}`}
                    class="card card--article"
                  >
                    <span class="article-order">{article.order}</span>
                    <span class="article-title">{article.title}</span>
                  </A>
                ))}
            </section>

            <A href={`/${params.course}/${cat.category}`} class="back-link">
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
              Back to {cat.title}
            </A>
          </main>
        );
      }}
    </Show>
  );
}
