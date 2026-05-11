import { A, useNavigate, useParams } from "@solidjs/router";
import { onMount } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { COURSES } from "~/data/site-data";
import { SITE_NAME } from "~/utils/constants";
import { getLessonContentKey, lessonComponents } from "~/utils/lesson";

export default function SubsectionPage() {
  const params = useParams();
  const navigate = useNavigate();
  const course = COURSES[params.course ?? ""];
  const category = course?.categories.find(
    (c) => c.category === params.category,
  );
  const subsection = category?.subsections.find(
    (s) => s.subsection === params.subsection,
  );

  onMount(() => {
    if (subsection) {
      for (const lesson of subsection.lessons) {
        const key = getLessonContentKey(
          params.course ?? "",
          params.subsection ?? "",
          lesson.lesson,
        );
        if (key) {
          lessonComponents[key]();
        }
      }
    }
  });

  if (!course || !category || !subsection) {
    return navigate("/404");
  }

  return (
    <main class="container container-narrow page-level--section">
      <PageTitle segment={subsection.title} />
      <Breadcrumbs
        items={[
          { label: SITE_NAME, href: "/" },
          { label: course.title, href: course.base },
          {
            label: category.title,
            href: course.getCategoryPath(category.category),
          },
          { label: subsection.title },
        ]}
      />
      <PageHeader
        title={subsection.title}
        subtitle={`${subsection.lessons.length} lesson${subsection.lessons.length !== 1 ? "s" : ""}`}
      />

      <section class="articles-list">
        {[...subsection.lessons]
          .sort((a, b) => a.order - b.order)
          .map((article) => (
            <A
              href={`/${params.course}/${params.category}/${params.subsection}/${article.lesson}`}
              class="card card--article"
            >
              <span class="article-order">{article.order}</span>
              <span class="article-title">{article.title}</span>
            </A>
          ))}
      </section>

      <A href={course.getCategoryPath(category.category)} class="back-link">
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
        Back to {category.title}
      </A>
    </main>
  );
}
