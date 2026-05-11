import type { Component } from "solid-js";

const LessonImbalancedDataHandlingFailureModesAndEdgeCasesInImbalancedDataHandling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Imbalanced Data Handling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SMOTE Boundary Violations
            </p>
            <p>
              SMOTE interpolates blindly in feature space. If minority samples
              lie near the decision boundary, synthetic samples may actually
              belong to the majority class. The model learns incorrect class
              assignments, hurting rather than helping performance.
              Borderline-SMOTE addresses this by only interpolating between
              minority samples both of whose neighbors are also minority.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Always validate SMOTE on a holdout set
              with natural distribution. If validation metrics drop after
              applying SMOTE, the synthetic samples are likely introducing
              noise.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Extreme Class Weights
            </p>
            <p>
              With 1:10000 imbalance, naive class weighting assigns 10000x
              weight to minority errors. This causes gradient explosion—single
              minority examples dominate entire batches. Gradients become
              unstable, loss oscillates, model fails to converge. Cap weights at
              100-1000x maximum, or use focal loss which naturally limits
              extreme gradients.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Label Noise Amplification
            </p>
            <p>
              Minority class labels are often noisier—fraud cases may be
              mislabeled due to incomplete investigation. Class weighting
              amplifies this noise. A mislabeled minority example with 1000x
              weight causes 1000x more damage than a mislabeled majority
              example. Clean minority class labels carefully before applying
              weighting techniques.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Detection Tip:</strong> Monitor loss curves for individual
              classes. If minority class loss spikes or oscillates while
              majority class loss is stable, weights may be too extreme or
              labels may be noisy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation on Wrong Distribution
            </p>
            <p>
              Evaluating on rebalanced test sets gives misleading metrics. A
              model with 90% recall on a 1:1 test set might have 50% recall on
              the natural 1:1000 distribution. Always evaluate on the
              distribution the model will see in production. Rebalancing is only
              for training, never for evaluation.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 4px">
                  Common Failure Modes
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Temporal Leakage</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Synthetic point from Jan 15 appears in Jan 10 training
                    window
                    <br />
                    Model sees future, overfits user patterns
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Prior Shift</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Train on 5% prevalence, deploy on 0.2%
                    <br />
                    Thresholds fire at wrong rate, queue overload
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Focal Loss Miscalibration
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Predicted p=0.95 → True p=0.7
                    <br />
                    Over-escalation or missed risky cases
                    <br />
                    <strong>Fix: ECE &lt; 0.05 via calibration</strong>
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
                  SMOTE may create synthetic samples in majority class regions
                  if minority samples are near decision boundary
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cap class weights at 100-1000x maximum to prevent gradient
                  explosion from extreme imbalance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Class weighting amplifies label noise—clean minority class
                  labels carefully before applying weighting
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
                  Monitor per-class loss curves: minority loss spikes or
                  oscillation indicates weights too extreme or noisy labels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always evaluate on natural distribution—rebalanced test sets
                  give misleading metrics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImbalancedDataHandlingFailureModesAndEdgeCasesInImbalancedDataHandling;
