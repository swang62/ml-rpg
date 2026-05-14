import "./app.css";
import "./data/legacy-bootstrap-shim.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/press-start-2p";

import { Link, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, onCleanup, onMount, Suspense } from "solid-js";
import LoadingFallback from "~/components/LoadingFallback";
import PlayerHUD from "~/components/PlayerHUD";
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
                <PlayerHUD />
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
