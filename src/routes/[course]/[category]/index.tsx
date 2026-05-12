import { A, useParams } from "@solidjs/router";
import { createMemo, createResource, Show } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export default function CategoryPage() {
  const params = useParams();
  if (!params.category) return;

  const [course] = createResource(() => params.course, loadCourse);

  const category = createMemo(() =>
    course()?.categories.find((cat) => cat.category === params.category),
  );

  useNotFound(() => !course() || !category());

  return (
    <Show when={category()}>
      <CoursePageShell
        title={category()?.title}
        subtitle={`${category()?.subsections.length} section${category()?.subsections.length !== 1 ? "s" : ""}`}
        containerClass="container-medium"
        breadcrumbs={[
          { label: SITE_NAME, href: "/" },
          { label: course()?.title, href: `/${params.course}` },
          { label: category()?.title },
        ]}
        backHref={`/${params.course}`}
        backLabel={course()?.title}
      >
        <section class="subsections-list">
          {category()?.subsections.map((section) => (
            <A
              href={`/${params.course}/${category()?.category}/${section.subsection}`}
              class="card card--subsection"
            >
              <h2>{section.title}</h2>
            </A>
          ))}
        </section>
      </CoursePageShell>
    </Show>
  );
}
