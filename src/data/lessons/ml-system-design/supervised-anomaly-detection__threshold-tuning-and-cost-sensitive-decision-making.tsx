import type { Component } from "solid-js";

const LessonSupervisedAnomalyDetectionThresholdTuningAndCostSensitiveDecisionMaking: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Threshold Tuning and Cost Sensitive Decision Making
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              From Scores to Decisions
            </p>
            <p style="margin-top: 0">
              Fraud models output probability scores between 0 and 1. Business
              value comes from converting scores into actions through
              thresholds. The key insight: different errors have vastly
              different costs.
            </p>
            <p>
              Missing a ,000 fraud costs ,000 plus a chargeback fee. Blocking a
              legitimate transaction costs customer frustration and potential
              churn. Sending a transaction to human review costs -5 in analyst
              time. Optimal thresholds balance these costs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Threshold Approach
            </p>
            <p style="margin-top: 0">
              Rather than a single approve/decline threshold, production systems
              use multiple thresholds creating decision bands. Below 0.05:
              auto-approve. 0.05 to 0.30: approve but flag for post-transaction
              review. 0.30 to 0.70: route to human analyst for real-time
              decision. Above 0.70: auto-decline.
            </p>
            <p>
              Each band has different cost structures. Auto-decisions cost
              nothing in labor. Human review costs -5 per transaction but
              catches errors before they become chargebacks. The middle band
              width depends on analyst capacity and transaction volume.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Thresholds
            </p>
            <p style="margin-top: 0">
              Optimal thresholds vary by context. High-value transactions
              warrant more caution: lower the auto-approve threshold. New
              accounts without history need stricter thresholds. Peak traffic
              periods might raise auto-approve threshold to maintain analyst
              queue depth.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Threshold Math:</strong> If fraud loss = , false
              positive cost = (lost sale), then optimal threshold =
              false_positive_cost / (fraud_loss + false_positive_cost) = 50/5050
              ≈ 0.01. Block when P(fraud) &gt; 1%.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Calibration Matters
            </p>
            <p style="margin-top: 0">
              Threshold math assumes calibrated probabilities. If the model says
              10% fraud probability, 10% of those transactions should actually
              be fraud. Uncalibrated models break threshold logic. Validate
              calibration with reliability diagrams plotting predicted vs actual
              fraud rates in score buckets.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 6px">
                  Cost Sensitive Thresholds
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Score &lt; 0.02 → Auto Approve
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    97% of traffic, 0.05% fraud rate
                  </div>
                  <div style="font-size: 12px">
                    Cost: Fraud loss only ($10 per 10K txn)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    0.02 to 0.15 → Human Review
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    2% of traffic, 5% fraud rate
                  </div>
                  <div style="font-size: 12px">
                    Cost: $3 per review × 200 = $600
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Score &gt; 0.15 → Auto Block
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1% of traffic, 60% fraud rate
                  </div>
                  <div style="font-size: 12px">
                    Cost: False positive friction (40 good users)
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
                  Different errors have different costs: missing K fraud ≠
                  blocking legitimate transaction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use multiple thresholds: auto-approve, flag for review, human
                  decision, auto-decline bands
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic thresholds vary by context: stricter for new accounts,
                  high-value transactions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimal threshold = false_positive_cost / (fraud_loss +
                  false_positive_cost)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Threshold math requires calibrated probabilities; validate
                  with reliability diagrams
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
                  Show multi-threshold bands: &lt;0.05 auto-approve, 0.05-0.30
                  flag, 0.30-0.70 human, &gt;0.70 decline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calculate optimal threshold: FP cost, fraud loss → threshold =
                  50/5050 ≈ 1%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention calibration: if model says 10% fraud, 10% of those
                  should actually be fraud
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSupervisedAnomalyDetectionThresholdTuningAndCostSensitiveDecisionMaking;
