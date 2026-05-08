import { A } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";
import { siteData } from "~/data/site-data";

export default function CourseIndexPage() {
  return (
    <main class="container page-level--course">
      <PageTitle segment="ML System Design" />
      <Breadcrumbs
        items={[
          { label: "System Overflow", href: ROUTES.HOME },
          { label: "ML System Design" },
        ]}
      />
      <PageHeader
        title="ML System Design"
        subtitle={`${siteData.length} categories`}
      />

      <section class="groups-grid">
        {siteData.map((group) => (
          <A href={ROUTES.ML_GROUP(group.slug)} class="card card--group">
            <h2>{group.title}</h2>
          </A>
        ))}
      </section>
    </main>
  );
}
