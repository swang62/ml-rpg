import { A } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";
import { siteData } from "~/data/site-data";

export default function CourseIndexPage() {
  const totalArticles = siteData.reduce(
    (sum, c) =>
      sum + c.subsections.reduce((s, sub) => s + sub.articles.length, 0),
    0,
  );

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
        subtitle={`${siteData.length} categories \u00B7 ${totalArticles} articles`}
      />

      <section class="categories-grid">
        {siteData.map((category) => {
          const articleCount = category.subsections.reduce(
            (s, sub) => s + sub.articles.length,
            0,
          );
          return (
            <A
              href={ROUTES.ML_CATEGORY(category.slug)}
              class="card card--category"
            >
              <h2>{category.title}</h2>
              <span class="card__count">
                {articleCount} article{articleCount !== 1 ? "s" : ""}
              </span>
            </A>
          );
        })}
      </section>
    </main>
  );
}
