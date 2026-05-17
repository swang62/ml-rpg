import { useAction } from "@solidjs/router";
import { createEffect, onCleanup, onMount } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import { markLessonReadAction } from "~/server/mutations";
import { markAnonLessonRead } from "~/utils/client-storage";

interface Props {
  course?: string;
  category?: string;
  subsection?: string;
  lesson?: string;
  lessonOrder?: number;
  alreadyRead?: boolean;
  onRead?: () => void;
}

export default function LessonTracker(props: Props) {
  const { signedIn } = useAuth();
  const markRead = useAction(markLessonReadAction);
  let sentinelRef: HTMLDivElement | undefined;

  const track = () => {
    const course = props.course;
    const category = props.category;
    const subsection = props.subsection;
    const lesson = props.lesson;

    if (!course || !subsection || !lesson) return;
    if (props.alreadyRead) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          if (signedIn()) {
            markRead(course, subsection, lesson).then(() => props.onRead?.());
          } else {
            markAnonLessonRead(
              course,
              category ?? "",
              subsection,
              lesson,
              props.lessonOrder ?? 0,
            );
            props.onRead?.();
          }
        }
      },
      { threshold: 0 },
    );

    if (sentinelRef) observer.observe(sentinelRef);
    onCleanup(() => observer.disconnect());
  };

  // Fresh observer on every page mount/nav — no module-level cache.
  // Server/localStorage handles dedup on the write side.
  onMount(() => {
    if (!signedIn()) track();
  });

  createEffect(() => {
    if (signedIn()) track();
  });

  return <div ref={sentinelRef} aria-hidden="true" style={{ height: "1px" }} />;
}
