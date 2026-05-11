import type { Component } from "solid-js";

const LessonImbalancedDataHandlingEndToEndProductionArchitectureForImbalancedDataSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            End-to-End Production Architecture for Imbalanced Data Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Pipeline Design
            </p>
            <p>
              1. Split data chronologically (not randomly) to prevent leakage.
              2. Analyze class distribution—if imbalance is moderate (1:10 to
              1:100), class weighting may suffice. 3. For severe imbalance
              (1:1000+), combine techniques: undersample majority to 1:10, then
              apply class weighting or focal loss. 4. Validate on holdout with
              natural distribution.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Pipeline Order:</strong> Data cleaning → Chronological
              split → Training set rebalancing → Model training with loss
              weighting → Validation on natural distribution → Threshold tuning
              on validation set.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Threshold Tuning
            </p>
            <p>
              Model outputs probabilities; the decision threshold determines
              precision-recall trade-off. Default 0.5 threshold is rarely
              optimal for imbalanced data. Plot precision-recall curve, identify
              threshold that matches business requirements (e.g., 95% precision
              minimum), apply that threshold in production. Retune thresholds
              when class distribution shifts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Monitoring for Distribution Shift
            </p>
            <p>
              Class distribution changes over time—fraud rate increases during
              holiday seasons, decreases after fraud ring takedowns. Monitor:
              prediction distribution, confirmed fraud rate, model confidence
              distribution. Alert when these diverge significantly from training
              distribution. Retrain with updated class weights when necessary.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Production Insight:</strong> Log model scores for all
              predictions. When fraud is confirmed, you have labeled examples
              for continuous learning. This feedback loop is more valuable than
              any rebalancing technique.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Calibration Considerations
            </p>
            <p>
              Rebalancing techniques distort predicted probabilities. A model
              trained on 1:1 balanced data outputs 50% probability when the true
              population rate is 0.1%. Recalibrate probabilities using Platt
              scaling or isotonic regression on a validation set with natural
              distribution if accurate probability estimates are needed.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 6px">
                  Production Fraud Detection Pipeline
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Events Store</strong>
                  <br />
                  Features, labels, timestamps
                  <br />
                  7-30 day delayed chargebacks
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Training Pipeline</strong>
                  <br />
                  Downsample 1:20, class weight 500:1
                  <br />
                  Train 4-8 hours on 100M txns
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Multi-Stage Serving</strong>
                  <br />
                  Stage 1: &lt;5ms p99, 95% recall, flag 1-5%
                  <br />
                  Stage 2: &lt;50ms p99, strict threshold
                  <br />
                  Human review: 30K/day capacity
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Monitoring &amp; Feedback</strong>
                  <br />
                  Base rate drift, score distribution PSI
                  <br />
                  PR AUC on rolling 7-day windows
                  <br />
                  Alert if precision &lt; 20% for 60 min
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
                  Pipeline: clean → chronological split → training rebalancing →
                  loss weighting → validate on natural distribution → tune
                  threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tune decision threshold on PR curve to match business
                  requirements—default 0.5 is rarely optimal for imbalanced data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recalibrate probabilities after rebalancing if accurate
                  estimates needed—Platt scaling or isotonic regression
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
                  For severe imbalance (1:1000+), combine: undersample majority
                  to 1:10, then apply focal loss or class weighting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log all predictions; confirmed fraud creates feedback loop for
                  continuous learning—more valuable than any rebalancing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImbalancedDataHandlingEndToEndProductionArchitectureForImbalancedDataSystems;
