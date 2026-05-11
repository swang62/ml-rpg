import type { Component } from "solid-js";

const LessonGraphFraudDetectionImplementationDetailsSamplingCachingAndEnsembleFusion: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Details: Sampling, Caching, and Ensemble Fusion
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Neighbor Sampling Strategies
            </p>
            <p>
              Random uniform sampling is simplest but may miss important
              connections. Importance sampling weights neighbors by recency,
              transaction volume, or suspicion score—prioritizing informative
              nodes. Layer-wise sampling uses different strategies per hop:
              strict sampling in first hop for speed, relaxed in second hop for
              coverage. The sampling budget (total neighbors fetched) directly
              trades off latency vs accuracy.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Implementation Pattern:</strong> Cache sampled
              neighborhoods for recently active nodes. High-activity users get
              sampled repeatedly; caching their neighborhoods (with 5-minute
              TTL) reduces graph database load by 60-80% during traffic spikes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Embedding Caches
            </p>
            <p>
              Store pre-computed node embeddings in low-latency cache (Redis,
              Memcached). At inference, fetch cached embedding if fresh enough;
              otherwise compute on-demand and update cache. Two-tier caching:
              hot embeddings in memory (sub-millisecond), warm embeddings in
              Redis (2-5ms), cold nodes computed live (20-50ms).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Ensemble Fusion
            </p>
            <p>
              Production systems rarely use GNNs alone. Combine GNN scores with
              point-wise model scores (XGBoost on transaction features),
              rule-based systems (velocity checks, blacklists), and reputation
              scores. Ensemble fusion options: weighted average, stacking
              (meta-model on component scores), or cascaded filtering (rules
              first, GNN for ambiguous cases).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Production Insight:</strong> Cascaded architecture saves
              compute: cheap rules filter 80% of clear cases, GNN inference runs
              only on the remaining 20% ambiguous transactions. This reduces GNN
              serving costs by 5x while maintaining detection quality.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch vs Real-time
            </p>
            <p>
              Some fraud detection is not time-critical (account reviews,
              periodic sweeps). Run batch GNN inference overnight on the full
              graph without sampling constraints. Use batch results to update
              node risk scores that real-time systems consume. This hybrid
              approach balances thoroughness with latency requirements.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 14px">
                  Ensemble Fusion Architecture
                </div>
                <div style="display: flex; gap: 8px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 140px; text-align: center">
                    <strong style="font-size: 12px">GNN Model</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Graph context
                    </div>
                    <div style="font-size: 11px">Score: 0.12</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 140px; text-align: center">
                    <strong style="font-size: 12px">XGBoost</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Tabular features
                    </div>
                    <div style="font-size: 11px">Score: 0.08</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 140px; text-align: center">
                    <strong style="font-size: 12px">Rules Engine</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Velocity, lists
                    </div>
                    <div style="font-size: 11px">Score: 0.15</div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Calibrated Fusion</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Weighted avg or logistic layer
                  </div>
                  <div style="font-size: 11px">Final Score: 0.11</div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; gap: 8px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; width: 100px; text-align: center; font-size: 11px">
                    <strong>Allow</strong>
                    <div style="margin-top: 2px">Score &lt; 0.05</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; width: 100px; text-align: center; font-size: 11px">
                    <strong>Step-up</strong>
                    <div style="margin-top: 2px">0.05-0.20</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; width: 100px; text-align: center; font-size: 11px">
                    <strong>Review</strong>
                    <div style="margin-top: 2px">Score &gt; 0.20</div>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 8px; border-radius: 6px; border: 2px solid; font-size: 11px; text-align: center">
                  Calibrated per segment: New user, High-risk geo,
                  Card-not-present
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
                  Cache sampled neighborhoods for active nodes (5-minute TTL) to
                  reduce graph database load by 60-80% during traffic spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two-tier embedding cache: hot in memory (sub-ms), warm in
                  Redis (2-5ms), cold computed live (20-50ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cascaded architecture filters 80% with cheap rules, runs GNN
                  only on 20% ambiguous cases—5x cost reduction
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
                  Explain importance sampling: weight neighbors by recency or
                  suspicion score rather than random uniform selection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention batch overnight inference on full graph without
                  sampling, updating risk scores that real-time systems consume
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGraphFraudDetectionImplementationDetailsSamplingCachingAndEnsembleFusion;
