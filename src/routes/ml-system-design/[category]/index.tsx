import { A, useNavigate, useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";
import { siteData } from "~/data/site-data";

export default function CategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const category = siteData.find((c) => c.slug === params.category);

  if (!category) {
    return navigate("/404");
  }

  return (
    <main class="container container-medium page-level--category">
      <PageTitle segment={category.title} />
      <Breadcrumbs
        items={[
          { label: "System Overflow", href: ROUTES.HOME },
          { label: "ML System Design", href: ROUTES.ML_BASE },
          { label: category.title },
        ]}
      />
      <PageHeader
        title={category.title}
        subtitle={`${category.subsections.length} section${category.subsections.length !== 1 ? "s" : ""}`}
      />

      <section class="subsections-list">
        {category.subsections.map((sub) => (
          <A
            href={ROUTES.ML_SECTION(category.slug, sub.slug)}
            class="card card--subsection"
          >
            <h2>{sub.title}</h2>
            <span class="card__count">
              {sub.articles.length} lesson
              {sub.articles.length !== 1 ? "s" : ""}
            </span>
          </A>
        ))}
      </section>

      <A href={ROUTES.ML_BASE} class="back-link">
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
        Back to ML System Design
      </A>
    </main>
  );
}
