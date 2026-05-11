import type { Component } from "solid-js";

const LessonLearningToRankPairwiseRankingLearningRelativeOrderFromItemComparisons: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Pairwise Ranking: Learning Relative Order From Item Comparisons
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
                <strong>Pairwise ranking</strong> learns from comparisons: given
                items A and B, which is more relevant? Instead of predicting
                absolute scores, the model predicts relative ordering. This
                directly optimizes what ranking cares about: getting the order
                right.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Pairwise Training Works
            </p>
            <p style="margin-top: 0">
              Training data consists of pairs with known ordering: item A is
              more relevant than item B for this query. The model scores both
              items. If score(A) &lt; score(B) when A should rank higher, the
              loss increases and the model adjusts to push A above B. After
              millions of pairs, sorting by score produces correct orderings.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Common Loss Functions
            </p>
            <p style="margin-top: 0">
              <strong>RankNet:</strong> Converts score difference to a
              probability (larger gap = higher confidence A beats B). Wrong
              predictions get penalized proportionally.{" "}
              <strong>LambdaRank:</strong> Weights each pair by ranking impact.
              Swapping positions 1 and 2 hurts more than swapping 50 and 51, so
              top position pairs get higher training weight.{" "}
              <strong>Margin loss:</strong> Requires score(A) - score(B) &gt;
              margin (e.g., 0.5) when A is better. Add penalty if margin is not
              met.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pair Sampling Strategies
            </p>
            <p style="margin-top: 0">
              Not all pairs teach equally. Easy pairs (highly relevant vs
              clearly irrelevant) add little. Hard pairs (similar relevance,
              confusing features) drive learning. Strategies: sample pairs where
              the model currently predicts wrong; weight by position importance
              (top-10 swaps matter more); exclude pairs where both items have
              the same label.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Pairwise bridges pointwise and
              listwise. It captures relative ordering (unlike pointwise) while
              staying computationally tractable. Training scales with number of
              pairs, not with list length squared.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Pairwise Training: Query "laptop"
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Item A</strong>
                    <div style="font-size: 12px; margin-top: 4px">Clicked</div>
                    <div style="font-size: 12px">Score: 0.85</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">vs</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Item B</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Not clicked
                    </div>
                    <div style="font-size: 12px">Score: 0.78</div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong>Loss: log(1 + exp(0.78 - 0.85))</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Correct order → Low loss (0.09)
                  </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center; margin-top: 4px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Item C</strong>
                    <div style="font-size: 12px; margin-top: 4px">Clicked</div>
                    <div style="font-size: 12px">Score: 0.72</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">vs</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Item D</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Not clicked
                    </div>
                    <div style="font-size: 12px">Score: 0.81</div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong>Loss: log(1 + exp(0.81 - 0.72))</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Wrong order → High loss (0.54)
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
                  Pairwise learns from item comparisons: which is more relevant,
                  A or B?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Loss penalizes wrong orderings; model adjusts to push the
                  correct item higher
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LambdaRank weights pairs by position impact: swapping top
                  positions hurts more than bottom ones
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hard pair sampling (model predicts wrong, similar relevance)
                  drives learning more than easy pairs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pairwise bridges pointwise and listwise: captures ordering
                  while remaining computationally tractable
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
                  Explain the comparison mechanism: score both items, penalize
                  if wrong order, adjust weights.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention LambdaRank as the key innovation that weights pairs by
                  their ranking impact.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe hard pair sampling: focus training on pairs the model
                  currently gets wrong.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLearningToRankPairwiseRankingLearningRelativeOrderFromItemComparisons;
