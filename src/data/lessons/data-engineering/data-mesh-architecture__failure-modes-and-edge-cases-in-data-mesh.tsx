import type { Component } from "solid-js";

const LessonDataMeshArchitectureFailureModesAndEdgeCasesInDataMesh: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Data Mesh
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Pseudo Mesh: Worst of Both Worlds:</strong>
            The most common failure mode is renaming the central data team to
            "platform" but continuing to require all changes flow through them.
            Domains are nominally owners, but they lack direct access to
            provisioning tools or infrastructure. They still file tickets and
            wait for the platform team to manually set up storage, configure
            access, and register schemas. This creates the worst of both worlds.
            You have the overhead of new processes, product thinking, and domain
            coordination meetings, but no actual autonomy. Lead times remain
            long because the platform team is still a bottleneck. Meanwhile,
            domain teams are frustrated because they are accountable for data
            quality and SLOs but cannot directly fix issues. At scale, this
            collapses. With 50 domains each needing multiple changes per week, a
            manual platform team cannot keep up.
            <strong>Domain Boundary Problems:</strong>
            Poor domain boundaries create entangled ownership and unclear
            accountability. If the organization has not done serious domain
            modeling, data products cut across many business concerns. For
            example, a single "Customer 360" product that mixes identity, order
            history, support tickets, and payment methods becomes a new
            monolith. When usage scales by 10x, this monolithic product becomes
            a hotspot. Query latency drifts from p99 of 10 seconds to multiple
            minutes. The product violates freshness SLOs because ingestion from
            five different sources creates complex dependencies. Debugging
            quality issues is hard because three different teams need to
            coordinate. The promise of domain autonomy evaporates. Better domain
            modeling would split this into Identity Product (owned by Identity
            domain), Order History Product (owned by Orders domain), and Support
            Interactions Product (owned by Support domain). Cross domain queries
            become more complex, requiring federated queries or precomputed
            joins, but each domain can evolve and scale independently.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Monolithic Product Degradation
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">LOW SCALE</div>
                  <div style="font-size: 16px; font-weight: 800">
                    10 sec p99
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">10X SCALE</div>
                  <div style="font-size: 16px; font-weight: 800">Minutes</div>
                </div>
              </div>
            </div>
            <strong>Manual Governance Chaos:</strong>
            Weak or manual governance is another critical failure mode. If
            standards for Personally Identifiable Information (PII) handling,
            encryption, schema versioning, and quality metrics are not enforced
            in tooling, each domain invents its own approach. One domain tags
            PII fields in metadata, another uses naming conventions like{" "}
            <code>_pii</code> suffix, a third does nothing. When auditors
            request impact analysis for a regulation change affecting customer
            email addresses, you must hunt through dozens of different patterns.
            Some domains expose <code>customer_email</code> in plaintext, others
            hash it, others exclude it entirely. There is no automated way to
            identify all affected products. Incident response to data leaks
            becomes very hard because lineage tracking is inconsistent. This is
            especially risky in regulated environments like finance or
            healthcare where compliance failures have severe consequences.
            Computational governance embedded in the platform is not optional at
            scale. It is the only way to enforce standards consistently across
            hundreds of engineers making changes daily.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Manual governance through wiki pages
              and review meetings does not scale past 10 to 20 data products. At
              200 products, you need automated policy enforcement in
              provisioning, access control, and monitoring.
            </div>
            <strong>Edge Cases and Hybrid Models:</strong>
            Some domains are too small or too legacy to own data products. A
            mainframe system with limited integration options cannot easily emit
            events or expose APIs for Change Data Capture (CDC). For these, you
            need hybrid models where a central "affiliated domain" team builds
            data products on their behalf, or where you use batch extracts with
            longer refresh cycles and document the limitations. Extremely high
            throughput streams present another edge case. Clickstream at 1
            million events per second makes naive cross domain joins in real
            time prohibitively expensive. A single join between clickstream and
            order data might require shuffling terabytes per hour. You need
            careful design of precomputed aggregates, materialized views, or
            stream processing with windowing to keep latency and cost
            manageable. Finally, some use cases require strong consistency
            across domains, for example financial reconciliation. Data mesh
            focuses on analytical data, which typically tolerates eventual
            consistency with lags of seconds to minutes. If you need immediate
            consistency, you may need synchronous coordination between domains,
            which undermines autonomy and reintroduces coupling.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 650px">
              <div style="display: flex; gap: 16px; justify-content: space-around; align-items: flex-start">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                    BAD: Monolithic Product
                  </div>
                  <div style="border: 2px solid; padding: 14px; border-radius: 6px; width: 100%">
                    <strong style="font-size: 13px">
                      Customer 360 Product
                    </strong>
                    <div style="font-size: 10px; margin-top: 6px; text-align: left">
                      • Identity data
                      <br />• Order history
                      <br />• Support tickets
                      <br />• Payment methods
                      <br />• 3 teams coordinate
                      <br />• P99 latency: minutes
                      <br />• SLO violations
                    </div>
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                    GOOD: Clear Boundaries
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 100%; text-align: center">
                    <strong style="font-size: 12px">Identity Product</strong>
                    <div style="font-size: 9px; margin-top: 3px">
                      Identity domain owns
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 100%; text-align: center">
                    <strong style="font-size: 12px">
                      Order History Product
                    </strong>
                    <div style="font-size: 9px; margin-top: 3px">
                      Orders domain owns
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 100%; text-align: center">
                    <strong style="font-size: 12px">
                      Support Interactions
                    </strong>
                    <div style="font-size: 9px; margin-top: 3px">
                      Support domain owns
                    </div>
                  </div>
                  <div style="font-size: 9px; margin-top: 6px; text-align: center">
                    Each scales independently
                    <br />
                    Clear ownership
                  </div>
                </div>
              </div>
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
                  Pseudo mesh (renaming central team to platform but keeping
                  manual processes) creates worst of both worlds: coordination
                  overhead without autonomy, lead times stay long
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Poor domain boundaries create monolithic products that mix
                  multiple business concerns. At 10x scale, query latency
                  degrades from 10 seconds p99 to minutes, and multiple teams
                  must coordinate for changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Manual governance fails at scale. At 200 products with
                  hundreds of engineers, you need automated policy enforcement
                  for PII handling, encryption, and compliance embedded in
                  provisioning tooling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Edge case: mainframe systems with limited integration require
                  hybrid models where a central affiliated team builds data
                  products on their behalf using batch extracts with documented
                  limitations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Extremely high throughput streams (1 million events per second
                  clickstream) make naive cross domain joins prohibitively
                  expensive. Requires precomputed aggregates or stream
                  processing with windowing to manage cost and latency
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
                  A company renames their central data team to "platform" but
                  domains still file tickets for storage provisioning. Platform
                  team is overwhelmed with 50 domains needing multiple changes
                  weekly. Lead times remain at 2 to 3 weeks instead of minutes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A monolithic Customer 360 product mixes identity, orders,
                  support, and payments. At scale, p99 query latency hits 5
                  minutes. Three teams must coordinate to fix quality issues.
                  Better domain modeling splits into separate Identity, Order
                  History, and Support products with clear ownership.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Manual PII governance: one domain tags PII in metadata,
                  another uses &lt;code&gt;_pii&lt;/code&gt; suffix, a third
                  does nothing. When auditors request impact analysis for
                  customer email regulation, engineers manually search 200
                  products over 2 weeks to identify affected systems.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clickstream at 1 million events per second. Naive join with
                  order data shuffles 5 terabytes per hour. Solution: precompute
                  hourly aggregate streams and materialize common join patterns,
                  reducing real time fan out by 95%.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMeshArchitectureFailureModesAndEdgeCasesInDataMesh;
