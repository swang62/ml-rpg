import type { Component } from "solid-js";

const LessonFeatureFreshnessMonitoringFreshnessAndHandlingStalenessInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Monitoring Freshness and Handling Staleness in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Per Feature Age Distributions
            </p>
            <p style="margin-top: 0">
              Effective freshness monitoring requires tracking per feature age
              distributions, not just pipeline success metrics. A batch job
              marked "succeeded" can still deliver stale features if upstream
              data was delayed or if the job processed only a subset of
              entities. Teams must emit histograms of feature age (p50, p95,
              p99) for each feature and alert when percentiles exceed soft or
              hard TTL thresholds. DoorDash monitors both end to end lag (event
              time to availability in online store) and per entity freshness to
              catch partial failures.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Staleness Aware Serving
            </p>
            <p style="margin-top: 0">
              Implements graceful degradation through a fallback cascade. When a
              feature age exceeds its soft TTL, the system logs a warning and
              includes an "age" feature or downweights its contribution. When
              age exceeds hard TTL, the system falls back to a default value
              (population mean, last known good, or zero) and increments an
              alert counter. Netflix uses learned imputation where the model
              predicts missing feature values from available features.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness Alerts
            </p>
            <p style="margin-top: 0">
              Configure alerts on p95 and p99 feature age crossing SLA
              thresholds sustained for 5 to 15 minutes to avoid flapping on
              transient spikes. Include both absolute staleness (feature is 10
              minutes old) and relative staleness (feature is 2x older than
              historical p95). Relative thresholds catch gradual degradation
              that absolute thresholds miss.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dashboard Design
            </p>
            <p style="margin-top: 0">
              Visualize feature freshness as a heatmap showing (feature, time
              bucket) with color indicating age percentile. Red cells indicate
              SLA violation. Drill down to per entity age distributions to
              identify if staleness is global (pipeline issue) or localized (hot
              key, partition issue).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 15px">
                  Staleness Handling Flow
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px">
                  <strong>Check age:</strong> now_event_time −
                  feature.event_time
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                  <strong>age &lt; soft_ttl:</strong> Use feature ✓
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                  <strong>age &lt; hard_ttl:</strong> Log warning + include age
                  feature
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                  <strong>age &gt; hard_ttl:</strong> Fallback cascade
                  <br />
                  1. Try batch snapshot
                  <br />
                  2. Use static default
                  <br />
                  3. Drop feature if model is robust
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
                  Monitor feature age distributions, not just job success. A job
                  can succeed while delivering features that are hours stale if
                  upstream data was delayed. Track p50, p95, p99 age per feature
                  hourly.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary monitoring catches issues invisible to batch
                  dashboards. Uber runs synthetic prediction requests every
                  minute for test entities and alerts if 3 consecutive requests
                  show features older than SLA.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Smart fallbacks reduce error significantly. Uber experiments
                  showed that falling back to 1 hour old batch values when
                  nearline features exceed TTL reduces prediction Mean Absolute
                  Error (MAE) by 8 to 12% versus dropping features.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training on artificially staled features reveals sensitivity.
                  If offline AUC drops from 0.85 to 0.78 when features are 2x
                  their target age, either tighten freshness SLA or make the
                  model more robust by including age as input.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replication lag can make features stale for geo routed
                  traffic. LinkedIn monitors cross region replication offsets
                  and exposes lag as a freshness signal. If lag exceeds 5
                  minutes, read from primary region despite higher latency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfill storms can overwrite fresh values with old data.
                  Route backfills to separate namespaces and gate online
                  replacement using version numbers and max age guards to
                  prevent hot key eviction.
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
                  DoorDash detected a silent staleness bug where store busy
                  features appeared fresh (job succeeded) but covered only 60%
                  of entities due to upstream Kafka partition lag. Per entity
                  age monitoring caught this within 10 minutes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix trained two model variants: one with all features, one
                  with only low volatility features. When freshness SLAs are
                  violated systemically (upstream outage), traffic shifts to the
                  robust variant, degrading recommendations slightly but
                  preventing total failure.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn's canary system requests features for 1000 test
                  profiles every 30 seconds. When replication lag spiked to 10
                  minutes during a datacenter issue, canaries alerted before
                  users noticed, and traffic was routed to the primary region.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureFreshnessMonitoringFreshnessAndHandlingStalenessInProduction;
