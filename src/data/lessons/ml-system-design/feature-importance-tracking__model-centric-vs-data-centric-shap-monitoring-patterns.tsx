import type { Component } from "solid-js";

const LessonFeatureImportanceTrackingModelCentricVsDataCentricShapMonitoringPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Centric vs Data Centric SHAP Monitoring Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL-CENTRIC MONITORING
            </p>
            <p>
              Model-centric SHAP monitoring computes SHAP values for production
              predictions and tracks how the model uses features over time. The
              model is fixed; you observe how changing inputs affect feature
              contributions.
            </p>
            <p>
              <strong>Implementation:</strong> Sample N predictions per time
              window (hourly, daily). Compute SHAP values for each sample.
              Aggregate mean absolute SHAP per feature. Compare against baseline
              to detect drift.
            </p>
            <p>
              <strong>Advantages:</strong> Direct insight into model behavior.
              Catches subtle changes in how features interact with the model.
            </p>
            <p>
              <strong>Disadvantages:</strong> Expensive computation. SHAP for
              1000 samples might take minutes. Does not distinguish whether
              drift is due to data change or something else.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA-CENTRIC MONITORING
            </p>
            <p>
              Data-centric approach monitors feature distributions and infers
              importance changes from data shifts. If feature A distribution
              shifts significantly and feature A has high baseline importance,
              overall SHAP distribution likely shifted.
            </p>
            <p>
              <strong>Implementation:</strong> Track feature distribution drift
              (PSI, K-S). Weight by baseline feature importance. High-importance
              features with high drift indicate likely SHAP drift.
            </p>
            <p>
              <strong>Advantages:</strong> Much cheaper than computing SHAP.
              Scales to high-volume systems. Good for initial screening.
            </p>
            <p>
              <strong>Disadvantages:</strong> Indirect signal. Does not capture
              feature interactions. May miss cases where distribution is stable
              but model uses feature differently due to interaction effects.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HYBRID APPROACH
            </p>
            <p>
              Use data-centric monitoring as a cheap filter. When it detects
              potential drift, trigger more expensive model-centric SHAP
              computation to confirm.
            </p>
            <p>
              Alert flow: data drift detected on high-importance feature →
              compute SHAP on recent sample → compare to baseline SHAP → alert
              if confirmed.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> Model-centric for high-stakes models
              where you need precise importance tracking. Data-centric for
              cost-sensitive environments. Hybrid balances accuracy and cost.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Model Centric</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    Production Model
                    <br />
                    (Deep NN, 500ms SHAP)
                  </div>
                  <div style="text-align: center; font-size: 18px; font-weight: bold">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    SHAP on prod model
                    <br />
                    Shows reliance shift
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Data Centric</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    Domain Classifier
                    <br />
                    (GBT, 20s SHAP)
                  </div>
                  <div style="text-align: center; font-size: 18px; font-weight: bold">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    SHAP on classifier
                    <br />
                    Shows data shift drivers
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
                  Model-centric: compute SHAP on production samples, direct
                  insight into model behavior, expensive computation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data-centric: monitor feature distributions weighted by
                  importance, cheap approximation, misses interaction effects
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid: data-centric as cheap filter, trigger model-centric
                  SHAP when drift detected to confirm
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
                  Interview Tip: Compare model-centric vs data-centric
                  tradeoffs: precision vs cost.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe hybrid alert flow: data drift detected
                  → SHAP computation → confirmation → alert.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureImportanceTrackingModelCentricVsDataCentricShapMonitoringPatterns;
