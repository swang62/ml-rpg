import type { Component } from "solid-js";

const LessonDependencyManagementTradeOffsTightVsLooseCoupling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-Offs: Tight vs Loose Coupling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Trade-Off:</strong>
            Cross pipeline dependency management is fundamentally about trading
            coupling versus autonomy, and correctness versus latency. The right
            choice depends on your organizational structure, scale, and SLA
            requirements.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Tight Coupling (Monolithic DAG)
                </div>
                <div style="font-size: 12px">
                  Single DAG contains all tasks across teams. Clear
                  visualization, efficient scheduling, obvious failure
                  propagation.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Loose Coupling (Separate Pipelines)
                </div>
                <div style="font-size: 12px">
                  Independent DAGs coordinated via events or metadata. Team
                  autonomy, isolated deployments, requires explicit contracts.
                </div>
              </div>
            </div>
            <strong>Tight Coupling: The Monolithic Approach</strong>A single
            massive DAG contains all related tasks, even across organizational
            boundaries. Team A's ingestion tasks, Team B's normalization, and
            Team C's analytics all live in one DAG definition. This gives strong
            guarantees: the orchestrator can visualize the entire dependency
            graph, optimize scheduling across all tasks, and immediately see
            failure propagation paths. The problem appears at organizational
            scale. Ownership becomes tangled. A change to Team A's ingestion
            logic requires coordinating releases with Teams B and C. Testing
            becomes complex because you cannot test in isolation. At FAANG scale
            with hundreds of teams, this monolithic approach creates deployment
            bottlenecks and breaks team autonomy. One team's bug can block
            dozens of other teams.
            <strong>Loose Coupling: Independent Pipelines</strong>
            Each team owns separate DAGs with explicit external dependencies.
            Team A publishes a completion event or updates metadata when their
            pipeline finishes. Team B declares a dependency on that signal and
            waits for it. Teams can deploy independently, test in isolation, and
            own their release cadence. The trade-off is you now need robust
            shared contracts. What format are events? What constitutes "data
            ready"? What versioning scheme ensures compatibility? Debugging
            becomes multi system: when Team C's analytics fail, you trace back
            through metadata and logs across Teams A and B. You need strong
            governance to prevent contract breakage.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't whether to couple. It's: at what layer do
                you couple? Tight coupling in data contracts and schemas, loose
                coupling in execution and deployment."
              </div>
            </div>
            <strong>Vertical Consistency vs Horizontal Scalability</strong>A
            strongly consistent central orchestrator with a single metadata
            database simplifies reasoning. All dependency decisions happen in
            one place with ACID (Atomicity, Consistency, Isolation, Durability)
            guarantees. However, this can limit global throughput. A single
            Postgres instance might handle 10,000 writes per second before
            becoming a bottleneck. More distributed approaches use independent
            schedulers per region or team, coordinated through pub/sub. This
            scales horizontally to handle 100,000+ events per second across
            multiple systems. The cost is eventual consistency: a dependency
            might be satisfied in one region before another sees the event. You
            need careful design around idempotency and conflict resolution.
            <strong>When to Choose Each Approach:</strong>
            Use tight coupling (single DAG) when you have a small team (under 10
            people), tightly related steps with no organizational boundaries, or
            need atomic rollback across all stages. For example, a financial
            reporting pipeline where all steps must succeed or fail together.
            Use loose coupling (separate pipelines) when you have multiple teams
            with different release cycles, need independent scaling of pipeline
            components, or have cross organizational boundaries. This is the
            pattern at companies operating at petabyte scale with hundreds of
            teams like Uber, Netflix, and LinkedIn.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Starting with tight coupling
              for simplicity and trying to scale it organizationally. The
              refactoring cost is enormous. Better to start with loose coupling
              and explicit contracts from day one if you anticipate growth
              beyond a single team.
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tight coupling in a monolithic DAG gives clear visualization
                  and efficient scheduling but creates deployment bottlenecks
                  and breaks team autonomy at scale beyond 10 people
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Loose coupling via separate pipelines enables team autonomy
                  and independent releases but requires robust contracts,
                  versioning, and multi system debugging capabilities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strongly consistent central orchestrators simplify reasoning
                  but may cap at 10,000 writes per second, while distributed
                  approaches scale to 100,000+ events per second with eventual
                  consistency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision framework: use tight coupling for small teams (under
                  10 people) with atomic rollback requirements, loose coupling
                  for multiple teams with independent release cycles
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The real trade-off is not whether to couple but where: tight
                  coupling in data contracts and schemas, loose coupling in
                  execution and deployment infrastructure
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial services pipeline uses single DAG for ingestion,
                  validation, and reporting because all steps must succeed
                  atomically for regulatory compliance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber separates rider and driver analytics into independent
                  DAGs coordinated via Kafka events, allowing teams to deploy
                  hourly without coordination
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDependencyManagementTradeOffsTightVsLooseCoupling;
