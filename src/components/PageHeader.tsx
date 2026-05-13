interface PageHeaderProps {
  title?: string;
  class?: string;
  subtitle?: string;
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <header class={`page-header ${props.class}`}>
      <h1>{props.title}</h1>
      {props.subtitle && (
        <div class="page-header__subtitle-row">
          <p class="subtitle">{props.subtitle}</p>
        </div>
      )}
    </header>
  );
}
