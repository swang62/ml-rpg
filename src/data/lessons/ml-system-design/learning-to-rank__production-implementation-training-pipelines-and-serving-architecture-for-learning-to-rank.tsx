import type { Component } from "solid-js";

const LessonLearningToRankProductionImplementationTrainingPipelinesAndServingArchitectureForLearningToRank: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Training Pipelines and Serving
            Architecture for Learning to Rank
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Insight
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                The hardest part of production LTR is not the model. It is
                ensuring the model sees the same world during training that it
                will see during serving. Most ranking bugs trace back to this
                mismatch.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Feature Snapshot Problem
            </p>
            <p style="margin-top: 0">
              When a user clicks a result, you log (query, item, click). But
              what features did that item have at click time? If item X had 100
              reviews when clicked but now has 500, which value should training
              use? The answer: 100. The user decided based on seeing 100
              reviews. Training on 500 teaches the model that "items with 500
              reviews get clicked" when users never saw that. This creates a gap
              between what the model learns and what it encounters at serving
              time.
            </p>
            <p>
              The fix: snapshot feature values at impression time, not lookup
              time. When you log the click, also log every feature value used to
              rank that item. Store these snapshots in a columnar format for
              efficient training reads. This doubles storage costs but
              eliminates an entire class of bugs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Serving Latency Budget
            </p>
            <p style="margin-top: 0">
              Users expect results in under 200ms total. Search and ranking
              typically get 50ms of that budget at the 99th percentile (meaning
              99 of 100 requests must finish in 50ms). Break this into: feature
              lookup (1-5ms) from a fast key value store, and model scoring
              (10-30ms). The critical optimization: batch all candidates in one
              model call. Scoring 100 items individually takes 100 × 10ms = 1
              second. Batching takes 15-20ms. The difference is whether your
              system works or fails.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Safe Model Deployment
            </p>
            <p style="margin-top: 0">
              Never deploy a new ranking model directly to 100% of traffic.
              First, run in shadow mode: score every request but do not use the
              scores. Compare shadow outputs to production. If they differ
              wildly, investigate. Then ramp gradually: 1% traffic, watch
              metrics for a day. 5%, another day. 20%, 50%, 100%. At each stage,
              if click rates or revenue drop more than 2-3%, automatically
              revert within minutes. This catches bugs that offline evaluation
              misses.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Production Serving: Multistage Ranking Pipeline
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px">
                    Stage 1: Retrieval
                  </div>
                  <div style="font-size: 12px">Candidates: 12,000 → 12,000</div>
                  <div style="font-size: 12px">Features: Index lookup</div>
                  <div style="font-size: 12px">Latency: 15ms</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px">
                    Stage 2: Lightweight Ranker
                  </div>
                  <div style="font-size: 12px">Candidates: 12,000 → 500</div>
                  <div style="font-size: 12px">Features: 80 fast features</div>
                  <div style="font-size: 12px">Latency: 12ms (24μs/item)</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px">
                    Stage 3: Learning to Rank (GBDT)
                  </div>
                  <div style="font-size: 12px">
                    Candidates: 500 → 20 displayed
                  </div>
                  <div style="font-size: 12px">Features: 350 features</div>
                  <div style="font-size: 12px">Latency: 28ms (56μs/item)</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong>Total Latency: 55ms</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    NDCG@10: 0.84, CTR: 4.2%
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
                  The hardest production bug is training serving mismatch: the
                  model learns from one world but serves in another
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snapshot feature values at impression time, not lookup time.
                  Store them with click logs to ensure training sees what users
                  saw.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Serve under 50ms at 99th percentile by batching all candidates
                  in one call: 100 items in 15-20ms vs 1 second individually
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deploy via shadow mode first, then ramp 1% to 5% to 20% to
                  100% with automatic rollback on 2-3% metric drops
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
                  Explain the snapshot problem with a concrete example: item had
                  100 reviews at click time, 500 now. Training on 500 is wrong.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Break down the latency budget: 50ms total, split into feature
                  lookup (1-5ms) and model scoring (10-30ms).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the ramp schedule: shadow mode, then 1% to 5% to 20%
                  to 100% with automatic rollback triggers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLearningToRankProductionImplementationTrainingPipelinesAndServingArchitectureForLearningToRank;
