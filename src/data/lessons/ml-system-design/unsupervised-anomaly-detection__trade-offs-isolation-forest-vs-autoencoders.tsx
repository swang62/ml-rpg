import type { Component } from "solid-js";

const LessonUnsupervisedAnomalyDetectionTradeOffsIsolationForestVsAutoencoders: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Isolation Forest vs Autoencoders
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Computational Trade-offs
            </p>
            <p>
              Isolation Forest requires no training phase—it builds trees at
              inference time or uses pre-built forests. Training completes in
              seconds on millions of records. Autoencoders require GPU training
              time (hours for large datasets) but offer faster inference once
              trained since forward passes are optimized.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Rule of Thumb:</strong> Choose Isolation Forest for quick
              deployment without training infrastructure. Choose autoencoders
              when you have labeled normal data and need to capture complex
              nonlinear patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Data Characteristics
            </p>
            <p>
              Isolation Forest handles mixed data types naturally and is robust
              to feature scaling. Autoencoders require careful
              preprocessing—normalization is essential, and categorical features
              need embedding layers. For high-dimensional sparse data,
              autoencoders outperform due to learned compressed representations.
            </p>
            <p>
              Isolation Forest struggles with local anomalies in clustered
              data—anomalies near cluster boundaries may receive low scores.
              Autoencoders handle multi-modal distributions better by learning
              complex reconstruction mappings.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Interpretability
            </p>
            <p>
              Isolation Forest provides intuitive explanations: short path
              length means easy isolation means anomaly. Autoencoders offer
              per-feature reconstruction errors, showing which inputs were
              poorly reconstructed, but internal representations are less
              interpretable.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Ensemble Strategy:</strong> Production systems combine
              both methods. Isolation Forest provides fast baseline while
              autoencoders catch complex patterns. Anomalies flagged by both
              receive highest confidence.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Maintenance
            </p>
            <p>
              Isolation Forest retraining is trivial—rebuild trees on new data.
              Autoencoders require careful retraining schedules and validation
              to avoid catastrophic forgetting. For rapidly evolving
              distributions, Isolation Forest offers simpler maintenance.
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
                  Isolation Forest needs no training and deploys quickly;
                  autoencoders require GPU training but capture complex
                  nonlinear patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Isolation Forest handles mixed data naturally; autoencoders
                  need preprocessing but excel at high-dimensional sparse data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combine both in production: Isolation Forest for fast
                  baseline, autoencoders for complex patterns
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
                  Use Isolation Forest for quick deployment without training
                  infrastructure, autoencoders when capturing nonlinear patterns
                  matters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analyze per-feature reconstruction errors from autoencoders to
                  understand which input aspects indicate anomalies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonUnsupervisedAnomalyDetectionTradeOffsIsolationForestVsAutoencoders;
