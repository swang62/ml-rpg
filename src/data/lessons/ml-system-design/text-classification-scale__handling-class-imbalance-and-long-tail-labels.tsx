import type { Component } from "solid-js";

const LessonTextClassificationScaleHandlingClassImbalanceAndLongTailLabels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Handling Class Imbalance and Long Tail Labels
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                The Core Problem
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Class imbalance</strong> means some categories appear
                far more often than others. A support system might have 10,000
                "billing" examples but only 50 "security breach" examples. The
                model learns to predict "billing" for everything because that
                minimizes training loss.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Standard Training Fails
            </p>
            <p style="margin-top: 0">
              Standard loss functions treat all examples equally. If 95% of
              training data is "billing," the model achieves 95% accuracy by
              always predicting billing. The 5% rare cases get ignored because
              missing them barely hurts the loss. For a security breach
              detector, this 5% is exactly what you need to catch.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Class Weighting
            </p>
            <p style="margin-top: 0">
              The simplest fix: weight each class inversely to its frequency. If
              "billing" has 10,000 examples and "security" has 50, give security
              examples 200x higher weight in the loss function. Now
              misclassifying one security example hurts as much as
              misclassifying 200 billing examples.
            </p>
            <p>
              Set weight as:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                class_weight[i] = total_samples / (num_classes × class_count[i])
              </code>
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Long Tail Problem
            </p>
            <p style="margin-top: 0">
              With 500+ categories, the tail gets extreme. Top 10 categories
              cover 80% of traffic. The remaining 490 share 20%, averaging 0.04%
              each. Even with class weighting, models struggle when a category
              has fewer than 50 training examples.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Long Tail Fix:</strong> Group rare categories into an
              "Other" bucket during training. Use a second-stage classifier or
              zero shot model to handle Other with finer granularity at
              inference.
            </div>
            <p>
              Alternative: hierarchical classification. First classify into 20
              broad categories (enough examples each), then use
              category-specific models for fine-grained labels within each.
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
                  Class imbalance causes models to predict majority class for
                  everything, ignoring rare important cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Class weighting: weight inversely to frequency so rare
                  examples matter equally in loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long tail: with 500+ categories, most have fewer than 50
                  examples, too sparse for training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Group rare categories into Other bucket, use second-stage
                  classifier for fine-grained
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hierarchical classification: broad categories first, then
                  fine-grained within each
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
                  Explain class weighting formula: weight = total_samples /
                  (num_classes × class_count)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For long tail, describe the Other bucket strategy with
                  second-stage zero shot
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention hierarchical classification: broad categories →
                  fine-grained within each
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextClassificationScaleHandlingClassImbalanceAndLongTailLabels;
