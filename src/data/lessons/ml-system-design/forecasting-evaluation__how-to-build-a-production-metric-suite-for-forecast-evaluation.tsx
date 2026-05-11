import type { Component } from "solid-js";

const LessonForecastingEvaluationHowToBuildAProductionMetricSuiteForForecastEvaluation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How to Build a Production Metric Suite for Forecast Evaluation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Core Metric Suite
            </p>
            <p>
              No single metric captures all forecast quality aspects. Production
              systems need multiple metrics: MAPE or sMAPE for percentage
              accuracy, RMSE for absolute accuracy with large-error penalty,
              Bias for systematic directional error, MASE for comparison against
              naive baseline. Report all four; optimize for the one most aligned
              with business cost.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>MASE (Mean Absolute Scaled Error):</strong> MASE compares
              error to naive forecast error: MASE = MAE / MAE_naive. MASE &lt; 1
              means model beats naive; MASE &gt; 1 means model loses to naive.
              MASE is scale-independent and works with zeros, avoiding MAPE
              limitations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Segmented Metrics
            </p>
            <p>
              Aggregate metrics hide problems. A model with 5% MAPE overall may
              have 3% on high-volume products and 40% on low-volume products.
              Segment by: volume tier (high/medium/low), product age
              (established/new), volatility (stable/variable), business
              importance. Identify segments where forecast quality is
              unacceptable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Horizon-Specific Metrics
            </p>
            <p>
              Forecast accuracy degrades with horizon. Report metrics at each
              horizon: 1-day MAPE, 7-day MAPE, 30-day MAPE. Stakeholders
              consuming different horizons need appropriate expectations. If
              7-day forecasts are used for inventory and 30-day for planning,
              both horizon metrics matter.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Baseline Comparison:</strong> Always compare against
              baselines: naive (last observation), seasonal naive (same period
              last year), simple moving average. If your complex model only
              marginally beats naive, the complexity may not be justified.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Business Metrics
            </p>
            <p>
              Beyond statistical metrics, track business impact: inventory
              turns, stockout rate, markdown rate, service level achieved. These
              connect forecast accuracy to business outcomes. A 5% MAPE
              improvement that reduces stockouts by 20% is more compelling than
              abstract accuracy gains.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Production Metric Suite
                  </strong>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">WAPE</strong>
                    <div style="margin-top: 6px; font-size: 11px; line-height: 1.5">
                      <strong>For:</strong> Business owners
                      <br />
                      <strong>Why:</strong> Scale free, intuitive
                      <br />
                      <strong>Weighted:</strong> By volume
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">RMSE</strong>
                    <div style="margin-top: 6px; font-size: 11px; line-height: 1.5">
                      <strong>For:</strong> Engineers
                      <br />
                      <strong>Why:</strong> Large error risk
                      <br />
                      <strong>Per segment:</strong> Normalized
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Bias</strong>
                    <div style="margin-top: 6px; font-size: 11px; line-height: 1.5">
                      <strong>For:</strong> Supply chain
                      <br />
                      <strong>Why:</strong> Systematic skew
                      <br />
                      <strong>By cohort:</strong> A/B/C movers
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 12px">Model Promotion Gate</strong>
                  <div style="margin-top: 8px; font-size: 11px; line-height: 1.6">
                    ✓ WAPE on A movers: Δ &lt; -2 pp
                    <br />✓ Absolute bias: &lt; 2%
                    <br />✓ RMSE vs baseline: Δ &lt; +5%
                    <br />
                    <strong>All three must pass</strong>
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
                  Core suite: MAPE/sMAPE (percentage), RMSE (absolute), Bias
                  (direction), MASE (vs naive baseline)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segment metrics by volume tier, product age,
                  volatility—aggregate metrics hide segment problems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Connect to business metrics: stockout rate, inventory turns,
                  service level achieved
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
                  MASE &lt; 1 means model beats naive; MASE &gt; 1 means model
                  loses—scale-independent and works with zeros
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  5% aggregate MAPE may hide 3% on high-volume and 40% on
                  low-volume products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingEvaluationHowToBuildAProductionMetricSuiteForForecastEvaluation;
