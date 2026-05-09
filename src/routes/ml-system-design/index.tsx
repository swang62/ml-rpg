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

      <section class="categories-grid">
        {siteData.map((category) => (
          <A
            href={ROUTES.ML_CATEGORY(category.slug)}
            class="card card--category"
          >
            <h2>{category.title}</h2>
          </A>
        ))}
      </section>
    </main>
  );
}
