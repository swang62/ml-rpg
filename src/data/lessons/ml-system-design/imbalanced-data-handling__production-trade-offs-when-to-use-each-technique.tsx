import type { Component } from "solid-js";

const LessonImbalancedDataHandlingProductionTradeOffsWhenToUseEachTechnique: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Trade-offs: When to Use Each Technique
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <p>
              Choose based on data characteristics and operational constraints.
              SMOTE works well for tabular data with continuous features where
              interpolation makes sense. Class weighting is the simplest
              approach—try it first. Focal loss excels when easy examples
              dominate gradients, common in deep learning.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Rule of Thumb:</strong> Start with class weighting (zero
              code change, just a hyperparameter). If performance is
              insufficient, try focal loss for neural networks or SMOTE for
              tree-based models. Rarely need to combine all techniques.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SMOTE Trade-offs
            </p>
            <p>
              Advantages: generates novel training examples, expands minority
              class feature space. Disadvantages: increases training set size
              (slower training), assumes interpolation validity, may generate
              unrealistic samples near class boundaries. Best for: tabular data,
              moderate imbalance (1:10 to 1:100), when more data would genuinely
              help.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Class Weighting Trade-offs
            </p>
            <p>
              Advantages: no data modification, simple to implement, works with
              any model. Disadvantages: extreme weights can cause training
              instability, does not add information (just reweights existing
              samples). Best for: initial baseline, when minority examples are
              representative, with tree-based models.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Focal Loss Trade-offs
            </p>
            <p>
              Advantages: adaptive to example difficulty, no data modification.
              Disadvantages: adds hyperparameter to tune, only works with
              differentiable models. Best for: neural networks, object
              detection, when many easy negatives dominate training.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Production Insight:</strong> Undersampling the majority
              class often works as well as oversampling the minority—and trains
              faster. Try training on a balanced subset before adding
              complexity.
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
                  Start with class weighting (hyperparameter only), try focal
                  loss for neural networks or SMOTE for tree models if needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SMOTE expands feature space but increases training time and
                  assumes interpolation validity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Undersampling majority class often works as well as
                  oversampling minority—and trains faster
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
                  SMOTE best for: tabular data, moderate imbalance (1:10 to
                  1:100), when more data would genuinely help
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Focal loss best for: neural networks, object detection, when
                  easy negatives dominate training gradients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImbalancedDataHandlingProductionTradeOffsWhenToUseEachTechnique;
