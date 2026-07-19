import { A, createAsync } from "@solidjs/router";
import ArrowDown from "lucide-solid/icons/arrow-down";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ArrowRight from "lucide-solid/icons/arrow-right";
import ArrowUp from "lucide-solid/icons/arrow-up";
import ChevronRight from "lucide-solid/icons/chevron-right";

import CornerDownLeft from "lucide-solid/icons/corner-down-left";

import { createMemo, createSignal, onMount, Show } from "solid-js";
import PageTitle from "~/components/PageTitle";
import { getCoursesQuery } from "~/server/course";
import { onCardLeave, onCardMove } from "~/utils/animation";
import { SITE_NAME } from "~/utils/constants";

function HomeParticles() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const particleCount = 10;
  const slotWidth = 100 / particleCount;
  const particles: {
    left: string;
    width: string;
    height: string;
    speed: string;
    delay: string;
    color: string;
  }[] = [];
  for (let i = 0; i < particleCount; i++) {
    const slotStart = i * slotWidth;
    particles.push({
      left: `${slotStart + Math.random() * slotWidth}%`,
      width: "5px",
      height: "5px",
      speed: `${15 + Math.random() * 12}s`,
      delay: `${Math.random() * 15}s`,
      color: "var(--accent)",
    });
  }

  return (
    <Show when={mounted()}>
      <div class="home-particles" aria-hidden="true">
        {particles.map((p) => (
          <div
            class="home-particle"
            style={{
              left: p.left,
              width: p.width,
              height: p.height,
              "--speed": p.speed,
              "--delay": p.delay,
              "--color": p.color,
            }}
          />
        ))}
      </div>
    </Show>
  );
}

export default function HomePage() {
  const coursesData = createAsync(() => getCoursesQuery());
  const courses = createMemo(() => coursesData() ?? []);

  return (
    <main class="page-level--world">
      <HomeParticles />
      <PageTitle />
      <a
        href="https://github.com/swang62/ml-rpg"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        aria-label="View source on GitHub"
      >
        <img src="/assets/github.svg" alt="GitHub" width="20" height="20" />
      </a>
      <section class="hero">
        <div class="hero__tag">World Hub</div>
        <h1>{SITE_NAME}</h1>
        <p class="subtitle">Choose your adventure</p>

        <section class="flex flex-wrap justify-center">
          {courses()
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((course) => (
              <A
                href={`/${course.slug}`}
                class="card hero-course-card"
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
              >
                <div class="hero-course-card__info">
                  <h2>{course.title}</h2>
                </div>
                <div class="hero-course-card__arrow">
                  <ChevronRight size={16} />
                </div>
              </A>
            ))}
        </section>
      </section>

      <div class="flex justify-center nav-shortcuts-bottom">
        <span class="nav-shortcuts">
          <span class="shortcuts-bar__label">nav</span>
          <ArrowLeft size={14} />
          <ArrowRight size={14} />
          <ArrowUp size={14} />
          <ArrowDown size={14} />
          <span class="shortcuts-bar__label">select</span>
          <CornerDownLeft size={14} />
        </span>
      </div>
    </main>
  );
}
