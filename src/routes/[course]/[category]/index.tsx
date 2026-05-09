import { A, useNavigate, useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES, SITE_NAME } from "~/data/site-data";

export default function CategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const course = ROUTES[params.course ?? ""];
  const category = course?.categories.find(
    (c) => c.category === params.category,
  );

  if (!course || !category) {
    return navigate("/404");
  }

  return (
    <main class="container container-medium page-level--category">
      <PageTitle segment={category.title} />
      <Breadcrumbs
        items={[
          { label: SITE_NAME, href: "/" },
          { label: course.title, href: course.base },
          { label: category.title },
        ]}
      />
      <PageHeader
        title={category.title}
        subtitle={`${category.subsections.length} section${category.subsections.length !== 1 ? "s" : ""}`}
      />

      <section class="subsections-list">
        {category.subsections.map((section) => (
          <A
            href={course.getSectionPath(category.category, section.subsection)}
            class="card card--subsection"
          >
            <h2>{section.title}</h2>
            <span class="card__count">
              {section.lessons.length} lesson
              {section.lessons.length !== 1 ? "s" : ""}
            </span>
          </A>
        ))}
      </section>

      <A href={course.base} class="back-link">
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
        Back to {course.title}
      </A>
    </main>
  );
}
