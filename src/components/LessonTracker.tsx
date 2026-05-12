import { onCleanup, onMount } from "solid-js";
import { markLessonRead } from "~/utils/lesson-progress";

interface Props {
  course?: string;
  subsection?: string;
  lesson?: string;
}

export default function LessonTracker(props: Props) {
  let sentinelRef: HTMLDivElement | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let observer: IntersectionObserver | undefined;
  let scrolled = false;
  let timedOut = false;
  let done = false;

  const tryMark = () => {
    if (done) return;
    if (
      scrolled &&
      timedOut &&
      props.course &&
      props.subsection &&
      props.lesson
    ) {
      done = true;
      markLessonRead(props.course, props.subsection, props.lesson);
      cleanup();
    }
  };

  const cleanup = () => {
    if (timer !== undefined) clearTimeout(timer);
    observer?.disconnect();
  };

  onMount(() => {
    // Only track if we have valid route params
    if (!props.course || !props.subsection || !props.lesson) return;

    timer = setTimeout(() => {
      timedOut = true;
      tryMark();
    }, 10000);

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          scrolled = true;
          tryMark();
        }
      },
      { threshold: 0 },
    );

    if (sentinelRef) observer.observe(sentinelRef);
  });

  onCleanup(cleanup);

  return <div ref={sentinelRef} aria-hidden="true" style={{ height: "1px" }} />;
}
