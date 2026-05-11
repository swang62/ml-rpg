import type { Component } from "solid-js";

const LessonFeatureImportanceTrackingShapDriftFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            SHAP Drift Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SAMPLING BIAS
            </p>
            <p>
              If your sample is not representative, SHAP drift analysis will be
              misleading. A sample dominated by one user segment may show stable
              importance while another segment experiences significant drift.
            </p>
            <p>
              <strong>Detection:</strong> Compare sample composition to traffic
              composition. Ensure segments are proportionally represented.
            </p>
            <p>
              <strong>Mitigation:</strong> Use stratified sampling. Ensure
              minimum samples per key segment. Report SHAP drift per segment,
              not just aggregate.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              BASELINE DRIFT
            </p>
            <p>
              SHAP drift is relative to baseline. If the baseline itself was
              computed during an anomalous period (holiday spike, bug), drift
              detection will be systematically wrong.
            </p>
            <p>
              <strong>Detection:</strong> Track baseline creation date and
              conditions. Periodically validate baseline still represents
              "normal" behavior.
            </p>
            <p>
              <strong>Mitigation:</strong> Use multiple baselines: original
              training baseline plus recent rolling baseline. Alert when drift
              is detected relative to both—this filters out baseline issues.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FALSE POSITIVES FROM NATURAL VARIATION
            </p>
            <p>
              SHAP values vary naturally across samples. Small samples have high
              variance. Apparent drift may be random noise, not real change.
            </p>
            <p>
              <strong>Detection:</strong> Track confidence intervals. Use
              statistical tests (t-test on SHAP distributions) rather than just
              comparing means.
            </p>
            <p>
              <strong>Mitigation:</strong> Increase sample size for reliable
              detection. Set alert thresholds based on historical variance, not
              fixed values. Require drift to persist across multiple time
              windows before alerting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CORRELATED FEATURE ISSUES
            </p>
            <p>
              SHAP distributes importance across correlated features. If two
              features are highly correlated, importance may shift between them
              without meaningful change in model behavior.
            </p>
            <p>
              <strong>Mitigation:</strong> Group correlated features and track
              aggregate importance. Focus on groups rather than individual
              features for drift detection.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> More sophisticated analysis
              reduces false positives but increases complexity. Start simple,
              add sophistication when false positive rate becomes a problem.
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
                  Sampling bias: unrepresentative samples miss segment-specific
                  drift; use stratified sampling with minimum per segment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Baseline drift: anomalous baseline periods cause systematic
                  errors; use multiple baselines (training + rolling)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Natural variation: small samples have high variance; use
                  statistical tests, require persistence across multiple windows
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
                  Interview Tip: Explain sampling bias—segment-specific drift
                  masked by unrepresentative samples.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe handling correlated features: group
                  them and track aggregate importance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureImportanceTrackingShapDriftFailureModesAndMitigationStrategies;
