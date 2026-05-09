import { A, useNavigate, useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { COURSES, SITE_NAME } from "~/data/site-data";
import { getLessonUrl } from "~/utils/url";

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
            <a
              href={getLessonUrl(
                category.category,
                subsection.subsection,
                article.lesson,
              )}
              target="_blank"
              rel="noopener noreferrer"
              class="card card--article"
            >
              <span class="article-order">{article.order}</span>
              <span class="article-title">{article.title}</span>
              <span class="article-external" title="Opens in new tab">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10L10 2M10 2H5M10 2v5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </a>
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
