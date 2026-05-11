import type { Component } from "solid-js";

const LessonUnsupervisedAnomalyDetectionImplementationPatternsAndProductionArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Patterns and Production Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real-time Scoring Pipeline
            </p>
            <p>
              Production unsupervised anomaly detection requires sub-100ms
              latency for real-time decisions. Deploy Isolation Forest models as
              lightweight services—scikit-learn models serialize efficiently and
              load in milliseconds. For autoencoders, export to ONNX format and
              serve via optimized inference engines. Both models should run on
              CPU for cost efficiency; GPU is rarely needed for single-record
              inference.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Architecture Pattern:</strong> Feature store → Real-time
              feature computation → Model inference → Score normalization →
              Threshold check → Action routing. Cache feature computations for
              repeated entities within time windows.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Score Calibration
            </p>
            <p>
              Raw anomaly scores lack interpretability. Calibrate scores to
              probabilities using historical labeled data: for a score of X,
              what percentage were actually anomalous? This enables meaningful
              thresholds ("flag if &gt;80% probability") and consistent
              interpretation across model versions. Recalibrate after each model
              update.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Ensemble Strategies
            </p>
            <p>
              Combine multiple unsupervised methods: average scores from
              Isolation Forest and autoencoder, or use voting (flag if any model
              exceeds threshold). Ensembles reduce individual model weaknesses
              and provide redundancy. Weight models by recent precision
              performance on labeled validation sets.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Monitoring Essential:</strong> Track score distributions
              daily. Sudden shifts indicate data drift or model degradation.
              Alert on precision/recall changes measured against labeled
              samples.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Retraining Pipeline
            </p>
            <p>
              Schedule automated retraining (weekly/monthly) to adapt to
              evolving normal patterns. Validate new models against holdout
              anomaly sets before promotion. Maintain model versioning with
              instant rollback capability. Shadow mode deployment compares new
              model scores against production before switching.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Event Stream</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5,000 to 20,000 TPS
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Feature Store</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Sub 20ms p95 lookup
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 13px">
                    <strong>Isolation Forest</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      0.2 to 0.5ms
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 13px">
                    <strong>Autoencoder</strong>
                    <div style="font-size: 11px; margin-top: 4px">1 to 3ms</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Score Fusion</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Per segment calibration
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Top 0.5 to 2% Flagged</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Supervised model or review
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
                  Deploy Isolation Forest and autoencoders on CPU for cost
                  efficiency—GPU rarely needed for single-record inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calibrate raw scores to probabilities using historical labeled
                  data for meaningful threshold interpretation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track score distributions daily and alert on precision/recall
                  changes to detect drift or model degradation
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
                  Use feature store → real-time computation → inference →
                  normalization → threshold → action routing architecture
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow mode deployment compares new model scores against
                  production before switching to catch regressions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonUnsupervisedAnomalyDetectionImplementationPatternsAndProductionArchitecture;
