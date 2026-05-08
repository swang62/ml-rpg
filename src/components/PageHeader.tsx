import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  pageTitle?: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const resolvedPageTitle = () => props.pageTitle ?? props.title;

  return (
    <>
      <Title>{resolvedPageTitle()}</Title>
      <header class="page-header">
        {props.backHref && (
          <A href={props.backHref} class="back-link">
            ← {props.backLabel}
          </A>
        )}
        <h1>{props.title}</h1>
        {props.subtitle && <p class="subtitle">{props.subtitle}</p>}
      </header>
    </>
  );
}
