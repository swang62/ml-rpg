import { Title } from "@solidjs/meta";
import { A, useParams } from "@solidjs/router";
import { siteData } from "~/data/site-data";

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
        <A href="/" class="back-link">
          ← Back to home
        </A>
      </main>
    );
  }

  return (
    <main class="container">
      <Title>
        {subsection.title} — {group.title}
      </Title>
      <header class="page-header">
        <A href={`/${group.slug}`} class="back-link">
          ← {group.title}
        </A>
        <h1>{subsection.title}</h1>
      </header>

      <section class="articles-list">
        {subsection.articles.map((article) => (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            class="article-link"
          >
            <span class="article-title">{article.title}</span>
            <span class="article-arrow">↗</span>
          </a>
        ))}
      </section>
    </main>
  );
}
