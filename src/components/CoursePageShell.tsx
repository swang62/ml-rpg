import { A } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import type { JSX } from "solid-js";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CoursePageShellProps {
  title: string;
  subtitle: string;
  containerClass: string;
  breadcrumbs: BreadcrumbItem[];
  backHref: string;
  backLabel: string;
  children: JSX.Element;
}

export default function CoursePageShell(props: CoursePageShellProps) {
  return (
    <main class={`container ${props.containerClass}`}>
      <PageTitle segment={props.title} />
      <Breadcrumbs items={props.breadcrumbs} />
      <PageHeader title={props.title} subtitle={props.subtitle} />
      {props.children}
      <A href={props.backHref} class="back-link">
        <ChevronLeft size={14} />
        Back to {props.backLabel}
      </A>
    </main>
  );
}
