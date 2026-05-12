import { A, useNavigate, useParams } from "@solidjs/router";
import { createEffect, createMemo, createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { SITE_NAME } from "~/utils/constants";
import { loadCourse } from "~/utils/course-data";

export default function CategoryPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [course] = createResource(() => params.course ?? "", loadCourse);

  const category = createMemo(() => {
    const c = course();
    return c?.categories.find((cat) => cat.category === params.category);
  });

  createEffect(() => {
    const c = course();
    if (c !== undefined && !c) navigate("/404");
  });

  createEffect(() => {
    const cat = category();
    if (course() && !cat) navigate("/404");
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
              Back to {c.title}
            </A>
          </main>
        );
      }}
    </Show>
  );
}
