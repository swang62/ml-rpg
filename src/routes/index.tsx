import { A } from "@solidjs/router";
import ChevronRight from "lucide-solid/icons/chevron-right";
import { For } from "solid-js";
import PageTitle from "~/components/PageTitle";
import { COURSE_INDEX } from "~/data/course-index";
import { SITE_NAME } from "~/utils/constants";

function onCardMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = (e.clientX - centerX) / (rect.width / 2);
  const mouseY = (e.clientY - centerY) / (rect.height / 2);

  el.style.setProperty("--tilt-x", `${mouseX * 5}deg`);
  el.style.setProperty("--tilt-y", `${-mouseY * 5}deg`);
  el.style.setProperty("--tilt-duration", "0s");
}

function onCardLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  el.style.removeProperty("--tilt-x");
  el.style.removeProperty("--tilt-y");
  el.style.removeProperty("--tilt-duration");
}

export default function HomePage() {
  return (
    <main class="page-level--world">
      <PageTitle />
      <section class="hero">
        <div class="hero__tag">World Hub</div>
        <h1>{SITE_NAME}</h1>
        <p class="subtitle">Choose your adventure</p>

        <section class="flex flex-wrap justify-center">
          <For each={Object.keys(COURSE_INDEX)}>
            {(slug) => {
              return (
                <A
                  href={COURSE_INDEX[slug].base}
                  class="card hero-course-card"
                  onMouseMove={onCardMove}
                  onMouseLeave={onCardLeave}
                >
                  <div class="hero-course-card__info">
                    <h2>{COURSE_INDEX[slug].title}</h2>
                  </div>
                  <div class="hero-course-card__arrow">
                    <ChevronRight size={16} />
                  </div>
                </A>
              );
            }}
          </For>
        </section>
      </section>
    </main>
  );
}
