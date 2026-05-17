import { useAction } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import { markLessonReadAction } from "~/server/mutations";
import { markAnonLessonRead } from "~/utils/client-storage";

const lessonReadState = new Map<string, boolean>();

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

  createEffect(() => {
    const course = props.course;
    const category = props.category;
    const subsection = props.subsection;
    const lesson = props.lesson;

    if (!course || !subsection || !lesson) return;

    const key = `${course}/${subsection}/${lesson}`;

    if (props.alreadyRead) return;
    if (lessonReadState.has(key)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          lessonReadState.set(key, true);
          observer.disconnect();
          if (signedIn()) {
            markRead(course, subsection, lesson).then(() => {
              props.onRead?.();
            });
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

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return <div ref={sentinelRef} aria-hidden="true" style={{ height: "1px" }} />;
}
