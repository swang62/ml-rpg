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
        subtitle={`${siteData.length} categories \u00B7 ${totalArticles} lessons`}
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
                {articleCount} lesson{articleCount !== 1 ? "s" : ""}
              </span>
            </A>
          );
        })}
      </section>

      <A href={ROUTES.HOME} class="back-link">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to System Overflow
      </A>
    </main>
  );
}
