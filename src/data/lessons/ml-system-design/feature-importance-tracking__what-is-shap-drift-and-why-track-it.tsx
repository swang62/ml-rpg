import type { Component } from "solid-js";

const LessonFeatureImportanceTrackingWhatIsShapDriftAndWhyTrackIt: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is SHAP Drift and Why Track It?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>SHAP drift</strong> is a change in how much each feature
                contributes to model predictions over time, even if the model
                itself has not changed.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY TRACK FEATURE IMPORTANCE
            </p>
            <p>
              SHAP (SHapley Additive exPlanations) values quantify each feature
              contribution to each prediction. Tracking SHAP values over time
              reveals how the model is using features differently as data
              changes.
            </p>
            <p>
              A static model can produce shifting SHAP values when input
              distributions change. If feature A historically contributed 30% of
              predictions but now contributes 15%, something changed. This might
              indicate data drift, feature degradation, or concept drift.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT SHAP DRIFT REVEALS
            </p>
            <p>
              <strong>Feature degradation:</strong> If a feature importance
              drops significantly, the feature may be corrupted or less
              predictive. A user activity feature dropping from #1 to #5
              importance warrants investigation.
            </p>
            <p>
              <strong>Model reliance shifts:</strong> If the model starts
              relying heavily on a feature it previously ignored, the world may
              have changed. This could indicate concept drift or a shift in what
              drives outcomes.
            </p>
            <p>
              <strong>Fairness monitoring:</strong> If sensitive features (age,
              gender, location) increase in importance, the model may be
              developing bias. SHAP monitoring enables early bias detection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SHAP VS OTHER IMPORTANCE METRICS
            </p>
            <p>
              SHAP has theoretical guarantees (consistency, local accuracy) that
              permutation importance lacks. SHAP values are additive: sum of
              SHAP values equals prediction minus baseline. This makes them
              interpretable and comparable.
            </p>
            <p>
              Downside: SHAP is computationally expensive. Exact SHAP for tree
              models is fast; for deep learning, approximations (Kernel SHAP)
              are needed and can be slow.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> SHAP drift monitoring answers a
              question data drift cannot: is the model using features
              differently, not just are features different?
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Week 1 Baseline</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      Feature A: 0.15
                      <br />
                      Feature B: 0.22
                      <br />
                      Feature C: 0.08
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Week 2 Current</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      Feature A: 0.31{" "}
                      <span style="font-weight: bold">↑107%</span>
                      <br />
                      Feature B: 0.18
                      <br />
                      Feature C: 0.09
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">SHAP Drift Alert</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    Feature A mean absolute SHAP increased 107%
                    <br />
                    Exceeds 30% threshold → Investigate data shift
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
                  SHAP values quantify feature contributions to predictions;
                  tracking over time reveals how model usage shifts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SHAP drift reveals: feature degradation, model reliance
                  shifts, potential fairness issues from sensitive feature
                  importance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SHAP has theoretical guarantees (consistency, additivity) but
                  is computationally expensive for non-tree models
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
                  Interview Tip: Explain what SHAP drift reveals that data drift
                  does not—model behavior, not just data distribution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Give an example: user activity feature dropping
                  from #1 to #5 importance signals investigation needed.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureImportanceTrackingWhatIsShapDriftAndWhyTrackIt;
