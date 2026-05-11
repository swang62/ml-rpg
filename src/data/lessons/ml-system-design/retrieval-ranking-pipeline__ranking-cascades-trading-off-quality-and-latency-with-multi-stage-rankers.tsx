import type { Component } from "solid-js";

const LessonRetrievalRankingPipelineRankingCascadesTradingOffQualityAndLatencyWithMultiStageRankers: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Ranking Cascades: Trading Off Quality and Latency with Multi Stage
            Rankers
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MULTI STAGE RANKING
            </p>
            <p style="margin-top: 0">
              A single ranker scoring thousands of candidates is too slow. Multi
              stage ranking uses progressively complex models. L1: logistic
              regression with 50 features scores 5,000 candidates in 10ms,
              passes top 500. L2: gradient boosted tree with 200 features takes
              50ms, passes top 100. L3: deep neural network with 500+ features
              takes 50ms for final ordering. Total: 110ms instead of 500+ms for
              running neural network on all candidates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STAGE DESIGN PRINCIPLES
            </p>
            <p style="margin-top: 0">
              Each stage must be more accurate than the previous. L1 needs 90%+
              recall at its cutoff: 90% of items L3 would rank in top 100 should
              survive L1. Measure by running all candidates through all stages
              offline. If L1 recall drops below 85%, reduce cutoff aggression or
              improve the L1 model.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEATURE COMPLEXITY BY STAGE
            </p>
            <p style="margin-top: 0">
              Early stages use precomputed features: item popularity, user
              segment, static embeddings. Later stages add expensive features:
              real time user activity, cross features between user and item,
              sequence models. Feature lookup cost matters: 5 to 10ms per
              database call works for 100 candidates, not 5,000.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The cascade is a compute budget
              problem. Spending 150ms on a complex model for few candidates
              often beats a simple model for many candidates, if early stages
              maintain high recall.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCORE CALIBRATION
            </p>
            <p style="margin-top: 0">
              Stage scores are not directly comparable. L1 outputs logits from
              negative 5 to 5, L2 outputs probabilities 0 to 1. Normalize to a
              common scale or use rank position for cross stage analysis.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">2000 Candidates</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    From Retrieval
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Stage 1: Lightweight MLP
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10–30ms total
                  </div>
                  <div style="font-size: 12px">0.015ms per item</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">300 Candidates</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Top 15% pruned
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Stage 2: Cross Encoder
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    30–100ms total
                  </div>
                  <div style="font-size: 12px">0.3ms per item</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Top 50 Results</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Final ranked output
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
                  Multi-stage ranking: L1 (simple, 5000→500) → L2 (medium,
                  500→100) → L3 (complex, 100→final)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Total cascade time ~110ms vs 500+ms for running complex model
                  on all candidates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each stage must maintain 85-90%+ recall of items the final
                  stage would rank highly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Early stages use precomputed features, later stages add
                  real-time and cross features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature lookup cost matters: 5-10ms per DB call is acceptable
                  for 100 candidates, not 5000
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
                  Walk through a concrete cascade: L1 logistic regression
                  (10ms), L2 GBDT (50ms), L3 neural net (50ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain recall measurement: run all candidates through all
                  stages offline, compare to ground truth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss feature cost: real-time user activity adds 10ms per
                  lookup, only feasible in later stages
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRetrievalRankingPipelineRankingCascadesTradingOffQualityAndLatencyWithMultiStageRankers;
