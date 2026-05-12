import { A } from "@solidjs/router";
import ChevronRight from "lucide-solid/icons/chevron-right";
import { For } from "solid-js";
import PageTitle from "~/components/PageTitle";
import { COURSE_INDEX } from "~/data/course-index";
import { SITE_NAME } from "~/utils/constants";

export default function HomePage() {
  return (
    <main class="page-level--course">
      <PageTitle />
      <section class="hero">
        <div class="hero__tag">Course Catalog</div>
        <h1>{SITE_NAME}</h1>
        <p class="subtitle">A curated navigation hub for system-overflow.com</p>

        <section class="flex flex-wrap justify-center">
          <For each={Object.keys(COURSE_INDEX)}>
            {(slug) => {
              return (
                <A href={COURSE_INDEX[slug].base} class="card hero-course-card">
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
