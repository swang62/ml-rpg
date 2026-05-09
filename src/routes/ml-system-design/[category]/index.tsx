import { A, useNavigate, useParams } from "@solidjs/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";
import { siteData } from "~/data/site-data";

export default function CategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const category = siteData.find((c) => c.slug === params.category);

  if (!category) {
    return navigate("/404");
  }

  return (
    <main class="container container-medium page-level--category">
      <PageTitle segment={category.title} />
      <Breadcrumbs
        items={[
          { label: "System Overflow", href: ROUTES.HOME },
          { label: "ML System Design", href: ROUTES.ML_BASE },
          { label: category.title },
        ]}
      />
      <PageHeader
        title={category.title}
        subtitle={`${category.subsections.length} sections`}
      />

      <section class="categories-grid">
        {category.subsections.map((sub) => (
          <A
            href={ROUTES.ML_SECTION(category.slug, sub.slug)}
            class="card card--category"
          >
            <h2>{sub.title}</h2>
          </A>
        ))}
      </section>
    </main>
  );
}
