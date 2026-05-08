import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { siteData } from "~/data/site-data";

export default function Home() {
  return (
    <main class="container">
      <Title>System Overflow — ML System Design</Title>
      <header class="page-header">
        <h1>ML System Design</h1>
        <p class="subtitle">{siteData.length} categories</p>
      </header>

      <section class="groups-grid">
        {siteData.map((group) => (
          <A href={`/${group.slug}`} class="group-card">
            <h2>{group.title}</h2>
            <span class="meta">{group.subsections.length} sections</span>
          </A>
        ))}
      </section>
    </main>
  );
}
