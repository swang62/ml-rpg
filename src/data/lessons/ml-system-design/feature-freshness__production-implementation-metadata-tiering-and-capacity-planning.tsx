import type { Component } from "solid-js";

const LessonFeatureFreshnessProductionImplementationMetadataTieringAndCapacityPlanning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Metadata, Tiering, and Capacity Planning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness Tier Metadata
            </p>
            <p style="margin-top: 0">
              Production feature stores tag each feature with a freshness tier
              and numeric SLA: realtime (p95 age under 5 seconds, p99 under 15
              seconds), nearline (p95 under 5 minutes, p99 under 15 minutes), or
              batch (p95 under 24 hours, p99 under 48 hours). Each feature
              carries metadata: event time (when the underlying event occurred),
              last updated at (when the feature was computed and written),
              computation window (like 30 minute sliding window), soft TTL (warn
              threshold), and hard TTL (fallback threshold).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Assembler Logic
            </p>
            <p style="margin-top: 0">
              The online feature assembler computes age at request time,
              enforces SLAs, and degrades gracefully. For each feature fetch, it
              calculates age = current_time minus event_time. If age exceeds
              soft TTL, it logs a warning and optionally appends age to the
              feature vector for model consumption. If age exceeds hard TTL, it
              substitutes a fallback value and increments an alert counter.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning
            </p>
            <p style="margin-top: 0">
              Starts with latency budgets. If total p99 inference latency is
              50ms and model execution takes 30ms, you have 20ms for feature
              fetching, preprocessing, and network. At 5ms per feature lookup,
              you can afford 4 sequential hops. For 50 features, you need
              aggressive batching, parallel fetches, or caching to hit budget.
              DoorDash achieves this by bundling all features for an entity into
              single key lookups and caching hot entities.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming Capacity
            </p>
            <p style="margin-top: 0">
              For nearline features, plan streaming cluster capacity based on
              peak events per second times compute per event times retention for
              late events. A 10,000 events per second stream with 100ms compute
              and 1 hour late event buffer requires approximately 10 partitions
              with 100MB state each. Add 50 to 100 percent headroom for traffic
              spikes and reprocessing after failures.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 4px; font-size: 15px">
                  Feature Metadata &amp; Enforcement
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; font-size: 12px">
                  <strong>Feature: nearby_driver_count</strong>
                  <br />
                  event_time: 2024-01-15 14:23:10
                  <br />
                  last_updated_at: 2024-01-15 14:23:15
                  <br />
                  computation_window: 5 minutes
                  <br />
                  soft_ttl: 30s | hard_ttl: 120s
                  <br />
                  tier: realtime
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; font-size: 12px">
                  <strong>Online Assembler at 14:23:45</strong>
                  <br />
                  age = 14:23:45 − 14:23:10 = 35s
                  <br />
                  age &gt; soft_ttl (30s) → Log warning
                  <br />
                  age &lt; hard_ttl (120s) → Use with age feature
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px; text-align: center">
                  <strong>Capacity:</strong> 100k QPS × 100 features = 10M
                  lookups/s
                  <br />
                  Batch by entity → 15ms p99 with prefetch
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
                  Latency budgets force trade offs. With 50ms total p99 budget
                  and 30ms model execution, feature retrieval has only 20ms.
                  Batching 100 features by entity reduces round trips from 100
                  to 3, fitting in 15ms p99.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write capacity must handle burst factors of 5x to 10x, not
                  just averages. Uber provisions nearline stores for p99 load
                  during peak hours, which can be 10x average load during events
                  like New Year's Eve.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross region reads trade freshness for latency. Reading from
                  primary region adds 50 to 150ms for cross continent latency
                  but guarantees fresh data. Netflix reads embeddings locally
                  (accepting 2 minute replication lag) but session state from
                  primary.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfills in separate lanes prevent online poisoning. DoorDash
                  routes 90 day historical recomputations to versioned offline
                  stores. Only after validation do they promote to online
                  serving, with guards against overwriting fresher values.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature metadata enables runtime decisions. Including last
                  updated at and TTL lets the assembler substitute defaults,
                  drop features, or include age as a model input when freshness
                  SLAs are violated.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitoring replication lag is critical for geo distributed
                  systems. LinkedIn tracks offset deltas between regions per
                  feature store partition. When lag exceeds 5 minutes, alert and
                  route critical reads to primary.
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
                  Uber Michelangelo batches feature lookups by entity type. For
                  a trip prediction, it fetches all rider features in one lookup
                  (10ms), all driver features in another (8ms), and contextual
                  features in a third (5ms), totaling 23ms p99 for 100+
                  features.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix maintains two tiers of feature storage: regional read
                  replicas for user embeddings with 2 to 5 minute replication
                  lag and primary region lookups for session state with 10ms p99
                  latency, choosing based on criticality.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DoorDash discovered a backfill job overwrote fresh store busy
                  signals with 3 hour old values during a nightly recomputation.
                  Adding a version check (only write if new_version &gt;
                  current_version) prevented the regression.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureFreshnessProductionImplementationMetadataTieringAndCapacityPlanning;
