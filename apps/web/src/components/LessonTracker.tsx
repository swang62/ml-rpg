import { useAction } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useAuth } from "~/components/AuthContext";
import { markLessonReadAction } from "~/server/mutations";
import { markAnonLessonRead } from "~/utils/local-storage";

interface Props {
  course?: string;
  category?: string;
  section?: string;
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
    const section = props.section;
    const lesson = props.lesson;

    if (!course || !section || !lesson) return;
    // signedIn() is read here so it becomes a reactive dependency —
    // if the user logs in/out the observer resets correctly
    const isAuthed = signedIn();
    if (props.alreadyRead) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          if (isAuthed) {
            markRead(course, section, lesson).then(() => props.onRead?.());
          } else {
            markAnonLessonRead(
              course,
              category ?? "",
              section,
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
  });

  return <div ref={sentinelRef} aria-hidden="true" style={{ height: "1px" }} />;
}
