import type { JSX } from "solid-js";

interface PageHeaderProps {
  title?: string;
  class?: string;
  subtitle?: string;
  extra?: JSX.Element;
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <header class={`page-header ${props.class}`}>
      <h1>{props.title}</h1>
      {(props.subtitle || props.extra) && (
        <div class="page-header__subtitle-row">
          {props.subtitle && <p class="subtitle">{props.subtitle}</p>}
          {props.extra && <div class="page-header__extra">{props.extra}</div>}
        </div>
      )}
    </header>
  );
}
