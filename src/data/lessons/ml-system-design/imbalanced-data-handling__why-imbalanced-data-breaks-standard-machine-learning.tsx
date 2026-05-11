import type { Component } from "solid-js";

const LessonImbalancedDataHandlingWhyImbalancedDataBreaksStandardMachineLearning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Why Imbalanced Data Breaks Standard Machine Learning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>The Core Problem:</strong> In fraud detection, fraud might
              be 0.1% of transactions. A model that predicts "not fraud" for
              everything achieves 99.9% accuracy—but catches zero fraud.
              Standard ML algorithms optimize for overall accuracy, which
              incentivizes ignoring the rare class entirely.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Accuracy Fails
            </p>
            <p>
              Accuracy treats all errors equally. In fraud detection, false
              negatives (missed fraud) cost thousands of dollars per case. False
              positives (blocked legitimate transactions) cost customer friction
              but are recoverable. The business cost is asymmetric, but accuracy
              does not know this. A model optimizing accuracy rationally ignores
              the minority class because the accuracy penalty for missing all
              fraud is only 0.1%.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Gradient Signal Problem
            </p>
            <p>
              During training, each batch contains mostly negative examples.
              Gradients from the majority class dominate parameter updates. The
              minority class contributes weak gradients that get averaged away.
              The model learns features useful for identifying negatives but
              never learns the subtle patterns distinguishing positives.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Insight:</strong> Imbalance is not just a data
              problem—it is a training dynamics problem. Even with perfect
              features, gradient-based optimization will underweight the
              minority class unless explicitly corrected.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation Metrics for Imbalanced Data
            </p>
            <p>
              Replace accuracy with metrics that care about the minority class.
              Precision-Recall AUC measures performance across different
              operating points. F1 score balances precision and recall. Recall
              at fixed precision (e.g., recall at 90% precision) matches
              business constraints. Always evaluate on the natural class
              distribution, not artificially balanced test sets.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Business Context
            </p>
            <p>
              Define the cost ratio: how much worse is missing fraud versus
              blocking legitimate users? This ratio guides technique selection.
              If missing fraud costs 100x more than false positives, aggressive
              recall optimization is justified even at the expense of precision.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Training Data: 10,000 transactions
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Fraud: 20 examples (0.2%)
                    <br />
                    Legitimate: 9,980 examples (99.8%)
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Standard Loss (Equal Weighting)
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Gradient dominated by 9,980 negatives
                    <br />
                    Model learns: "Predict all legitimate"
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Result</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Accuracy: 99.8%
                    <br />
                    Fraud caught: 0%
                    <br />
                    <strong>Business impact: Disaster</strong>
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
                  A model predicting majority class for everything achieves high
                  accuracy but zero recall on the minority class
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Imbalance is a training dynamics problem—majority class
                  gradients dominate, minority class patterns never learned
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replace accuracy with PR-AUC, F1, or recall at fixed precision
                  to properly evaluate imbalanced classifiers
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
                  Define cost ratio first: if missing fraud costs 100x more than
                  false positives, optimize aggressively for recall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always evaluate on natural class distribution—artificially
                  balanced test sets give misleading performance estimates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImbalancedDataHandlingWhyImbalancedDataBreaksStandardMachineLearning;
