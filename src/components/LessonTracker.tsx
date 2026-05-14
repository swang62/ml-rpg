import { createEffect, onCleanup } from "solid-js";
import { markLessonRead } from "~/server/tracking";
import { addLessonXp } from "~/server/xp-store";
import { LESSON_READ_DELAY_MS } from "~/utils/constants";

interface Props {
  course?: string;
  subsection?: string;
  lesson?: string;
  order?: number;
}

export default function LessonTracker(props: Props) {
  let sentinelRef: HTMLDivElement | undefined;

  createEffect(() => {
    const course = props.course;
    const subsection = props.subsection;
    const lesson = props.lesson;
    const order = props.order;

    if (!course || !subsection || !lesson) return;

    let scrolled = false;
    let timedOut = false;
    let done = false;

    const tryMark = () => {
      if (done) return;
      if (scrolled && timedOut) {
        done = true;
        markLessonRead(course, subsection, lesson);
        if (order) {
          addLessonXp(course, subsection, lesson, order * 25);
        }
        cleanup();
      }
    };

    const timer = setTimeout(() => {
      timedOut = true;
      tryMark();
    }, LESSON_READ_DELAY_MS);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          scrolled = true;
          tryMark();
        }
      },
      { threshold: 0 },
    );

    if (sentinelRef) observer.observe(sentinelRef);

    const cleanup = () => {
      clearTimeout(timer);
      observer.disconnect();
    };

    onCleanup(cleanup);
  });

  return <div ref={sentinelRef} aria-hidden="true" style={{ height: "1px" }} />;
}
