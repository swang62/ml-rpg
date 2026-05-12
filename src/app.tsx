import "./app.css";
import "./data/legacy-bootstrap-shim.css";

import { Link, MetaProvider, Title } from "@solidjs/meta";
import { A, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, onCleanup, onMount, Suspense } from "solid-js";
import LoadingFallback from "~/components/LoadingFallback";
import Search from "~/components/Search";
import { SITE_NAME } from "./utils/constants";

export default function App() {
  let headerRef: HTMLElement | undefined;
  const [headerHidden, setHeaderHidden] = createSignal(false);

  onMount(() => {
    const onScroll = () => {
      if (!headerRef) return;
      setHeaderHidden(window.scrollY > headerRef.offsetHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", onScroll));
  });

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{SITE_NAME}</Title>
          <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <Link rel="alternate icon" href="/favicon.ico" sizes="any" />
          <div class="app-layout">
            <header
              ref={headerRef}
              class={`app-header${headerHidden() ? " app-header--hidden" : ""}`}
            >
              <div class="app-header__inner">
                <A href="/" class="app-header__logo">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="18"
                      height="18"
                      rx="4"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M7 7h6M7 10h6M7 13h4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  System<span>Overflow</span>
                </A>
                <Search />
              </div>
            </header>
            <div class="app-content">
              <Suspense fallback={<LoadingFallback />}>
                {props.children}
              </Suspense>
            </div>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
