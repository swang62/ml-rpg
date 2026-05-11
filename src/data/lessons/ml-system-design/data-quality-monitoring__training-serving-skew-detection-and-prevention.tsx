import type { Component } from "solid-js";

const LessonDataQualityMonitoringTrainingServingSkewDetectionAndPrevention: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew Detection and Prevention
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT IS TRAINING-SERVING SKEW
            </p>
            <p>
              Training-serving skew occurs when features computed during
              training differ from features computed during serving. The model
              learned on one feature definition but receives a different one in
              production. This causes silent prediction degradation.
            </p>
            <p>
              <strong>Example:</strong> During training,{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                user_activity_last_7d
              </code>{" "}
              was computed using all events. In serving, it is computed using
              only pageview events (due to a bug). The feature values differ,
              predictions degrade, but no error is thrown.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMMON CAUSES
            </p>
            <p>
              <strong>Code duplication:</strong> Training and serving have
              separate feature computation code. They drift apart over time as
              one is updated without the other.
            </p>
            <p>
              <strong>Data freshness differences:</strong> Training uses
              batch-computed features (point-in-time snapshots). Serving uses
              real-time computed features (current values). The timing
              difference changes feature values.
            </p>
            <p>
              <strong>Missing value handling:</strong> Training imputes missing
              values one way. Serving imputes differently. Different imputation
              = different features.
            </p>
            <p>
              <strong>Feature transformation bugs:</strong> Normalization
              parameters differ. Training normalizes with mean=10, std=5.
              Serving uses mean=12, std=6. Predictions shift.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DETECTION STRATEGIES
            </p>
            <p>
              <strong>Shadow scoring:</strong> Run serving features through
              training pipeline. Compare results. Differences indicate skew.
            </p>
            <p>
              <strong>Feature distribution monitoring:</strong> Compare serving
              feature distributions to training distributions. Significant
              divergence may indicate skew (or drift—investigate to
              distinguish).
            </p>
            <p>
              <strong>Logging for offline comparison:</strong> Log serving
              features and predictions. Replay through training pipeline.
              Compare.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PREVENTION
            </p>
            <p>
              Use a feature store that computes features once and serves to both
              training and inference. Shared feature definitions eliminate code
              divergence. This is the most effective prevention strategy.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Training-serving skew is
              insidious because it causes silent degradation. No errors, just
              gradually worse predictions. Active detection is essential.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Batch Training Path</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Raw Data → Spark Job
                      <br />
                      Python transformation
                      <br />
                      Float64 precision
                      <br />
                      UTC timestamps
                      <br />7 day window: D-7 to D
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Online Serving Path</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Live Request → Java service
                      <br />
                      Java transformation
                      <br />
                      Float32 precision
                      <br />
                      Local time then convert
                      <br />7 day window: now() minus 7d
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Compare on 1 to 5% sample
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Agreement Rate</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    ✓ Numeric: 99.5% within 0.1% tolerance
                    <br />✓ Categorical: 99% exact match
                    <br />🚨 Alert if critical feature &lt; 99%
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
                  Training-serving skew: features differ between training and
                  serving; causes silent prediction degradation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common causes: code duplication, data freshness differences,
                  missing value handling, normalization parameter drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prevention: feature store with shared definitions; detection:
                  shadow scoring, distribution monitoring, offline replay
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
                  Interview Tip: Give a concrete skew example: activity feature
                  computed from all events vs pageviews only.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain why feature stores prevent skew—shared
                  definitions eliminate code divergence.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityMonitoringTrainingServingSkewDetectionAndPrevention;
