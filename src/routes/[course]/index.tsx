import { A, useParams } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import { createResource, Show } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export default function CourseIndexPage() {
  const params = useParams();

  const [course] = createResource(() => params.course, loadCourse);

  // Early out
  useNotFound(() => !course());

  return (
    <Show when={course()}>
      <main class="container page-level--course">
        <PageTitle segment={course()?.title} />
        <Breadcrumbs
          items={[{ label: SITE_NAME, href: "/" }, { label: course()?.title }]}
        />
        <PageHeader
          title={course()?.title}
          subtitle={`${course()?.categories.length} categories`}
        />

        <section class="categories-grid">
          {course()?.categories.map((category) => {
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
    </Show>
  );
}
