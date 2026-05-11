import type { Component } from "solid-js";

const LessonHardNegativeMiningProductionImplementationMetricsMonitoringAndServingImpact: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Metrics, Monitoring, and Serving Impact
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAINING PIPELINE
            </p>
            <p>
              Production hard negative mining fits into the training pipeline as
              a data preprocessing or augmentation step. Typical flow: train
              initial model with random negatives, deploy for mining, re-train
              with mined negatives, iterate.
            </p>
            <p>
              <strong>Initial training:</strong> Train baseline model with
              random negatives for 3-5 epochs. This gives a reasonable embedding
              space for mining.
            </p>
            <p>
              <strong>Mining phase:</strong> Embed corpus with current model.
              For each anchor, query top-K neighbors (K=100-1000). Filter to
              items that are known negatives. Store as hard negative pairs.
            </p>
            <p>
              <strong>Retraining:</strong> Mix mined hard negatives with random
              negatives (ratio 1:1 to 1:3). Pure hard negatives can destabilize
              training. Retrain for 2-3 epochs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MONITORING METRICS
            </p>
            <p>
              <strong>Hard negative hit rate:</strong> What fraction of mined
              negatives are actually used in training (not filtered out by
              confidence)? Very low hit rate (&lt;10%) suggests mining
              thresholds are too aggressive.
            </p>
            <p>
              <strong>Loss dynamics:</strong> Hard negatives should produce
              higher loss than random negatives initially, then converge. If
              loss stays high, negatives may be too hard (including false
              negatives).
            </p>
            <p>
              <strong>Recall trend:</strong> Recall should improve or stay flat
              after mining. If recall drops, investigate false negative rate
              immediately.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SERVING IMPACT
            </p>
            <p>
              Hard negative training changes the embedding space—items that
              looked similar now look different. This affects:
            </p>
            <p>
              <strong>Index freshness:</strong> After retraining, old embeddings
              are stale. Re-embed corpus before serving. Plan for reindexing
              latency.
            </p>
            <p>
              <strong>User experience:</strong> If hard negatives were false
              negatives, previously good results may disappear. A/B test before
              full rollout. Monitor user engagement signals.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Hard negative mining is not a
              one-time process. As the model improves, easy negatives become
              useless. Schedule periodic re-mining (weekly to monthly) to
              maintain training signal quality.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                  Serving Latency Breakdown
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Query Encoding</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Latency: 2 to 10ms (CPU/GPU)
                    <br />
                    Fixed cost per request
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">ANN Index Retrieval</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Latency: 5 to 30ms p95
                    <br />
                    Retrieves 100 to 500 candidates
                    <br />
                    <span style="padding: 2px 4px; border-radius: 3px">
                      Hard mining reduces depth by 20 to 40%
                    </span>
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Downstream Ranker</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Latency: 10 to 50ms
                    <br />
                    Scores fewer candidates
                    <br />
                    <span style="padding: 2px 4px; border-radius: 3px">
                      Total savings: 5 to 10ms at p95
                    </span>
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
                  Pipeline: initial training → mining → retrain with mix of hard
                  and random negatives (1:1 to 1:3)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor: hard negative hit rate, loss dynamics, recall
                  trend—drop = investigate false negatives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Serving: retraining changes embeddings, requiring reindexing;
                  A/B test before rollout
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
                  Interview Tip: Describe the training-mining loop—initial
                  model, mine hard negatives, retrain with mixed negatives.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain why pure hard negatives destabilize—mix
                  with random negatives at 1:3 ratio.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardNegativeMiningProductionImplementationMetricsMonitoringAndServingImpact;
