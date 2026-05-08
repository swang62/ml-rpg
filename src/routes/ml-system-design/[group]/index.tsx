import { A, useParams } from "@solidjs/router";
import NotFound from "~/components/NotFound";
import PageHeader from "~/components/PageHeader";
import { ROUTES } from "~/constants/paths";
import { siteData } from "~/data/site-data";

export default function GroupPage() {
  const params = useParams();
  const group = siteData.find((group) => group.slug === params.group);

  if (!group) {
    return (
      <NotFound
        message="Group not found"
        backHref={ROUTES.ML_BASE}
        backLabel="Back to home"
      />
    );
  }

  return (
    <main class="container-list">
      <PageHeader
        title={group.title}
        subtitle={`${group.subsections.length} sections`}
        backHref={ROUTES.ML_BASE}
        backLabel="All categories"
      />

      <section class="subsections-list">
        {group.subsections.map((sub) => (
          <A
            href={ROUTES.ML_SECTION(group.slug, sub.slug)}
            class="card card--subsection"
          >
            <h2>{sub.title}</h2>
            <span class="meta">{sub.articles.length} articles</span>
          </A>
        ))}
      </section>
    </main>
  );
}
