export function navigateAfterLoadingPaint(
  event: MouseEvent,
  href: string,
  navigate: (href: string) => void,
  setLoadingHref: (href: string) => void,
) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  setLoadingHref(href);
  requestAnimationFrame(() => setTimeout(() => navigate(href), 120));
}
