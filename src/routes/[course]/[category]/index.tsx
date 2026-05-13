import { A, useParams } from "@solidjs/router";
import Circle from "lucide-solid/icons/circle";
import { createResource, For, onMount } from "solid-js";
import CoursePageShell from "~/components/CoursePageShell";
import { loadCourse } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";
import { getReadLessons } from "~/utils/lesson-progress";
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
    () => subsections,
    async (subs) => {
      if (!subs.length) return new Map<string, number>();
      const results = await Promise.all(
        subs.map(async (sub) => {
          const read = await getReadLessons(params.course, sub.subsection);
          return { subsection: sub.subsection, read: read.length };
        }),
      );
      return new Map(results.map((r) => [r.subsection, r.read]));
    },
  );

  onMount(() => {
    refetch();
  });

  const totalSubs = subsections.length;

  return (
    <CoursePageShell
      title={category?.title}
      subtitle={`${totalSubs} section${totalSubs !== 1 ? "s" : ""}`}
      containerClass="container-medium"
      pageLevel="category"
      breadcrumbs={[
        { label: SITE_NAME, href: "/" },
        { label: course?.title, href: `/${params.course}` },
        { label: category?.title },
      ]}
      backHref={`/${params.course}`}
      backLabel={course?.title}
    >
      <section class="subsections-list">
        {subsections.map((section) => (
          <A
            href={`/${params.course}/${category?.category}/${section.subsection}`}
            class="card card--subsection"
          >
            <h2>{section.title}</h2>
            <span class="section-dots">
              <For each={section.lessons}>
                {(_, i) => (
                  <Circle
                    size={8}
                    fill={
                      i() < (readCounts()?.get(section.subsection) ?? 0)
                        ? "currentColor"
                        : "none"
                    }
                  />
                )}
              </For>
            </span>
          </A>
        ))}
      </section>
    </CoursePageShell>
  );
}
