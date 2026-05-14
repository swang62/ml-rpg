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

    setIsRead(false);
    let cancelled = false;

    const check = async () => {
      if (cancelled) return;
      const read = await isLessonRead(course, subsection, lesson);
      if (!cancelled && read) {
        setIsRead(true);
        clearInterval(timer);
      }
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
