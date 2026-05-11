import type { Component } from "solid-js";

const LessonUnsupervisedAnomalyDetectionFailureModesAndEdgeCasesInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Data Contamination
            </p>
            <p>
              The most critical failure mode: anomalies present in training
              data. Unsupervised methods assume training data represents
              "normal," so contaminated data teaches models that fraud patterns
              are legitimate. Even 1-2% contamination significantly degrades
              detection. Mitigation: use robust preprocessing to remove
              statistical outliers before training, or employ semi-supervised
              approaches with some labeled normal examples.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Data contamination is insidious because
              models still appear to work—they just have reduced sensitivity to
              the exact fraud patterns present in training data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Distribution Shift
            </p>
            <p>
              Normal behavior patterns evolve: seasonal variations, new product
              launches, user behavior changes. Models trained on historical data
              may flag legitimate new patterns as anomalies (false positives) or
              miss evolved fraud tactics (false negatives). Implement continuous
              monitoring of anomaly score distributions and retrain when drift
              exceeds thresholds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Adversarial Evasion
            </p>
            <p>
              Sophisticated fraudsters craft transactions that mimic normal
              patterns to evade detection. Unsupervised methods are vulnerable
              because they define "normal" based on statistical properties that
              adversaries can learn to replicate. Defense: combine unsupervised
              detection with supervised models trained on known fraud patterns,
              and use ensemble diversity to make evasion harder.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Defense Strategy:</strong> Rotate model architectures and
              features periodically. Adversaries who learn current model
              boundaries face new detection surfaces after rotation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Edge Cases
            </p>
            <p>
              High-value legitimate transactions may appear anomalous due to
              rarity. Implement tiered thresholds: tighter thresholds for
              low-risk actions, looser for high-friction intervention.
              Cold-start users lack behavioral history, causing elevated false
              positives—use population-level baselines until sufficient
              individual data accumulates.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px">
                  Concept Drift Impact
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Week 1: Normal</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Training data
                    </div>
                    <div style="font-size: 12px">FP rate: 0.5%</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">
                      Week 2: Product Launch
                    </strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Distribution shift
                    </div>
                    <div style="font-size: 12px">FP rate: 2.5%</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">
                      Week 3: Black Friday
                    </strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Major drift
                    </div>
                    <div style="font-size: 12px">FP rate: 12%</div>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px">
                  <strong>Mitigation:</strong> Daily retraining on sliding
                  window, add time of day and day of week features, per segment
                  calibration
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
                  Training data contamination is critical—even 1-2% anomalies in
                  training dramatically reduces detection sensitivity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distribution shift causes models to flag new legitimate
                  patterns as anomalies or miss evolved fraud tactics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversaries can learn to mimic normal patterns—use ensemble
                  diversity and periodic model rotation for defense
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
                  Implement tiered thresholds: tighter for low-risk actions,
                  looser where high-friction intervention is acceptable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use population-level baselines for cold-start users until
                  sufficient individual behavioral data accumulates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonUnsupervisedAnomalyDetectionFailureModesAndEdgeCasesInProduction;
