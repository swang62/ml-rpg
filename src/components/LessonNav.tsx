import { A } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
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
          href={`/${props.course}/${props.category}/${props.subsection}/${props.prevLesson.lesson}`}
          class="lesson-nav__link lesson-nav__link--prev"
        >
          <ChevronLeft size={14} />
          <span class="lesson-nav__order">{props.prevLesson.order}</span>
          <span class="lesson-nav__title">{props.prevLesson.title}</span>
        </A>
      ) : null}
      {props.nextLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.subsection}/${props.nextLesson.lesson}`}
          class="lesson-nav__link lesson-nav__link--next"
        >
          <span class="lesson-nav__title">{props.nextLesson.title}</span>
          <span class="lesson-nav__order">{props.nextLesson.order}</span>
          <ChevronRight size={14} />
        </A>
      ) : null}
    </nav>
  );
}
