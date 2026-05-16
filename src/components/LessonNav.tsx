import { A } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import type { GetLessonsBySectionRow } from "~/db/course_sql";
import { onCardLeave, onCardMove } from "~/utils/tilt";

interface LessonNavProps {
  prevLesson: GetLessonsBySectionRow | null;
  nextLesson: GetLessonsBySectionRow | null;
  course: string;
  category: string;
  subsection: string;
}

export default function LessonNav(props: LessonNavProps) {
  return (
    <nav class="lesson-nav">
      {props.prevLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.subsection}/${props.prevLesson?.slug}`}
          class="lesson-nav__link lesson-nav__link--prev"
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
        >
          <ChevronLeft size={14} />
          <span class="lesson-nav__order">{props.prevLesson?.order}</span>
          <span class="lesson-nav__title">{props.prevLesson?.title}</span>
        </A>
      ) : (
        <div />
      )}
      {props.nextLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.subsection}/${props.nextLesson?.slug}`}
          class="lesson-nav__link lesson-nav__link--next"
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
        >
          <span class="lesson-nav__title">{props.nextLesson?.title}</span>
          <span class="lesson-nav__order">{props.nextLesson?.order}</span>
          <ChevronRight size={14} />
        </A>
      ) : (
        <div />
      )}
    </nav>
  );
}
