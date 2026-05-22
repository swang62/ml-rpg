import "./app.css";
import "./legacy-shim.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/press-start-2p";

import { Link, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import AuthProvider from "~/components/AuthContext";
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
          <Link rel="icon" href="/favicon.ico" />
          <AuthProvider>
            <GlobalBackspaceHandler />
            <KeyboardNavHandler />
            <ParallaxBackground />
            <ErrorBoundary>
              <Suspense>{props.children}</Suspense>
            </ErrorBoundary>
          </AuthProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
