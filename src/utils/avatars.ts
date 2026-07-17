const avatarUrls = import.meta.glob("../assets/avatars/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function getAvatarUrl(level: number): string {
  return avatarUrls[`../assets/avatars/lvl${level}.svg`] ?? "";
}
