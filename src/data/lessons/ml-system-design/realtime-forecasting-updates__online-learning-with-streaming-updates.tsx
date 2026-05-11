import type { Component } from "solid-js";

const LessonRealtimeForecastingUpdatesOnlineLearningWithStreamingUpdates: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online Learning with Streaming Updates
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Online Learning:</strong> A paradigm where models update
              incrementally as new data arrives, rather than retraining from
              scratch. Each observation immediately updates model parameters,
              enabling adaptation to distribution shifts within minutes instead
              of hours required for batch retraining.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch vs Online Trade-offs
            </p>
            <p>
              Batch training sees all data multiple times, achieving optimal
              convergence but requiring hours for retraining. Online learning
              sees each example once, achieving faster adaptation but
              potentially noisier parameter estimates. The choice depends on
              data velocity and concept drift rate. If user preferences shift
              hourly (trending topics, flash sales), online learning captures
              changes that batch retraining misses. If patterns are stable,
              batch training typically produces more accurate models.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Algorithms Supporting Online Updates
            </p>
            <p>
              Not all models support incremental updates.{" "}
              <strong>Supported:</strong> Linear models (logistic regression,
              linear SVM), factorization machines, online gradient boosting,
              neural networks with streaming SGD.{" "}
              <strong>Not supported:</strong> Random forests, standard gradient
              boosting (XGBoost in default mode), k-NN with full distance
              computation. Hoeffding trees provide an online alternative to
              random forests, growing trees incrementally. The algorithm
              constraint often dictates architecture.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Learning Rate and Stability
            </p>
            <p>
              Online learning faces exploration-exploitation trade-off: high
              learning rate adapts quickly but is unstable; low learning rate is
              stable but slow. Common strategy: decay learning rate over time.
              However, this assumes distribution stabilizes—inappropriate for
              continuously shifting data. For non-stationary distributions, use
              adaptive learning rates (AdaGrad, Adam) or sliding window of
              recent examples with constant rate.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Hybrid Approach:</strong> Many systems combine batch and
              online: batch retrain nightly for stability, online updates for
              intraday adaptation. Batch provides stable baseline; online
              handles drift until next refresh.
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
                  Online learning adapts within minutes vs hours for batch
                  retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Not all algorithms support incremental updates (tree ensembles
                  require special variants)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid batch plus online combines stability with fast
                  adaptation
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
                  Factorization machines and small neural networks for
                  online-compatible high accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hoeffding trees as online alternative to random forests
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeForecastingUpdatesOnlineLearningWithStreamingUpdates;
