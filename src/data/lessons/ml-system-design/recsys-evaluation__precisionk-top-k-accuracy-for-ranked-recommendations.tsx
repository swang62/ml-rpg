import type { Component } from "solid-js";

const LessonRecsysEvaluationPrecisionkTopKAccuracyForRankedRecommendations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Precision@K: Top K Accuracy for Ranked Recommendations
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
                <strong>Recommendation evaluation metrics</strong> measure how
                well a system predicts user preferences. Precision measures
                relevance of recommendations shown. Recall measures coverage of
                relevant items. NDCG measures ranking quality. Each answers a
                different question about system performance.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Multiple Metrics Matter
            </p>
            <p style="margin-top: 0">
              A system with high precision but low recall shows relevant items
              but misses many good options. High recall but low precision
              surfaces everything but wastes user attention on irrelevant items.
              NDCG adds ranking: showing a relevant item at position 1 is better
              than position 10. Each metric captures a different failure mode.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline vs Online Evaluation
            </p>
            <p style="margin-top: 0">
              <strong>Offline:</strong> Use historical data. Compute metrics on
              held-out interactions. Fast iteration, but assumes past behavior
              predicts future behavior. <strong>Online:</strong> A/B test with
              live users. Measure actual clicks, conversions, session duration.
              Ground truth, but slow and expensive. Use offline for development,
              online for final validation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Business Metrics vs Model Metrics
            </p>
            <p style="margin-top: 0">
              Model metrics like NDCG optimize for prediction quality. Business
              metrics like revenue, retention, and engagement optimize for
              business outcomes. They often align but not always. A model might
              maximize clicks but show low-quality clickbait. Track both and
              investigate divergences.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> No single metric captures
              recommendation quality. Use a suite: Precision@K for relevance,
              NDCG for ranking, Coverage for catalog utilization, and online A/B
              tests for business impact. Optimize for the combination, not any
              single metric.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 15px">
                  Precision@5 = 3/5 = 0.60
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Pos 1: ✓ Relevant</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">
                      Pos 2: ✗ Not Relevant
                    </strong>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Pos 3: ✓ Relevant</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Pos 4: ✓ Relevant</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">
                      Pos 5: ✗ Not Relevant
                    </strong>
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
                  Computed as (number of relevant items in top K) divided by K,
                  produces values between 0.0 and 1.0
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production K values: 5 to 10 for above the fold tiles, 10 to
                  20 for search first page or homepage rows, 30 for playlist
                  style surfaces
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Binary relevance definition examples: clicked, purchased,
                  watched more than 30 seconds, completion rate above 50%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position blind: placing best item at rank 1 versus rank 10
                  produces identical Precision@K score
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical meaningful deltas: 0.5 to 1.0 percentage point
                  improvements (0.215 to 0.225) drive significant business
                  impact at billions of impressions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always align K to actual UI surface: optimizing Precision@20
                  when users see 8 items hides regressions in visible region
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
                  When asked about Precision@K: explain it measures fraction of
                  recommended items that are relevant in top K positions; K
                  should match your UI (5 for carousels, 10 for feeds, 30 for
                  playlists).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For relevance definition: mention that binary labels
                  (click/no-click, purchase/no-purchase) work for Precision,
                  while graded labels (engagement depth) need NDCG.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing limitations: explain that Precision@K ignores
                  position - all K items are weighted equally, which may not
                  reflect user behavior where top positions dominate attention.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysEvaluationPrecisionkTopKAccuracyForRankedRecommendations;
