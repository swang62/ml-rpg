import type { Component } from "solid-js";

const LessonSupervisedAnomalyDetectionTrainingStrategiesForExtremeClassImbalanceResamplingVsWeighting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Strategies for Extreme Class Imbalance: Resampling vs
            Weighting
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Training Problem
            </p>
            <p style="margin-top: 0">
              Standard training minimizes overall error. With 1000:1 class
              ratio, the model sees 1000 normal examples for every fraud
              example. Gradient updates from the majority class dominate. The
              model learns to predict "normal" because that minimizes loss on
              99.9% of training data.
            </p>
            <p>
              Two main strategies fix this: change the data distribution
              (resampling) or change how errors are weighted (class weighting).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Resampling Strategies
            </p>
            <p style="margin-top: 0">
              <strong>Undersampling:</strong> Remove majority examples until
              balanced. 1M normal + 1K fraud becomes 1K + 1K. Fast training but
              discards 99.9% of normal data, losing patterns.
            </p>
            <p>
              <strong>Oversampling:</strong> Duplicate minority examples. 1M +
              1K becomes 1M + 1M. Risk: model memorizes duplicates instead of
              learning patterns.
            </p>
            <p>
              <strong>SMOTE:</strong> Creates synthetic minority examples by
              interpolating between existing ones. For each fraud, find 5
              nearest fraud neighbors, create a new example between them.
              Reduces memorization but can create unrealistic examples.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Class Weighting
            </p>
            <p style="margin-top: 0">
              Instead of changing data, change the loss function. Multiply
              minority class loss by the imbalance ratio. If fraud is 0.1% of
              data, multiply fraud losses by 1000. One misclassified fraud hurts
              as much as 1000 misclassified normal.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Weight Formula:</strong>{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                weight = total / (num_classes × class_count)
              </code>
              . For 1M total with 1K fraud: fraud weight = 1M / (2 × 1K) = 500.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Each
            </p>
            <p style="margin-top: 0">
              <strong>Class weighting:</strong> Simpler, preserves all data. Use
              as default for most problems.
            </p>
            <p>
              <strong>Undersampling:</strong> When data is huge and speed
              matters. Accept information loss.
            </p>
            <p>
              <strong>SMOTE:</strong> When minority class is under 100 examples
              and you need diversity. Validate that synthetic examples are
              realistic.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 4px">
                  Training Data Strategies
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Original Dataset</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Normal: 1,000,000 | Fraud: 100 (0.01%)
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <strong style="font-size: 13px">Undersampling</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Normal: 10,000 (100x down)
                    </div>
                    <div style="font-size: 12px">Fraud: 100 (keep all)</div>
                    <div style="font-size: 12px; margin-top: 4px; font-weight: 700">
                      Result: 1% fraud rate
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <strong style="font-size: 13px">Class Weighting</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Normal: 1,000,000 (weight 1x)
                    </div>
                    <div style="font-size: 12px">Fraud: 100 (weight 100x)</div>
                    <div style="font-size: 12px; margin-top: 4px; font-weight: 700">
                      Keep all data
                    </div>
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
                  Standard training ignores minority class because majority
                  dominates gradient updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Undersampling is fast but discards 99% of data; oversampling
                  risks memorization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SMOTE creates synthetic examples by interpolating between
                  minority class neighbors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Class weighting multiplies minority loss by imbalance ratio:
                  weight = total / (2 × class_count)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use class weighting as default; SMOTE when minority class is
                  under 100 examples
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
                  Explain class weighting formula: weight = total / (num_classes
                  × class_count)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe SMOTE: interpolate between k nearest neighbors to
                  create synthetic examples
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compare strategies: weighting preserves all data,
                  undersampling is fast, SMOTE adds diversity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSupervisedAnomalyDetectionTrainingStrategiesForExtremeClassImbalanceResamplingVsWeighting;
