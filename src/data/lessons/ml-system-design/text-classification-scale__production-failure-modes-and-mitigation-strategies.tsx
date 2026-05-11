import type { Component } from "solid-js";

const LessonTextClassificationScaleProductionFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Label Drift
            </p>
            <p style="margin-top: 0">
              User language evolves. "Cancel my account" becomes "I want to
              churn" becomes "unsubscribe me." Your model trained on 2023 data;
              users in 2025 use different phrases. Accuracy drops 1-2% per
              quarter without intervention.
            </p>
            <p>
              <strong>Detection:</strong> Monitor prediction confidence
              distribution. If the model becomes less confident on average, text
              patterns are drifting from training data. Track per-class accuracy
              weekly using sampled manual reviews.
            </p>
            <p>
              <strong>Mitigation:</strong> Retrain quarterly with recent data.
              Sample 500 low-confidence predictions per week for manual labeling
              and add to training set.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Adversarial Inputs
            </p>
            <p style="margin-top: 0">
              Users learn to game classifiers. If "refund" triggers a refund
              workflow, users add "refund" to unrelated requests hoping for
              faster routing. Spam gets smarter: misspellings like "fr33 m0ney"
              bypass keyword filters.
            </p>
            <p>
              <strong>Detection:</strong> Look for sudden spikes in specific
              category predictions. If "refund" requests jump 40% without a
              product issue, users may be gaming the system.
            </p>
            <p>
              <strong>Mitigation:</strong> Use semantic models instead of
              keyword matching. Add downstream validation: route "refund"
              requests to human if purchase history does not support the claim.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training-Serving Skew
            </p>
            <p style="margin-top: 0">
              The preprocessing in training differs from production. Training
              lowercased text; production does not. Training removed emojis;
              production keeps them. Result: 10-15% accuracy drop invisible in
              offline evaluation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Critical:</strong> Use identical preprocessing code for
              training and serving. Package preprocessing as a shared library.
              Test with production samples before deployment.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Out of Distribution Inputs
            </p>
            <p style="margin-top: 0">
              Production sees text your training never covered. If you trained
              on English emails, the model has no useful behavior for Spanish,
              code snippets, or JSON payloads. It returns a random label with
              false confidence.
            </p>
            <p>
              <strong>Mitigation:</strong> Add an explicit "unknown" class.
              Route low-confidence predictions (below 0.6) to human review.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-bottom: 12px">
                <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px">
                  Document Length Accuracy Drop
                </div>
                <div style="display: flex; gap: 12px; font-size: 12px">
                  <div style="flex: 1; border-left: 3px solid; padding-left: 8px">
                    <strong>200 tokens:</strong> F1 0.88
                    <br />
                    Within context window
                  </div>
                  <div style="flex: 1; border-left: 3px solid; padding-left: 8px">
                    <strong>2000 tokens:</strong> F1 0.65
                    <br />
                    Signals truncated
                  </div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px">
                  Mitigation: Chunking + Pooling
                </div>
                <div style="font-size: 12px; line-height: 1.5">
                  Split → Embed each chunk (512 tokens) → Attention pooling →
                  Document embedding → Classify
                  <br />
                  <strong>Result:</strong> F1 0.84 on long documents
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
                  Label drift: user language evolves, accuracy drops 1-2% per
                  quarter without retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor prediction confidence distribution to detect drift
                  early
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial inputs: users game classifiers, use semantic
                  models not keyword matching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training-serving skew: different preprocessing causes 10-15%
                  accuracy drop
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Out of distribution: add unknown class, route low-confidence
                  to human review
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
                  Explain label drift detection: monitor confidence distribution
                  and weekly accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For adversarial inputs, describe downstream validation with
                  purchase history
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize identical preprocessing code for training and
                  serving
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextClassificationScaleProductionFailureModesAndMitigationStrategies;
