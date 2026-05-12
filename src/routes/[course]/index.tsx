import { A, useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { SITE_NAME } from "~/utils/constants";
import { loadCourse } from "~/utils/course-data";

export default function CourseIndexPage() {
  const params = useParams();
  const navigate = useNavigate();

  const slug = () => params.course ?? "";
  const [course] = createResource(slug, loadCourse);

  createEffect(() => {
    const c = course();
    if (c !== undefined && !c) navigate("/404");
  });

  return (
    <Show when={course()}>
      {(data) => {
        const c = data();
        const categories = c.categories;

        return (
          <main class="container page-level--course">
            <PageTitle segment={c.title} />
            <Breadcrumbs
              items={[{ label: SITE_NAME, href: "/" }, { label: c.title }]}
            />
            <PageHeader
              title={c.title}
              subtitle={`${categories.length} categories`}
            />

            <section class="categories-grid">
              {categories.map((category) => {
                return (
                  <A
                    href={`/${params.course}/${category.category}`}
                    class="card card--category"
                  >
                    <h2>{category.title}</h2>
                  </A>
                );
              })}
            </section>

            <A href="/" class="back-link">
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
              Back to {SITE_NAME}
            </A>
          </main>
        );
      }}
    </Show>
  );
}
