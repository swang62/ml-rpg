import { A } from "@solidjs/router";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ArrowRight from "lucide-solid/icons/arrow-right";
import type { GetLessonsBySectionRow } from "~/db/lesson_sql";
import { onCardLeave, onCardMove } from "~/utils/card";

interface LessonNavProps {
  prevLesson: GetLessonsBySectionRow | null;
  nextLesson: GetLessonsBySectionRow | null;
  course: string;
  category: string;
  section: string;
}

export default function LessonNav(props: LessonNavProps) {
  return (
    <nav class="lesson-nav">
      {props.prevLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.section}/${props.prevLesson?.slug}`}
          class="lesson-nav__link lesson-nav__link--prev"
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
        >
          <ArrowLeft size={18} />
          <span class="lesson-nav__title">{props.prevLesson?.title}</span>
        </A>
      ) : (
        <div />
      )}
      {props.nextLesson ? (
        <A
          href={`/${props.course}/${props.category}/${props.section}/${props.nextLesson?.slug}`}
          class="lesson-nav__link lesson-nav__link--next"
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
        >
          <span class="lesson-nav__title">{props.nextLesson?.title}</span>
          <ArrowRight size={18} />
        </A>
      ) : (
        <div />
      )}
    </nav>
  );
}
