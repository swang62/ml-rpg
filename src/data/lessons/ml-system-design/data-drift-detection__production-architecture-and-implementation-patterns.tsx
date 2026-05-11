import type { Component } from "solid-js";

const LessonDataDriftDetectionProductionArchitectureAndImplementationPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture and Implementation Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA COLLECTION LAYER
            </p>
            <p>
              Production drift monitoring starts with logging. Log every
              prediction request with features and timestamps. Store in a
              queryable format (columnar stores like Parquet work well for
              analytical queries).
            </p>
            <p>
              Sampling considerations: for high-QPS systems (100K+
              requests/second), logging everything is expensive. Sample 1-10% of
              traffic. Ensure sampling is stratified across segments (geography,
              user type) to catch segment-specific drift.
            </p>
            <p>
              Feature storage: compute and store summary statistics (mean, std,
              percentiles, histograms) at regular intervals. Raw feature storage
              enables ad-hoc analysis but costs more. Most systems store
              aggregates plus a sample of raw records.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPUTE ARCHITECTURE
            </p>
            <p>
              <strong>Batch processing:</strong> Run drift detection as
              daily/hourly batch jobs. Simple to implement. Latency is window
              size plus processing time. Good for most use cases.
            </p>
            <p>
              <strong>Streaming processing:</strong> Compute drift statistics in
              real-time using stream processing (Kafka + Flink). Detects drift
              within minutes. Higher infrastructure complexity. Use for
              latency-critical applications.
            </p>
            <p>
              Hybrid: stream processing for critical features, batch for
              comprehensive analysis.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ALERTING AND DASHBOARDS
            </p>
            <p>
              <strong>Threshold-based alerts:</strong> Alert when PSI &gt; 0.25
              or K-S p-value &lt; 0.01. Requires tuning thresholds per feature
              based on historical variability.
            </p>
            <p>
              <strong>Anomaly-based alerts:</strong> Train a model on historical
              drift metrics. Alert when current drift is anomalous given
              historical patterns. Adapts to expected variation.
            </p>
            <p>
              Dashboard essentials: per-feature drift over time, top drifting
              features ranked by magnitude, comparison of current vs baseline
              distributions. Enable drill-down from aggregate to segment level.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Start with batch processing and
              threshold-based alerts. Add streaming and anomaly detection as you
              scale. Simple systems with good thresholds catch most issues.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Inference Service</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    p99 &lt; 50ms latency SLO
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">
                  ↓ async log (&lt; 1ms)
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Durable Log Bus</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Kafka / Kinesis / Pub/Sub
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 10px; width: 100%">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Layer 1: Fast</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      PSI, KS on 60 features
                      <br />
                      Every 15 min
                      <br />
                      &lt; 100ms CPU
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Layer 2: Deep</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      MMD, adversarial
                      <br />
                      On flagged features
                      <br />
                      Hourly rotation
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Guarded Response</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    2+ windows + Effect size + 20% traffic + KPI drop → Canary
                    retrain
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
                  Sample 1-10% of high-QPS traffic; stratify by segment to catch
                  segment-specific drift; store aggregates + raw sample
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch processing for most cases; streaming for
                  latency-critical (&lt;minute detection); hybrid for critical
                  features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Threshold alerts (PSI &gt; 0.25) need per-feature tuning;
                  anomaly-based alerts adapt to historical patterns
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
                  Interview Tip: Describe the data pipeline: logging → sampling
                  → aggregation → drift computation → alerting.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain when streaming drift detection is worth
                  the complexity vs batch processing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDriftDetectionProductionArchitectureAndImplementationPatterns;
