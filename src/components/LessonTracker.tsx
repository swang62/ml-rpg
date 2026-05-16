import { useAction } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { markLessonReadAction } from "~/server/quest-store";

// Persists across component re-renders and effect re-runs so that
// query invalidation from the action doesn't trigger an infinite loop
const lessonReadState = new Map<string, boolean>();

interface Props {
  course?: string;
  subsection?: string;
  lesson?: string;
  order?: number;
  alreadyRead?: boolean;
  onRead?: () => void;
}

export default function LessonTracker(props: Props) {
  const markRead = useAction(markLessonReadAction);
  let sentinelRef: HTMLDivElement | undefined;

  createEffect(() => {
    const course = props.course;
    const subsection = props.subsection;
    const lesson = props.lesson;

    if (!course || !subsection || !lesson) return;

    const key = `${course}/${subsection}/${lesson}`;

    // Already read on the server — no need to observe or re-mark
    if (props.alreadyRead) return;
    // Already marked in this session
    if (lessonReadState.has(key)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          lessonReadState.set(key, true);
          observer.disconnect();
          markRead(course, subsection, lesson, props.order ?? 0).then(() => {
            props.onRead?.();
          });
        }
      },
      { threshold: 0 },
    );

    if (sentinelRef) observer.observe(sentinelRef);

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return <div ref={sentinelRef} aria-hidden="true" style={{ height: "1px" }} />;
}
