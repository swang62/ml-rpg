/** CSS selector for keyboard-focusable elements */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Sets up focus trapping within a container element.
 * Returns a cleanup function to be called in onCleanup.
 * Focuses the first focusable element on activation.
 */
export function setupFocusTrap(container: HTMLElement): () => void {
  // Focus the first focusable element
  const firstFocusable = container.querySelector(
    FOCUSABLE_SELECTOR,
  ) as HTMLElement | null;
  queueMicrotask(() => firstFocusable?.focus());

  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const focusable = container.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) return;

    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}
