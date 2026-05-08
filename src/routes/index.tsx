import { A } from "@solidjs/router";
import PageHeader from "~/components/PageHeader";

export default function Home() {
  return (
    <main class="container">
      <PageHeader title="System Overflow Courses" pageTitle="System Overflow" />

      <section class="groups-grid">
        <A href={`/ml-system-design`} class="group-card">
          <h1>ML System Design</h1>
        </A>
      </section>
    </main>
  );
}
