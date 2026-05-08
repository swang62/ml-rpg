import { Title } from "@solidjs/meta";
import { A, useParams } from "@solidjs/router";
import { siteData } from "~/data/site-data";

export default function GroupPage() {
  const params = useParams();
  const group = siteData.find((g) => g.slug === params.group);

  if (!group) {
    return (
      <main class="container">
        <Title>Not Found</Title>
        <h1>Group not found</h1>
        <A href="/" class="back-link">
          ← Back to home
        </A>
      </main>
    );
  }

  return (
    <main class="container">
      <Title>{group.title} — ML System Design</Title>
      <header class="page-header">
        <A href="/" class="back-link">
          ← All categories
        </A>
        <h1>{group.title}</h1>
        <p class="subtitle">{group.subsections.length} sections</p>
      </header>

      <section class="subsections-list">
        {group.subsections.map((sub) => (
          <A href={`/${group.slug}/${sub.slug}`} class="subsection-card">
            <h2>{sub.title}</h2>
            <span class="meta">{sub.articles.length} articles</span>
          </A>
        ))}
      </section>
    </main>
  );
}
