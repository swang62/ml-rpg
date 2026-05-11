import type { Component } from "solid-js";

const LessonRecsysEvaluationNdcgkPositionAwareRankingQuality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            NDCG@K: Position Aware Ranking Quality
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
                <strong>Precision@K</strong> measures what fraction of the top K
                recommendations were relevant. If you show 10 items and 7 were
                clicked, Precision@10 = 0.7. Simple, interpretable, but ignores
                ranking within the K items.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Computing Precision@K
            </p>
            <p style="margin-top: 0">
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                Precision@K = (relevant items in top K) / K
              </code>
            </p>
            <p>
              For user U, show K items. Count how many were interacted with
              (clicked, purchased, rated). Divide by K. Average across all users
              to get system-wide Precision@K. Common values: K = 5, 10, 20.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Recall@K
            </p>
            <p style="margin-top: 0">
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                Recall@K = (relevant items in top K) / (total relevant items)
              </code>
            </p>
            <p>
              Of all items the user would find relevant, what fraction appeared
              in the top K? Harder to compute because you need to know all
              relevant items, not just those shown. In practice, use items the
              user eventually interacted with as ground truth.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Precision-Recall Trade-off
            </p>
            <p style="margin-top: 0">
              Increasing K typically increases Recall (more chances to include
              relevant items) but decreases Precision (more irrelevant items in
              the denominator). Choose K based on your UI: if you show 10 items,
              measure Precision@10. If users scroll through 50, measure
              Recall@50.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Pattern:</strong> When asked about
              recommendation metrics, define Precision@K and Recall@K with
              formulas. Explain why both matter: Precision ensures quality,
              Recall ensures coverage. Show you understand the trade-off between
              showing few high-confidence items versus many lower-confidence
              items.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 15px">NDCG@5 Calculation</strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; width: 60px; text-align: center">
                    <strong>Pos 1</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1">
                    <strong>Rel: 3</strong> → Gain: 7 ÷ log2(2) = 7.0
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; width: 60px; text-align: center">
                    <strong>Pos 2</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1">
                    <strong>Rel: 2</strong> → Gain: 3 ÷ log2(3) = 1.89
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; width: 60px; text-align: center">
                    <strong>Pos 3</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1">
                    <strong>Rel: 1</strong> → Gain: 1 ÷ log2(4) = 0.50
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; width: 60px; text-align: center">
                    <strong>Pos 4</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1">
                    <strong>Rel: 0</strong> → Gain: 0 ÷ log2(5) = 0.00
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; width: 60px; text-align: center">
                    <strong>Pos 5</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1">
                    <strong>Rel: 2</strong> → Gain: 3 ÷ log2(6) = 1.16
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center">
                  <strong>DCG@5 = 10.55</strong>
                  <br />
                  <span style="font-size: 13px">NDCG@5 = DCG / IDCG</span>
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
                  DCG = sum of gains discounted by log2(position+1); NDCG
                  normalizes by ideal DCG to get 0-1 scale where 1.0 is perfect
                  ranking.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Graded relevance captures nuance: map engagement levels to 0-4
                  scale (skip=0, view=1, partial=2, complete=3, save/share=4).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Standard practice: NDCG@1, NDCG@3, NDCG@10 with multi-level
                  judgments, offline evaluation over tens of millions of
                  query-result pairs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NDCG@1 measures top-pick quality; NDCG@10 balances precision
                  and ranking depth; NDCG@100 focuses on overall list quality
                  for long-scroll UIs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position weighting via log discount reflects user attention
                  decay: position 1 has full weight, position 10 has about 30%
                  weight.
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
                  When explaining NDCG: describe DCG as sum of gains discounted
                  by log2(position+1), normalized by ideal DCG to get 0-1 scale;
                  perfect ranking scores 1.0.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For graded relevance: mention mapping engagement to levels
                  (0-4 scale): skip=0, view=1, partial=2, complete=3, save=4;
                  captures nuance that binary labels miss.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about K selection: explain that NDCG@1 measures
                  top-pick quality, NDCG@10 balances precision and depth,
                  NDCG@100 focuses on overall list quality.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysEvaluationNdcgkPositionAwareRankingQuality;
