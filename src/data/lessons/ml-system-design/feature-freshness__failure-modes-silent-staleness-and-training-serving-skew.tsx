import type { Component } from "solid-js";

const LessonFeatureFreshnessFailureModesSilentStalenessAndTrainingServingSkew: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Silent Staleness and Training Serving Skew
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Silent Staleness
            </p>
            <p style="margin-top: 0">
              Occurs when features appear fresh by pipeline metrics but are
              actually stale due to hidden issues. Clock skew between the host
              measuring "now" and the host that timestamped features can cause
              negative or understated age calculations. If feature timestamps
              come from a server 30 seconds ahead, measured age will be 30
              seconds too low, letting stale features pass freshness checks. The
              fix is to compute age server side using monotonic clocks, store
              both event time and ingestion time, and enforce NTP discipline
              across infrastructure.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cache Induced Staleness
            </p>
            <p style="margin-top: 0">
              Extends effective TTL beyond freshness SLAs when invalidation is
              delayed or missed. A feature computed at T=0 with SLA of 60
              seconds, cached at T=30 with cache TTL of 120 seconds, may be
              served at T=150 with age of 150 seconds, violating SLA despite
              both feature materialization and caching operating correctly.
              Mitigation uses age aware cache keys that include computation
              timestamp, or piggybacks feature age onto cache entries for client
              side freshness checks.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Serving Skew from Freshness
            </p>
            <p style="margin-top: 0">
              Training pipelines typically use complete batch data with no
              staleness, while serving uses streaming features with variable
              freshness. A model trained on perfectly fresh features may degrade
              when served with 30 second old data. Mitigation injects synthetic
              staleness during training: randomly sample features from time T
              minus delta where delta follows the production freshness
              distribution, teaching the model robustness to stale inputs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pipeline Lag Masking
            </p>
            <p style="margin-top: 0">
              Aggregating lag metrics across all features hides per feature
              problems. A pipeline with 10 features where 9 have 5 second lag
              and 1 has 5 minute lag shows aggregate p95 of 5 seconds, masking
              the outlier. Per feature freshness monitoring is essential to
              catch isolated degradation.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clock skew causes negative or understated age. If the feature
                  timestamp server is 30 seconds ahead, measured age is 30
                  seconds too low. Use server side age computation with
                  monotonic clocks and strict NTP synchronization.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tier cache TTLs compound. Three cache layers each with
                  60 second TTL create 180 second worst case staleness. Bound
                  each tier's TTL to (feature_sla / number_of_tiers) to stay
                  within SLA.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew from label leakage inflates offline
                  metrics by 10 to 20 AUC points but causes production failure.
                  Enforce as of joins where features at time T use only data
                  available before T minus operational delay.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replication lag during peak load can stale features for geo
                  routed users. Monitor Logical Sequence Number (LSN) or offset
                  gaps between regions. When lag exceeds SLA, route reads to
                  primary region despite higher latency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot keys from viral content cause write retries and partition
                  hotspots. One DoorDash restaurant during dinner rush generated
                  50 orders per minute, overwhelming a single partition.
                  Sharding counters 10 ways and merging on read resolved it.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfill storms can overwrite fresh online values with old
                  data. Route backfills to separate stores or namespaces. Use
                  version numbers and max age guards: only write to online store
                  if backfill_timestamp &gt; current_online_timestamp.
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
                  Uber discovered clock skew when prediction quality degraded
                  but freshness dashboards showed green. Root cause was feature
                  timestamps from a server 45 seconds fast, causing stale
                  features to pass age checks. Fix was centralized server side
                  age calculation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A LinkedIn feature for "profile views in last 24 hours" was
                  trained using a simple join of labels and latest feature
                  snapshots. Offline AUC was 0.83. Production AUC was 0.68
                  because training included views that happened after the label
                  time. Switching to point in time joins fixed it.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DoorDash hit a hot key issue where one store generated 3000
                  updates per hour. Write retries caused freshness to degrade
                  from p99 of 30 seconds to p99 of 5 minutes. Sharding the
                  counter into 10 keys and summing on read reduced p99 to 45
                  seconds.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureFreshnessFailureModesSilentStalenessAndTrainingServingSkew;
