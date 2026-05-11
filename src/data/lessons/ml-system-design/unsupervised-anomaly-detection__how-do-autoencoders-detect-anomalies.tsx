import type { Component } from "solid-js";

const LessonUnsupervisedAnomalyDetectionHowDoAutoencodersDetectAnomalies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Do Autoencoders Detect Anomalies?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Core Mechanism
            </p>
            <p>
              Autoencoders detect anomalies by learning to reconstruct normal
              data patterns. The network compresses input through an encoder
              bottleneck, then reconstructs it via a decoder. The key insight:
              autoencoders trained on normal data struggle to reconstruct
              anomalous patterns, producing high reconstruction errors that
              serve as anomaly scores.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Detection Principle:</strong> Normal instances produce low
              reconstruction error because the autoencoder learned their
              patterns. Anomalies produce high error because the compressed
              representation cannot capture unfamiliar patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architecture Design
            </p>
            <p>
              A typical autoencoder progressively compresses input
              dimensionality (e.g., 100 → 50 → 20 → 10 latent dimensions), with
              a symmetric decoder reconstructing original dimensions. The
              bottleneck size critically affects sensitivity: too large allows
              anomaly memorization, too small loses normal pattern fidelity.
            </p>
            <p>
              For tabular fraud data, dense layers with ReLU work well. For
              sequential transaction data, LSTM-based autoencoders capture
              temporal dependencies. Variational autoencoders (VAEs) add
              probabilistic modeling for uncertainty quantification.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Error Metrics and Normalization
            </p>
            <p>
              Mean Squared Error (MSE) between input and reconstruction is
              standard. Feature-weighted MSE assigns higher importance to
              fraud-indicative features. Rather than raw error, normalize scores
              using training set distribution to convert to z-scores or
              percentiles for stable threshold selection.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Training Tip:</strong> Train exclusively on verified
              normal data. Contamination with anomalies teaches the model to
              reconstruct fraud patterns, dramatically reducing detection
              sensitivity. Use holdout validation with known anomalies to tune
              thresholds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Regularization and Overfitting
            </p>
            <p>
              Early stopping prevents overfitting. Dropout and L2 penalties
              improve generalization. If the autoencoder perfectly reconstructs
              training data but shows high validation error, the bottleneck is
              too large—reduce latent dimensions.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Input: 50 features</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Transaction data
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Encoder</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    50 → 32 → 16
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Bottleneck: 8 dims</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Compressed representation
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Decoder</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    8 → 16 → 32 → 50
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Reconstruction: 50 features
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    High error = anomaly
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
                  Autoencoders detect anomalies via reconstruction error—normal
                  patterns reconstruct well, anomalies produce high error
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bottleneck size controls sensitivity: too large allows anomaly
                  memorization, too small loses normal pattern fidelity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Train exclusively on verified normal data—contamination
                  teaches the model to reconstruct fraud patterns
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
                  Normalize reconstruction errors to z-scores using training set
                  distribution for stable threshold selection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use feature-weighted MSE to assign higher importance to
                  fraud-indicative features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonUnsupervisedAnomalyDetectionHowDoAutoencodersDetectAnomalies;
