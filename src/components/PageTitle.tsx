import { Title } from "@solidjs/meta";

interface PageTitleProps {
  segment?: string;
}

export default function PageTitle(props: PageTitleProps) {
  const title = () =>
    props.segment ? `${props.segment} | System Overflow` : "System Overflow";

  return <Title>{title()}</Title>;
}
