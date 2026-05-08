import { MetaProvider, Title } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import GroupPage from "~/routes/[group]";
import SubsectionPage from "~/routes/[group]/[subsection]";
import Home from "~/routes/index";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>System Overflow — ML System Design</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <Route path="/" component={Home} />
      <Route path="/:group" component={GroupPage} />
      <Route path="/:group/:subsection" component={SubsectionPage} />
    </Router>
  );
}
