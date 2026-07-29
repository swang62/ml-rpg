import { A, useNavigate } from "@solidjs/router";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ArrowRight from "lucide-solid/icons/arrow-right";
import { createSignal } from "solid-js";
import type { GetLessonsBySectionRow } from "~/db/querier";
import { onCardLeave, onCardMove } from "~/utils/animation";
import { navigateAfterLoadingPaint } from "~/utils/loading-nav";

interface LessonNavProps {
  prevLesson: GetLessonsBySectionRow | null;
  nextLesson: GetLessonsBySectionRow | null;
  course: string;
  category: string;
  section: string;
}

export default function LessonNav(props: LessonNavProps) {
  const navigate = useNavigate();
  const [loadingHref, setLoadingHref] = createSignal("");

  return (
    <nav class="lesson-nav">
      {props.prevLesson ? (
        (() => {
          const href = `/${props.course}/${props.category}/${props.section}/${props.prevLesson?.slug}`;
          return (
            <A
              href={href}
              class="lesson-nav__link lesson-nav__link--prev"
              classList={{ "is-navigating": loadingHref() === href }}
              onClick={(event) =>
                navigateAfterLoadingPaint(event, href, navigate, setLoadingHref)
              }
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <ArrowLeft size={18} />
              <span class="lesson-nav__title">{props.prevLesson?.title}</span>
            </A>
          );
        })()
      ) : (
        <div />
      )}
      {props.nextLesson ? (
        (() => {
          const href = `/${props.course}/${props.category}/${props.section}/${props.nextLesson?.slug}`;
          return (
            <A
              href={href}
              class="lesson-nav__link lesson-nav__link--next"
              classList={{ "is-navigating": loadingHref() === href }}
              onClick={(event) =>
                navigateAfterLoadingPaint(event, href, navigate, setLoadingHref)
              }
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <span class="lesson-nav__title">{props.nextLesson?.title}</span>
              <ArrowRight size={18} />
            </A>
          );
        })()
      ) : (
        <div />
      )}
    </nav>
  );
}
