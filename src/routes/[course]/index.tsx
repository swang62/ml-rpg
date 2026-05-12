import { A, useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
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
      <CoursePageShell
        title={course()?.title}
        subtitle={`${course()?.categories.length} categories`}
        containerClass=""
        pageLevel="course"
        breadcrumbs={[
          { label: SITE_NAME, href: "/" },
          { label: course()?.title },
        ]}
        backHref="/"
        backLabel={SITE_NAME}
      >
        <section class="categories-grid">
          {course()?.categories.map((category) => (
            <A
              href={`/${params.course}/${category.category}`}
              class="card card--category"
            >
              <h2>{category.title}</h2>
            </A>
          ))}
        </section>
      </CoursePageShell>
    </Show>
  );
}
