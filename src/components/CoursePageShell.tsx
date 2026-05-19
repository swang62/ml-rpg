import { A } from "@solidjs/router";
import ArrowDown from "lucide-solid/icons/arrow-down";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ArrowRight from "lucide-solid/icons/arrow-right";
import ArrowUp from "lucide-solid/icons/arrow-up";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import Delete from "lucide-solid/icons/delete";
import { type JSX, Show } from "solid-js";
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
          <Delete size={13} class="back-link__icon" />
        </A>
        <span class="flex items-center gap-3">
          <Show
            when={
              props.pageLevel !== "section" &&
              props.pageLevel !== "lesson" &&
              props.pageLevel !== "world"
            }
          >
            <span class="nav-shortcuts">
              <ArrowLeft size={12} />
              <ArrowRight size={12} />
              <ArrowUp size={12} />
              <ArrowDown size={12} />
              <span class="shortcuts-bar__label">nav</span>
            </span>
          </Show>
          {props.extra}
        </span>
      </div>
    </main>
  );
}
