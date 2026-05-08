import { A } from "@solidjs/router";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" class="breadcrumbs">
      <ol class="breadcrumbs__list">
        {props.items.map((item) => (
          <li class="breadcrumbs__item">
            {item.href ? (
              <A href={item.href} class="breadcrumbs__link">
                {item.label}
              </A>
            ) : (
              <span class="breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
