import { useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import { COURSES, SITE_NAME } from "~/utils/constants";

export default function AutoBreadcrumbs() {
  const params = useParams();

  const items = createMemo(() => {
    const crumbs: { label?: string; href?: string }[] = [
      { label: SITE_NAME, href: "/" },
    ];

    if (!params.course) return crumbs;

    const course = COURSES[params.course as string];
    if (course) {
      crumbs.push({ label: course.title, href: `/${params.course}` });

      const category = course.categories.find(
        (c) => c.category === params.category,
      );
      if (category) {
        crumbs.push({
          label: category.title,
          href: `/${params.course}/${params.category}`,
        });

        const subsection = category.subsections.find(
          (s) => s.subsection === params.subsection,
        );
        if (subsection) {
          crumbs.push({
            label: subsection.title,
            href: `/${params.course}/${params.category}/${params.subsection}`,
          });
        }
      }
    }

    return crumbs;
  });

  return <Breadcrumbs items={items()} />;
}
