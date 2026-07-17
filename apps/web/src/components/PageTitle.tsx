import { Title } from "@solidjs/meta";
import { SITE_NAME } from "~/utils/constants";

interface PageTitleProps {
  segment?: string;
}

export default function PageTitle(props: PageTitleProps) {
  const title = () =>
    props.segment ? `${props.segment} | ${SITE_NAME}` : SITE_NAME;

  return <Title>{title()}</Title>;
}
