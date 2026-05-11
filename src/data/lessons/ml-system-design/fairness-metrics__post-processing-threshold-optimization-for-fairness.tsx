import type { Component } from "solid-js";

const LessonFairnessMetricsPostProcessingThresholdOptimizationForFairness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Post Processing Threshold Optimization for Fairness
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Post-processing threshold optimization</strong> adjusts
                decision thresholds per group to achieve fairness without
                retraining. Instead of 0.5 cutoff for everyone, use 0.45 for
                Group A and 0.55 for Group B.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How It Works
            </p>
            <p style="margin-top: 0">
              Train your model normally, outputting probability scores. For each
              group, find the threshold achieving your fairness constraint. For
              demographic parity: thresholds such that positive rate is equal.
              For equalized odds: thresholds such that TPR and FPR are equal.
              This is an optimization problem: search threshold pairs to
              minimize fairness violation while maximizing accuracy. Grid search
              works for two groups; constrained optimization for more.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Post-Processing
            </p>
            <p style="margin-top: 0">
              <strong>Cannot retrain:</strong> Model training is expensive or
              you lack pipeline access. <strong>Regulatory compliance:</strong>{" "}
              Need quick fairness demonstration without long retraining.{" "}
              <strong>Interpretability:</strong> Threshold adjustments are easy
              to explain. However, post-processing is a patch. The underlying
              model still learned biased patterns. If features change,
              thresholds need recalibration.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Accuracy Cost
            </p>
            <p style="margin-top: 0">
              Adjusting thresholds trades accuracy for fairness. If Group A
              threshold drops from 0.5 to 0.4, more lower-score members get
              approved, some as false positives. Typical accuracy loss: 2-5% for
              demographic parity, 3-8% for equalized odds. Cost depends on base
              rate differences: similar rates need minimal adjustment, large
              differences (60% vs 30%) cause larger hits.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Post-processing is fast and
              interpretable but treats symptoms. For long-term fairness, combine
              with in-processing (training constraints) or pre-processing
              (debiasing data).
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Pre Processing</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Reweight samples by group
                    <br />+ Model agnostic
                    <br />− Amplifies minority noise
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">In Processing</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Add fairness loss term
                    <br />+ Best accuracy recovery
                    <br />− Requires training changes
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Post Processing (Hardt)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Per group thresholds
                    <br />+ Fast, low risk, 5min runtime
                    <br />− Breaks calibration and ranking
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
                  Adjusts decision thresholds per group without retraining: 0.45
                  for Group A, 0.55 for Group B
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use when cannot retrain, need quick compliance, or need
                  interpretable adjustments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimization: search threshold pairs to minimize fairness
                  violation, maximize accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical accuracy cost: 2-5% for demographic parity, 3-8% for
                  equalized odds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Treats symptoms not causes: underlying model still has biased
                  patterns
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
                  Explain interpretability: threshold adjustments are easy to
                  explain to stakeholders
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accuracy cost depends on base rate differences: similar rates
                  need minimal adjustment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFairnessMetricsPostProcessingThresholdOptimizationForFairness;
