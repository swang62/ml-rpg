import { A } from "@solidjs/router";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";

export default function HomePage() {
  return (
    <main class="container page-level--home">
      <PageTitle />
      <PageHeader title="System Overflow Courses" />

      <section class="groups-grid">
        <A href={ROUTES.ML_BASE} class="card card--group">
          <h2>ML System Design</h2>
        </A>
      </section>
    </main>
  );
}
