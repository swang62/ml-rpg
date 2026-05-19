import "./app.css";
import "./legacy-shim.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/press-start-2p";

import { MetaProvider, Title } from "@solidjs/meta";
import { Router, useNavigate } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Suspense,
} from "solid-js";
import AskAI from "~/components/AskAI";
import Auth from "~/components/AuthContext";
import ParallaxBackground from "~/components/ParallaxBackground";
import PlayerHUD from "~/components/PlayerHUD";
import Search from "~/components/Search";
import { SITE_NAME } from "./utils/constants";

function KeyboardNavHandler() {
  const [cards, setCards] = createSignal<HTMLElement[]>([]);
  const [activeIndex, setActiveIndex] = createSignal(-1);

  const collectCards = () => {
    const found = document.querySelectorAll<HTMLElement>(
      ".card, .hero-course-card",
    );
    setCards(Array.from(found));
  };

  createEffect(() => {
    if (cards().length > 0) return;
    collectCards();
  });

  onMount(() => {
    const observer = new MutationObserver(() => collectCards());
    observer.observe(document.body, { childList: true, subtree: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const current = cards();
      if (current.length === 0) return;

      const isArrow = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key);
      if (!isArrow && e.key !== "Enter") return;
      if (isArrow && activeIndex() === -1) {
        e.preventDefault();
        setActiveIndex(0);
        current[0]?.focus();
        current[0]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }

      if (isArrow) {
        e.preventDefault();
        const idx = activeIndex();
        const rects = current.map((el) => el.getBoundingClientRect());
        const centerX = rects[idx].left + rects[idx].width / 2;
        let next = idx;

        if (e.key === "ArrowRight") {
          next = Math.min(idx + 1, current.length - 1);
        } else if (e.key === "ArrowLeft") {
          next = Math.max(idx - 1, 0);
        } else if (e.key === "ArrowDown") {
          const sameRow = rects
            .map((r, i) => ({ i, dist: Math.abs(r.top - rects[idx].top) }))
            .filter((r) => r.dist < 10 && r.i !== idx);
          if (sameRow.length > 0) {
            const lastInRow = sameRow[sameRow.length - 1].i;
            next = Math.min(lastInRow + 1, current.length - 1);
          } else {
            const below = rects
              .map((r, i) => ({ i, dist: r.top - rects[idx].top }))
              .filter((r) => r.dist > 5)
              .sort((a, b) => a.dist - b.dist);
            if (below.length > 0) next = below[0].i;
          }
        } else if (e.key === "ArrowUp") {
          const above = rects
            .map((r, i) => ({ i, dist: rects[idx].top - r.top }))
            .filter((r) => r.dist > 5)
            .sort((a, b) => a.dist - b.dist);
          if (above.length > 0) {
            const candidates = above.filter(
              (r) => Math.abs(r.dist - above[0].dist) < 5,
            );
            next = candidates.reduce((best, r) => {
              const cx = rects[r.i].left + rects[r.i].width / 2;
              return Math.abs(cx - centerX) <
                Math.abs(rects[best].left + rects[best].width / 2 - centerX)
                ? r.i
                : best;
            }, candidates[0].i);
          }
        }

        if (next !== idx) {
          setActiveIndex(next);
          current[next]?.focus();
          current[next]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }

      if (e.key === "Enter" && activeIndex() >= 0) {
        e.preventDefault();
        current[activeIndex()]?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    });
  });

  return null;
}

function GlobalBackspaceHandler() {
  const navigate = useNavigate();

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Backspace") return;

      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      e.preventDefault();

      const path = window.location.pathname;
      const segments = path.split("/").filter(Boolean);
      if (segments.length === 0) return;

      const parentPath = `/${segments.slice(0, -1).join("/")}`;
      navigate(parentPath);
    };

    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => document.removeEventListener("keydown", handleKeyDown));
  });

  return null;
}

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{SITE_NAME}</Title>
          <Auth>
            <GlobalBackspaceHandler />
            <KeyboardNavHandler />
            <ParallaxBackground />
            <div class="app-layout">
              <header class="app-header">
                <div class="app-header__inner">
                  <Suspense>
                    <PlayerHUD />
                    <Search />
                    <AskAI />
                  </Suspense>
                </div>
              </header>
              <div class="app-content">
                <Suspense>{props.children}</Suspense>
              </div>
            </div>
          </Auth>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
