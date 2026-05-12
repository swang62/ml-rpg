import { A, useParams } from "@solidjs/router";
import { createMemo, createResource, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export default function CategoryPage() {
  const params = useParams();

  const [course] = createResource(() => params.course ?? "", loadCourse);

  const category = createMemo(() => {
    const c = course();
    return c?.categories.find((cat) => cat.category === params.category);
  });

  useNotFound(() => {
    return !course() || !category();
  });

  const pageData = createMemo(() => {
    const c = course();
    const cat = category();
    if (!c || !cat) return null;
    return { c, cat } as const;
  });

  return (
    <Show when={pageData()}>
      {(data) => {
        const { c, cat } = data();
        return (
          <CoursePageShell
            title={cat.title}
            subtitle={`${cat.subsections.length} section${cat.subsections.length !== 1 ? "s" : ""}`}
            containerClass="container-medium"
            breadcrumbs={[
              { label: SITE_NAME, href: "/" },
              { label: c.title, href: `/${params.course}` },
              { label: cat.title },
            ]}
            backHref={`/${params.course}`}
            backLabel={c.title}
          >
            <section class="subsections-list">
              {cat.subsections.map((section) => (
                <A
                  href={`/${params.course}/${cat.category}/${section.subsection}`}
                  class="card card--subsection"
                >
                  <h2>{section.title}</h2>
                </A>
              ))}
            </section>
          </CoursePageShell>
        );
      }}
    </Show>
  );
}
