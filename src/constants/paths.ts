export const ROUTES = {
  HOME: "/",
  ML_BASE: "/ml-system-design",
  ML_GROUP: (slug: string) => `/ml-system-design/${slug}`,
  ML_SECTION: (groupSlug: string, subSlug: string) =>
    `/ml-system-design/${groupSlug}/${subSlug}`,
} as const;
