import type { Component } from "solid-js";

const LessonRecsysEvaluationChoosingPrecisionkVsNdcgkWhenToUseEach: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Precision@K vs NDCG@K: When to Use Each
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
                <strong>Coverage metrics</strong> measure how much of your
                catalog gets recommended. High engagement concentrated on a
                narrow subset is not success if 80% of inventory never gets
                exposure. Coverage balances personalization with catalog health.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Types of Coverage
            </p>
            <p style="margin-top: 0">
              <strong>Catalog coverage:</strong> Percentage of items that
              received at least one impression in a time period. If 10M items
              exist and 2M got impressions this week, coverage = 20%. Target
              depends on business: e-commerce wants 50-80% (inventory turnover),
              streaming content might accept 30-50% (long tail matters less).
            </p>
            <p>
              <strong>User coverage:</strong> For a typical user, what fraction
              of relevant catalog do they see over time? Low user coverage
              creates filter bubbles where users only see a narrow slice. Track
              average categories exposed per user session.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Coverage vs Relevance Trade-off
            </p>
            <p style="margin-top: 0">
              Maximizing relevance typically hurts coverage. The safest
              predictions are popular items everyone likes, creating a
              rich-get-richer loop. Long-tail items with few interactions have
              uncertain relevance, so conservative models avoid them.
            </p>
            <p>
              Set explicit coverage targets as constraints. Example: "Maintain
              60% weekly catalog coverage while maximizing NDCG." Optimization
              must balance both. Without coverage constraints, models converge
              to showing the same 1000 popular items to everyone.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Pattern:</strong> When discussing
              recommendation metrics, mention coverage alongside Precision and
              NDCG. This shows systems-level thinking: you understand business
              health (inventory turnover, new item discovery) not just model
              accuracy. Ask: "What percentage of catalog gets recommended
              weekly?" Interviewers notice this maturity.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 14px">
                <strong style="font-size: 15px">
                  Precision@K vs NDCG@K Decision Tree
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Binary Labels?</strong> (click/no click, buy/no buy)
                  <div style="margin-top: 6px; font-size: 13px">
                    Yes → Prefer <strong>Precision@K</strong>
                  </div>
                  <div style="font-size: 13px">
                    No (graded levels) → Consider <strong>NDCG@K</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Position Sensitivity?</strong> (does rank 1 vs 5
                  matter?)
                  <div style="margin-top: 6px; font-size: 13px">
                    Low (compact UI) → <strong>Precision@K</strong>
                  </div>
                  <div style="font-size: 13px">
                    High (scrolling/pagination) → <strong>NDCG@K</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Label Quality?</strong> (bias, annotation cost)
                  <div style="margin-top: 6px; font-size: 13px">
                    Noisy/cheap → <strong>Precision@K</strong> more robust
                  </div>
                  <div style="font-size: 13px">
                    Clean/graded → <strong>NDCG@K</strong> more sensitive
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Best Practice: Track Both</strong>
                  <div style="margin-top: 4px; font-size: 13px">
                    Optimize NDCG, report Precision to stakeholders
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
                  Binary labels with small K (5-10 items visible): Precision@K
                  is intuitive and directly measures relevant fraction in
                  viewport.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Graded labels and scrolling UI (10-50 items): NDCG@K captures
                  position effects and engagement intensity across the full
                  list.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Coverage metrics serve as guardrails against concentration:
                  catalog coverage, creator/seller coverage, category
                  distribution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  K value should match viewport: mobile feeds show 5-8 items,
                  desktop grids show 12-20; K beyond visible area has
                  diminishing relevance.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-objective optimization: balance Precision/NDCG
                  (relevance) with Coverage (diversity) using constraints or
                  weighted objectives.
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
                  When asked which metric to use: explain Precision@K for binary
                  outcomes (buy/not buy), NDCG for ranked lists with graded
                  relevance, Coverage as a guardrail against concentration.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For K value selection: match to viewport - mobile feeds show
                  5-8 items, desktop grids show 12-20; K beyond visible area has
                  diminishing practical relevance.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing trade-offs: explain that optimizing NDCG
                  aggressively may hurt Coverage; multi-objective optimization
                  or guardrail constraints are common solutions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysEvaluationChoosingPrecisionkVsNdcgkWhenToUseEach;
