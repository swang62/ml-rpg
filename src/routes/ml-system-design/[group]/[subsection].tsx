import { Title } from "@solidjs/meta";
import { A, useParams } from "@solidjs/router";
import { buildArticleUrl, siteData } from "~/data/site-data";

export default function SubsectionPage() {
  const params = useParams();
  const group = siteData.find((g) => g.slug === params.group);
  const subsection = group?.subsections.find(
    (s) => s.slug === params.subsection,
  );

  if (!group || !subsection) {
    return (
      <main class="container">
        <Title>Not Found</Title>
        <h1>Section not found</h1>
        <A href="/ml-system-design" class="back-link">
          ← Back to home
        </A>
      </main>
    );
  }

  return (
    <main class="container-list">
      <Title>
        {subsection.title} — {group.title}
      </Title>
      <header class="page-header">
        <A href={`/ml-system-design/${group.slug}`} class="back-link">
          ← {group.title}
        </A>
        <h1>{subsection.title}</h1>
      </header>

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
