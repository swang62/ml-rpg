export const ROUTES = {
  HOME: "/",
  ML_SYSTEM_DESIGN: "/ml-system-design",
  group: (slug: string) => `/ml-system-design/${slug}`,
  subsection: (groupSlug: string, subSlug: string) =>
    `/ml-system-design/${groupSlug}/${subSlug}`,
} as const;
