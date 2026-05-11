import type { Component } from "solid-js";

const LessonFeatureSharingDiscoveryOnlineFeatureServingLatencyBudgetsAndScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online Feature Serving: Latency Budgets and Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latency Budget Constraint
            </p>
            <p style="margin-top: 0">
              Online feature serving is the critical path in inference: if end
              to end prediction SLA is 100 milliseconds and model compute uses
              25 to 40 milliseconds, you have only 10 to 25 milliseconds at p95
              for feature fetches, network overhead, and request coalescing.
              Missing this budget causes timeouts, fallback to degraded models,
              and user visible latency that impacts conversion.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling Dimensions
            </p>
            <p style="margin-top: 0">
              Scale along three axes: QPS (requests per second), feature count
              per request, and entity count per request. A recommendation system
              fetching 50 features for 100 candidate items at 10,000 QPS
              requires 50 million feature reads per second. Achieving this at
              sub 10ms p95 demands aggressive optimization.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Optimization Patterns
            </p>
            <p style="margin-top: 0">
              Batch reads using multi get APIs to fetch many keys in one round
              trip. Feature vector bundling stores all features for an entity in
              a single key, reducing 50 lookups to 1. Caching hot entities in
              application memory with 10 to 30 second TTL absorbs 80 to 95
              percent of reads. Precomputation materializes expensive derived
              features at write time rather than read time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Colocation Strategy
            </p>
            <p style="margin-top: 0">
              Deploy feature stores in the same availability zone as model
              servers to eliminate cross AZ latency (5 to 15ms penalty). For
              global systems, replicate feature stores to each region serving
              traffic.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Graceful Degradation
            </p>
            <p style="margin-top: 0">
              When feature stores become slow or unavailable, fall back to
              default values rather than timing out. Models should be trained
              with occasional missing features to remain robust. Monitor
              fallback rates: sustained rates above 1 percent indicate
              infrastructure problems requiring attention.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    End to End Inference: 100ms SLA
                  </strong>
                </div>
                <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 12px">
                    <strong>Feature Fetch</strong>
                    <div style="margin-top: 4px">10 to 25ms p95</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 12px">
                    <strong>Model Compute</strong>
                    <div style="margin-top: 4px">25 to 40ms</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 12px">
                    <strong>Network + Other</strong>
                    <div style="margin-top: 4px">Remaining</div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Optimization: Pre Materialized Store
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Entity keyed bundles (50 to 200 features)
                    <br />5 to 20ms p95 latency | 95% cache hit rate
                    <br />
                    2x capacity for failures
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
                  Latency budget constraint: 100ms end to end SLA with 25 to
                  40ms model compute leaves only 10 to 25ms p95 for feature
                  fetches; missing this causes timeouts and user visible latency
                  spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale math: 100K RPS globally with 10 features per entity and
                  95 percent cache hit rate generates 5K RPS to online store at
                  1 KB per bundle, roughly 5 MB per second per region plus
                  replication; requires 2x headroom
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre materialization and entity coalescing: group 50 to 200
                  features by entity in low latency key value store, single
                  lookup avoids N plus 1 query problem, co locate with inference
                  services or edge POPs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot key mitigation: few entities dominate traffic and create
                  shard hotspots inflating p99; use load aware sharding,
                  replicate hot partitions, per key rate limiting, lazy
                  materialization with backpressure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tiered caching: request scoped cache deduplicates within
                  inference call, process level LRU with TTL aligned to feature
                  freshness, regional cache offloads store, pre warm for known
                  hot entities before spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fallback policies: if fetch exceeds 20ms or fails, serve last
                  known good features, population priors, or switch to simpler
                  model; log fallbacks and track CTR or conversion impact to
                  quantify degradation
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
                  Airbnb search ranking targets sub 100ms end to end; allocates
                  low tens of milliseconds p95 to feature retrieval by pre
                  materializing user and listing features and coalescing 50 to
                  200 features per entity in one fetch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix serves single digit to low tens of milliseconds p95
                  feature lookups for personalization models by grouping
                  features by user and caching at request, process, and regional
                  tiers with TTL aligned to freshness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo handles millions of events per minute for
                  streaming feature updates with sub minute freshness; uses
                  exactly once semantics, watermarking for late data, and load
                  aware sharding to avoid hot key spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn Venice provides single digit millisecond online reads
                  for feed ranking by pre warming hot entities, replicating hot
                  partitions, and falling back to last known good features if
                  fetches exceed 15ms p95
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureSharingDiscoveryOnlineFeatureServingLatencyBudgetsAndScale;
