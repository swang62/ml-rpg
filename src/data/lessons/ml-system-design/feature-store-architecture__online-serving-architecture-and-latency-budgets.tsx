import type { Component } from "solid-js";

const LessonFeatureStoreArchitectureOnlineServingArchitectureAndLatencyBudgets: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online Serving Architecture and Latency Budgets
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Budget
            </p>
            <p style="margin-top: 0">
              Online feature serving must return tens to hundreds of features
              per entity within single digit milliseconds at high QPS to fit
              inference SLAs. A typical ranking service fetches 50 features per
              entity at 20,000 requests per second, yielding 1 million feature
              reads per second. With a 50ms end to end SLA, the feature budget
              is often 10 to 15ms p99, leaving room for model inference and
              network hops. Netflix achieves sub millisecond p50 latencies by
              using EVCache deployed in the same region, serving millions of
              reads per second globally.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Serving Path
            </p>
            <p style="margin-top: 0">
              Starts with co location: place feature services in the same AZ as
              model servers to eliminate 5 to 15ms cross AZ penalties. Batch
              reads using multi get APIs to fetch 50 keys in one round trip
              instead of 50 serial requests, amortizing network overhead from
              50ms total to 5ms. Cache hot features in process or in a sidecar
              with 10 to 30 second TTL to absorb 80 to 95 percent of reads; this
              reduces key value load by 10x and ensures p50 latencies under 1ms
              for cached paths. For the remaining 5 to 20 percent cache miss
              traffic, the regional key value store handles reads in 3 to 8ms
              p99.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hot Key Mitigation
            </p>
            <p style="margin-top: 0">
              Popular entities (trending content, global feeds) create hotspots
              that spike p99 latency or trigger throttling. Solutions include
              salting keys with random suffixes to spread load, per entity rate
              limits to protect the store, pre materializing aggregates for top
              N entities, and short TTL caching for viral keys. LinkedIn's
              Venice derived data store uses read replicas and sharding
              strategies to handle millions of QPS for People You May Know
              features with single digit millisecond p99.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Modes
            </p>
            <p style="margin-top: 0">
              TTL expiry causing silent fallback to default values (degrading
              model quality), and cross region replication lag leading to stale
              reads. Aggressive TTLs of 5 minutes may cut cache hit rates below
              70 percent, doubling key value load and blowing latency budgets.
              Too long TTLs of 6 hours violate freshness SLOs for dynamic
              features. The mitigation is per feature freshness SLOs with
              alerting when age of last update exceeds thresholds.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Model Server</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    20k QPS • 50ms SLA
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">In Process Cache</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    10-30s TTL • 80-95% hit
                    <br />
                    Sub 1ms p50
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">
                  ↓ 5-20% miss
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Regional KV Store</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    Multi-get 50 keys
                    <br />
                    3-8ms p99
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 180px; text-align: center; font-size: 11px">
                  <strong>Total Feature Budget:</strong>
                  <br />
                  10-15ms p99 (of 50ms SLA)
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
                  At 20,000 requests per second fetching 50 features each, you
                  serve 1 million feature reads per second; with a 50
                  millisecond end to end Service Level Agreement, feature budget
                  is 10 to 15 millisecond p99 including network and
                  serialization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Co location in the same Availability Zone eliminates 5 to 15
                  millisecond cross AZ penalties; batch reads with multi get
                  fetch 50 keys in one 5 millisecond round trip instead of 50
                  serial requests totaling 50 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  In process or sidecar caches with 10 to 30 second Time To Live
                  absorb 80 to 95 percent of reads at sub 1 millisecond p50,
                  reducing key value load by 10 times; remaining 5 to 20 percent
                  cache misses hit regional key value at 3 to 8 millisecond p99
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot key mitigation: salting popular entity keys spreads load,
                  per entity rate limits prevent throttling, pre materialization
                  handles top N entities, and short TTL caching absorbs viral
                  traffic spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure modes: aggressive 5 minute TTLs drop cache hit rates
                  below 70 percent and double key value load; stale features
                  from expiry silently degrade model quality by 1 to 2 percent
                  without alerting on freshness Service Level Objectives
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
                  Netflix uses EVCache deployed in multiple regions as an in
                  memory online feature store, achieving sub millisecond p50 and
                  low single digit millisecond p99 latencies while serving
                  millions of reads per second for personalization features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn Venice powers People You May Know features with read
                  replicas and sharding to handle millions of Queries Per
                  Second, maintaining single digit millisecond p99 through
                  region local reads and hot key distribution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreArchitectureOnlineServingArchitectureAndLatencyBudgets;
