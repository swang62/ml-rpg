import { createAsync, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import { getBreadcrumbsQuery } from "~/server/course";

export default function AutoBreadcrumbs() {
  const params = useParams();

  const dbCrumbs = createAsync(() =>
    getBreadcrumbsQuery(
      params.course as string,
      params.category as string | undefined,
      params.subsection as string | undefined,
    ),
  );

  const items = createMemo(() => {
    const crumbs = dbCrumbs() ?? [];
    return [{ label: "Home", href: "/" }, ...crumbs];
  });

  return <Breadcrumbs items={items()} />;
}
