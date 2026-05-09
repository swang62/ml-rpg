import { useNavigate, useParams } from "@solidjs/router";
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
        subtitle={`${subsection.articles.length} articles`}
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
              <span class="article-title">
                {article.order}. {article.title}
              </span>
              <span class="article-arrow">↗</span>
            </a>
          ))}
      </section>
    </main>
  );
}
