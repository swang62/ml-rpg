import { A } from "@solidjs/router";
import PageHeader from "~/components/PageHeader";
import PageTitle from "~/components/PageTitle";
import { ROUTES } from "~/constants/paths";

export default function HomePage() {
  return (
    <main class="container page-level--course">
      <PageTitle />
      <PageHeader title="System Overflow Courses" class="text-center" />

      <section class="flex items-center justify-center">
        <A href={ROUTES.ML_BASE} class="card card--category">
          <h2>ML System Design</h2>
        </A>
      </section>
    </main>
  );
}
