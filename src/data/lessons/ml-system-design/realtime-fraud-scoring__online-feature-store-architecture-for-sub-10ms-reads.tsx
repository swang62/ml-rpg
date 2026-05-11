import type { Component } from "solid-js";

const LessonRealtimeFraudScoringOnlineFeatureStoreArchitectureForSub10msReads: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online Feature Store Architecture for Sub 10ms Reads
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Dedicated Online Stores
            </p>
            <p>
              General-purpose databases add latency: query parsing, transaction
              overhead, index traversal. Online feature stores optimize for a
              single access pattern: given an entity key, return all features
              for that entity. This specialization enables sub-10ms reads even
              with hundreds of features per entity.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Architecture Pattern:</strong> The online store is a
              read-optimized cache populated by batch or streaming pipelines.
              Features are pre-computed offline and written to the store. At
              serving time, only key-value lookups occur—no computation, no
              joins, no aggregation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Storage Layer Options
            </p>
            <p>
              Redis provides sub-millisecond reads with in-memory storage.
              DynamoDB offers durability with single-digit millisecond latency.
              Cassandra scales to billions of keys with tunable consistency. The
              choice depends on data volume, durability requirements, and cost
              tolerance. Most systems use Redis for hot data with a persistent
              backing store.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Get Optimization
            </p>
            <p>
              Fetching 100 features with 100 individual requests takes 50-100ms
              (network round-trips dominate). Multi-get fetches all features in
              a single round-trip: 1-5ms total. The client sends a list of keys;
              the store returns all values together. This optimization is
              critical for latency.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Production Tip:</strong> Colocate all features for an
              entity in a single key-value pair (serialized blob). This
              guarantees single-key retrieval regardless of feature count,
              eliminating multi-get overhead entirely.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Freshness
            </p>
            <p>
              Pre-computed features become stale. User activity in the last
              minute is not reflected in hourly-updated features. Solutions:
              streaming pipelines for near-real-time updates (seconds of delay),
              or hybrid approaches combining pre-computed baseline features with
              real-time computed recent activity signals.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: bold; font-size: 14px">
                Layered Feature Store
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Layer 1: In-Process Cache</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Latency: microseconds to 1ms
                  </div>
                  <div style="font-size: 12px">
                    Use: Static features, high read volume
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Cache miss
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Layer 2: Regional Cache (Redis)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Latency: 1 to 3ms, 95 to 99% hit rate
                  </div>
                  <div style="font-size: 12px">
                    Batch multi-get for efficiency
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Cache miss
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Layer 3: Online Store (DynamoDB)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Latency: 5 to 10ms
                  </div>
                  <div style="font-size: 12px">
                    Versioned features with schema validation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; margin-top: 6px; text-align: center; font-size: 12px">
                  <strong>Streaming Pipeline</strong>: Updates features every
                  few seconds, freshness SLA &lt; 1 minute
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
                  Online stores optimize for a single pattern: given entity key,
                  return all features—no computation, joins, or aggregation at
                  read time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-get fetches all features in single round-trip (1-5ms)
                  versus 100 individual requests (50-100ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Colocate features in a single key-value pair (serialized blob)
                  to guarantee single-key retrieval regardless of feature count
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
                  Explain storage options: Redis for sub-ms in-memory reads,
                  DynamoDB for single-digit ms with durability, Cassandra for
                  billions of keys
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe feature freshness: streaming pipelines for
                  near-real-time updates, or hybrid with pre-computed baseline
                  plus real-time signals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeFraudScoringOnlineFeatureStoreArchitectureForSub10msReads;
