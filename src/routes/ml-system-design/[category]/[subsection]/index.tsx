import { A, useNavigate, useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";
import { buildArticleUrl, siteData } from "~/data/site-data";

export default function SubsectionPage() {
  const params = useParams();
  const navigate = useNavigate();
  const category = siteData.find((c) => c.slug === params.category);
  const subsection = category?.subsections.find(
    (s) => s.slug === params.subsection,
  );

  if (!category || !subsection) {
    return navigate("/404");
  }

  return (
    <main class="container container-narrow page-level--section">
      <PageTitle segment={subsection.title} />
      <Breadcrumbs
        items={[
          { label: "System Overflow", href: ROUTES.HOME },
          { label: "ML System Design", href: ROUTES.ML_BASE },
          { label: category.title, href: ROUTES.ML_CATEGORY(category.slug) },
          { label: subsection.title },
        ]}
      />
      <PageHeader
        title={subsection.title}
        subtitle={`${subsection.articles.length} article${subsection.articles.length !== 1 ? "s" : ""}`}
      />

      <section class="articles-list">
        {[...subsection.articles]
          .sort((a, b) => a.order - b.order)
          .map((article) => (
            <a
              href={buildArticleUrl(
                category.slug,
                subsection.slug,
                article.slug,
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

      <A href={ROUTES.ML_CATEGORY(category.slug)} class="back-link">
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
