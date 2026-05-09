export const ROUTES = {
  HOME: "/",
  ML_BASE: "/ml-system-design",
  ML_CATEGORY: (slug: string) => `/ml-system-design/${slug}`,
  ML_SECTION: (categorySlug: string, subSlug: string) =>
    `/ml-system-design/${categorySlug}/${subSlug}`,
} as const;
