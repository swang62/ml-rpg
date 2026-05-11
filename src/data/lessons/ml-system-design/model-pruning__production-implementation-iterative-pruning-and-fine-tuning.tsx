import type { Component } from "solid-js";

const LessonModelPruningProductionImplementationIterativePruningAndFineTuning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Iterative Pruning and Fine Tuning
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
                <strong>Iterative pruning</strong> outperforms one-shot pruning.
                Removing 10% of weights, fine-tuning, then repeating achieves
                higher accuracy than removing 50% at once. The network adapts
                gradually rather than experiencing catastrophic forgetting.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Iterative Pipeline
            </p>
            <p style="margin-top: 0">
              Start with trained model. In each iteration: compute importance
              scores, remove lowest 10-20%, fine-tune for 2-5 epochs. Repeat
              until target sparsity. For 90% sparsity with 10% per iteration,
              expect 10 pruning rounds. Total fine-tuning time: 20-50 epochs
              spread across iterations. This sounds expensive but consistently
              achieves 1-2% better final accuracy than one-shot approaches at
              the same sparsity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Layer Sensitivity
            </p>
            <p style="margin-top: 0">
              Not all layers tolerate pruning equally. Early layers (extracting
              basic features like edges) and final layers (making predictions)
              are most sensitive. Middle layers can often be pruned more
              aggressively. Common pattern: prune 30% from first layer, 60-70%
              from middle layers, 40% from last layer. Uniform pruning (same
              ratio everywhere) typically underperforms by 2-3% accuracy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Lottery Ticket Hypothesis
            </p>
            <p style="margin-top: 0">
              A pruned network contains a "winning ticket": a subnetwork that,
              if trained from scratch with original initialization, matches full
              network accuracy. This suggests optimal sparse structures exist
              from initialization. Practical implication: you can prune once,
              reset to initial weights, retrain the sparse network. This
              sometimes outperforms prune-then-fine-tune but requires storing
              original weights.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Production Tip:</strong> Always save checkpoints before
              each pruning iteration. If accuracy degrades unexpectedly, roll
              back one iteration and reduce pruning ratio.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Step 1: Baseline Model
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Accuracy: 92.5%
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Prune 10% Channels</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Importance: L1 norm per filter
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Fine Tune 3 Epochs</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    + Distillation from baseline
                    <br />
                    Accuracy: 92.3%
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Repeat 4 More Cycles</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Total: 50% pruned, 92.0% accuracy
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
                  Iterative pruning (10-20% per round) outperforms one-shot by
                  1-2% accuracy at same sparsity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each iteration: compute importance, prune 10-20%, fine-tune
                  2-5 epochs; 90% sparsity needs ~10 rounds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Layer sensitivity varies: early and final layers sensitive
                  (30-40% max), middle layers can go 60-70%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uniform pruning across layers underperforms layer-aware
                  pruning by 2-3% accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lottery ticket hypothesis: sparse winning subnetworks exist at
                  initialization and can be retrained
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
                  Describe iterative vs one-shot trade-off with specific numbers
                  (10 rounds, 1-2% accuracy gain)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention layer sensitivity patterns when discussing pruning
                  strategy - shows practical knowledge
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reference lottery ticket hypothesis for bonus points - it"s a
                  well-known research result interviewers may ask about
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPruningProductionImplementationIterativePruningAndFineTuning;
