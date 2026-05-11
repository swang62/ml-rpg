import type { Component } from "solid-js";

const LessonSupervisedAnomalyDetectionSupervisedAnomalyDetectionWhyAccuracyIsMisleadingInImbalancedClassification: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Supervised Anomaly Detection: Why Accuracy Is Misleading in
            Imbalanced Classification
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Supervised anomaly detection</strong> uses labeled
                examples of normal and anomalous behavior to train a classifier.
                Unlike unsupervised methods that find statistical outliers,
                supervised methods learn specific patterns that define "fraud"
                or "attack" from historical labeled data.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Imbalance Problem
            </p>
            <p style="margin-top: 0">
              Anomalies are rare by definition. In fraud detection, typically
              0.1-1% of transactions are fraudulent. In intrusion detection,
              0.01% of network packets are malicious. This extreme class
              imbalance breaks standard machine learning assumptions.
            </p>
            <p>
              Training data might contain 1 million normal examples and 1,000
              fraud examples. A model that predicts "normal" for everything
              achieves 99.9% accuracy. That model catches zero fraud. Accuracy
              becomes meaningless when classes are imbalanced.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Accuracy Misleads
            </p>
            <p style="margin-top: 0">
              Accuracy = (correct predictions) / (total predictions). With 99.9%
              normal data, a trivial classifier that always predicts normal gets
              99.9% accuracy. It sounds impressive but catches no anomalies. The
              metric rewards predicting the majority class and ignoring the
              minority class entirely.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ The Trap:</strong> Stakeholders see 99% accuracy and
              assume the model works. In reality, it misses every fraud case.
              Always report precision and recall on the minority class, never
              accuracy alone.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Metrics That Matter
            </p>
            <p style="margin-top: 0">
              <strong>Precision:</strong> Of all predicted anomalies, what
              fraction are true anomalies? Low precision means many false
              alarms, wasting human review time.
            </p>
            <p>
              <strong>Recall:</strong> Of all true anomalies, what fraction did
              we catch? Low recall means fraud slips through. In financial
              fraud, missing a ,000 theft might cost more than 100 false alarms.
            </p>
            <p>
              <strong>PR-AUC:</strong> Area under precision-recall curve. Unlike
              ROC-AUC, PR-AUC is sensitive to class imbalance. A random
              classifier gets PR-AUC equal to the positive class fraction (0.001
              for 0.1% fraud rate), not 0.5.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Transaction Scored</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Risk Score: 0.08
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Score &lt; 0.02</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Auto Approve
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">0.02 to 0.15</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Human Review
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Score &gt; 0.15</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Auto Block
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
                  Supervised anomaly detection learns from labeled examples of
                  normal and anomalous behavior
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Extreme class imbalance (0.1-1% anomalies) makes accuracy
                  meaningless: 99.9% accuracy catches zero fraud
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precision measures false alarm rate; recall measures how many
                  true anomalies we catch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PR-AUC is the right metric: random classifier gets PR-AUC =
                  positive class fraction, not 0.5
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Never report accuracy alone for imbalanced problems;
                  stakeholders will misinterpret it
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
                  Explain why accuracy misleads: 99.9% accuracy means nothing if
                  it catches zero fraud
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show precision-recall trade-off: missing K fraud may cost more
                  than 100 false alarms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use PR-AUC instead of ROC-AUC for imbalanced datasets; random
                  baseline is class fraction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSupervisedAnomalyDetectionSupervisedAnomalyDetectionWhyAccuracyIsMisleadingInImbalancedClassification;
