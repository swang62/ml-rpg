import { A } from "@solidjs/router";
import ArrowDown from "lucide-solid/icons/arrow-down";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ArrowRight from "lucide-solid/icons/arrow-right";
import ArrowUp from "lucide-solid/icons/arrow-up";
import CornerDownLeft from "lucide-solid/icons/corner-down-left";
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
          <Delete size={14} />
          Back to {props.backLabel}
        </A>
        <span class="flex items-center gap-3">
          <Show
            when={props.pageLevel !== "lesson" && props.pageLevel !== "world"}
          >
            <span class="nav-shortcuts">
              <span class="shortcuts-bar__label">nav</span>
              <Show when={props.pageLevel !== "section"}>
                <ArrowLeft size={14} />
                <ArrowRight size={14} />
              </Show>
              <ArrowUp size={14} />
              <ArrowDown size={14} />
              <span class="shortcuts-bar__label">select</span>
              <CornerDownLeft size={14} />
            </span>
          </Show>
          {props.extra}
        </span>
      </div>
    </main>
  );
}
