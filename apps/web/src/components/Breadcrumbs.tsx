import { A } from "@solidjs/router";
import ChevronRight from "lucide-solid/icons/chevron-right";

interface Crumb {
  label?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" class="breadcrumbs">
      <ol class="breadcrumbs__list">
        {props.items.map((item, idx) => (
          <>
            {idx > 0 && (
              <li class="breadcrumbs__sep" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
            )}
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
          </>
        ))}
      </ol>
    </nav>
  );
}
