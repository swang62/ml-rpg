import "./app.css";
import "./legacy-shim.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/press-start-2p";

import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Auth from "~/components/AuthContext";
import ErrorBoundary from "~/components/ErrorBoundary";
import ParallaxBackground from "~/components/ParallaxBackground";
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
            <ErrorBoundary>
              <Suspense>{props.children}</Suspense>
            </ErrorBoundary>
          </Auth>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
