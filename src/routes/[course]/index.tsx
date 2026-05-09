import { A, useNavigate, useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { COURSES, SITE_NAME } from "~/data/site-data";

export default function CourseIndexPage() {
  const params = useParams();
  const navigate = useNavigate();
  const course = COURSES[params.course ?? ""];

  if (!course) {
    return navigate("/404");
  }

  const categories = course.categories;

  return (
    <main class="container page-level--course">
      <PageTitle segment={course.title} />
      <Breadcrumbs
        items={[{ label: SITE_NAME, href: "/" }, { label: course.title }]}
      />
      <PageHeader
        title={course.title}
        subtitle={`${categories.length} categories`}
      />

      <section class="categories-grid">
        {categories.map((category) => {
          const sectionCount = category.subsections.length;
          return (
            <A
              href={course.getCategoryPath(category.category)}
              class="card card--category"
            >
              <h2>{category.title}</h2>
              <span class="card__count">
                {sectionCount} section{sectionCount !== 1 ? "s" : ""}
              </span>
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
}
