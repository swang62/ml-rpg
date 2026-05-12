import { A, useParams } from "@solidjs/router";
import { createMemo, createResource, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export default function SubsectionPage() {
  const params = useParams();

  const [course] = createResource(() => params.course ?? "", loadCourse);

  const category = createMemo(() => {
    const c = course();
    return c?.categories.find((cat) => cat.category === params.category);
  });

  const subsection = createMemo(() => {
    const cat = category();
    return cat?.subsections.find((s) => s.subsection === params.subsection);
  });

  useNotFound(() => {
    return !course() || !category() || !subsection();
  });

  const pageData = createMemo(() => {
    const c = course();
    const cat = category();
    const sub = subsection();
    if (!c || !cat || !sub) return null;
    return { c, cat, sub } as const;
  });

  return (
    <Show when={pageData()}>
      {(data) => {
        const { c, cat, sub } = data();
        return (
          <CoursePageShell
            title={sub.title}
            subtitle={`${sub.lessons.length} lesson${sub.lessons.length !== 1 ? "s" : ""}`}
            containerClass="container-narrow"
            breadcrumbs={[
              { label: SITE_NAME, href: "/" },
              { label: c.title, href: `/${params.course}` },
              {
                label: cat.title,
                href: `/${params.course}/${cat.category}`,
              },
              { label: sub.title },
            ]}
            backHref={`/${params.course}/${cat.category}`}
            backLabel={cat.title}
          >
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
          </CoursePageShell>
        );
      }}
    </Show>
  );
}
