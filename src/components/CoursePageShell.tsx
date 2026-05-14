import { A } from "@solidjs/router";
import type { JSX } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";

interface BreadcrumbItem {
  label?: string;
  href?: string;
}

interface CoursePageShellProps {
  title?: string;
  subtitle: string;
  badge?: string;
  extra?: JSX.Element;
  containerClass: string;
  pageLevel: "course" | "category" | "section" | "lesson";
  breadcrumbs: BreadcrumbItem[];
  backHref: string;
  backLabel?: string;
  children: JSX.Element;
}

export default function CoursePageShell(props: CoursePageShellProps) {
  return (
    <main
      class={`container ${props.containerClass} page-level--${props.pageLevel}`}
    >
      <PageTitle segment={props.title} />
      <Breadcrumbs items={props.breadcrumbs} />
      <PageHeader
        title={props.title}
        subtitle={props.subtitle}
        badge={props.badge}
      />
      {props.children}
      <div class="flex justify-between items-baseline">
        <A href={props.backHref} class="back-link">
          <img
            src="/assets/icons/chevron-left.svg"
            width="14"
            height="14"
            alt=""
            class="icon"
          />
          Back to {props.backLabel}
        </A>
        <span>{props.extra}</span>
      </div>
    </main>
  );
}
