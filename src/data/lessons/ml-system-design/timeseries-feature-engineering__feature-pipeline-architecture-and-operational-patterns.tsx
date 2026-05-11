import type { Component } from "solid-js";

const LessonTimeseriesFeatureEngineeringFeaturePipelineArchitectureAndOperationalPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Pipeline Architecture and Operational Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Feature Computation
            </p>
            <p>
              Compute features in scheduled batch jobs: ingest raw data, compute
              lag features, rolling statistics, calendar features, write to
              feature store. Run daily or hourly depending on forecast
              frequency. Batch computation handles complex aggregations
              efficiently using distributed frameworks (Spark, BigQuery).
              Features are then served from low-latency storage.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Pipeline Structure:</strong> Raw data lake → Feature
              computation (Spark/SQL) → Feature store (Redis/DynamoDB) → Model
              serving. Each stage has monitoring, alerting, and fallback
              strategies for failures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming for Fresh Features
            </p>
            <p>
              Some features need near-real-time updates: last-hour sales,
              current session activity. Streaming pipelines (Kafka, Flink)
              maintain running aggregations updated with each event. Trade-off:
              streaming is more complex and expensive than batch. Use streaming
              only for features where freshness provides measurable forecast
              improvement.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Consistent Training and Serving
            </p>
            <p>
              Features computed differently in training versus serving cause
              training-serving skew. Mitigation: single codebase for feature
              computation used by both batch (training) and serving paths.
              Alternatively, log serving-time features and use logged values for
              training, guaranteeing identical features.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Best Practice:</strong> Define features declaratively
              (feature name, source columns, aggregation logic). Generate both
              batch SQL and serving code from the same definition. This
              eliminates implementation divergence.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Backfill and Recovery
            </p>
            <p>
              Historical feature values needed for training must be backfilled.
              For lag and rolling features, this requires historical raw data.
              Design pipelines to recompute features from raw data when logic
              changes. Store raw data with sufficient retention (2+ years for
              yearly seasonality). Recovery from pipeline failures should be
              idempotent—rerunning produces same results.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="margin-bottom: 12px; text-align: center">
                <strong style="font-size: 15px">
                  Dual Path Feature Architecture
                </strong>
              </div>
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center">
                    Offline Batch Path
                  </div>
                  <div style="font-size: 11px; line-height: 1.5">
                    Historical Events
                    <br />↓<br />
                    Feature Backfill (Spark)
                    <br />↓<br />
                    Point in Time Joins
                    <br />↓<br />
                    Training Dataset
                    <br />
                    <strong>730 days, 50K products</strong>
                    <br />
                    Runs: Nightly
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center">
                    Online Stream Path
                  </div>
                  <div style="font-size: 11px; line-height: 1.5">
                    Event Stream (Kafka)
                    <br />↓<br />
                    Incremental Aggregation (Flink)
                    <br />↓<br />
                    Feature Store (Redis)
                    <br />↓<br />
                    Model Inference (10ms p95)
                    <br />
                    <strong>100K QPS</strong>
                    <br />
                    Freshness: 5 min
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                <strong>Consistency:</strong> Shared feature definitions
                generate both paths. Monitor divergence with shadow scoring.
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
                  Batch pipeline: raw data → feature computation (Spark) →
                  feature store (Redis) → model serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use streaming only where freshness measurably improves
                  forecasts—it is more complex and expensive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Define features declaratively and generate both batch and
                  serving code from same definition
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
                  Log serving-time features and use logged values for training
                  to guarantee identical features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Store raw data with 2+ years retention for yearly seasonality
                  backfills; ensure idempotent recovery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeseriesFeatureEngineeringFeaturePipelineArchitectureAndOperationalPatterns;
