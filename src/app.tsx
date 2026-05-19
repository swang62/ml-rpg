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
  let wasActive = false;

  const collectCards = () => {
    const found = document.querySelectorAll<HTMLElement>(
      ".card, .hero-course-card",
    );
    setCards(Array.from(found));
  };

  const focusCard = (index: number) => {
    const c = cards();
    if (index < 0 || index >= c.length) return;
    c[index]?.focus();
    setActiveIndex(index);
  };

  createEffect(() => {
    const c = cards();
    if (c.length > 0 && wasActive && activeIndex() === -1) {
      c[0]?.focus();
      setActiveIndex(0);
    }
  });

  onMount(() => {
    let navTimeout: ReturnType<typeof setTimeout> | undefined;

    const observer = new MutationObserver(() => {
      const prev = cards();
      collectCards();
      const next = cards();
      // Detect page navigation (card list changed significantly)
      if (
        prev.length > 0 &&
        (prev.length !== next.length || prev[0] !== next[0])
      ) {
        wasActive = activeIndex() >= 0;
        setActiveIndex(-1);
        (document.activeElement as HTMLElement)?.blur();
        clearTimeout(navTimeout);
        navTimeout = setTimeout(() => {
          if (wasActive && cards().length > 0) {
            focusCard(0);
          }
        }, 50);
      }
    });
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

      if (e.key === "Escape" && activeIndex() >= 0) {
        e.preventDefault();
        setActiveIndex(-1);
        (document.activeElement as HTMLElement)?.blur();
        return;
      }

      if (!isArrow && e.key !== "Enter") return;

      const idx = activeIndex();

      if (isArrow) {
        e.preventDefault();

        if (idx === -1) {
          focusCard(0);
          current[0]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
          return;
        }

        const rects = current.map((el) => el.getBoundingClientRect());
        const cx = rects[idx].left + rects[idx].width / 2;
        let next = idx;

        if (e.key === "ArrowRight") {
          next = Math.min(idx + 1, current.length - 1);
        } else if (e.key === "ArrowLeft") {
          next = Math.max(idx - 1, 0);
        } else if (e.key === "ArrowDown") {
          const below = rects
            .map((r, i) => ({ i, d: r.top - rects[idx].top }))
            .filter((r) => r.d > 5)
            .sort((a, b) => a.d - b.d);
          if (below.length > 0) {
            const rowTop = below[0].d;
            const row = below.filter((r) => Math.abs(r.d - rowTop) < 5);
            const first = row[0].i;
            next = row.reduce<number>(
              (best, r) =>
                Math.abs(rects[r.i].left + rects[r.i].width / 2 - cx) <
                Math.abs(rects[best].left + rects[best].width / 2 - cx)
                  ? r.i
                  : best,
              first,
            );
          }
        } else if (e.key === "ArrowUp") {
          const above = rects
            .map((r, i) => ({ i, d: rects[idx].top - r.top }))
            .filter((r) => r.d > 5)
            .sort((a, b) => a.d - b.d);
          if (above.length > 0) {
            const rowTop = above[0].d;
            const row = above.filter((r) => Math.abs(r.d - rowTop) < 5);
            const first = row[0].i;
            next = row.reduce<number>(
              (best, r) =>
                Math.abs(rects[r.i].left + rects[r.i].width / 2 - cx) <
                Math.abs(rects[best].left + rects[best].width / 2 - cx)
                  ? r.i
                  : best,
              first,
            );
          }
        }

        if (next !== idx) {
          focusCard(next);
          current[next]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }

      if (e.key === "Enter" && idx >= 0) {
        e.preventDefault();
        current[idx]?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
      clearTimeout(navTimeout);
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
