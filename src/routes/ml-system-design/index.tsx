import { A } from "@solidjs/router";
import PageHeader from "~/components/PageHeader";
import { siteData } from "~/data/site-data";

export default function Home() {
  return (
    <main class="container">
      <PageHeader
        title="ML System Design"
        subtitle={`${siteData.length} categories`}
        backHref="/"
        backLabel="All courses"
      />

      <section class="groups-grid">
        {siteData.map((group) => (
          <A href={`/ml-system-design/${group.slug}`} class="group-card">
            <h2>{group.title}</h2>
            <span class="meta">{group.subsections.length} sections</span>
          </A>
        ))}
      </section>
    </main>
  );
}
