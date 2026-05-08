import { useParams } from "@solidjs/router";
import NotFound from "~/components/NotFound";
import PageHeader from "~/components/PageHeader";
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
        backHref="/ml-system-design"
        backLabel="Back to home"
      />
    );
  }

  return (
    <main class="container-list">
      <PageHeader
        title={subsection.title}
        pageTitle={`${subsection.title} — ${group.title}`}
        backHref={`/ml-system-design/${group.slug}`}
        backLabel={group.title}
      />

      <section class="articles-list">
        {[...subsection.articles]
          .sort((a, b) => a.order - b.order)
          .map((article) => (
            <a
              href={buildArticleUrl(group.slug, subsection.slug, article.slug)}
              target="_blank"
              rel="noopener noreferrer"
              class="article-link"
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
