import { useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import NotFound from "~/components/NotFound";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";
import { buildArticleUrl, siteData } from "~/data/site-data";

export default function SubsectionPage() {
  const params = useParams();
  const group = siteData.find((g) => g.slug === params.group);
  const subsection = group?.subsections.find(
    (s) => s.slug === params.subsection,
  );

  if (!group || !subsection) {
    return (
      <NotFound
        message="Section not found"
        backHref={ROUTES.ML_BASE}
        backLabel="Back to home"
      />
    );
  }

  return (
    <main class="container container-narrow page-level--section">
      <PageTitle segment={subsection.title} />
      <Breadcrumbs
        items={[
          { label: "System Overflow", href: ROUTES.HOME },
          { label: "ML System Design", href: ROUTES.ML_BASE },
          { label: group.title, href: ROUTES.ML_GROUP(group.slug) },
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
              href={buildArticleUrl(group.slug, subsection.slug, article.slug)}
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
