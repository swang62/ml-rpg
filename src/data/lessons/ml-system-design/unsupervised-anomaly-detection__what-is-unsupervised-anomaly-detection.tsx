import type { Component } from "solid-js";

const LessonUnsupervisedAnomalyDetectionWhatIsUnsupervisedAnomalyDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Unsupervised Anomaly Detection?
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
                <strong>Unsupervised anomaly detection</strong> identifies
                unusual data points without labeled examples of anomalies. The
                model learns what "normal" looks like from unlabeled data, then
                flags anything that deviates significantly from that normal
                pattern.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Unsupervised
            </p>
            <p style="margin-top: 0">
              Labeled anomalies are expensive or impossible to obtain. Fraud
              detection has labels (chargebacks), but manufacturing defect
              detection, network intrusion detection, and novel attack
              identification often lack labeled examples. You cannot label what
              you have never seen before.
            </p>
            <p>
              Even when labels exist, they may be delayed (chargebacks take
              30-90 days) or incomplete (only caught fraud gets labeled).
              Unsupervised methods detect anomalies from day one without waiting
              for label collection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Assumption
            </p>
            <p style="margin-top: 0">
              All unsupervised anomaly detection rests on one assumption:
              anomalies are rare and different. If 99% of your data follows
              certain patterns, the 1% that differs is anomalous. This breaks
              when anomalies are common (contaminated training data) or when
              normal data has high variance (everything looks different).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Limitation:</strong> Unsupervised methods find
              statistical outliers, not necessarily harmful anomalies. A
              legitimate user with unusual behavior gets flagged alongside
              actual fraud. Human review or downstream rules must separate true
              threats from false alarms.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Main Approaches
            </p>
            <p style="margin-top: 0">
              <strong>Distance-based:</strong> Anomalies are far from normal
              points. Compute distance to nearest neighbors or cluster centers.
              Isolation Forest and LOF (Local Outlier Factor) fall here.
            </p>
            <p>
              <strong>Reconstruction-based:</strong> Train a model to compress
              and reconstruct normal data. Anomalies reconstruct poorly because
              the model never learned their patterns. Autoencoders are the
              primary example.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Unlabeled Transaction Stream
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5,000 to 20,000 TPS
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 16px">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 13px">Isolation Forest</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      0.2 to 0.5ms/event
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 13px">Autoencoder</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      1 to 3ms/event
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Top 0.5 to 2% Flagged</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Sent to supervised model
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
                  Unsupervised detection learns 'normal' from unlabeled data,
                  flags significant deviations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use when labels are unavailable, delayed (30-90 days), or
                  incomplete
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Core assumption: anomalies are rare and different; breaks with
                  contaminated data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distance-based: anomalies far from normal (Isolation Forest,
                  LOF)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reconstruction-based: anomalies reconstruct poorly
                  (Autoencoders)
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
                  Explain when to use unsupervised: no labels, delayed labels,
                  or novel unknown anomalies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the core assumption: anomalies must be rare and
                  different from normal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distinguish distance-based vs reconstruction-based approaches
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonUnsupervisedAnomalyDetectionWhatIsUnsupervisedAnomalyDetection;
