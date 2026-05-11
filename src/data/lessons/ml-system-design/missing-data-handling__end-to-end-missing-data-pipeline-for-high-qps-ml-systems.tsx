import type { Component } from "solid-js";

const LessonMissingDataHandlingEndToEndMissingDataPipelineForHighQpsMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            End to End Missing Data Pipeline for High QPS ML Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            A production machine learning system serving 100,000 queries per
            second must handle missing data across data ingestion, feature
            computation, storage, training, and real time inference. This is not
            a single component problem. It requires coordinated design across
            the entire pipeline with strict latency guarantees, monitoring, and
            fallback mechanisms at every layer. The flow begins with raw events
            arriving into a streaming bus (for example, Kafka) and a data lake
            (for example, S3). Feature pipelines compute offline aggregates
            daily or hourly using Spark or similar batch processing, and online
            transforms compute low latency features on streams with event time
            windows (for example, Flink). Missing data appears at multiple
            points: streaming joins drop events with missing keys, upstream
            services return nulls or timeout, and late arriving data violates
            watermarks. The feature store provides two views: offline for
            training over months of history, and online for low latency
            retrieval at inference under strict Service Level Agreements (SLAs).
            Both views must apply the same imputation semantics or you create
            training serving skew. Consider an e-commerce ranking system. The
            online feature store must respond in 5 to 10 milliseconds at the
            95th percentile for 20 to 50 features per request. Some features are
            aggregates with 15 minute freshness (for example, category click
            rate over the last hour), others are near real time counters with 1
            to 2 minute acceptable lag (for example, items added to cart in the
            current session). At this scale, late features are normal. During
            training, the pipeline materializes features for N users and M items
            over T days. Rows with missing features are not simply dropped,
            because that would bias against sparse cohorts (for example, new
            users or long tail items). Instead, pipelines apply per feature
            imputation policies defined in the schema and add binary missingness
            indicators. At serving time, feature retrieval uses a backoff chain.
            First, check the online cache. If missing or expired, retrieve the
            last good value within the feature's Time To Live (TTL), which might
            be 1 hour for demographic attributes or 5 minutes for activity
            counters. If the TTL has expired or no value exists, use the default
            constant or unknown token from the schema. The request proceeds even
            if some features are defaulted, and the system logs which features
            were defaulted and at what tier they were resolved. Batch jobs run
            overnight to reconcile late arriving data and rebuild offline
            aggregates. Monitoring tracks missingness rate per feature and per
            traffic segment. If a feature's missingness exceeds a runbook
            threshold (for example, 5% for high importance features or 2x the
            trailing 7 day mean), the system either disables its use through a
            feature gate or diverts traffic to a fallback model. Netflix style
            systems with microservice fanouts face additional challenges. A page
            request fans out to 10 to 20 feature services, each with a single
            digit millisecond budget. If a feature service breaches its 5 to 10
            millisecond budget due to tail latency, the caller must proceed with
            deterministic fallbacks to meet the page Service Level Agreement
            (SLA). This is handled by per call timeouts, circuit breakers, and
            maintaining a smaller fallback model that uses only high
            availability features. Companies like Google emphasize this in TFX
            Data Validation: check schema drift, flag spikes in missingness
            beyond configured thresholds, and block pipeline promotion on
            anomalies.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Raw Events → Streaming Bus (Kafka) + Data Lake (S3)
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Offline Pipeline</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Batch aggregates (daily)
                      <br />
                      Impute + indicators
                      <br />
                      Months of history
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Online Pipeline</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Stream transforms
                      <br />
                      15min freshness
                      <br />
                      5-10ms p95 latency
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Feature Store: Backoff Chain
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Cache → Last Good (TTL: 5min-1hr) → Default
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Model Inference (20-50ms budget) + Monitoring
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Alert if missingness &gt;5% or &gt;2x trailing 7d mean
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
                  Feature store must provide offline and online views with the
                  same imputation semantics to prevent training serving skew
                  across months of training data and millisecond inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backoff chain for online retrieval: cache (microseconds), last
                  good within TTL (1 hour for demographics, 5 minutes for
                  activity), then schema default (microseconds), with logging at
                  each tier
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Missingness thresholds trigger automated responses: disable
                  feature if rate exceeds 5% for critical features or 2x the
                  trailing 7 day mean, or divert traffic to fallback model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per feature TTLs balance freshness and availability: 1 hour
                  for stable attributes, 5 minutes for session counters,
                  explicit defaults only when TTL expires to prevent stale data
                  harm
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving data is reconciled with overnight batch jobs
                  that backfill offline aggregates, maintaining event time
                  correctness for training while serving uses deterministic
                  fallbacks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitoring tracks missingness rate per feature and per segment
                  (for example, mobile versus desktop, client version), with
                  runbooks specifying thresholds and remediation steps
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
                  Amazon product ranking: 100k QPS, 100ms p99 end to end. Model
                  inference 20 to 50ms, feature store 5 to 10ms p95 for 50
                  features. Backoff chain resolves 95% from cache, 3% from last
                  good within 15min TTL, 2% from defaults. Missingness rate
                  monitored per feature.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google TFX Data Validation: Computes statistics on training
                  data, checks schema drift, flags if missingness for any
                  feature exceeds configured threshold (for example, 10% when
                  historical mean is 2%). Blocks pipeline promotion and alerts
                  on call engineer.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo: Feature schema includes default value, TTL,
                  and required flag. Training pipeline materializes with
                  defaults and indicators. Serving uses backoff: online cache,
                  last good (TTL enforced), default. Replay tests verify offline
                  online equivalence by comparing feature values.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMissingDataHandlingEndToEndMissingDataPipelineForHighQpsMlSystems;
