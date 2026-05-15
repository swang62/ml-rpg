import { createEffect, createSignal, onCleanup } from "solid-js";
import { isLessonRead } from "~/server/tracking";
import { POLL_INTERVAL } from "./constants";

/**
 * Reactive hook that polls the server to detect when a lesson is marked as read.
 * Returns a signal that flips to `true` once the lesson is read and stays true.
 */
export function useLessonReadStatus(
  course?: string,
  subsection?: string,
  getLesson?: () => string | undefined,
) {
  const [isRead, setIsRead] = createSignal(false);

  createEffect(() => {
    if (!course || !subsection) return;
    const lesson = getLesson?.();
    if (!lesson) return;

    let cancelled = false;
    const check = async () => {
      if (cancelled) return;
      const oldRead = isRead();
      const newRead = await isLessonRead(course, subsection, lesson);
      if (newRead && !oldRead) {
        setIsRead(true);
      } else if (!newRead && oldRead) {
        setIsRead(false);
      }

      // Always kill polling if current lesson is read
      if (newRead) clearInterval(timer);
      return;
    };

    check();
    const timer = setInterval(check, POLL_INTERVAL);

    onCleanup(() => {
      cancelled = true;
      clearInterval(timer);
    });
  });

  return isRead;
}
