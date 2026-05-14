import { A } from "@solidjs/router";
import type { Lesson } from "~/data/types";

interface LessonNavProps {
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  course: string | undefined;
  category: string | undefined;
  subsection: string | undefined;
}

export default function LessonNav(props: LessonNavProps) {
  return (
    <nav class="lesson-nav">
      {props.prevLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.subsection}/${props.prevLesson?.lesson}`}
          class="lesson-nav__link lesson-nav__link--prev"
        >
          <img
            src="/assets/icons/chevron-left.svg"
            width="14"
            height="14"
            alt=""
            class="icon"
          />
          <span class="lesson-nav__order">{props.prevLesson?.order}</span>
          <span class="lesson-nav__title">{props.prevLesson?.title}</span>
        </A>
      ) : (
        <div />
      )}
      {props.nextLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.subsection}/${props.nextLesson?.lesson}`}
          class="lesson-nav__link lesson-nav__link--next"
        >
          <span class="lesson-nav__title">{props.nextLesson?.title}</span>
          <span class="lesson-nav__order">{props.nextLesson?.order}</span>
          <img
            src="/assets/icons/chevron-right.svg"
            width="14"
            height="14"
            alt=""
            class="icon"
          />
        </A>
      ) : (
        <div />
      )}
    </nav>
  );
}
