import type { Component } from "solid-js";

const LessonLearningToRankHowToChooseDecisionFrameworkForPointwiseVsPairwiseVsListwise: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How to Choose: Decision Framework for Pointwise vs Pairwise vs
            Listwise
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                The Key Question
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                You have three LTR approaches.{" "}
                <strong>How do you choose?</strong> The decision depends on data
                volume, latency constraints, and how much ranking quality
                matters relative to engineering cost.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Start With Pointwise
            </p>
            <p style="margin-top: 0">
              Always start here. Pointwise is simplest: predict a score per
              item, sort by score. It parallelizes perfectly, requires no
              special training infrastructure, and works with any model you
              already know. Pointwise typically achieves 93-97% of the NDCG of
              complex approaches. For many applications, that is good enough.
              Only move beyond pointwise when you have exhausted feature
              improvements and still fall short of targets.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Move to Pairwise When Order Matters More Than Scores
            </p>
            <p style="margin-top: 0">
              Pairwise makes sense when: (1) you have preference data (A is
              better than B) rather than absolute labels, (2) pointwise is
              within 3-5% of your target and you need that last bit, (3) you can
              afford training complexity. Pairwise generates many pairs from
              each list, increasing data volume. LambdaRank is the standard: it
              weights pairs by position importance, focusing on top results.
              Expect 2-5% NDCG improvement over pointwise.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Use Listwise When Top Positions Are Critical
            </p>
            <p style="margin-top: 0">
              Listwise directly optimizes ranking metrics like NDCG. Use it
              when: (1) top-3 results drive most business value, (2) you have
              millions of queries with graded relevance, (3) you can handle
              memory constraints (full lists in memory during training).
              LambdaMART remains the production standard. It often beats neural
              approaches while being interpretable and not requiring GPUs.
              Expect 1-3% improvement over pairwise.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Decision Rule:</strong> Ship pointwise first. If quality
              gap remains after feature work, try pairwise. Reserve listwise for
              cases where top-3 quality is business critical.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Position Bias: Same Item, Different Positions
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <div style="font-weight: bold; text-align: center; margin-bottom: 8px">
                      Position 1
                    </div>
                    <div style="font-size: 12px">Examination: 0.80</div>
                    <div style="font-size: 12px">CTR: 12%</div>
                    <div style="font-size: 12px; margin-top: 6px">
                      <strong>Training weight:</strong>
                    </div>
                    <div style="font-size: 12px">1 / 0.80 = 1.25</div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <div style="font-weight: bold; text-align: center; margin-bottom: 8px">
                      Position 5
                    </div>
                    <div style="font-size: 12px">Examination: 0.25</div>
                    <div style="font-size: 12px">CTR: 4%</div>
                    <div style="font-size: 12px; margin-top: 6px">
                      <strong>Training weight:</strong>
                    </div>
                    <div style="font-size: 12px">1 / 0.25 = 4.0</div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Inverse Propensity Weighting
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Position 5 click gets 3.2x more training weight
                  </div>
                  <div style="font-size: 12px">
                    Corrects for lower examination probability
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Without correction:
                  </div>
                  <div style="font-size: 12px">
                    Model sees 12% CTR at pos 1 vs 4% at pos 5
                  </div>
                  <div style="font-size: 12px">
                    Learns position preference, not true relevance
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
                  Start with pointwise: simplest, parallelizes perfectly,
                  achieves 93-97% of best NDCG
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Move to pairwise when you have preference data and need 2-5%
                  more NDCG after exhausting features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use listwise when top-3 results are business critical and you
                  have millions of graded queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LambdaRank (pairwise) and LambdaMART (listwise) are production
                  standards
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision rule: ship pointwise, try pairwise if gap remains,
                  reserve listwise for critical cases
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
                  Frame the decision as progressive: start simple, add
                  complexity only when justified.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention NDCG gaps: pointwise 93-97%, pairwise adds 2-5%,
                  listwise adds 1-3%.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize LambdaMART beats neural approaches while being
                  interpretable and GPU-free.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLearningToRankHowToChooseDecisionFrameworkForPointwiseVsPairwiseVsListwise;
