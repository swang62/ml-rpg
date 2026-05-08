interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <header class="page-header">
      <h1>{props.title}</h1>
      {props.subtitle && <p class="subtitle">{props.subtitle}</p>}
    </header>
  );
}
