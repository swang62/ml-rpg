import "./app.css";
import "./legacy-shim.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/press-start-2p";

import { MetaProvider, Title } from "@solidjs/meta";
import { Router, useNavigate } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { onCleanup, onMount, Suspense } from "solid-js";
import Auth from "~/components/AuthContext";
import ParallaxBackground from "~/components/ParallaxBackground";
import PlayerHUD from "~/components/PlayerHUD";
import Search from "~/components/Search";
import { SITE_NAME } from "./utils/constants";

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
            <ParallaxBackground />
            <div class="app-layout">
              <header class="app-header">
                <div class="app-header__inner">
                  <Suspense>
                    <PlayerHUD />
                    <Search />
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
