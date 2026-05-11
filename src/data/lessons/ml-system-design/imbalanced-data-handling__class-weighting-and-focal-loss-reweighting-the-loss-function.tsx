import type { Component } from "solid-js";

const LessonImbalancedDataHandlingClassWeightingAndFocalLossReweightingTheLossFunction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Class Weighting and Focal Loss: Reweighting the Loss Function
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Class Weighting
            </p>
            <p>
              Instead of modifying data, modify how errors are counted. Assign
              higher weight to minority class errors during loss computation. If
              fraud is 0.1% of data, weight fraud errors 1000x more than
              non-fraud errors. The model receives equal gradient signal from
              both classes despite the imbalance. Weight = total_samples /
              (num_classes × class_count).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Advantage:</strong> Class weighting requires no data
              modification. Apply it as a hyperparameter during training. Works
              with any loss function by multiplying the loss by class weight
              before backpropagation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Focal Loss
            </p>
            <p>
              Focal Loss down-weights easy examples and focuses training on hard
              examples. Standard cross-entropy treats all errors equally. Focal
              Loss adds a modulating factor: FL = -(1-p)^γ × log(p), where γ
              (gamma) controls focus strength. When the model is confident (p
              close to 1), the (1-p)^γ term approaches zero, contributing little
              to loss. Hard examples (p close to 0.5) contribute more.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Focal Loss Helps Imbalance
            </p>
            <p>
              In imbalanced data, most majority class examples are easy—the
              model quickly learns to predict them correctly. These easy
              negatives dominate the loss, drowning out the harder minority
              examples. Focal Loss automatically reduces their contribution,
              effectively upweighting the minority class without explicit class
              weights.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Tuning Tip:</strong> Start with γ=2 for focal loss (the
              original paper default). Higher γ focuses more aggressively on
              hard examples but may cause instability. Combine with α (class
              weight) parameter for severely imbalanced data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Each
            </p>
            <p>
              Class weighting: simple, works with any model, good first
              approach. Focal loss: better when easy majority examples dominate,
              especially in neural networks. Both can be combined—focal loss for
              hard example focus plus class weights for explicit imbalance
              correction.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 4px">
                  Class Weighting vs Focal Loss
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Class Weighting</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Fraud (0.2%): weight = 500
                    <br />
                    Legitimate (99.8%): weight = 1<br />
                    Total loss contribution balanced
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Focal Loss (gamma=2)</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Easy example (p=0.9): loss × 0.01
                    <br />
                    Hard example (p=0.6): loss × 0.16
                    <br />
                    Very hard (p=0.3): loss × 0.49
                    <br />
                    <strong>Focuses gradient on hard cases</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 12px">
                  <strong>Trade-off:</strong> Focal loss improves recall but
                  yields poorly calibrated probabilities. Plan for post-hoc
                  calibration if you need accurate risk estimates.
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
                  Class weighting multiplies minority class loss by inverse
                  frequency—equal gradient signal despite data imbalance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Focal Loss down-weights easy examples via (1-p)^γ factor,
                  automatically focusing training on hard cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start with γ=2 for focal loss; combine with class weights (α
                  parameter) for severely imbalanced data
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
                  Class weight formula: weight = total_samples / (num_classes ×
                  class_count) for balanced gradient contribution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Focal Loss formula: FL = -(1-p)^γ × log(p), where γ controls
                  focus strength on hard examples
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImbalancedDataHandlingClassWeightingAndFocalLossReweightingTheLossFunction;
