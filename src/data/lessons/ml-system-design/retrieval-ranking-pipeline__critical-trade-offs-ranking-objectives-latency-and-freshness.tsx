import type { Component } from "solid-js";

const LessonRetrievalRankingPipelineCriticalTradeOffsRankingObjectivesLatencyAndFreshness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical Trade-offs: Ranking Objectives, Latency, and Freshness
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RANKING OBJECTIVE CHOICES
            </p>
            <p style="margin-top: 0">
              Ranking models optimize different objectives. Pointwise predicts
              absolute score per item (click probability). Simple to train but
              ignores relative ordering. Pairwise compares two items to decide
              which ranks higher. Captures preferences but needs O(n²) pairs.
              Listwise optimizes metrics over full lists, directly targeting
              NDCG. Most aligned with evaluation but hardest to train.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE EACH
            </p>
            <p style="margin-top: 0">
              Pointwise: abundant click data, predicting engagement probability.
              Pairwise: explicit preference signals like A/B choices. Listwise:
              non decomposable metrics, 10M+ training examples, dedicated ML
              infrastructure. Most systems start pointwise and migrate later.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>🎯 Decision Framework:</strong> Start with pointwise cross
              entropy for clicks. Add pairwise loss when you observe ranking
              inversions. Consider listwise with 10M+ examples.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY VS QUALITY
            </p>
            <p style="margin-top: 0">
              Every choice involves this tradeoff. More ranking stages increase
              quality but add latency. Larger candidate pools improve recall but
              slow ranking. Richer features improve predictions but need more
              lookups. Quantify with offline experiments: measure NDCG at
              different candidate counts, plot quality versus latency curves.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FRESHNESS VS STABILITY
            </p>
            <p style="margin-top: 0">
              Fresh signals (recent activity, trending items) improve relevance
              but are expensive and noisy. Common pattern: 80% stable
              precomputed features updated daily, 20% real time features updated
              per request. Too much real time signal causes volatile
              recommendations that confuse users.
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
                  Pointwise predicts absolute scores (simple), pairwise compares
                  items (captures preferences), listwise optimizes full lists
                  (hardest)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start with pointwise cross-entropy, add pairwise when you see
                  ranking inversions, listwise needs 10M+ examples
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Every choice trades latency for quality: more stages, larger
                  pools, richer features all cost time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mix 80% stable precomputed features with 20% real-time
                  features to balance freshness and stability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Plot quality vs latency curves offline to find optimal
                  operating points for your use case
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
                  Explain the progression: pointwise (predict CTR) → pairwise
                  (which item ranks higher) → listwise (optimize NDCG directly)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss feature freshness: user clicked 5 seconds ago vs user
                  preferences computed daily
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantify latency tradeoffs: 500 more candidates = 10ms more
                  latency = 0.5% better NDCG
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRetrievalRankingPipelineCriticalTradeOffsRankingObjectivesLatencyAndFreshness;
