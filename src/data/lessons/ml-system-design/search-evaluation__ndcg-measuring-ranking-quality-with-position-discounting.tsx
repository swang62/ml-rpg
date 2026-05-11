import type { Component } from "solid-js";

const LessonSearchEvaluationNdcgMeasuringRankingQualityWithPositionDiscounting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            NDCG: Measuring Ranking Quality With Position Discounting
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
                <strong>NDCG (Normalized Discounted Cumulative Gain)</strong>{" "}
                measures ranking quality when items have graded relevance (e.g.,
                0=irrelevant, 1=somewhat relevant, 2=relevant, 3=highly
                relevant). It rewards placing highly relevant items at the top,
                with diminishing returns for lower positions.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How NDCG Works Step by Step
            </p>
            <p style="margin-top: 0">
              Start with <strong>Cumulative Gain (CG)</strong>: sum of relevance
              scores in your ranked list. If top-5 items have relevance [3, 2,
              3, 0, 1], CG = 9. Problem: CG ignores position. [3, 2, 3, 0, 1]
              and [0, 1, 2, 3, 3] both score 9, but the first ranking is
              obviously better.
            </p>
            <p>
              <strong>Discounted Cumulative Gain (DCG)</strong> fixes this by
              dividing each relevance by log(position+1). Position 1 divides by
              log(2)=1, position 2 by log(3)=1.58, position 5 by log(6)=2.58.
              Higher positions get less discount, so relevant items there
              contribute more. For [3, 2, 3, 0, 1]: DCG = 3/1 + 2/1.58 + 3/2 +
              0/2.32 + 1/2.58 = 3 + 1.26 + 1.5 + 0 + 0.39 = 6.15.
            </p>
            <p>
              <strong>Normalized DCG</strong> divides by the ideal DCG (what you
              would get with perfect ranking). If perfect order is [3, 3, 2, 1,
              0], ideal DCG = 3/1 + 3/1.58 + 2/2 + 1/2.32 + 0 = 6.33. NDCG =
              6.15/6.33 = 0.97. A perfect ranking scores 1.0.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use NDCG
            </p>
            <p style="margin-top: 0">
              NDCG shines when you have graded relevance labels and care about
              the full top-K ranking, not just the first result. Search results,
              product recommendations, and content feeds typically use NDCG@10
              or NDCG@20. It is less useful for navigational queries where users
              want exactly one result (use MRR instead) or when all relevant
              items are equally relevant (binary relevance makes the grading
              pointless).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> NDCG values range 0 to 1. In
              practice, production systems target NDCG@10 of 0.4-0.6 for broad
              queries and 0.7-0.9 for navigational queries. A 0.02 improvement
              (e.g., 0.52 to 0.54) is often significant enough to ship.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    User sees ranked results
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Impression logged with position, item ID, features
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    User clicks item at rank 3
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Click event logged, CTR = clicks / impressions
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    User spends 15 seconds
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Dwell time = time until return or abandonment
                    <br />
                    <strong>Long dwell (&gt;10s)</strong> → likely satisfied
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Pipeline joins click + dwell
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Late events handled with 24h watermark window
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
                  CG sums relevance scores but ignores position. DCG discounts
                  by log(position+1) so top positions contribute more.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NDCG normalizes DCG by dividing by ideal DCG (perfect
                  ranking). Score of 1.0 means perfect, 0 means worst possible.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use NDCG when you have graded relevance (not binary) and care
                  about full top-K ranking quality.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production targets: NDCG@10 of 0.4-0.6 for broad queries,
                  0.7-0.9 for navigational. A 0.02 lift is often significant.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NDCG is less useful for single-answer queries (use MRR) or
                  binary relevance (grading adds nothing).
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
                  Walk through the DCG computation: relevance [3,2,3,0,1] with
                  log discounting gives 6.15, normalized against ideal 6.33 =
                  0.97.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain when NDCG is appropriate: graded relevance, full
                  ranking matters. When not: single-answer queries, binary
                  labels.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cite production NDCG targets (0.4-0.6 broad, 0.7-0.9
                  navigational) and significance threshold (0.02 lift is
                  meaningful).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchEvaluationNdcgMeasuringRankingQualityWithPositionDiscounting;
