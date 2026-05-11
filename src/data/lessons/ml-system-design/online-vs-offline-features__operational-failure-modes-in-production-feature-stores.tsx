import type { Component } from "solid-js";

const LessonOnlineVsOfflineFeaturesOperationalFailureModesInProductionFeatureStores: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Operational Failure Modes in Production Feature Stores
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness Regressions
            </p>
            <p style="margin-top: 0">
              Insidious because they degrade model performance silently while
              p50 latency SLAs appear healthy. Streaming consumer lag from Kafka
              back pressure causes features to become stale by minutes to hours,
              but if the feature store still responds quickly with outdated
              values, latency monitoring misses the issue. A recommendation
              model serving 1 hour old activity counters instead of real time
              data might lose 5% to 15% CTR while all dashboards show green.
              Mitigation requires explicit freshness SLOs measuring age of last
              update per entity per feature.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hot Key Problems
            </p>
            <p style="margin-top: 0">
              Emerge from power law traffic distributions where top 0.1% of
              entities receive 50%+ of requests, overwhelming individual shards
              in distributed key value stores. A viral video on TikTok can
              trigger cache stampedes where thousands of concurrent requests
              bypass cache simultaneously, crushing the backing database.
              DoorDash handles this through request coalescing: buffer requests
              for the same key arriving within milliseconds, issue single
              backend lookup, and broadcast result to all waiters. Negative
              caching for missing entities with short TTL prevents repeated
              lookups for non existent keys.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Partial Availability
            </p>
            <p style="margin-top: 0">
              When one feature store region goes down or a subset of features
              becomes unavailable due to upstream pipeline failures, the serving
              path must gracefully degrade rather than fail hard. Models should
              be architected with learned defaults or imputation at serving
              time, allowing prediction to continue with reduced accuracy rather
              than timing out. Netflix maintains per feature fallback values
              computed from recent population statistics, serving predictions
              with 2% to 5% accuracy degradation during regional outages rather
              than complete unavailability.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Consistency Gaps
            </p>
            <p style="margin-top: 0">
              Between online and offline stores manifest as experiment
              contamination and segment mismatches. Dual write races or CDC lag
              cause online state to temporarily diverge from offline by minutes
              to hours. A user assigned to treatment segment based on offline
              feature value might be served predictions using online features
              that still reflect control segment, polluting experiment results.
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
                  Feature freshness regressions degrade model performance by 5%
                  to 15% while latency monitoring appears healthy, requiring
                  explicit age of last update metrics per entity with alerts
                  when p95 exceeds freshness SLOs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot key stampedes occur when top 0.1% of entities receive 50%+
                  of traffic due to power law distributions, overwhelming shards
                  and causing cache bypass that crushes backing databases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Request coalescing buffers concurrent lookups for same key
                  within milliseconds, issues single backend query, and
                  broadcasts result to all waiters, reducing hot key load by 10x
                  to 100x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial availability requires graceful degradation: models
                  with learned defaults or imputation serve predictions with 2%
                  to 5% accuracy loss rather than timeout during regional
                  failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Negative caching with short TTL (30 to 120 seconds) prevents
                  repeated lookups for non existent entities during pipeline
                  failures or incident driven missing data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency gaps between stores from dual write races or CDC
                  lag cause experiment contamination, requiring monotonic
                  versioning and reconciliation jobs that diff and repair within
                  SLA windows
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
                  Uber: Stream lag alerts fire when feature age exceeds 5
                  minutes for critical counters, triggering automated consumer
                  scaling and back pressure mitigation before model performance
                  degrades
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb: Reconciliation jobs compare online Redis against
                  offline Hive tables on 5% entity sample hourly, repairing
                  detected inconsistencies and alerting if divergence rate
                  exceeds 1%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta Ads: Multi region online stores with per feature fallback
                  to population averages maintain 99.9% availability during
                  regional failures, accepting 3% CTR degradation over complete
                  outage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOnlineVsOfflineFeaturesOperationalFailureModesInProductionFeatureStores;
