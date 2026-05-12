import { A, useParams } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { createMemo, createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
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
          <main class="container container-medium page-level--category">
            <PageTitle segment={cat.title} />
            <Breadcrumbs
              items={[
                { label: SITE_NAME, href: "/" },
                { label: c.title, href: `/${params.course}` },
                { label: cat.title },
              ]}
            />
            <PageHeader
              title={cat.title}
              subtitle={`${cat.subsections.length} section${cat.subsections.length !== 1 ? "s" : ""}`}
            />

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

            <A href={`/${params.course}`} class="back-link">
              <ChevronLeft size={14} />
              Back to {c.title}
            </A>
          </main>
        );
      }}
    </Show>
  );
}
