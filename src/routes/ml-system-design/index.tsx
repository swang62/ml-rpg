import { A } from "@solidjs/router";
import PageHeader from "~/components/PageHeader";
import { ROUTES } from "~/constants/paths";
import { siteData } from "~/data/site-data";

export default function Home() {
  return (
    <main class="container">
      <PageHeader
        title="ML System Design"
        subtitle={`${siteData.length} categories`}
        backHref={ROUTES.HOME}
        backLabel="All courses"
      />

      <section class="groups-grid">
        {siteData.map((group) => (
          <A href={ROUTES.ML_GROUP(group.slug)} class="card card--group">
            <h2>{group.title}</h2>
            <span class="meta">{group.subsections.length} sections</span>
          </A>
        ))}
      </section>
    </main>
  );
}
