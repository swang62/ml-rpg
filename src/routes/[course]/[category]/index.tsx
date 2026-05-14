import { A, useParams } from "@solidjs/router";
import { createMemo, createResource, onMount } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import ProgressBar from "~/components/ProgressBar";
import { loadCourse } from "~/server/course";
import { fetchReadCounts } from "~/server/tracking";
import { SITE_NAME } from "~/utils/constants";
import { useNotFound } from "~/utils/not-found";

export default function CategoryPage() {
  const params = useParams();
  if (!params.category) return;

  const course = loadCourse(params.course);
  const category = course?.categories.find(
    (cat) => cat.category === params.category,
  );
  useNotFound(!course || !category);

  const subsections = category?.subsections ?? [];

  const [readCounts, { refetch }] = createResource(
    () => ({ course: params.course, subsections }),
    async ({ course, subsections }) => fetchReadCounts(course, subsections),
  );

  onMount(refetch);

  const breadcrumbs = createMemo(() => [
    { label: SITE_NAME, href: "/" },
    { label: course?.title, href: `/${params.course}` },
    { label: category?.title },
  ]);

  return (
    <CoursePageShell
      title={category?.title}
      subtitle={`${subsections.length} quest${subsections.length !== 1 ? "s" : ""}`}
      containerClass="container-medium"
      pageLevel="category"
      breadcrumbs={breadcrumbs()}
      backHref={`/${params.course}`}
      backLabel={course?.title}
    >
      <section class="subsections-list">
        {subsections.map((section) => {
          const readCount = readCounts()?.get(section.subsection) ?? 0;
          return (
            <A
              href={`/${params.course}/${category?.category}/${section.subsection}`}
              class="card card--subsection"
            >
              <h2>{section.title}</h2>
              {section.lessons.length > 0 && (
                <ProgressBar
                  value={readCount}
                  max={section.lessons.length}
                  color="--level-category"
                />
              )}
            </A>
          );
        })}
      </section>
    </CoursePageShell>
  );
}
