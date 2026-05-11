import type { Component } from "solid-js";

const LessonLearningToRankListwiseRankingOptimizingTheEntireListWithMetricAwareLosses: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Listwise Ranking: Optimizing the Entire List With Metric Aware
            Losses
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
                <strong>Listwise methods</strong> optimize the entire ranked
                list at once, directly targeting ranking quality metrics like
                NDCG (which measures how well relevant items are ranked at the
                top, with steep penalties for missing top positions).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Optimization Challenge
            </p>
            <p style="margin-top: 0">
              NDCG and similar metrics involve sorting: compute scores, sort
              items by score, then measure quality. The problem: sorting isn't
              differentiable (you can't compute gradients through a sort
              operation). Without gradients, standard training doesn't work.
              Solutions approximate gradients: estimate how small score changes
              would affect the final metric, then adjust scores in the direction
              that improves the metric.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Metric-Aware Training Works
            </p>
            <p style="margin-top: 0">
              For each pair of items, compute: if we swapped their positions,
              how much would ranking quality change? Items where swaps cause
              large quality drops get stronger training signals. A swap between
              positions 1 and 2 might drop NDCG by 0.1; a swap between 50 and 51
              might drop it by 0.001. Training naturally focuses on getting top
              positions right because that's where the metric is most sensitive.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LambdaMART: The Production Standard
            </p>
            <p style="margin-top: 0">
              LambdaMART combines two ideas: "lambda" gradients that estimate
              metric changes from position swaps, and "MART" (gradient boosted
              decision trees), which builds predictions by combining many simple
              decision trees. Each tree corrects errors from previous trees.
              LambdaMART remains the industry workhorse: it's accurate,
              interpretable (you can inspect which features drive rankings), and
              doesn't require GPUs. Neural approaches exist but rarely
              outperform LambdaMART enough to justify added complexity.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Listwise requires the full ranked
              list in memory during training, limiting batch sizes. For lists of
              1000+ items, memory becomes prohibitive. Truncate to top-K
              (typically 100-200) or use approximate methods.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Listwise Training: NDCG Delta Weighting
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px">
                    Current Ranking (NDCG@10: 0.75)
                  </div>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap">
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 12px">
                      <strong>1:</strong> Item A
                    </div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 12px">
                      <strong>2:</strong> Item B
                    </div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 12px">
                      <strong>3:</strong> Item C
                    </div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 12px">
                      <strong>4:</strong> Item D
                    </div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 12px">
                      <strong>5:</strong> Item E
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                      Swap Position 2 ↔ 5
                    </div>
                    <div style="font-size: 12px">NDCG@10: 0.79</div>
                    <div style="font-size: 12px; margin-top: 4px">
                      <strong>Δ = +0.04</strong>
                    </div>
                    <div style="font-size: 11px; margin-top: 4px">
                      High gradient weight
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                      Swap Position 18 ↔ 22
                    </div>
                    <div style="font-size: 12px">NDCG@10: 0.75</div>
                    <div style="font-size: 12px; margin-top: 4px">
                      <strong>Δ = +0.001</strong>
                    </div>
                    <div style="font-size: 11px; margin-top: 4px">
                      Low gradient weight
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Training focuses on top positions
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Gradient magnitude proportional to metric delta
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
                  Listwise methods optimize the entire ranked list at once,
                  directly targeting ranking quality metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Challenge: sorting is non-differentiable, so solutions
                  estimate how score changes affect final metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training signal magnitude scales with metric sensitivity:
                  position 1-2 swaps &gt;&gt; position 50-51 swaps
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LambdaMART combines metric-aware gradients with decision
                  trees; remains industry standard despite neural alternatives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory limitation: full list needed in training; truncate to
                  top 100-200 for long lists
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
                  Explain the non-differentiable sorting problem and how lambda
                  gradients solve it
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe NDCG sensitivity by position to show why listwise
                  focuses on top results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention LambdaMART as production workhorse despite neural
                  alternatives
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLearningToRankListwiseRankingOptimizingTheEntireListWithMetricAwareLosses;
