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
        backHref={ROUTES.ML_SYSTEM_DESIGN}
        backLabel="Back to home"
      />
    );
  }

  return (
    <main class="container-list">
      <PageHeader
        title={group.title}
        subtitle={`${group.subsections.length} sections`}
        backHref={ROUTES.ML_SYSTEM_DESIGN}
        backLabel="All categories"
      />

      <section class="subsections-list">
        {group.subsections.map((sub) => (
          <A
            href={ROUTES.subsection(group.slug, sub.slug)}
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
