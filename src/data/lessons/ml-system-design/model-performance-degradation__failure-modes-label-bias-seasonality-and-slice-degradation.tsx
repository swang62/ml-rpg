import type { Component } from "solid-js";

const LessonModelPerformanceDegradationFailureModesLabelBiasSeasonalityAndSliceDegradation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Label Bias, Seasonality, and Slice Degradation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LABEL BIAS
            </p>
            <p>
              Labels themselves can be biased, leading to misleading performance
              metrics. If human labelers are biased, or if the labeling process
              is inconsistent, measured accuracy does not reflect true accuracy.
            </p>
            <p>
              <strong>Example:</strong> Fraud labels come from investigations.
              Investigators prioritize high-value transactions. Low-value fraud
              is under-investigated and under-labeled. Model accuracy on
              low-value transactions appears high but may be low in reality.
            </p>
            <p>
              <strong>Detection:</strong> Track labeling patterns across
              segments. Are some segments labeled more completely? Compare label
              rates to expected rates from domain knowledge.
            </p>
            <p>
              <strong>Mitigation:</strong> Use stratified evaluation. Sample
              transactions for manual review regardless of model prediction.
              This provides unbiased ground truth.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SEASONALITY EFFECTS
            </p>
            <p>
              Performance naturally varies by season. Holiday shopping patterns
              differ from normal patterns. A model performing well in January
              may struggle in December due to seasonal shift, not degradation.
            </p>
            <p>
              <strong>Detection:</strong> Compare current metrics to
              same-period-last-year, not just recent average. Use seasonal
              decomposition to separate trend from seasonality.
            </p>
            <p>
              <strong>Response:</strong> Do not alert on expected seasonal
              variation. Set seasonally-adjusted thresholds. Retrain with recent
              seasonal data before high-stakes periods.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SLICE DEGRADATION
            </p>
            <p>
              Aggregate metrics may be stable while specific segments degrade
              significantly. A model maintaining 90% overall accuracy might drop
              to 60% accuracy for a specific user segment representing 5% of
              traffic.
            </p>
            <p>
              <strong>Detection:</strong> Track metrics per segment. Define
              critical segments (high-value users, key product categories,
              important geographies). Set per-segment thresholds.
            </p>
            <p>
              <strong>Response:</strong> Investigate segment-specific issues.
              May need segment-specific models or additional training data for
              underperforming segments.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> More granular monitoring
              (per-segment) catches more issues but requires more compute and
              creates more alerts. Focus on segments with highest business
              impact.
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
                  Label bias: biased labeling process misleads metrics; use
                  stratified sampling for unbiased evaluation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Seasonality: performance varies by season; compare to
                  same-period-last-year, use seasonally-adjusted thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slice degradation: aggregate metrics hide segment-specific
                  problems; track metrics per critical segment
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
                  Interview Tip: Give a label bias example: fraud investigators
                  prioritize high-value transactions, under-labeling low-value
                  fraud.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain slice degradation: 90% overall accuracy
                  but 60% for a 5% segment—aggregate hides the problem.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPerformanceDegradationFailureModesLabelBiasSeasonalityAndSliceDegradation;
