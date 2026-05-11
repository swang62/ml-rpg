import type { Component } from "solid-js";

const LessonLearningToRankPointwiseRankingWhenToTreatRankingAsIndependentPredictions: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Pointwise Ranking: When to Treat Ranking as Independent Predictions
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Question
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>
                  When should you treat ranking as independent predictions?
                </strong>{" "}
                When items don"t interact, when you need maximum scalability,
                and when you"re building a baseline before investing in
                complexity.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Use Pointwise When Items Are Truly Independent
            </p>
            <p style="margin-top: 0">
              Some ranking problems have no item interactions. Product search
              where each product"s relevance depends only on query match and
              product attributes. Job recommendations where each job"s fit
              depends on candidate skills and job requirements. In these cases,
              modeling pairwise comparisons adds complexity without benefit.
              Score each item independently, sort, done.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Use Pointwise When Scalability Is Critical
            </p>
            <p style="margin-top: 0">
              Pointwise scoring parallelizes perfectly. Score 10,000 candidates
              across 100 workers, each processing 100 items independently.
              Pairwise requires comparing pairs (O(n²) comparisons); listwise
              needs the full list in memory. For real-time ranking of millions
              of candidates, pointwise is often the only practical choice. Score
              in parallel, sort the top results, return in &lt;50ms.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Use Pointwise As Your Baseline
            </p>
            <p style="margin-top: 0">
              Before investing in pairwise or listwise, establish pointwise
              performance. Often it"s within 3-7% NDCG of more complex
              approaches. If that"s good enough for your application, ship it.
              The engineering cost of pairwise training, the memory cost of
              listwise, and the debugging complexity rarely justify marginal
              gains. Only move beyond pointwise when you"ve exhausted feature
              improvements and still fall short of targets.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ When NOT Pointwise:</strong> When diversity matters
              (pointwise scores duplicates equally), when position calibration
              matters (pointwise ignores position importance), or when you have
              rich item-item interaction signals.
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
                  Use pointwise when items are truly independent (relevance
                  depends only on item attributes)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use pointwise when scalability is critical: scores parallelize
                  perfectly, pairwise is O(n²)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pointwise is typically within 3-7% NDCG of complex approaches;
                  often good enough to ship
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Establish pointwise baseline before investing in
                  pairwise/listwise complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Avoid pointwise when diversity matters or when position
                  calibration is important
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
                  Frame pointwise as a decision: "When should I use this?"
                  rather than just explaining what it is
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the 3-7% NDCG gap as the key trade-off decision point
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the scalability advantage (parallel scoring) for
                  real-time systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLearningToRankPointwiseRankingWhenToTreatRankingAsIndependentPredictions;
