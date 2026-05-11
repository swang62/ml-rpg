import type { Component } from "solid-js";

const LessonModelInterpretabilityProductionArchitectureForModelExplanationsAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture for Model Explanations at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latency Problem
            </p>
            <p style="margin-top: 0">
              Computing SHAP values is expensive. For N features, exact SHAP
              requires 2^N evaluations. With 50 features, that is over 1
              quadrillion model calls. Even approximations take 100-500ms per
              prediction. If latency budget is 50ms and model takes 20ms,
              synchronous explanations are impossible. LIME is faster (10-50ms)
              but still significant. Production systems cannot compute
              explanations for every request.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Asynchronous Explanation Architecture
            </p>
            <p style="margin-top: 0">
              Decouple explanation from prediction. Predictions return in 50ms.
              Asynchronously, queue explanation requests. Separate workers
              compute SHAP and store in database keyed by prediction ID. Users
              or regulators retrieve pre-computed values. Typical: compute for
              10-20% of predictions (sampled plus disputed/high-stakes
              decisions). Store 90 days for regulatory retention.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Caching and Approximation
            </p>
            <p style="margin-top: 0">
              <strong>Cluster-based caching:</strong> Group similar inputs into
              clusters. Compute explanations for centroids only. New inputs get
              centroid explanation with adjustments. Reduces computation
              10-100x. <strong>Model distillation:</strong> Train simple model
              to predict SHAP values directly from features. Generates
              explanations in microseconds. Accuracy degrades (85-95%
              correlation with true SHAP) but speed is orders of magnitude
              better.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling Explanation Workers
            </p>
            <p style="margin-top: 0">
              Explanation computation is CPU/GPU-bound. Size workers based on
              volume: 10,000 explanations per hour at 500ms each needs 1.4
              worker-hours, so ~2 dedicated workers. Monitor queue depth and
              utilization. Auto-scale based on backlog.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Synchronous explanations kill
              latency. Asynchronous adds complexity and delays user-facing
              delivery. Choose based on requirements.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Prediction Request</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      5,000 rps
                      <br />
                      25ms model latency
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Model Serving</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Score: 720
                      <br />
                      p95: 30ms
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px; display: block; margin-bottom: 6px">
                      Online Explainer
                    </strong>
                    <div style="font-size: 11px">
                      <strong>Trigger:</strong> 1-5% of traffic
                      <br />
                      <strong>Latency:</strong> 15-20ms
                      <br />
                      <strong>Output:</strong> Top 3-5 features
                      <br />
                      <strong>Infrastructure:</strong> 20-50 vCPU
                      <br />
                      <strong>Cache:</strong> 24hr by feature hash
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px; display: block; margin-bottom: 6px">
                      Batch Explainer
                    </strong>
                    <div style="font-size: 11px">
                      <strong>Schedule:</strong> Nightly/hourly
                      <br />
                      <strong>Volume:</strong> 50M decisions/month
                      <br />
                      <strong>Output:</strong> Full 100 features
                      <br />
                      <strong>Storage:</strong> 40-80 GB/month
                      <br />
                      <strong>Retention:</strong> 3-7 years
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Explanation Store</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Keyed by: decision_id + model_version + feature_manifest
                    <br />
                    Joined with feature store for compliance queries
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
                  Exact SHAP requires 2^N evaluations, approximations take
                  100-500ms per explanation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LIME is faster (10-50ms) but still significant overhead for
                  real-time serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decouple: async workers compute and store explanations for
                  later retrieval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cluster-based caching explains centroids only, reducing
                  computation 10-100x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distillation trains surrogate model predicting SHAP in
                  microseconds (85-95% accuracy)
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
                  Size workers: 10,000 explanations/hour at 500ms needs ~2
                  dedicated workers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Store explanations 90 days for regulatory retention
                  requirements
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelInterpretabilityProductionArchitectureForModelExplanationsAtScale;
