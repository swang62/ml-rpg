import type { Component } from "solid-js";

const LessonForecastingEvaluationHowToImplementForecastEvaluationAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How to Implement Forecast Evaluation at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Forecast Evaluation at Scale:</strong> A production
              framework for computing and aggregating forecast accuracy metrics
              across millions of time series with varying characteristics,
              hierarchies, and business importance levels.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Distributed Metric Computation
            </p>
            <p>
              Evaluating millions of forecasts requires distributed processing.
              Partition time series by business unit or product category. Use
              MapReduce patterns: map phase computes per-series metrics (MAPE,
              RMSE, bias), reduce phase aggregates to hierarchical summaries.
              Process incrementally as new actuals arrive rather than batch
              recomputation. Cache intermediate results at each hierarchy level
              for sub-minute dashboard latency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Weighted Aggregation Strategies
            </p>
            <p>
              Simple averaging misleads when importance varies dramatically.
              Weight metrics by business impact: revenue contribution, margin,
              or strategic importance. Compute weighted MAPE where high-revenue
              products dominate aggregate scores. Alternatively, use
              volume-weighted approaches. Always report both weighted and
              unweighted metrics—discrepancies reveal whether the model
              prioritizes correctly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stratified Analysis Framework
            </p>
            <p>
              Aggregate metrics hide important patterns. Stratify by: product
              lifecycle (new vs mature), demand pattern (smooth vs intermittent
              vs seasonal), volume tier (high/medium/low movers), and forecast
              horizon. Create performance matrices across these dimensions. This
              identifies systematic weaknesses—perhaps the model struggles with
              new product launches or long-horizon seasonal items specifically.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Automation:</strong> Implement anomaly detection on
              metrics. Alert when weekly MAPE increases &gt;10% relative, or
              when segments show sudden degradation. This catches pipeline
              issues and drift before business impact accumulates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Baseline Tracking
            </p>
            <p>
              Maintain baseline comparisons: naive forecasts, statistical
              baselines (moving average, exponential smoothing), and previous
              model versions. Report skill scores showing improvement over
              baselines. Dashboards should show current accuracy, baseline
              accuracy, and delta—contextualizing whether 15% MAPE is good
              (baseline was 25%) or concerning (baseline was 12%).
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
                  Distributed metric computation with MapReduce for millions of
                  series
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weighted aggregation by business impact (revenue, volume,
                  strategic importance)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stratified analysis revealing patterns hidden in aggregate
                  metrics
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
                  Partition by business unit with incremental processing as
                  actuals arrive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated alerts when weekly MAPE increases &gt;10% relative
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingEvaluationHowToImplementForecastEvaluationAtScale;
