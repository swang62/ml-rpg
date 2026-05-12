import { A, useParams } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export default function CourseIndexPage() {
  const params = useParams();

  const slug = () => params.course ?? "";
  const [course] = createResource(slug, loadCourse);
  useNotFound(() => !course());

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
              <ChevronLeft size={14} />
              Back to {SITE_NAME}
            </A>
          </main>
        );
      }}
    </Show>
  );
}
