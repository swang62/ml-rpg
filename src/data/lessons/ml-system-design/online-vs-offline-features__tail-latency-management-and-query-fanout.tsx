import type { Component } from "solid-js";

const LessonOnlineVsOfflineFeaturesTailLatencyManagementAndQueryFanout: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Tail Latency Management and Query Fanout
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tail Composition Problem
            </p>
            <p style="margin-top: 0">
              Tail latency compounds catastrophically with query fanout in
              feature serving. A recommendation request fetching features from
              10 independent services where each has p99 latency of 10ms faces a
              combined p99 approaching 50 to 80ms due to the max of independent
              distributions. When Netflix budgets 100 to 300ms for entire page
              render and needs 5 to 15ms p99 for feature fetch, serving 50 to
              200 features across multiple tables quickly exhausts the latency
              budget and risks timeout cascades.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Bundling
            </p>
            <p style="margin-top: 0">
              With N independent services each at p99 of L milliseconds, the
              combined p99 approximates L times log(N) under optimistic
              assumptions, but real systems with correlated failures see worse
              behavior. DoorDash handles 10,000+ QPS by aggressive feature
              bundling: group all features for the same entity into a single
              vector stored under one key, reducing 20 round trips to 1 and
              cutting p99 from 150ms to under 10ms.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hedging and Prioritization
            </p>
            <p style="margin-top: 0">
              Issue duplicate requests to replica servers after a small delay
              (typically p50 latency), taking the first response and canceling
              stragglers. This can reduce p99 by 20% to 40% but doubles request
              volume under load. More effective is request level prioritization:
              classify features as critical (must have for model quality),
              important (measurable lift), and optional (marginal gains). Under
              latency pressure, drop optional features first, using model
              architectures robust to missing inputs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cache Warming and Colocation
            </p>
            <p style="margin-top: 0">
              Pre compute and cache feature vectors for high traffic entities
              (top 1% of users driving 50% of requests) in edge locations,
              serving directly from memory with sub millisecond latency.
              Colocate related features in the same storage partition to enable
              single lookup: user demographic features plus recent activity
              counters bundled together. LinkedIn achieves sub 10ms p99 at
              millions of aggregate QPS by serving heavy hitter entities from
              local caches with hit ratios above 98%.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 180px">
                  <strong>Request: 50 features</strong>
                </div>
                <div style="font-size: 20px; font-weight: 700">↓</div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; font-size: 12px; text-align: center">
                    Service A<br />
                    p99: 10ms
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; font-size: 12px; text-align: center">
                    Service B<br />
                    p99: 10ms
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; font-size: 12px; text-align: center">
                    Service C<br />
                    p99: 10ms
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: 700">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 200px">
                  <strong>Combined p99: 50-80ms</strong>
                  <br />
                  <span style="font-size: 12px">
                    (max of independent distributions)
                  </span>
                </div>
                <div style="font-size: 18px; font-weight: 700; margin-top: 4px">
                  SOLUTION ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 200px">
                  <strong>Bundled Vector Lookup</strong>
                  <br />
                  <span style="font-size: 12px">
                    All 50 features, 1 key → p99: &lt;10ms
                  </span>
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
                  Query fanout causes tail latency to compound: N independent
                  services at p99 of 10ms each results in combined p99 of 50 to
                  80ms as you take the maximum of independent latency
                  distributions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature bundling is the most effective mitigation: DoorDash
                  reduced 20 round trips to 1 by storing all entity features as
                  single vector, cutting p99 from 150ms to under 10ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hedging with duplicate requests to replicas reduces p99 by 20%
                  to 40% but doubles load, risking overload cascades during
                  traffic spikes or partial outages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Request level feature prioritization classifies features as
                  critical (required), important (measurable lift), and optional
                  (marginal), dropping optional features first when latency
                  budget is exhausted
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache warming for top 1% of high traffic entities (driving 50%
                  of requests) enables sub millisecond serving from edge caches
                  with hit ratios above 95%, bypassing backend entirely
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Colocation strategies group related features in same partition
                  or service to enable single lookup: user demographics plus
                  activity counters together rather than split across systems
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
                  Netflix: Budgets 5 to 15ms p99 for feature fetch within 100 to
                  300ms page render by bundling features per user and item into
                  vectors, pre warming cache for trending content with edge
                  replication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn Venice: Achieves sub 10ms p99 at millions of QPS
                  through multi region feature replication with petabyte scale
                  data, serving top entities from local memory caches hit ratios
                  above 98%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber: Models designed with learned imputation layers handle
                  missing features gracefully, allowing system to drop non
                  critical features under load and maintain sub 50ms p99
                  prediction latency
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOnlineVsOfflineFeaturesTailLatencyManagementAndQueryFanout;
