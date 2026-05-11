import type { Component } from "solid-js";

const LessonPredictionDriftProductionImplementationArchitectureAndCostOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation Architecture and Cost Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA COLLECTION ARCHITECTURE
            </p>
            <p>
              Log predictions with metadata: timestamp, model version, features
              used, prediction score, predicted class (if applicable). Store in
              a queryable format for historical analysis.
            </p>
            <p>
              <strong>Sampling:</strong> For high-QPS systems, sample 1-10% of
              predictions. Ensure stratified sampling by key dimensions (user
              type, product category) to maintain segment representativeness.
            </p>
            <p>
              <strong>Storage:</strong> Time-series databases work well for
              prediction monitoring. Columnar formats (Parquet) enable efficient
              historical queries. Retain 30-90 days of detailed data; longer for
              compliance needs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPUTE PIPELINE
            </p>
            <p>
              <strong>Batch processing:</strong> Run drift detection as hourly
              or daily batch jobs. Simple, cost-effective. Detection latency
              equals batch interval.
            </p>
            <p>
              <strong>Streaming processing:</strong> Compute drift metrics in
              real-time using stream processing frameworks. Sub-minute
              detection. Higher infrastructure cost.
            </p>
            <p>
              <strong>Typical pattern:</strong> Streaming for critical metrics
              (prediction mean, class distribution). Batch for comprehensive
              analysis (full distribution comparison, slice-level monitoring).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COST OPTIMIZATION
            </p>
            <p>
              <strong>Reduce sample size:</strong> Statistical significance with
              10,000 samples is similar to 100,000 samples. Sample aggressively
              for cost savings.
            </p>
            <p>
              <strong>Aggregate before compare:</strong> Compute histograms or
              sketches instead of storing raw predictions. Compare aggregates
              rather than individual values.
            </p>
            <p>
              <strong>Tiered monitoring:</strong> Critical models get real-time
              monitoring. Less critical models get daily batch monitoring. Match
              monitoring intensity to business impact.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ALERTING INTEGRATION
            </p>
            <p>
              Feed drift metrics into centralized alerting (PagerDuty, Opsgenie,
              or internal systems). Set severity levels: critical (immediate
              page), warning (investigate within hours), informational (review
              in daily standup).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Start with batch processing on
              sampled data. Add streaming only when batch latency becomes a
              measurable business problem. Premature optimization wastes
              engineering effort.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Prediction Logs</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    1 to 10% sampling | Timestamp, model ID, slice dims, score
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Stream Aggregation</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    50 to 200 bin histograms per model × slice × window
                    <br />
                    100x to 1000x storage reduction
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Divergence Computation
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Compare to baselines: training, 7 to 30 day rolling,
                    seasonal
                    <br />
                    JS divergence in under 200ms per slice
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Hierarchical Alerting</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Require 3 of 5 windows + slice confirmation
                    <br />
                    Rate limit 1 alert per slice per hour
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
                  Log predictions with metadata; sample 1-10% stratified by key
                  dimensions; retain 30-90 days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch for comprehensive analysis, streaming for critical
                  metrics; match monitoring intensity to business impact
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost optimization: aggressive sampling, aggregate before
                  compare (histograms/sketches), tiered monitoring by
                  criticality
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
                  Interview Tip: Describe the tradeoff between batch and
                  streaming processing for drift monitoring.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain cost optimization: sampling,
                  aggregation, tiered monitoring based on model criticality.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPredictionDriftProductionImplementationArchitectureAndCostOptimization;
