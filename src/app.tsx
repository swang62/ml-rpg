import "./app.css";
import "./legacy-shim.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/press-start-2p";

import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import AskAI from "~/components/AskAI";
import Auth from "~/components/AuthContext";
import ErrorBoundary from "~/components/ErrorBoundary";
import ParallaxBackground from "~/components/ParallaxBackground";
import PlayerHUD from "~/components/PlayerHUD";
import Search from "~/components/Search";
import { GlobalBackspaceHandler, KeyboardNavHandler } from "~/utils/keyboard";
import { SITE_NAME } from "./utils/constants";

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
                <ErrorBoundary>
                  <Suspense>{props.children}</Suspense>
                </ErrorBoundary>
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
