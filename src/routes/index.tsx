import { A } from "@solidjs/router";
import ChevronRight from "lucide-solid/icons/chevron-right";
import { createResource, For } from "solid-js";
import PageTitle from "~/components/PageTitle";
import { COURSE_INDEX } from "~/data/course-index";
import { getSiteStats } from "~/server/course";
import { SITE_NAME } from "~/utils/constants";

export default function HomePage() {
  const [stats] = createResource(getSiteStats);

  return (
    <main class="page-level--course">
      <PageTitle />
      <section class="hero">
        <div class="hero__tag">World Catalog</div>
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

        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat__value">{stats()?.worlds ?? "—"}</span>
            <span class="hero-stat__label">Worlds</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat__value">{stats()?.levels ?? "—"}</span>
            <span class="hero-stat__label">Levels</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat__value">{stats()?.quests ?? "—"}</span>
            <span class="hero-stat__label">Quests</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat__value">{stats()?.missions ?? "—"}</span>
            <span class="hero-stat__label">Missions</span>
          </div>
        </div>
      </section>
    </main>
  );
}
