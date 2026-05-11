import type { Component } from "solid-js";

const LessonRecsysEvaluationCoverageMetricsEcosystemHealthBeyondAccuracy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Coverage Metrics: Ecosystem Health Beyond Accuracy
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>NDCG (Normalized Discounted Cumulative Gain)</strong>{" "}
                measures ranking quality by rewarding relevant items positioned
                higher in the list. Unlike Precision@K, NDCG cares about order:
                a relevant item at position 1 is worth more than position 10.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How NDCG Works
            </p>
            <p style="margin-top: 0">
              <strong>DCG (Discounted Cumulative Gain):</strong> Sum of
              relevance scores, discounted by position. Formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                DCG = Σ (relevance_i / log2(position_i + 1))
              </code>
              . Position 1 gets full credit (divisor = 1). Position 10 gets
              credit divided by log2(11) ≈ 3.5. This heavily penalizes placing
              relevant items far down the list.
            </p>
            <p>
              <strong>Normalization:</strong> Divide DCG by ideal DCG (perfect
              ranking). NDCG = DCG / IDCG. Ranges 0 to 1. NDCG = 1.0 means
              perfect ranking. NDCG = 0.7 means decent but suboptimal. NDCG =
              0.5 is mediocre. Below 0.3 indicates serious ranking problems.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use NDCG vs Precision
            </p>
            <p style="margin-top: 0">
              Use Precision@K when you show exactly K items and users see them
              equally (email subject lines, single-row carousels). Use NDCG when
              position affects attention: search results, infinite scroll,
              multi-row grids. Most recommendation interfaces have position
              bias, making NDCG the more appropriate metric.
            </p>
            <p>
              NDCG@10 is the most common variant. It focuses on the first 10
              positions where user attention is highest. Target NDCG@10 varies
              by domain: 0.3-0.4 for broad content recommendations, 0.6-0.8 for
              focused search or personalization tasks.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> NDCG is the most commonly used
              offline metric for ranking systems because it combines what
              matters: relevance (what you recommend) and ranking quality (where
              you place it). When an interviewer asks about recommendation
              metrics, NDCG should be in your first sentence.
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
                  Item (catalog) coverage: unique items recommended divided by
                  catalog size, computed over 7 to 28 day windows, typical
                  values 20% to 60% depending on catalog size and diversity
                  policy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User coverage: fraction of users receiving at least one
                  relevant item in top K, critical for detecting cold start
                  failures in new user or niche interest segments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long tail coverage: share of impressions to bottom 50% of
                  items by popularity, or exposure Gini coefficient (0 = perfect
                  equality, 1 = one item gets everything), typical Gini 0.6 to
                  0.9 range
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Creator/artist coverage: number or percentage of distinct
                  creators receiving impressions, monitored weekly, 1 to 3
                  percentage point tail exposure shifts materially impact
                  creator ecosystems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accuracy versus coverage tradeoff: maximizing Precision@K
                  collapses coverage, diversity constraints reduce accuracy 1%
                  to 3% relative but improve long term retention and supply
                  health
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Popularity collapse symptom: rising exposure Gini, declining
                  tail impressions, stagnant discovery metrics, fixed by re
                  ranking with diversity constraints or minimum exposure floors
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
                  When asked about coverage: explain catalog coverage (% of
                  items receiving impressions), user coverage (% of users
                  getting personalized recs), and diversity coverage
                  (category/creator distribution).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For business impact: mention that low coverage indicates
                  winner-take-all effects where popular items dominate;
                  creators/sellers leave platforms where new items cant surface.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing targets: explain that 40-60% catalog coverage
                  in 30 days is typical; tail exposure (bottom 50% of items)
                  often targets 15-30% of impressions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysEvaluationCoverageMetricsEcosystemHealthBeyondAccuracy;
