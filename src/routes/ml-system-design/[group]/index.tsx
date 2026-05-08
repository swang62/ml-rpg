import { A, useParams } from "@solidjs/router";
import NotFound from "~/components/NotFound";
import { siteData } from "~/data/site-data";

export default function GroupPage() {
  const params = useParams();
  const group = siteData.find((group) => group.slug === params.group);

  if (!group) {
    return (
      <NotFound
        message="Group not found"
        backHref="/ml-system-design"
        backLabel="Back to home"
      />
    );
  }

  return (
    <main class="container-list">
      <Title>{group.title}</Title>
      <header class="page-header">
        <A href="/ml-system-design" class="back-link">
          ← All categories
        </A>
        <h1>{group.title}</h1>
        <p class="subtitle">{group.subsections.length} sections</p>
      </header>

      <section class="subsections-list">
        {group.subsections.map((sub) => (
          <A
            href={`/ml-system-design/${group.slug}/${sub.slug}`}
            class="subsection-card"
          >
            <h2>{sub.title}</h2>
            <span class="meta">{sub.articles.length} articles</span>
          </A>
        ))}
      </section>
    </main>
  );
}
