import { Link, Meta, Title } from "@solidjs/meta";
import { createMemo } from "solid-js";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "~/utils/constants";

const OG_IMAGE = `${SITE_URL}/assets/screenshot-homepage.png`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: string;
}

export default function SEO(props: SEOProps) {
  const title = createMemo(() =>
    props.title ? `${props.title} | ${SITE_NAME}` : SITE_NAME,
  );
  const description = createMemo(() => props.description || SITE_DESCRIPTION);
  const image = createMemo(() => props.image || OG_IMAGE);
  const url = createMemo(() => props.url || SITE_URL);

  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={description()} />
      <Meta name="robots" content="index, follow" />

      {/* Favicon */}
      <Link rel="icon" href="/favicon.ico" />

      {/* Canonical URL */}
      <Link rel="canonical" href={url()} />

      {/* Open Graph */}
      <Meta property="og:type" content={props.type || "website"} />
      <Meta property="og:site_name" content={SITE_NAME} />
      <Meta property="og:title" content={props.title || SITE_NAME} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:image" content={image()} />
      <Meta property="og:url" content={url()} />

      {/* Twitter Card */}
      <Meta
        name="twitter:card"
        content={props.twitterCard || "summary_large_image"}
      />
      <Meta name="twitter:title" content={props.title || SITE_NAME} />
      <Meta name="twitter:description" content={description()} />
      <Meta name="twitter:image" content={image()} />
    </>
  );
}
