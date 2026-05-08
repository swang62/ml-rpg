import { A, useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import NotFound from "~/components/NotFound";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
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
    <main class="container container-medium page-level--group">
      <PageTitle segment={group.title} />
      <Breadcrumbs
        items={[
          { label: "System Overflow", href: ROUTES.HOME },
          { label: "ML System Design", href: ROUTES.ML_BASE },
          { label: group.title },
        ]}
      />
      <PageHeader
        title={group.title}
        subtitle={`${group.subsections.length} sections`}
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
