import type { Component } from "solid-js";

const LessonFraudFeatureEngineeringFailureModesLabelLeakageSkewAndAdversarialEvasion: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Label Leakage, Skew, and Adversarial Evasion
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Label Leakage in Temporal Features
            </p>
            <p>
              Temporal features can accidentally encode future information. If
              you compute "transactions in next 24 hours" when labeling
              historical data, the model learns to detect fraud by seeing the
              future—which is unavailable at serving time. Always compute
              features using only data available at prediction time: past
              events, not future ones.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Label leakage inflates offline metrics
              dramatically. A model might achieve 99% AUC in testing but perform
              no better than random in production. Audit feature computation
              timestamps rigorously.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training-Serving Skew
            </p>
            <p>
              Features computed differently in training versus serving cause
              silent accuracy degradation. Common sources: different aggregation
              windows (training uses exact 24 hours, serving uses approximate),
              different time zone handling, different null value treatment. The
              model trains on one feature distribution but serves on another.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Point-in-Time Correctness
            </p>
            <p>
              When training on historical data, compute features as they would
              have been at that moment. Do not use the current 30-day average
              for a transaction from 6 months ago—use the 30-day average as of
              that date. Feature stores with temporal versioning enable
              point-in-time queries. Without this, models learn patterns that
              never existed in real-time.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Validation Pattern:</strong> Log serving-time feature
              values. Periodically compare logged values to batch-recomputed
              values for the same transactions. Divergence indicates skew.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Adversarial Evasion
            </p>
            <p>
              Fraudsters learn velocity thresholds and stay below them. If the
              model flags accounts with more than 10 transactions per hour,
              fraudsters limit to 9. Defense: use ratios relative to baseline
              rather than absolute thresholds, rotate feature definitions
              periodically, and combine multiple velocity signals so evading one
              does not evade all.
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
                  Label leakage inflates offline metrics—model achieves 99% AUC
                  in testing but random performance in production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point-in-time correctness: compute features as they would have
                  been at that moment, not using current values for historical
                  data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fraudsters learn thresholds—use ratios relative to baseline
                  rather than absolute thresholds, rotate feature definitions
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
                  Log serving-time feature values and compare to
                  batch-recomputed values periodically to detect skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common skew sources: different aggregation windows, time zone
                  handling, null value treatment between training and serving
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFraudFeatureEngineeringFailureModesLabelLeakageSkewAndAdversarialEvasion;
