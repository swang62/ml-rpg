import { A } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import type { JSX } from "solid-js";
import AutoBreadcrumbs from "~/components/AutoBreadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";

interface CoursePageShellProps {
  title?: string;
  subtitle: string;
  badge?: string;
  extra?: JSX.Element;
  containerClass: string;
  pageLevel: "world" | "course" | "category" | "section" | "lesson";
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
      <AutoBreadcrumbs />
      <PageHeader
        title={props.title}
        subtitle={props.subtitle}
        badge={props.badge}
      />
      {props.children}
      <div class="flex justify-between items-baseline">
        <A href={props.backHref} class="back-link">
          <ChevronLeft size={14} />
          Back to {props.backLabel}
        </A>
        <span>{props.extra}</span>
      </div>
    </main>
  );
}
