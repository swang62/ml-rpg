import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main class="container">
      <Title>System Overflow</Title>
      <header class="page-header">
        <h1>System Overflow Courses</h1>
      </header>

      <section class="groups-grid">
        <A href={`/ml-system-design`} class="group-card">
          <h1>ML System Design</h1>
        </A>
      </section>
    </main>
  );
}
